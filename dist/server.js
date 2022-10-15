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
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
// import { createServer } from 'http';
const app = (0, express_1.default)();
const port = process.env.PORT || 9000; // default port to listen
app.use((0, cors_1.default)({
    origin: '*',
    // credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
// const httpServer = createServer(app);
// const io = new Server(httpServer, {
//     cors: {
//         origin: '*',
//     }
// });
app.get("/", (_req, res) => {
    res.sendFile(path_1.default.join(__dirname, "/views/index.html"));
});
app.post("/video", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get start and end bytes from req body
    const start = req.body.start;
    const end = req.body.end;
    const file = fs_extra_1.default.readFileSync(path_1.default.join(__dirname, "/media/frag_bunny.mp4"));
    const data = file.toString('utf-8');
    const info = fs_extra_1.default.statSync(path_1.default.join(__dirname, "/media/frag_bunny.mp4"));
    res.send({
        size: info.size,
        data: data
    });
}));
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server is running on port ${port}.`);
});
//# sourceMappingURL=server.js.map