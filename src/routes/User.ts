import express, { Request, Response } from "express";
import { body, check } from "express-validator";
import { RegexPassowrd, checkErrors, saltRounds } from "./utils";
import User from "../models/User";
import bcript from 'bcrypt'

const router = express.Router();

// GET all users
router.get("/", async (_: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Server not responding" });
  }
});

// POST create a new user
router.post(
  "/signup",
  [
    body("email").notEmpty().withMessage("Email si required").isEmail(),
    body("password").notEmpty().withMessage("Password is required").matches(RegexPassowrd),
    body("confirmPassword").notEmpty().withMessage("Confirm password is required"),
    body("name").notEmpty().withMessage("Name is required"),
    body("surname").notEmpty().withMessage("Surname is required"),
    body("age").notEmpty().withMessage("Age is required"),
    body("gender").notEmpty().withMessage("Gender is required"),
    
    checkErrors,
  ],


  async (req: Request, res: Response) => {
    try {
      let { email, password, name, surname, age, gender } = req.body;
      password = await bcript.hash(password, saltRounds)
      const newUser = new User({ email, password, name, surname, age, gender });
      const savedUser = await newUser.save();
      res.json({email: savedUser.email, name: savedUser.name, surname: savedUser.surname, age: savedUser.age, gender: savedUser.gender});
    } catch (error) {
      res.status(500).json({ error: "Server not responding" });
    }
  }
);

router.post(
  "/login",
  [
    body("email").notEmpty().withMessage("Email si required").isEmail(),
    body("password").notEmpty().withMessage("Password is required").matches(RegexPassowrd),
    checkErrors,
  ],
  async (req: Request, res: Response) => {
    console.log(req.body)
    try {
      let { email, password } = req.body;
      const user = await User.findOne({email: email}) //questa funzione mi ritorna se l'utente è effettivamente registrato o no
      if (!user) return res.status(404).json({message: "User not found"});
      if(!await bcript.compare(password, user.password)) return res.status(401).json({message: "wrong credentials"}); //inserire return per chiudere funzione
      res.json({email: user.email, name: user.name, surname: user.surname, age: user.age, gender: user.gender });
    } catch (error: any) {
      res.status(500).json({ error: error.message  });
    }
  }
);



export default router;


