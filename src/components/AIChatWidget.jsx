import { useState } from "react";
import API_BASE_URL from "../config/api";

const AIChatWidget = ({ productId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState("");

  const handleAskAI = async () => {
    if (!question.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/ai/product/${productId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question, productId }),
          credentials: 'include'
        }
      );
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { message: question, role: "user" },
        {
          message: data?.data?.aiResponse || "No response from AI.",
          role: "ai",
        },
      ]);
      setQuestion("");
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { message: question, role: "user" },
        { message: "Error reaching AI service.", role: "ai" },
      ]);
    }
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-yellow-400 hover:bg-yellow-500 px-4 py-3 rounded-full shadow-lg flex items-center gap-2 transition cursor-pointer"
        >
          💬 Ask AI
        </button>
      )}

      {/* Chat Box */}
      {isOpen && (
        <div className="w-80 h-96 bg-gray-100  border border-gray-300  rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center px-4 py-2 bg-gray-600 text-white">
            <span className="font-semibold">AI Product Assistant</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 cursor-pointer"
            >
              ✖
            </button>
          </div>

          {/* Chat Body */}
          <div className="flex-1 p-3 overflow-y-auto text-sm space-y-3">
            {messages.length ? (
              <div className=" rounded-lg whitespace-pre-line">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={` ${
                      msg.role === "user"
                        ? "text-right rounded-md p-2 my-2"
                        : "text-left p-2 bg-white rounded-md"
                    }`}
                  >
                    <span
                      className={`${
                        msg.role === "user"
                          ? " bg-gray-200 p-2 rounded-md"
                          : " bg-white "
                      }`}
                    >
                      {msg.message}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center mt-4">
                Ask a question about this product
              </p>
            )}
          </div>

          {/* Input Box */}
          <div className="border-t border-gray-400 p-2 flex">
            <input
              type="text"
              placeholder="Ask something..."
              className="flex-1 px-3 py-2  rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-200 "
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAskAI()}
            />
            <button
              onClick={handleAskAI}
              disabled={loading}
              className="ml-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm transition cursor-pointer flex justify-center items-center"
            >
              {loading ? (
                <p className="animate-pulse text-sm font-bold">...</p>
              ) : (
                "Send"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIChatWidget;
