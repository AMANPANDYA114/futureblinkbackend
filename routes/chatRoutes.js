const express = require('express');
const router = express.Router();

const { askAI, saveChat ,getAllPrompts } = require('../controller/chatController.js');

// routes
router.post('/ask-ai', askAI);
router.post('/save', saveChat);
router.get('/history', getAllPrompts);
module.exports = router; 