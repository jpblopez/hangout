import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import v1 from './v1';

const app = express();

app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.use('/v1', v1);

export default app;
