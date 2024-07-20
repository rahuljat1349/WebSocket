import express from "express";
import { WebSocketServer } from "ws";

const app = express()
const httpserver = app.listen(8080,()=>{console.log("server started");
})


const wss = new WebSocketServer({server:httpserver})


wss.on("connection",(ws)=>{

    ws.on("error",console.error)

    ws.on("message",(data,isBinary)=>{
        wss.clients.forEach((client)=>{
            if (client.readyState === WebSocket.OPEN) {
                client.send(data,{binary:isBinary})
                
            }
        })
        

    })
    ws.send('Hello! Message From Server!!');
})