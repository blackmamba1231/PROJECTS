const express = require('express');
const { NlpManager } = require('node-nlp');
const axios = require('axios'); // For interacting with ticket API

const router = express.Router();
const manager = new NlpManager({ languages: ['en'] });

// Example training data
manager.addDocument('en', 'I want to book a ticket', 'ticket.booking');
manager.addDocument('en', 'I need help with booking', 'ticket.help');
manager.addAnswer('en', 'ticket.booking', 'Sure, I can help with booking your ticket.');
manager.addAnswer('en', 'ticket.help', 'What kind of help do you need with booking?');

(async () => {
  await manager.train();
  manager.save();
})();

router.post('/chat', async (req, res) => {
  const { message } = req.body;
  const response = await manager.process('en', message);
  
  if (response.intent === 'ticket.booking') {
    // Forward the request to the ticket booking endpoint
    try {
      const bookingResponse = await axios.post('http://localhost:3000/api/v1/ticket/create', {
        visitorName: 'John Doe', // Example placeholder, replace with actual data from the user
        visitDate: '2024-12-31', // Example placeholder, replace with actual data from the user
        ticketType: 'standard', // Example placeholder, replace with actual data from the user
        quantity: 1, // Example placeholder, replace with actual data from the user
        eventType: 'regular' // Example placeholder, replace with actual data from the user
      });
      res.json({
        intent: response.intent,
        answer: `Your ticket has been booked successfully. ${bookingResponse.data.message}`
      });
    } catch (error) {
      res.json({
        intent: response.intent,
        answer: 'There was an error while booking your ticket. Please try again later.'
      });
    }
  } else {
    res.json({
      intent: response.intent,
      answer: response.answer || 'I am not sure how to help with that.'
    });
  }
});


module.exports = router;
