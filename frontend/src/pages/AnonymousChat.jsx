import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { FaPaperPlane, FaSmile } from "react-icons/fa";
import "../styles/AnonymousChat.css";

function AnonymousChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [nickname, setNickname] = useState("");
  const [connected, setConnected] = useState(false);
  const [socket, setSocket] = useState(null);
  const [showEmojis, setShowEmojis] = useState(false);
  const [showWarning, setShowWarning] = useState(true); // 🚨 Warning state

  const cartoonAvatars = [
    "https://api.dicebear.com/7.x/bottts/svg?seed=partner1",
    "https://api.dicebear.com/7.x/bottts/svg?seed=partner2",
    "https://api.dicebear.com/7.x/bottts/svg?seed=partner3",
  ];
  const partnerAvatar = cartoonAvatars[Math.floor(Math.random() * cartoonAvatars.length)];

  useEffect(() => {
    const newSocket = io("http://localhost:5000", { transports: ["websocket", "polling"] });
    setSocket(newSocket);

    newSocket.on("chat-started", ({ nickname }) => {
      setNickname(nickname);
      setConnected(true);
      setMessages([{ sender: "system", text: `You are now connected as ${nickname}` }]);
    });

    newSocket.on("receive-message", (msg) =>
      setMessages((prev) => [...prev, { sender: msg.sender, text: msg.text }])
    );

    newSocket.on("partner-disconnected", () => {
      setMessages((prev) => [...prev, { sender: "system", text: "Your partner disconnected." }]);
      setConnected(false);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (input.trim() === "" || !socket) return;
    socket.emit("send-message", input);
    setMessages((prev) => [...prev, { sender: "me", text: input }]);
    setInput("");
  };

  const addEmoji = (emoji) => {
    setInput((prev) => prev + emoji);
    setShowEmojis(false);
  };

  const reportPartner = () => {
    if (!socket) return;
    socket.emit("report-partner");
    setMessages((prev) => [...prev, { sender: "system", text: "Partner reported." }]);
  };

  return (
    <div className="chat-container">
      {/* 🚨 Friendly Warning Card */}
      {showWarning && (
        <div className="warning-overlay">
          <div className="warning-card">
            <h3>🚦 Friendly Reminder</h3>
            <p>
              Please <b>avoid using profanity</b> or offensive language.  
              If your partner uses it, kindly <b>report</b> them using the 🚩 button.
            </p>
            <button onClick={() => setShowWarning(false)} className="agree-btn">
              I Agree 👍
            </button>
          </div>
        </div>
      )}

      <div className="chat-header">
        <h2>Anonymous Chat</h2>
        {connected && <span className="nickname">You: {nickname}</span>}
      </div>

      <div className="chat-messages">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`message-row ${
              m.sender === "me" ? "me-row" : m.sender === "system" ? "system-row" : "partner-row"
            }`}
          >
            {m.sender !== "me" && m.sender !== "system" && (
              <img src={partnerAvatar} alt="partner avatar" className="avatar" />
            )}
            <div
              className={`message-bubble ${
                m.sender === "me" ? "me" : m.sender === "system" ? "system" : "partner"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>

      {connected ? (
        <div className="chat-input">
          <button className="emoji-btn" onClick={() => setShowEmojis(!showEmojis)}>
            <FaSmile />
          </button>
          {showEmojis && (
            <div className="emoji-picker">
              {["😀", "😂", "😍", "😎", "🥳", "😢", "🔥", "👍"].map((emoji) => (
                <span key={emoji} onClick={() => addEmoji(emoji)}>
                  {emoji}
                </span>
              ))}
            </div>
          )}
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage} className="send-btn">
            <FaPaperPlane />
          </button>
          <button onClick={reportPartner} className="report-btn">
            🚩
          </button>
        </div>
      ) : (
        <p className="waiting-text">Waiting for a partner...</p>
      )}
    </div>
  );
}

export default AnonymousChat;
