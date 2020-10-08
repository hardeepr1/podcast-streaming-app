function artistController() {
  async function connectToDatabase() {
    let client;
    try {
      client = await MongoClient.connect(process.env.DATABASE_URL);
      const db = client.db('podcastAppDB');
      return { db, client };
    } catch (err) {
      console.log(err);
      res.send(400);
    }
  }

  async function get(req, res) {
    try {
      const { db, client } = await connectToDatabase();
      let artists = await db.collection('artists').find({});

      const returnedArtist = [];

      while (await artists.hasNext()) {
        const artist = await artists.next();
        returnedArtist.push(transformPodcast(artist));
      }
      client.close();
      res.status(201);

      return res.json(returnedArtist);
    } catch (err) {
      console.log(err);
      res.send(400);
    }
  }
  
}

module.exports = artistController;
