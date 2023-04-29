
import { MongoClient } from 'mongodb';

// /api/new-meetup
// POST /api/new-meetup

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    const connectionUrl="mongodb+srv://sanjeev:RxlJQIR9oqHbCrfB@cluster0.vek8f.mongodb.net/?retryWrites=true&w=majority"
    const client = await MongoClient.connect(connectionUrl);
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: 'Meetup inserted!' });
  }
}

export default handler;