const authService = require('../services/authService');

const signUp = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.signUp(email, password);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.signIn(email, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signUp, signIn };
