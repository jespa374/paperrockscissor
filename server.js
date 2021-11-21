import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/paperrockscissor";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

//Alternativ 1

const Player = mongoose.model('Player', {
  name: {
    type: String,
  },
  move: {
    type: String,
    default: null
  }
});

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hej! Vill du spela sten sax påse? ');
});

app.post('/api/games', async (req, res) => {
  const { name, move } = req.body;

  const player1 = new Player({name});
  
  try {
    const savedPlayer1 = await player1.save();
    res.status(201).json(savedPlayer1);
  }
  catch (error) {
    res.status(400).json({success: false, error});  
  }
});

app.post('/api/games/:id/join', async (req, res) => {
  const { name } = req.body;
  Player.findById(req.params.id).then(player =>
    {
      if (!player) {
        return res.status(400).json({success: false, error})
      } 
      const player2 = new Player ({name});
      try {
        const savedPlayer2 =  player2.save();
        res.status(201).json(`Hej! Vill du spela sten sax påse?`);
      }
      catch (error) {
        res.status(400).json({success: false, error});
      }
    }); 
});


//Alternativ 2
/* const gameSchema = new mongoose.Schema({
  players:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Player'
    }
  ]
});

const playerSchema = new mongoose.Schema({
  name: {
    type: String
  },
  move : {
    type: String,
    default: null
  },
  gameId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game'
  }
});

const Game = mongoose.model('Game', gameSchema);
const Player = mongoose.model('Player', playerSchema);

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hej! Vill du spela sten sax påse? ');
});

app.post('/api/games', async (req, res) => {
 const { name, move } = req.body;
 const newGame = await new Game().save();
  
  try {
    const player1 = await new Player({name, move}).save();
    newGame.players.push(player1);
    newGame.save();
    res.status(201).json(newGame);
  }
  catch (error) {
    res.status(400).json({success: false, error});  
    console.log(error);
  }
}); */

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
