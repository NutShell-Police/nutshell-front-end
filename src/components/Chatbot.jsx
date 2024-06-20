import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, Fab } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import CustomChatIcon from '/chatbot.png';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);

  const apiKey = import.meta.env.VITE_REACT_APP_GOOGLE_API_KEY;

  const keywords = [
    'accident', 'collision', 'crash', 'incident', 'injury', 'fatal', 'damage',
    'traffic', 'road safety', 'precautions', 'remedies', 'help', 'aid', 'first aid',
    'emergency', 'assistance'
  ];

  const greetings = ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'];

  const isProjectRelated = (input) => {
    const lowerInput = input.toLowerCase();
    return keywords.some((keyword) => lowerInput.includes(keyword));
  };

  const isGreeting = (input) => {
    const lowerInput = input.toLowerCase();
    return greetings.some((greeting) => lowerInput.includes(greeting));
  };

  const generatePrompt = (input) => {
    if (isGreeting(input)) {
      return "The user has greeted you. Respond with a polite greeting and ask how you can assist them with traffic safety or emergency information.";
    }
    if (isProjectRelated(input)) {
      return `The user is asking about traffic-related information. Respond with detailed and helpful information about the topic: "${input}". Include practical advice, safety tips, and any necessary emergency procedures.`;
    }
    return "The user has asked an unrelated question. Politely inform them that you can only assist with traffic safety, incidents, and emergency information.";
  };

  const handleSendMessage = async () => {
    if (userInput.trim() === '') return;

    const newMessage = { sender: 'user', text: userInput };
    setMessages([...messages, newMessage]);
    setUserInput('');
    setLoading(true);

    try {
      const prompt = generatePrompt(userInput);

      const requestBody = {
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ]
      };

      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data?.candidates && response.data.candidates.length > 0) {
        const generatedContent = response.data.candidates[0].content.parts[0].text;
        const bulletPoints = generatedContent
          .split('\n')
          .filter(line => line.trim() !== '')
          .map(line => line.replace(/[*#]/g, '').trim());
        const botMessage = { sender: 'bot', text: bulletPoints };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } else {
        throw new Error('Invalid response structure from API');
      }
    } catch (error) {
      console.error('Error fetching chatbot response:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: ['Sorry, something went wrong.'] },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Fab
        aria-label="chat"
        onClick={() => setIsOpen(!isOpen)}
        sx={{ 
          position: 'fixed', 
          bottom: 16, 
          right: 16, 
          zIndex: 1500 
        }}
      >
        {isOpen ? <CloseIcon /> : <img src={CustomChatIcon} alt="Chat Icon" style={{ width: '32px', height: '32px' }} />}
      </Fab>
      {isOpen && (
        <Paper elevation={3} sx={{ 
          p: 2, 
          maxWidth: 400, 
          position: 'fixed', 
          bottom: 80, 
          right: 16, 
          zIndex: 1400,
          borderRadius: 4 // Increased border radius
        }}>
          <Typography variant="h6" align='center'>AI Traffic Police</Typography>
          <Box sx={{ maxHeight: 300, overflowY: 'auto', my: 2 }}>
            {messages.map((message, index) => (
              <Box key={index} sx={{ mb: 1 }}>
                {message.sender === 'user' ? (
                  <Typography
                    align="right"
                    sx={{
                      bgcolor: 'primary.light',
                      color: 'primary.contrastText',
                      p: 1,
                      borderRadius: 4, // Increased border radius
                      display: 'inline-block',
                    }}
                  >
                    {message.text}
                  </Typography>
                ) : (
                  <Box sx={{ ml: 2 }}>
                    {message.text.map((line, idx) => (
                      <Typography
                        key={idx}
                        sx={{
                          bgcolor: 'grey.200',
                          color: 'text.primary',
                          p: 1,
                          borderRadius: 4, // Increased border radius
                          mb: 0.5,
                        }}
                        component="li"
                      >
                        {line}
                      </Typography>
                    ))}
                  </Box>
                )}
              </Box>
            ))}
          </Box>
          <TextField
            fullWidth
            variant="outlined"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
            disabled={loading}
            placeholder="Type your message"
            sx={{ borderRadius: 4 }} // Increased border radius
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSendMessage}
            disabled={loading}
            sx={{ mt: 2, borderRadius: 4 }} // Increased border radius
          >
            {loading ? 'Sending...' : 'Send'}
          </Button>
        </Paper>
      )}
    </>
  );
};

export default Chatbot;
