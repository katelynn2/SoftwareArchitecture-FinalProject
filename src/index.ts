import express from 'express';
import cors from 'cors';
import path from 'path';
import apiRoutes from './routes/api_route';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);

app.use(express.static(path.join(__dirname, '../public')));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`UI User: http://localhost:${PORT}/index.html`);
  console.log(`UI Admin: http://localhost:${PORT}/admin.html`);
});