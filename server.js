import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/paperrockscissor";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const Player = mongoose.model('Player', {
  name: {
    type: String,
    required: true
  },
  move: {
    type: String
  },
  id: {
    type: String
  }
});

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json());

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hej! Vill du spela sten sax påse? ');
});

//Spelare 1 skickar ett request för att skapa ett nytt spel och får tillbaka ett 
//spel-ID från servern.

app.post('/api/games', async (req, res) => {
  const { name } = req.body;

  const player1 = new Player({name});
  
  try {
    const savedPlayer1 = await player1.save();
    res.status(201).json(savedPlayer1);
  }
  catch (error) {
    res.status(400).json({success: false, error});  
    console.log(error);
  }
  

});

//Spelare 1 skickar ID till spelare 2 via valfri kommunikationskanal. (t.ex mail, slack)

//Spelare 2 ansluter sig till spelet med hjälp av ID.

app.post('/api/games/{id}/join', async (req, res) => {
  const { id } = req.body;
  res.send('Hej! Vill du spela sten sax påse? ');
  const player2 = new Player ({name});
  const { name } = req.body;

  try {
    const savedPlayer2 = await player2.save();
    res.status(201).json(savedPlayer2);
  }
  catch (error) {
    res.status(400).json({success: false, error});
  }
});

//Spelare 1 gör sitt drag (Sten).

//Spelare 2 gör sitt drag (Sax).

//Spelare 1 kollar tillståndet för spelet och upptäcker att hen vann.

//Spelare 2 kollar tillståndet för spelet och upptäcker att hen förlorade.

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
