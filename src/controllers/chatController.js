import Message from "../models/Message.js";

// SEND MESSAGE
export const sendMessage = async (req, res) => {
  try {
    const sender = req.user.id;
    const { receiver, content } = req.body;

    if (!receiver || !content) {
      return res.status(400).json({
        success: false,
        message: "Receiver and content are required",
      });
    }

    const newMessage = await Message.create({
      sender,
      receiver,
      content,
    });

    res.status(201).json({
      success: true,
      message: newMessage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to send message",
    });
  }
};

// GET MESSAGES
export const getMessages = async (req, res) => {
  const userId = req.user.id;
  const otherUserId = req.params.otherUserId;

  try {
    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: otherUserId },
        { sender: otherUserId, receiver: userId },
      ],
    }).sort({ createdAt: 1 });

    res.json({
      success: true,
      messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get messages",
    });
  }
};
