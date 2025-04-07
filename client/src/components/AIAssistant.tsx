import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{type: 'user' | 'assistant', content: string}[]>([
    { type: 'assistant', content: 'Hi there! I am Test Genie, your AI assistant. How can I help you with your quizzes today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages appear
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle document click to close assistant if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatWindowRef.current && !chatWindowRef.current.contains(event.target as Node) && isOpen) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage = { type: 'user' as const, content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Simulate typing indicator
    setIsTyping(true);
    
    // Simulate API delay
    setTimeout(() => {
      // Add AI response based on user input
      let response = '';
      
      const lowercasedInput = input.toLowerCase();
      
      if (lowercasedInput.includes('hello') || lowercasedInput.includes('hi')) {
        response = 'Hello! How can I assist you with your quizzes today?';
      } else if (lowercasedInput.includes('create') && lowercasedInput.includes('quiz')) {
        response = 'To create a quiz, go to the Dashboard and click on "Create New Quiz". You can then add questions, options, and set the correct answers.';
      } else if (lowercasedInput.includes('edit') && lowercasedInput.includes('quiz')) {
        response = 'You can edit your quizzes by going to the Dashboard, finding the quiz you want to modify, and clicking on the Edit button.';
      } else if (lowercasedInput.includes('delete') && lowercasedInput.includes('quiz')) {
        response = 'To delete a quiz, navigate to your Dashboard, find the quiz you want to remove, and click on the Delete option.';
      } else if (lowercasedInput.includes('score') || lowercasedInput.includes('result')) {
        response = 'Your quiz results can be found on the Dashboard. Each completed quiz will show your score and you can click to see detailed results.';
      } else if (lowercasedInput.includes('thank')) {
        response = "You're welcome! If you have any other questions, feel free to ask.";
      } else {
        response = "I'm not sure I understand your question. Could you please rephrase it or ask something about creating, editing, or taking quizzes?";
      }
      
      setMessages(prev => [...prev, { type: 'assistant', content: response }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* Assistant Toggle Button */}
      <motion.button
        className="fixed bottom-6 right-6 bg-primary-600 text-white w-14 h-14 rounded-full shadow-soft flex items-center justify-center z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close AI Assistant" : "Open AI Assistant"}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 01-.659 1.591L9.5 14.5m3.25-11.396c.251.023.501.05.75.082m-1.5-.082a24.301 24.301 0 00-4.5 0m0 0v5.714a2.25 2.25 0 01-.659 1.591L3.5 14.5m6-10.396V3.104m0 0a24.301 24.301 0 00-4.5 0m0 5.714V3.104m0 0c6.75.166 13.25.166 20 0v10.886M9.75 3.104a24.301 24.301 0 00-4.5 0m12.75 0a24.301 24.301 0 00-4.5 0m0 0v5.714a2.25 2.25 0 01-.659 1.591L9.5 14.5m3.25-11.396c.251.023.501.05.75.082m0 0a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 01-.659 1.591L13.5 14.5m0 0l-3.75 3.75m0 0l-1.5-1.5L5 21l-1.5-1.5L9.5 14.5" />
          </svg>
        )}
      </motion.button>

      {/* Assistant Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            ref={chatWindowRef}
            className="fixed bottom-24 right-6 w-full max-w-sm bg-white rounded-xl shadow-lg overflow-hidden z-50 border border-neutral-200"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Header */}
            <div className="bg-primary-600 p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0 mr-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 01-.659 1.591L9.5 14.5m3.25-11.396c.251.023.501.05.75.082m-1.5-.082a24.301 24.301 0 00-4.5 0m0 0v5.714a2.25 2.25 0 01-.659 1.591L3.5 14.5m6-10.396V3.104m0 0a24.301 24.301 0 00-4.5 0m0 5.714V3.104m0 0c6.75.166 13.25.166 20 0v10.886M9.75 3.104a24.301 24.301 0 00-4.5 0m12.75 0a24.301 24.301 0 00-4.5 0m0 0v5.714a2.25 2.25 0 01-.659 1.591L9.5 14.5m3.25-11.396c.251.023.501.05.75.082m0 0a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 01-.659 1.591L13.5 14.5m0 0l-3.75 3.75m0 0l-1.5-1.5L5 21l-1.5-1.5L9.5 14.5" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">Test Genie</h3>
                  <p className="text-primary-200 text-sm">Your quiz assistant</p>
                </div>
              </div>
            </div>
            
            {/* Chat Messages */}
            <div className="h-80 overflow-y-auto p-4 bg-neutral-50">
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[85%] rounded-2xl px-4 py-2 ${
                        msg.type === 'user' 
                          ? 'bg-primary-600 text-white rounded-tr-none' 
                          : 'bg-white shadow-soft text-neutral-800 rounded-tl-none'
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white shadow-soft rounded-2xl px-4 py-3 rounded-tl-none">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 rounded-full bg-primary-400 animate-pulse"></div>
                        <div className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </div>
            
            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="border-t border-neutral-200 p-3">
              <div className="flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 text-sm border-0 focus:ring-0 focus:outline-none bg-transparent"
                  aria-label="Type your message"
                />
                <motion.button
                  type="submit"
                  className="ml-2 bg-primary-600 text-white p-2 rounded-full flex-shrink-0"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  disabled={input.trim() === ''}
                  aria-label="Send message"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                  </svg>
                </motion.button>
    </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant; 