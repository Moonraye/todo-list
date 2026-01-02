import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import TodoListApp from './components/todoList'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TodoListApp />
  </StrictMode>,
)
