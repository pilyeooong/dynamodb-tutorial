const express = require('express');
const {
  getCharacters,
  getCharacterById,
  addOrUpdateCharacter,
  deleteCharacterById,
} = require('./dynamo');

const app = express();
app.use(express.json());

app.get('/characters', async (req, res, next) => {
  try {
    const characters = await getCharacters();

    return res.status(200).json(characters);
  } catch (err) {
    next(err);
  }
});

app.get('/character/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const character = await getCharacterById(id);

    return res.status(200).json(character);
  } catch (err) {
    next(err);
  }
})

app.post('/character', async (req, res, next) => {
  try {
    const character = req.body;
    const newCharacter = await addOrUpdateCharacter(character);

    res.status(201).json(newCharacter);
  } catch (err) {
    next(err);
  }
});

app.put('/character/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const character = req.body;
    character.id = id;

    const updatedCharacter = await addOrUpdateCharacter(character);

    return res.status(200).json(updatedCharacter);
  } catch (err) {
    next(err);
  }
})

app.delete('/character/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await deleteCharacterById(id);

    return res.status(204).end();
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  return res.status(500).json({ errors: err })
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('server is running on port 3000');
})