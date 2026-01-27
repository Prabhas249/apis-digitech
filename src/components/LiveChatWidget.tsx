'use client';

import { useState } from 'react';

export default function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  return (
    <>
      {/* Chat Button */}
      <button
        className="chat-widget-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-widget-window">
          <div className="chat-widget-header">
            <div className="chat-widget-avatar">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <div className="chat-widget-info">
              <span className="chat-widget-name">Apis Digitech Support</span>
              <span className="chat-widget-status">
                <span className="status-dot"></span>
                We typically reply within an hour
              </span>
            </div>
          </div>
          <div className="chat-widget-body">
            <div className="chat-widget-message chat-widget-message--received">
              <p>Hi there! How can we help you today?</p>
              <span className="chat-widget-time">Just now</span>
            </div>
          </div>
          <form className="chat-widget-form" onSubmit={(e) => { e.preventDefault(); setMessage(''); }}>
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              aria-label="Chat message"
            />
            <button type="submit" aria-label="Send message">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
