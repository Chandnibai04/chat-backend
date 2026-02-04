import { Server } from "socket.io";
import Message from "../models/Message.js";

const onlineUsers = new Map(); // userId => [socketIds]

export const initSockets = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL || "*", // allow all origins for now
      methods: ["GET", "POST"],
      credentials: true,
    },
    pingInterval: 25000,
    pingTimeout: 60000,
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join", (userId) => {
      if (!onlineUsers.has(userId)) onlineUsers.set(userId, []);
      onlineUsers.get(userId).push(socket.id);

      io.emit("onlineUsers", Array.from(onlineUsers.keys()));
    });

    socket.on("sendMessage", async ({ sender, receiver, content }) => {
      try {
        const message = await Message.create({ sender, receiver, content });

        (onlineUsers.get(receiver) || []).forEach((id) =>
          io.to(id).emit("receiveMessage", message)
        );

        (onlineUsers.get(sender) || []).forEach((id) =>
          io.to(id).emit("messageSent", message)
        );
      } catch (err) {
        console.error("Error sending message:", err);
      }
    });

    socket.on("disconnect", () => {
      for (const [userId, sockets] of onlineUsers.entries()) {
        const filtered = sockets.filter((id) => id !== socket.id);
        if (filtered.length > 0) onlineUsers.set(userId, filtered);
        else onlineUsers.delete(userId);
      }
      io.emit("onlineUsers", Array.from(onlineUsers.keys()));
    });
  });
};
