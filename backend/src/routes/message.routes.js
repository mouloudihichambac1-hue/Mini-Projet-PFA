const express = require('express');
const {
  getConversations,
  createConversation,
  getConversationMessages,
  sendMessage,
} = require('../controllers/message.controller');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(authMiddleware);
router.get('/conversations', getConversations);
router.post('/conversations', createConversation);
router.get('/conversations/:conversationId/messages', getConversationMessages);
router.post('/conversations/:conversationId/messages', sendMessage);

module.exports = router;
