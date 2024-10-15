const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/viagens', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const viagemSchema = new mongoose.Schema({
  nome: String,
  dataSaida: Date,
  dataChegada: Date,
  valor: Number,
  destinos: [{ nome: String }]
});

const Viagem = mongoose.model('Viagem', viagemSchema);

app.get('/viagens', async (req, res) => {
  const viagens = await Viagem.find();
  res.json(viagens);
});

app.post('/viagens', async (req, res) => {
  const novaViagem = new Viagem(req.body);
  await novaViagem.save();
  res.json(novaViagem);
});

app.put('/viagens/:id', async (req, res) => {
  const viagem = await Viagem.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(viagem);
});

app.delete('/viagens/:id', async (req, res) => {
  await Viagem.findByIdAndDelete(req.params.id);
  res.json({ message: 'Viagem deletada' });
});

app.listen(5000, () => {
  console.log('Servidor rodando na porta 5000');
});
