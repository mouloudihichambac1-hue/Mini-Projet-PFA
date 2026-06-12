const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const User = require('../models/User');

const buildParticipantQuery = (userId, partnerId) => ({
  participants: { $all: [userId, partnerId] },
});

exports.getConversations = async (req, res, next) => {
  try {
    const conversations = await Conversation.find({ participants: req.user._id })
      .sort({ updatedAt: -1 })
      .populate('participants', 'nom email role');

    const formatted = conversations.map((conversation) => {
      const partner = conversation.participants.find(
        (participant) => participant._id.toString() !== req.user._id.toString()
      );

      return {
        id: conversation._id,
        partner: partner
          ? {
              id: partner._id,
              nom: partner.nom,
              email: partner.email,
              role: partner.role,
            }
          : null,
        lastMessage: conversation.lastMessage,
        updatedAt: conversation.updatedAt,
      };
    });

    res.json({ conversations: formatted });
  } catch (error) {
    next(error);
  }
};

exports.createConversation = async (req, res, next) => {
  try {
    const { partnerId, partnerEmail } = req.body;
    let partner;

    if (!partnerId && !partnerEmail) {
      return res.status(400).json({ message: 'partnerId ou partnerEmail requis.' });
    }

    if (partnerEmail) {
      partner = await User.findOne({ email: partnerEmail.toLowerCase() });
      if (!partner) {
        return res.status(404).json({ message: 'Aucun utilisateur trouvé avec cet email.' });
      }
    }

    if (partnerId) {
      partner = await User.findById(partnerId);
      if (!partner) {
        return res.status(404).json({ message: 'Aucun utilisateur trouvé avec cet identifiant.' });
      }
    }

    if (partner._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: 'Impossible de démarrer une conversation avec vous-même.' });
    }

    const existing = await Conversation.findOne({
      participants: { $all: [req.user._id, partner._id], $size: 2 },
    });

    if (existing) {
      return res.json({ conversationId: existing._id });
    }

    const conversation = await Conversation.create({
      participants: [req.user._id, partner._id],
      lastMessage: '',
    });

    res.status(201).json({ conversationId: conversation._id });
  } catch (error) {
    next(error);
  }
};

exports.getConversationMessages = async (req, res, next) => {
  try {
    const { conversationId } = req.params;
    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
      return res.status(404).json({ message: 'Conversation introuvable.' });
    }

    if (!conversation.participants.some((id) => id.toString() === req.user._id.toString())) {
      return res.status(403).json({ message: 'Accès refusé à cette conversation.' });
    }

    const messages = await Message.find({ conversationId })
      .sort({ createdAt: 1 })
      .populate('sender', 'nom email role');

    res.json({ messages: messages.map((message) => ({
      id: message._id,
      sender: {
        id: message.sender._id,
        nom: message.sender.nom,
        email: message.sender.email,
        role: message.sender.role,
      },
      text: message.text,
      createdAt: message.createdAt,
    })) });
  } catch (error) {
    next(error);
  }
};

exports.sendMessage = async (req, res, next) => {
  try {
    const { conversationId } = req.params;
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ message: 'Le message ne peut pas être vide.' });
    }

    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ message: 'Conversation introuvable.' });
    }

    if (!conversation.participants.some((id) => id.toString() === req.user._id.toString())) {
      return res.status(403).json({ message: 'Accès refusé à cette conversation.' });
    }

    const message = await Message.create({
      conversationId,
      sender: req.user._id,
      text: text.trim(),
    });

    conversation.lastMessage = text.trim();
    conversation.updatedAt = new Date();
    await conversation.save();

    await message.populate('sender', 'nom email role');

    res.status(201).json({
      id: message._id,
      sender: {
        id: message.sender._id,
        nom: message.sender.nom,
        email: message.sender.email,
        role: message.sender.role,
      },
      text: message.text,
      createdAt: message.createdAt,
    });
  } catch (error) {
    next(error);
  }
};
