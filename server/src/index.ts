import WebSocket from "ws";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "> ",
});

const clients: any = [];

const wss = new WebSocket.Server({ port: 8000 });

let socket;
wss.on("connection", (ws) => {
  console.log("A new client connected!");
  rl.prompt()
  clients.push(ws);
  ws.send("Hello from server!");
  
  ws.on("message", (msg) => {
      console.log(`Client : ${msg}`);
      rl.prompt()
    });
  ws.on("close", () => {
    console.log("A client disconnected!");
  });
  ws.on("error", (err) => {
    console.log("WebSocket Error : ", err);
  });
});

console.log("WebSocket server is running at port 8000..");

rl.prompt();
rl.on("line", (line) => {
  const msg = line.trim();
  if (msg) {
    clients.forEach((client: any) => {
      if (client.readyState == WebSocket.OPEN) {
        client.send(msg);
      }
    });
    // console.log(`Server : ${msg}`);
  }
    rl.prompt();
});
