import express from 'express';
import dotenv from 'dotenv';
import { clerkExpressWithAuth, getAuth } from '@clerk/clerk-sdk-node';

dotenv.config();

const app = express();
const port = 3000;

app.use(clerkExpressWithAuth());

app.get('/test', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

app.get('/protected', (req, res) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({ error: 'No valid authentication token found.' });
    }
    res.json({ message: `Welcome! Your userId is ${userId}` });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.get('/auth-status', (req, res) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({ authenticated: false, error: 'No valid authentication token found.' });
    }
    res.json({ authenticated: true, userId });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found.' });
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
