const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    motDePasseHash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['client', 'promoteur', 'admin'],
      default: 'client',
    },
    emailVerifie: {
      type: Boolean,
      default: false,
    },
    codeVerification: {
      type: String,
    },
    codeVerificationExpire: {
      type: Date,
    },
    resendVerificationCount: {
      type: Number,
      default: 0,
    },
    typeCompte: {
      type: String,
      enum: ['particulier', 'entreprise', 'professionnel'],
      default: 'particulier',
    },
    nomEntreprise: {
      type: String,
    },
    numeroRC: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
