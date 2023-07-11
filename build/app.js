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
const mongoose_1 = __importDefault(require("mongoose"));
const db_1 = __importDefault(require("./routes/db"));
const cors_1 = __importDefault(require("cors"));
const User_1 = __importDefault(require("./routes/User"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/v1/Users", User_1.default);
const dbName = "UsersDataBase";
app.listen(process.env.PORT || 3000, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Server is running on port 3000");
    yield mongoose_1.default.connect(`mongodb://127.0.0.1:27017/${dbName}`);
    yield (0, db_1.default)();
}));
exports.default = app;
