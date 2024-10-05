import logo from './logo.png';

function App() {
  // ...restante do código

  return (
    <div className="App">
      <img src={logo} alt="Logo Mercadinho" />
      <h1>Mercadinho Online</h1>
      // ...restante do código
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from './logo.png';

function App() {

    return (
        <div className="App">
          <img src={logo} alt="Logo Mercadinho" />
          <h1>Mercadinho Online</h1>
        </div>
      );
    }

function App() {
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [imagem, setImagem] = useState('');

  // Buscar produtos da API
  const fetchProdutos = async () => {
    const res = await axios.get('http://localhost:5000/produtos');
    setProdutos(res.data);
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  // Adicionar produto
  const adicionarProduto = async (e) => {
    e.preventDefault();
    const novoProduto = { nome, preco, imagem };
    const res = await axios.post('http://localhost:5000/produtos', novoProduto);
    setProdutos([...produtos, res.data]);
  };

  // Excluir produto
  const excluirProduto = async (id) => {
    await axios.delete(`http://localhost:5000/produtos/${id}`);
    setProdutos(produtos.filter(produto => produto.id !== id));
  };

  return (
    <div className="App">
      <h1>Mercadinho Online</h1>
      <form onSubmit={adicionarProduto}>
        <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
        <input type="text" placeholder="Preço" value={preco} onChange={(e) => setPreco(e.target.value)} />
        <input type="text" placeholder="URL da imagem" value={imagem} onChange={(e) => setImagem(e.target.value)} />
        <button type="submit">Adicionar Produto</button>
      </form>
      <div>
        {produtos.map(produto => (
          <div key={produto.id}>
            <h2>{produto.nome}</h2>
            <p>Preço: R$ {produto.preco}</p>
            <img src={produto.imagem} alt={produto.nome} style={{ width: '100px' }} />
            <button onClick={() => excluirProduto(produto.id)}>Excluir</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
