import { registerUser, loginUser } from "../service/auth.service.js";

export const authController = {
  async register(req, res) {
    try {
      const { username, email, password } = req.body;
      const { user, token } = await registerUser({ username, email, password });

      res.status(201).json({
        success: true,
        message: `Welcome ${user.username}!`,
        user,
        token,
      });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const { user, token } = await loginUser(email, password);

      res.status(200).json({ success: true, user, token });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },
};
