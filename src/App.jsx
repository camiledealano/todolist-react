import { useState } from 'react'

import "./App.css";
import Todo from './components/Todo';
import TodoForm from './components/TodoForm';
import Search from './components/Search';
import Filter  from './components/Filter';

function App() {
  const [todos, setTodos] = useState([
    {
      id:1,
      text:"Criar projeto com react",
      category: "Estudos",
      isCompleted: false,
    },
    {
      id:2,
      text:"Estudar para a prova",
      category: "Estudos",
      isCompleted: false,
    },
    {
      id:3,
      text:"Ir pra academia",
      category: "Pessoal",
      isCompleted: false,
    },
  ])

  const addTarefa = (text, category) => {
    const newTodos = [...todos, {
        id: Math.floor(Math.random() * 1000),
        text: text,
        category: category,
        isCompleted: false,
    }]
    setTodos(newTodos);
  };

  const removeTarefa = (id) => {
    const newTodos = [...todos]
    const filteredTodos = newTodos.filter(todo => todo.id !== id ? todo : null);
    setTodos(filteredTodos);
  }

  const completeTarefa = (id) => {
    const newTodos = [...todos];
    newTodos.map(todo => todo.id == id ? todo.isCompleted = !todo.isCompleted: todo);
    setTodos(newTodos)
  }

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("All");

  const [sort, setSort] = useState("Asc");

  return (<div className="app">
      <h1>Lista de Tarefas</h1>
      <Search search={search} setSearch={setSearch}/>
      <Filter filter={filter} setFilter={setFilter} setSort={setSort}/>
      <div className='todo-list'>
        {todos
          .filter((tarefa) => 
            filter === "All"
              ? true 
              : filter == "Completed" 
              ? tarefa.isCompleted 
              : !tarefa.isCompleted
         )
        .filter((todo => todo.text.toLowerCase().includes(search.toLowerCase())))
        .sort((a, b) => 
          sort === "Asc" 
            ? a.text.localeCompare(b.text)
            : b.text.localeCompare(a.text)
        )
        .map((todo) => (
          <Todo key={todo.id} todo={todo} removeTodo={removeTarefa} completeTodo={completeTarefa} />
        ))}
      </div>
      <TodoForm addTarefa={addTarefa} />
    </div>
  )
}

export default App
