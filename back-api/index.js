import express from 'express';
import cors from 'cors';
import './config/dotenv.js'
import 'express-async-errors'
import data from './routes/data.js'

const PORT = process.env.PORT || 5005;
const app = express();

app.use(cors())
app.use(express.json())

app.use('/data', data)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})