import { useState } from 'react';
import './AIChatBox.css';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AIChatBoxProps {
  isPlaylistMode?: boolean;
  planetName: string;
  onClose?: () => void;
}

export default function AIChatBox({ isPlaylistMode = false, planetName, ...props }: AIChatBoxProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const generatePlaylistPrompt = (planet: string) => {
    return `Generate a themed playlist of 10 songs that relate to ${planet}. Consider the planet's characteristics, atmosphere, and mythology. Format the response as a numbered list with "Artist - Song Title" for each entry.`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isPlaylistMode) {
      const prompt = generatePlaylistPrompt(planetName);
      setMessages([...messages, { role: "user", content: prompt }]);
      
      try {
        setIsLoading(true);
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [...messages, { role: "user", content: prompt }],
          }),
        });

        const data = await response.json();
        setMessages((prevMessages) => [
          ...prevMessages,
          { role: "assistant", content: data.choices[0].message.content },
        ]);
      } catch (error) {
        console.error("Error generating playlist:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      if (!input.trim()) return;

      const userMessage: Message = { role: 'user', content: input };
      setMessages(prev => [...prev, userMessage]);
      setInput('');
      setIsLoading(true);

      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [userMessage],
          }),
        });

        const data = await response.json();
        const assistantMessage: Message = {
          role: 'assistant',
          content: data.choices[0].message.content,
        };

        setMessages(prev => [...prev, assistantMessage]);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="ai-chat-box">
      <div className="messages-container">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.role === "assistant" ? "assistant" : "user"}`}
          >
            {isPlaylistMode && message.role === "assistant" ? (
              <div className="playlist-response">
                {message.content.split('\n').map((line, i) => (
                  <div key={i} className="playlist-item">{line}</div>
                ))}
              </div>
            ) : (
              message.content
            )}
          </div>
        ))}
        {isLoading && <div className="loading-indicator">Generating playlist...</div>}
      </div>
      <form onSubmit={handleSubmit} className="chat-input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="chat-input"
        />
        <button type="submit" disabled={isLoading}>Send</button>
      </form>
    </div>
  );
} 