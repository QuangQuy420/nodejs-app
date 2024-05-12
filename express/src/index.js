import express from 'express';
const app = express();
const port = 3000;
import userRoutes from '../src/app/routers/userRouter.js';

// Middleware to parse JSON request bodies.
app.use(express.json());

// Middleware to parse URL-encoded request bodies.
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
