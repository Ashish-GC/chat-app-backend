

import { socketHandler } from './services/server-socket/socketHandler.js';
import dotenv from 'dotenv';
import express from "express"
import http from "http"

dotenv.config();

const app = express();
const hostname = process.env.HOST_NAME;
const port = process.env.PORT || 8000;

app.use((req,res,next)=>{
      // Set CORS headers
      res.setHeader('Access-Control-Allow-Origin', process.env.SOCKET_URL || '*');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  next();
})
app.get('/', (req, res) => {
  res.send('socket request handled here');
});

  const httpServer = http.createServer(app);

  socketHandler(httpServer);

  httpServer
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });

