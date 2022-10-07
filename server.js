const express = require('express');
const app = express();
var cors = require('cors')


const {Pool} = require('pg');
const config = require('./config')[process.env.NODE_ENV||"dev"]
const PORT = config.port;

const pool = new Pool({
    connectionString: config.connectionString
});
pool.connect();

app.use(cors())
app.use(express.json());
app.use(express.static('public'))

app.get('/api/games', (req, res) => {
    pool.query('SELECT * FROM games RIGHT OUTER JOIN systems ON systems.system_id = games.system_id')
    .then(result => {
        res.send(result.rows);
    })
});

app.get('/api/games/:id', (req, res) => {
    var id = req.params.id
    pool.query('SELECT * FROM games RIGHT OUTER JOIN systems ON systems.system_id = games.system_id WHERE game_id=$1',[`${id}`])
    .then(result => {
        res.send(result.rows)
    })
});

app.post('/api/games/create', (req, res) => {
    let userInput = req.body;
    pool.query('INSERT INTO games (game, rating, system_id) VALUES ($1, $2, $3)',[userInput.game, userInput.rating, userInput.system_id])
    .then(result => {
        res.status(201).send('Created Game');
    })
});


app.listen(PORT, () => {
    console.log(`We are listening in on ${PORT}`)
});



/*app.delete("/games/delete", (req, res) => {
    let deletedGame = req.query
    pool.query(`DELETE FROM games WHERE games = ${deletedGame};`)
    .then(res.send("DELETED"))

}) */






