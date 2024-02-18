import express from 'express';
import cors from 'cors';
import WebSocket from 'ws';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8080;

const server = app.listen(port, () => {
    console.log('Started on running on: ', port);
});

const wss = new WebSocket.Server({ noServer: true, path: '/chat' });

server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
    });
});

wss.on('connection', (ws: WebSocket) => {
    console.log('New client connected');

    ws.on('message', (message: string) => {
        console.log('Received: ', message);
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});
