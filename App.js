import React, { useState, useEffect } from 'react';
import { getViagens, createViagem, updateViagem, deleteViagem } from './services/viagemService';

function App() {
  const [viagens, setViagens] = useState([]);
  const [newViagem, setNewViagem] = useState({ nome: '', dataSaida: '', dataChegada: '', valor: 0, destinos: [] });

  useEffect(() => {
    fetchViagens();
  }, []);

  const fetchViagens = async () => {
    const response = await getViagens();
    setViagens(response.data);
  };

  const handleCreate = async () => {
    await createViagem(newViagem);
    fetchViagens();
    setNewViagem({ nome: '', dataSaida: '', dataChegada: '', valor: 0, destinos: [] });
  };

  const handleUpdate = async (id) => {
    await updateViagem(id, newViagem);
    fetchViagens();
  };

  const handleDelete = async (id) => {
    await deleteViagem(id);
    fetchViagens();
  };

  return (
    <div>
      <h1>Viagens</h1>
      <input type="text" placeholder="Nome" value={newViagem.nome} onChange={e => setNewViagem({ ...newViagem, nome: e.target.value })} />
      <input type="date" value={newViagem.dataSaida} onChange={e => setNewViagem({ ...newViagem, dataSaida: e.target.value })} />
      <input type="date" value={newViagem.dataChegada} onChange={e => setNewViagem({ ...newViagem, dataChegada: e.target.value })} />
      <input type="number" placeholder="Valor" value={newViagem.valor} onChange={e => setNewViagem({ ...newViagem, valor: e.target.value })} />
      <button onClick={handleCreate}>Criar Viagem</button>

      <ul>
        {viagens.map((viagem) => (
          <li key={viagem._id}>
            {viagem.nome} - {viagem.dataSaida} - {viagem.dataChegada} - R${viagem.valor}
            <button onClick={() => handleUpdate(viagem._id)}>Editar</button>
            <button onClick={() => handleDelete(viagem._id)}>Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
