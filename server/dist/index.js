"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
const readline_1 = __importDefault(require("readline"));
const rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "> ",
});
const clients = [];
const wss = new ws_1.default.Server({ port: 8000 });
let socket;
wss.on("connection", (ws) => {
    console.log("A new client connected!");
    rl.prompt();
    clients.push(ws);
    ws.send("Hello from server!");
    ws.on("message", (msg) => {
        console.log(`Client : ${msg}`);
        rl.prompt();
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
        clients.forEach((client) => {
            if (client.readyState == ws_1.default.OPEN) {
                client.send(msg);
            }
        });
        // console.log(`Server : ${msg}`);
    }
    rl.prompt();
});
