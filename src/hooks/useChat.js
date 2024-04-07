import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const useChat = (currentUser, chatId) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const socket = io('ws://localhost:3000');
    socket.join(chatId);

    socket.on('message', (message) => {
      setMessages([...messages, message]);
    });

    return () => socket.disconnect();
  }, [chatId]);

  const sendMessage = (message) => {
    socket.emit('message', { sender: currentUser, content: message });
  };

  return { messages, sendMessage };
};

export default useChat;
