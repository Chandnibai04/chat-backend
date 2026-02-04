const { io } = require("socket.io-client");

// Replace with logged-in user ID from your DB
const userId = "6953b0fe6f30fac70dc69fbc"; 
const receiverId = "6953b0fe6f30fac70dc69fbf";

const socket = io("http://localhost:5000");

// Join after login
socket.emit("join", userId);
console.log("Joined with userId:", userId);

// Listen for online users
socket.on("onlineUsers", (users) => {
  console.log("Online users:", users);
});

// Listen for incoming messages
socket.on("receiveMessage", (message) => {
  console.log("New message received:", message);
});

// Send a test message after 3 seconds
setTimeout(() => {
  const text = "Hello from Node test!";
  socket.emit("sendMessage", {
    sender: userId,
    receiver: receiverId,
    text,
  });
  console.log("Message sent:", text);
}, 3000);
