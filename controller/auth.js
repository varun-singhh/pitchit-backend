import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userDetails from "../models/user/details.js";
import recuiterDetails from "../models/recruiter/details.js";
import user from "../models/user/auth.js";
import recruiter from "../models/recruiter/auth.js";
import { validatePassword, validateEmail } from "../utils/validations.js";

export const login = async (req, res) => {
  const { email, password, isUser } = req.body;
  try {
    const [isValid, error] = validateAuthBody({
      email,
      password,
    });
    if (!isValid) {
      return res.status(400).json({ error: error });
    }
    const existingUser = await (isUser
      ? user.findOne({ email: String(email).toUpperCase() }).select("+password")
      : recruiter
          .findOne({ email: String(email).toUpperCase() })
          .select("+password"));
    if (!existingUser)
      return res.status(404).json({
        message: isUser ? "User doesn't exist" : "Recruiter doesn't exist",
      });
    const isPassCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPassCorrect) {
      return res.status(404).json({ message: "Password didn't match" });
    }
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser.id },
      process.env.JWT_TOKEN,
      { expiresIn: "1h" }
    );
    res.status(200).json({
      message: isUser ? "user loggedin" : "recruiter loggedin",
      result: existingUser,
      token,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: `${error}` });
  }
};

export const signup = async (req, res) => {
  const {
    email,
    password,
    confirmPassword,
    firstName,
    lastName,
    isUser,
    orgName,
  } = req.body;
  try {
    const [isValid, error] = validateAuthBody({
      email,
      password,
    });
    if (!isValid) {
      return res.status(400).json({ error: error });
    }

    const existingUser =
      (await user.findOne({ email: String(email).toUpperCase() })) ||
      (await recruiter.findOne({ email: String(email).toUpperCase() }));
    if (existingUser)
      return res.status(404).json({ message: "email already exist" });
    if (password !== confirmPassword)
      return res.status(404).json({ message: "password mismatched" });
    if (!validatePassword(password).isValid)
      return res
        .status(404)
        .json({ message: validatePassword(password).message });
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = isUser
      ? await user.create({
          email: String(email).toUpperCase(),
          password: hashedPassword,
          name: `${firstName} ${lastName}`,
        })
      : await recruiter.create({
          email: String(email).toUpperCase(),
          password: hashedPassword,
          name: `${firstName} ${lastName}`,
          orgId: `PTCH21239${String(orgName).split(" ")[0].toUpperCase()}`,
        });
    if (isUser) userDetails.create({ user: result });
    else recuiterDetails.create({ user: result });

    // let data = isUser ? userDetails.find().populate("user") : {};
    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.JWT_TOKEN,
      { expiresIn: "1h" }
    );
    return res.status(200).json({
      message: isUser ? "User account created" : "Recruiter account created",
      result,
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

function validateAuthBody(body) {
  let missignParams = [];

  if (!body.email) {
    missignParams.push("email");
  }
  if (!body.password) {
    missignParams.push("password");
  }

  let emailValidation = validateEmail(body.email);
  if (!emailValidation.isValid) {
    return [false, emailValidation.message];
  }

  return missignParams.length > 0
    ? [false, "missing fields: " + missignParams.join(",")]
    : [true, ""];
}
