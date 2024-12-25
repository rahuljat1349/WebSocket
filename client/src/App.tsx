import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [inputMessage, setInputMessage] = useState();
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const ws = new WebSocket("http://localhost:8000");

    ws.onopen = () => {
      setMessages((prev) => [...prev, "Connected to websocket server"]);
    };

    ws.onmessage = (event) => {
      setMessages((prev) => [...prev, `server : ${event.data}`]);
    };
    ws.onclose = () => {
      setMessages((prev) => [...prev, "Disconnected to websocket server"]);
    };
    ws.onerror = () => {
      setMessages((prev) => [...prev, "websocket error occured!"]);
    };
    setSocket(ws);
  }, []);

  const sendMessage = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(inputMessage);
      setMessages((prev) => [...prev, `you : ${inputMessage}`]);
      setInputMessage("");
    }
  };
  return (
    <>
      <div>
        {messages.length > 0
          ? messages.map((msg) => <p>{msg}</p>)
          : "No messages"}
      </div>
      <div>
        <input
          placeholder="Type a message"
          value={inputMessage}
          onChange={(e) => {
            setInputMessage(e.target.value);
          }}
          type="text"
        />
      </div>
      <div>
        <br />
        <button
          disabled={inputMessage == ""}
          onClick={() => {
            sendMessage();
          }}
        >
          Send
        </button>
      </div>
    </>
  );
}

export default App;
