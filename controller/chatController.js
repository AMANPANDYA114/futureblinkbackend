const Chat = require('../models/chatModel');


exports.askAI = async (req, res) => {
  try {
    const { prompt } = req.body;

    const apiResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await apiResponse.json();

    const aiText = data?.choices?.[0]?.message?.content;

    if (!aiText) {
      return res.status(500).json({
        error: "AI response failed",
        details: data
      });
    }

    //  ONLY RETURN RESPONSE (NO SAVE)
    res.json({
      response: aiText
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
//  Save API
exports.saveChat = async (req, res) => {
  try {
    const { prompt, response } = req.body;

    const saved = await Chat.create({ prompt, response });

    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// additonal api to fetch all prompt as history



exports.getAllPrompts = async (req, res) => {
  try {
    
    const chats = await Chat.find({}, { prompt: 1, _id: 0 })
      .sort({ createdAt: -1 }); 

    res.json(chats);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch prompts" });
  }
};
