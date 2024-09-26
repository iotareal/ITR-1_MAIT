import express from "express";
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js'; // Ensure your Book model is defined correctly
import dotenv from 'dotenv';
import cors from 'cors';
import booksRoute from './routes/booksRoute.js';

dotenv.config();

const PORT = 1000;
const mongoDBURL = "mongodb+srv://sameersk2080:Delhi123@itr-1.q7t80.mongodb.net/BookHaven?retryWrites=true&w=majority"; // Use environment variable

const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(cors()); // Enable CORS

// Root Route
app.get('/', (req, res) => {
    console.log(req.method, req.url); // Logging method and URL
    return res.status(200).send();
});
app.use('/books',booksRoute)

// Connect to MongoDB and Start the Server
mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to the database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
