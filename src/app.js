import express from 'express';
import servicesRoute from './routes/services.routes.js';

const app = express();

app.use(express.json());
app.use('/api', servicesRoute);

app.get('/', (req, res) => {
  res.status(200).json({
    status: "success",
    message: 'Servidor funcionando correctamente'
  });
});

export default app;