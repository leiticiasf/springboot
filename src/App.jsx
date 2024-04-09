import './App.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [livros, setLivros] = useState([]);
  const [novoLivro, setNovoLivro] = useState({
    isbn: "",
    titulo: "",
    editora: "",
    autor: "",
    genero: "",
  });

  useEffect(() => {
    fetchLivros();
  }, []);

  //GET
  const fetchLivros = async () => { /* significa que ela não depende de outra função para acontecer */
    try {
      const response = await axios.get('http://localhost:8090/livros'); /* pega a resposta */ /* await diz para o sistema não esperar que a função ocorra, diz para o sistema seguir normalmente */
      setLivros(response.data); /*coloca nesta array list */
    } catch (error) {
      console.error('Erro ao buscar livro:', error);
    }
  };
  // ATUALIZAÇÃO DOS INPUTS
  const handleInputChange = (event) => { //o vlaor vai atualizando conforme digita (em tempo real)
    const { name, value } = event.target;
    setNovoLivro((prevLivro) => ({
      ...prevLivro, //(... significa que ele vai pegando o valor atual, preenchendo os espaços de acordo que em que vai preenchendo)
      [name]: value,
    }));
  }

  //POST 
  const handleSubmit = async (event) => {
    event.preventDefault(); //evitar que recarregue
    try {
      await axios.post('http://localhost:8090/livros', novoLivro);
      fetchLivros();
      setNovoLivro({ //carrega o novo livro imediatamente
        isbn: "",
        titulo: "",
        editora: "",
        autor: "",
        genero: "",
      })
    } catch (error) {
      console.error("Erro ao criar livros:", error);
    }
  };

  //DELETE
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8090/livros/${id}`);
      fetchLivros();
    } catch (error) {
      console.error("Erro ao excluir livro:", error);
    }
  };

  //POST
  const handleUpdate = async (id, livroAtualizado) => {
    try {
      await axios.put(`http://localhost:8090/livros/${id}`, livroAtualizado);
      fetchLivros();
    } catch (error) {
      console.error("Erro ao atualizar veículo:", error);
    }
  };

  return (
    <div>
      {/* Cabeçalho */}
      <h1>Gerenciamento de Livros</h1>

      {/* Formulário de adição de veículo */}
      <form onSubmit={handleSubmit}>
        {/* Campo para a isbn */}
        <input
          type="text"
          name="isbn"
          placeholder="                   ISBN"
          value={novoLivro.isbn}
          onChange={handleInputChange}
        /><br/><br/>
        {/* Campo para a titulo */}
        <input
          type="text"
          name="titulo"
          placeholder="                TÍTULO"
          value={novoLivro.titulo}
          onChange={handleInputChange}
        />  <br/>   <br/>
        {/* Campo para o editora */}
        <input
          type="text"
          name="editora"
          placeholder="                EDITORA"
          value={novoLivro.editora}
          onChange={handleInputChange}
        /><br/><br/>
        {/* Campo para o autor */}
        <input
          type="text"
          name="autor"
          placeholder="                 AUTOR"
          value={novoLivro.autor}
          onChange={handleInputChange}
        /><br/><br/>
        {/* Campo para o genero */}
        <input
          type="text"
          name="genero"
          placeholder="                GÊNERO"
          value={novoLivro.genero}
          onChange={handleInputChange}
        /><br/><br/>
        {/* Botão de envio do formulário */}
        <button type="submit">Adicionar Livro</button> 
      </form><br/>

      {/* Lista de Livros */}
      <ul>
        {/* Mapeamento dos Livros */}
        {livros.map((livro) => (
          <li key={livro.id}>
            {/* Exibição dos detalhes do veículo */}
         ISBN - {livro.isbn} <br/>Titulo - {livro.titulo} <br/>Editora - {livro.editora} <br/>Autor - {livro.autor}<br/> Gênero - {livro.genero}<br/>

            {/* Botão de exclusão */}
            <button id="buttonDifferent" onClick={() => handleDelete(livro.id)}>Excluir</button> &nbsp;

            {/* Botão de atualização */}
            <button id="buttonDifferent" onClick={() => handleUpdate(livro.id, {...livro,  
                     isbn: novoLivro.isbn != "" ? novoLivro.isbn : livro.isbn,
                     titulo: novoLivro.titulo != "" ? novoLivro.titulo : livro.titulo,
                     editora: novoLivro.editora != "" ? novoLivro.editora : livro.editora,
                     autor: novoLivro.autor != "" ? novoLivro.autor : livro.autor,
                     genero: novoLivro.genero != "" ? novoLivro.genero : livro.genero,

                })
              }
            >
              Atualizar
            </button>
          </li>
        ))}
      </ul>
    </div>

  );
}
export default App;