import React, { useState, useEffect } from 'react'
import { TodoForm } from '../Components/TodoForm';
import { TodoList } from '../Components/TodoList';
import { ITodo } from '../interfaces';

declare var confirm: (question: string) => boolean


export const TodosPage: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([])

  // используется, когда мы забираем элементы
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('todos') || '[]') as ITodo[] // вернет строку
    setTodos(saved)
  }, [])

  // используется, когда мы сохраняем элементы
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addHandler = (title: string) => {
    console.log('Add New Todo', title)
    const newTodo: ITodo = {
      title,
      id: Date.now(),
      completed: false
    }
    // setTodos([newTodo, ...todos])
    setTodos((prev) => [newTodo, ...prev])
  }

  const toggleHandler = (id: number) => {
    setTodos(prev => 
      prev.map(todo => {
        if (todo.id === id) {
          if (todo.id === id) {
            return {...todo, completed: !todo.completed}
          }
        }
        return todo
      })
    )
  }

  const removeHandler = (id: number) => {
    const shouldRemove = confirm("Вы уверены, что хотите удалить элемент")
    if (shouldRemove) {
      setTodos(prev => prev.filter(todo => todo.id !== id))
    }
  }

  return (
    <React.Fragment>
      <TodoForm onAdd={addHandler}/>
      <TodoList 
        todos={todos} 
        onToggle={toggleHandler} 
        onRemove={removeHandler}
      />
    </React.Fragment>
  )
}