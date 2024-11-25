import express from "express";
import http from "http";
import { WebSocketServer } from "ws";

const app = express();
const port=5000;

const server= http.createServer(app);
const wss = new WebSocketServer({ server });

wss.on("connection", async(ws) => {
  console.log("Client connected");
  ws.on("message", (message) => {
    console.log(`Received message => ${message}`);
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
})
});
server.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
})