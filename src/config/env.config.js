import dotenv from 'dotenv';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const currentDir = dirname(fileURLToPath(import.meta.url));

dotenv.config({ path: resolve(currentDir, '../../.env') });

const requiredEnv = ['PORT', 'NODE_ENV'];

requiredEnv.forEach((envVar) => {
    if (!process.env[envVar]) {
        throw new Error(`Faltan variables de entorno: ${envVar}`);
    }
});

export const env = {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV
};