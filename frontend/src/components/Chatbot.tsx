import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { useLanguage } from '../context/LanguageContext';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Hello! I am the Niya Studio AI assistant. How can I help you today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { lang } = useLanguage();

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Update welcome message when language changes
  useEffect(() => {
    setMessages(prev => {
      const welcomeMsg = prev.find(m => m.id === 'welcome');
      if (welcomeMsg && prev.length === 1) {
        return [{
          ...welcomeMsg,
          content: lang === 'fr' 
            ? "Bonjour ! Je suis l'assistant IA de Niya Studio. Comment puis-je vous aider aujourd'hui ?" 
            : "Hello! I am the Niya Studio AI assistant. How can I help you today?"
        }];
      }
      return prev;
    });
  }, [lang]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Create chat history format for the API
      const chatHistory = [...messages, userMessage].map(msg => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: chatHistory })
      });

      if (!res.ok) throw new Error('Failed to fetch response');
      const data = await res.json();

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message || "Sorry, I couldn't process that."
      }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: lang === 'fr' 
          ? "Désolé, j'ai rencontré une erreur. Veuillez réessayer plus tard." 
          : "Sorry, I encountered an error. Please try again later."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[350px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-8rem)] rounded-2xl bg-[#050505]/95 backdrop-blur-xl border border-[#ffffff]/10 shadow-2xl flex flex-col overflow-hidden text-[#ffffff]"
          >
            {/* Header */}
            <div className="p-4 border-b border-[#ffffff]/10 bg-brand-purple/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-purple flex items-center justify-center text-[#ffffff]">
                  <Bot size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#ffffff]">Niya Assistant</h3>
                  <p className="text-xs text-[#ffffff]/50">AI Powered</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full transition-colors hover:bg-[#ffffff]/10 text-[#ffffff]/70 hover:text-[#ffffff]"
              >
                <X size={18} />
              </button>
            </div>

            <div 
              className="flex-1 overflow-y-auto overscroll-contain p-4 flex flex-col gap-4"
              data-lenis-prevent="true"
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
            >
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={cn(
                    "flex gap-3 max-w-[85%]",
                    msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                    msg.role === 'user' 
                      ? "bg-[#ffffff]/10 text-[#ffffff]" 
                      : "bg-brand-purple/20 text-brand-purple"
                  )}>
                    {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                  </div>
                  <div className={cn(
                    "p-3 rounded-2xl text-sm leading-relaxed",
                    msg.role === 'user' 
                      ? "bg-brand-purple text-[#ffffff] rounded-tr-sm" 
                      : "border rounded-tl-sm bg-[#ffffff]/5 border-[#ffffff]/10 text-[#ffffff]/90"
                  )}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 max-w-[85%]">
                  <div className="w-8 h-8 rounded-full bg-brand-purple/20 text-brand-purple flex items-center justify-center shrink-0">
                    <Bot size={14} />
                  </div>
                  <div className="p-4 rounded-2xl border rounded-tl-sm flex items-center gap-2 bg-[#ffffff]/5 border-[#ffffff]/10">
                    <Loader2 size={16} className="text-brand-purple animate-spin" />
                    <span className="text-xs text-[#ffffff]/50">Thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-[#ffffff]/10 bg-black/20">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={lang === 'fr' ? "Posez votre question..." : "Ask a question..."}
                  className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:border-brand-purple/50 transition-colors bg-[#ffffff]/5 border-[#ffffff]/10 text-[#ffffff] placeholder:text-[#ffffff]/30"
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="w-10 h-10 rounded-full bg-brand-purple flex items-center justify-center text-[#ffffff] shrink-0 hover:bg-brand-purple/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={16} className="ml-[-2px]" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-brand-purple text-[#ffffff] shadow-lg flex items-center justify-center hover:shadow-brand-purple/25 hover:shadow-2xl transition-shadow"
      >
        <MessageCircle size={24} />
      </motion.button>
    </>
  );
}
