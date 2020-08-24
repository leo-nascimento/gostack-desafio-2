import React, {
  useState,
  useEffect
} from "react";
import api from './services/api'
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(res => {
      setRepositories(res.data);
    })
  }, [])

  async function handleAddRepository() {
    const data = {
      title: "Desafio Teste",
      url: "http://github.com/leo-nascimento",
      techs: ["Node.js"]
    };

    api.post('/repositories', data).then(res => {
      if (res.status === 200) {
        setRepositories([...repositories, res.data]);
      }
    })
  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`).then(res => {
      if (res.status === 204) {
        setRepositories(repositories.filter(el => el.id !== id));
        alert("Removido com sucesso!")
      }
    })
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(el => (
            <li key={el.id}>
              {el.title}
              <button onClick={
                () => handleRemoveRepository(el.id)
              }>
                Remover </button>
            </li>
          ))
        }
      </ul>
      <button onClick={handleAddRepository}> Adicionar </button>
    </div>
  );
}

export default App;