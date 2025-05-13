import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { saveReceipt, getReceipt } from './store.js';
import { calculatePoints } from './calculator.js';
import { validateReceipt } from './validation.js';

const app = express();
app.use(express.json());

app.post('/receipts/process',validateReceipt, (req, res) => {
  const id = uuidv4();
  saveReceipt(id, req.body);
  res.json({ id });
});

app.get('/receipts/:id/points',(req, res) => {
  const receipt = getReceipt(req.params.id);
  if (!receipt) {
    return res.status(404).json({ error: 'Receipt not found' });
  }
  const points = calculatePoints(receipt);
  res.json({ points });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
