import express from 'express';
import db from '../config/database.js'
import { ObjectId } from 'mongodb';

const router = express.Router();
let collection = await db.collection('user')

router.get('/', async (req, res) => {
    let results = await collection.find().toArray()

    res.send(results).status(200)
})

router.post('/signup', async(req, res) => {
    const { user_name, user_password } = req.body
    const existingUser = await collection.findOne({ user_name: user_name });

    if (existingUser) {
        return res.status(400).json({ message: 'Username already exists. Choose a different username.' });
      }

    const result = await collection.insertOne({ user_name : user_name, user_password : user_password })
    
    res.status(201).json({ message: 'Signed up successfully', user: result });
})

router.get('/login', async(req, res) => {
    const { user_name, user_password } = req.body
    const result = await collection.findOne({ user_name : user_name });

    if (!result) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    if (result.user_password !== user_password) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    res.status(200).json({ message: 'Login successful', result });
})

export default router;