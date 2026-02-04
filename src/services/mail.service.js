import { transporter } from "../utils/email.js"; // path must match

export const sendResetEmail = async (to, resetUrl) => {
  const mailOptions = {
    from: `"chat-application" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Password Reset Request",
    html: `
      <h2>Password Reset</h2>
      <p>Click the link below to reset your password (valid for 15 minutes):</p>
      <a href="${resetUrl}" target="_blank">${resetUrl}</a>
    `,
  };

  return transporter.sendMail(mailOptions);
};
