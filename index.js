const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(cors());

// Conectar ao MongoDB
mongoose.connect('mongodb://localhost:27017/mercadinho', { 
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro ao conectar ao MongoDB', err));

// Definir um schema para os produtos
const produtoSchema = new mongoose.Schema({
  nome: String,
  preco: Number,
  imagem: String
});

const Produto = mongoose.model('Produto', produtoSchema);

// Listar todos os produtos
app.get('/produtos', async (req, res) => {
  const produtos = await Produto.find();
  res.json(produtos);
});

// Adicionar um novo produto
app.post('/produtos', async (req, res) => {
  const { nome, preco, imagem } = req.body;
  const novoProduto = new Produto({ nome, preco, imagem });
  await novoProduto.save();
  res.status(201).json(novoProduto);
});

// Excluir um produto pelo ID
app.delete('/produtos/:id', async (req, res) => {
  const { id } = req.params;
  await Produto.findByIdAndDelete(id);
  res.status(200).json({ message: 'Produto excluído' });
});

// Iniciar o servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
