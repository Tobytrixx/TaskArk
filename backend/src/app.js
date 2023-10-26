import express from "express";
const app = express();
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import createHttpError from "http-errors";
import logger from "morgan";
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import taskRoutes from './routes/taskRoutes.js';
import userRoutes from './routes/userRoutes.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, '../config/.env');
dotenv.config({ path: envPath });

const URI = process.env.MONGO_URI;

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB");
}).catch(error => {
    console.error("MongoDB connection error:", error);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(express.json());

app.use(cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
}));

app.use(logger('dev'));

app.use("/tasks", taskRoutes);
app.use("/users", userRoutes);

app.post('/', (req, res) => {
    res.send('Hello World!');
});

// Error handling middleware (after all other app.use() and routes)
app.use((req, res, next) => {
    next(createHttpError(404));
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        message: err.message,
        error: req.app.get('env') === 'development' ? err : {}
    });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});