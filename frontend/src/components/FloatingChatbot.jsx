import React, { useState, useRef, useEffect } from 'react';
import { getAllProducts } from '../data/products';

export default function FloatingChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [productsData, setProductsData] = useState([]);

  const chatEndRef = useRef(null);

  // Load products data
  useEffect(() => {
    const products = getAllProducts();
    setProductsData(products);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, loading]);

  const openChat = () => {
    if (!open) setOpen(true);
    if (messages.length === 0) {
      setMessages([
         {
          role: 'assistant',
          content: "Hi! 👋 I'm NetVibeBD AI Assistant. How can I help you today?",
        },
      ]);
    }
  };

  const closeChat = () => {
    setOpen(false);
  };

  const systemPrompt = `
You are NetVibeBD AI Assistant — a mobile package assistant for Bangladesh telecom operators.

Guidelines:
- Keep responses short, clear, and professional.
- Use bullets when helpful.
- Only answer what the user asks.
- If you don't know, say you don't know.

About NetVibeBD:
- Company Name: NetVibeBD
- Website: www.netvibebd.com
- Focus: Mobile internet packages for Bangladesh
- Operators: Robi, Airtel, Banglalink
- Services: Package recommendations and customer support
- Market: Mobile data packages in Bangladesh
- Support: support@netvibebd.com

Available Products (${productsData.length} packages):
${productsData.map(p => `- ${p.name}: ${p.price}৳ - ${p.description}`).join('\n')}

You can help users:
- Find the best package based on their needs (data amount, minutes, price)
- Compare packages between operators
- Provide package details
- Recommend the most cost-effective option
- Answer questions about validity, activation, and features
`;

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:4242';
      
      const res = await fetch(`${backendUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            ...messages.map((m) => ({ role: m.role, content: m.content })),
            userMessage,
          ],
          systemPrompt,
        }),
      });

      const data = await res.json();

      if (data?.choices?.[0]?.message) {
        const reply = data.choices[0].message;
        setMessages((prev) => [...prev, reply]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: '⚠️ Something went wrong. Please try again.' },
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: '⚠️ Something went wrong. Please try again.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => openChat()}
        className="fixed bottom-6 right-6 z-50 bg-white border border-gray-200 shadow-xl text-gray-900 w-16 h-16 rounded-full flex items-center justify-center text-2xl hover:scale-105 transition-all hover:shadow-2xl"
        title="Chat with NetVibeBD Assistant"
      >
        💬
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 h-[430px] bg-white border border-gray-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-sm">

          {/* Header */}
          <div className="p-3 border-b bg-white text-gray-900 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="font-semibold text-lg">NetVibeBD Assistant</span>
            </div>
            <button
              onClick={closeChat}
              className="text-gray-500 hover:text-red-500 transition-colors"
              title="Close chat"
            >
              ✖
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-3 overflow-y-auto space-y-3 text-sm bg-gray-50">

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-3 rounded-xl max-w-[85%] break-words transition-all ${
                  msg.role === 'user'
                    ? 'ml-auto bg-black text-white shadow-md'
                    : 'mr-auto bg-white border border-gray-200 shadow-sm'
                }`}
              >
                {msg.content}
              </div>
            ))}

            {loading && (
              <div className="mr-auto bg-white border border-gray-200 p-2 rounded-xl text-xs text-gray-500 italic">
                Typing...
              </div>
            )}

            <div ref={chatEndRef}></div>
          </div>

          {/* Input Area */}
          <div className="p-2 border-t bg-white flex gap-2 items-center">
            <input
              className="flex-1 px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Ask about NetVibeBD..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />

            <button
              onClick={sendMessage}
              className="px-4 py-2 text-sm bg-black text-white rounded-xl shadow hover:bg-gray-800 transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}