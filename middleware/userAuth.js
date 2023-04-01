import chalk from "chalk";
import jwt from "jsonwebtoken";
import User from "../models/user/auth.js";

export const userAuthenticated = async (req, res, next) => {
  try {
    if (!req.headers.authorization)
      return res.status(404).json({ message: "Not authorized" });
    const token = req.headers.authorization.split(" ")[1];
    let decodedData;
    if (token) decodedData = jwt.verify(token, process.env.JWT_TOKEN);
    const user = await User.findOne({ _id: decodedData.id });
    if (!user) throw Error();
    req.user = user._id;
    next();
  } catch (error) {
    console.log(chalk.white.bgRedBright("Authentication Error"));
    return res.status(404).json({ message: "invalid token" });
  }
};
