import app from './app.js';
import { env } from './config/env.config.js';

const PORT = env.PORT;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
