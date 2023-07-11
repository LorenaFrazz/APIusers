"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const utils_1 = require("./utils");
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const router = express_1.default.Router();
// GET all users
router.get("/", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: "Server not responding" });
    }
}));
// POST create a new user
router.post("/signup", [
    (0, express_validator_1.body)("email").notEmpty().withMessage("Email si required").isEmail(),
    (0, express_validator_1.body)("password").notEmpty().withMessage("Password is required").matches(utils_1.RegexPassowrd),
    (0, express_validator_1.body)("confirmPassword").notEmpty().withMessage("Confirm password is required"),
    (0, express_validator_1.body)("name").notEmpty().withMessage("Name is required"),
    (0, express_validator_1.body)("surname").notEmpty().withMessage("Surname is required"),
    (0, express_validator_1.body)("age").notEmpty().withMessage("Age is required"),
    (0, express_validator_1.body)("gender").notEmpty().withMessage("Gender is required"),
    utils_1.checkErrors,
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { email, password, name, surname, age, gender } = req.body;
        password = yield bcrypt_1.default.hash(password, utils_1.saltRounds);
        const newUser = new User_1.default({ email, password, name, surname, age, gender });
        const savedUser = yield newUser.save();
        res.json({ email: savedUser.email, name: savedUser.name, surname: savedUser.surname, age: savedUser.age, gender: savedUser.gender });
    }
    catch (error) {
        res.status(500).json({ error: "Server not responding" });
    }
}));
router.post("/login", [
    (0, express_validator_1.body)("email").notEmpty().withMessage("Email si required").isEmail(),
    (0, express_validator_1.body)("password").notEmpty().withMessage("Password is required").matches(utils_1.RegexPassowrd),
    utils_1.checkErrors,
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        let { email, password } = req.body;
        const user = yield User_1.default.findOne({ email: email }); //questa funzione mi ritorna se l'utente è effettivamente registrato o no
        if (!user)
            return res.status(404).json({ message: "User not found" });
        if (!(yield bcrypt_1.default.compare(password, user.password)))
            return res.status(401).json({ message: "wrong credentials" }); //inserire return per chiudere funzione
        res.json({ email: user.email, name: user.name, surname: user.surname, age: user.age, gender: user.gender });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
exports.default = router;
