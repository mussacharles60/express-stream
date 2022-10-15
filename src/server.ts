import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import fs from 'fs-extra';
import path from 'path';

// import { createServer } from 'http';


const app = express();
const port: any = process.env.PORT || 9000; // default port to listen

app.use(cors({
    origin: '*',
    // credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// const httpServer = createServer(app);
// const io = new Server(httpServer, {
//     cors: {
//         origin: '*',
//     }
// });

app.get("/", (_req, res) => {
    res.sendFile(path.join(__dirname, "/views/index.html"));
});

app.post("/video", async (req, res) => {
    // get start and end bytes from req body
    const start = req.body.start;
    const end = req.body.end;
    const file = fs.readFileSync(path.join(__dirname, "/media/frag_bunny.mp4"));
    const data = file.toString('utf-8');
    const info = fs.statSync(path.join(__dirname, "/media/frag_bunny.mp4"));
    res.send({
        size: info.size,
        data: data
    });
});

app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server is running on port ${port}.`);
});