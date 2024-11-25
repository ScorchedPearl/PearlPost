import express from "express";
import http from "http";
import { WebSocketServer } from "ws";

const app = express();
const port = 8800;

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", (message) => {
    console.log(`Received message => ${message}`);
    ws.send(`hello ji u sent ${message}`);
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });

  ws.on("error", (error) => {
    console.error(`WebSocket error: ${error}`);
  });
});

server.listen(port, () => {
  console.log(`Server started on wss://localhost:${port}`);
});