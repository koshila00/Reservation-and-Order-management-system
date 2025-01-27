import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const hashPassword = async (password: string) => {
  let salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS || "10"));
  return await bcrypt.hash(password, salt);
};

const JWT_SECRET: string = process.env.JWT_SECRET || "";
const signToken = (user: any) => {
  let maxAge = 60 * 60 * 24 * 7; // 1 week

  const tokenBody = {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
  };

  return jwt.sign(tokenBody, JWT_SECRET, {
    expiresIn: maxAge,
  });
};

const extractToken = (token: any) => {
  let tokenArray: any[] = token.split(" ");
  if (tokenArray.length !== 2) return null;
  return tokenArray[1];
};

const verifyToken = (token: any) => {
  return jwt.verify(token, JWT_SECRET);
};

const comparePassword = async (password: string, hash: string) => {
  // console.log(password + " " + hash);
  return await bcrypt.compare(password, hash);
};

export default {
  signToken,
  extractToken,
  comparePassword,
  verifyToken,
  hashPassword,
};
