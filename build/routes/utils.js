"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkErrors = exports.saltRounds = exports.RegexPassowrd = void 0;
const express_validator_1 = require("express-validator");
exports.RegexPassowrd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,32}$/;
exports.saltRounds = 10;
const checkErrors = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
exports.checkErrors = checkErrors;
