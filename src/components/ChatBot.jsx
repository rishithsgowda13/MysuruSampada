import { useState } from "react";

/* ===============================
   GEMINI AI FUNCTION
================================ */
async function askGemini(prompt) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    }
  );

  const data = await response.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text;
}

/* ===============================
   FALLBACK ANSWERS
================================ */
function fallbackAnswer(question) {
  const q = question.toLowerCase();

  if (q.includes("hidden")) {
    return "Some hidden gems in Mysuru include Kukkarahalli Lake early morning, Lingambudhi Lake, Suttur village, and the old railway museum area.";
  }

  if (q.includes("food")) {
    return "You can try Vinayaka Mylari for dosas, RRR for meals, and Hotel Hanumanthu for authentic non-veg food.";
  }

  if (q.includes("park") || q.includes("lake") || q.includes("nature")) {
    return "Popular parks and nature spots in Mysuru include Karanji Lake Park, Brindavan Gardens, Kukkarahalli Lake, and Lingambudhi Lake.";
  }

  if (q.includes("trip") || q.includes("plan")) {
    return "A good Mysuru trip includes Mysore Palace, Chamundi Hills, Karanji Lake, and a day trip to Srirangapatna.";
  }

  return "I’m your Mysuru guide 🤖. Ask me about hidden places, parks, food spots, or trip planning!";
}

/* ===============================
   CHATBOT COMPONENT
================================ */
export default function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { from: "user", text: input }]);
    setLoading(true);

    try {
      const aiReply = await askGemini(
        `You are a friendly Mysuru tourism guide.
User: ${input}
Reply clearly and briefly.`
      );

      if (aiReply) {
        setMessages((prev) => [
          ...prev,
          { from: "bot", text: aiReply },
        ]);
      } else {
        throw new Error("Empty Gemini response");
      }

    } catch (err) {
      // Gemini failed → fallback
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: fallbackAnswer(input) },
      ]);
    } finally {
      setInput("");
      setLoading(false);
    }
  }

  return (
    <div className="chatbox">
      <h3>Mysuru Guide 🤖</h3>

      <div className="messages">
        {messages.map((m, i) => (
          <div key={i} className={m.from}>{m.text}</div>
        ))}
        {loading && <div className="bot">Typing...</div>}
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask about hidden places in Mysuru"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
