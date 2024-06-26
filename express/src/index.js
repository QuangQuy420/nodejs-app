import express from 'express';
import userRoutes from '../src/app/routers/userRouter.js';
import authRoutes from '../src/app/routers/authRouter.js';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors()) // Use this after the variable declaration

// Middleware to parse JSON request bodies.
app.use(express.json());

// Middleware to parse URL-encoded request bodies.
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);
app.use('/auth', authRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
