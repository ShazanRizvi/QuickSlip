const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const signUp = async (email, password) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  const token = jwt.sign(
    { userId: newUser.id, email: newUser.email },
    JWT_SECRET,
    { expiresIn: "1h" }
  );
  return { token };
};

const signIn = async (email, password) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "1h",
  });
  return { token };
};
module.exports = { signUp, signIn };