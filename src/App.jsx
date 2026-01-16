import React, { useEffect, useState } from 'react';
import { db } from './lib/firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore"
import Column from './components/layout/Column';
import TaskCard from './components/TaskCard';
import TaskForm  from './components/TaskForm';
import Modal from './components/Modal';

import {  ListTodo, Zap, History } from 'lucide-react';
import { ca } from 'date-fns/locale';
import { pre } from 'framer-motion/client';
export default function App() {
  const queryParams = new URLSearchParams(window.location.search);
  const adminKey = queryParams.get('admin');
  const isAdmin = adminKey === "i_am_pochwara"
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    category: 'all'
  });

useEffect(() => {
  const fetchTasks = async () => {
    const collectionName = isAdmin ? "my-tasks" : "public-tasks";
    
    try {
      const querySnapshot = await getDocs(collection(db, collectionName)); 
      const list = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setTasks(list);
    } catch (error) {
      console.error("Помилка завантаження:", error);
    }
  };

  fetchTasks();
}, [isAdmin]);

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value
  }));
};
const saveTask = async (e) => {
    e.preventDefault();
    console.log("Button was clicked:", formData);

    const targetCollection = isAdmin ? "my-tasks" : "public-tasks";

    const newTask = {
      ...formData, 
      status: "active",
      createdAt: new Date()
    };

    try{
      const docRef = await addDoc(collection(db, targetCollection), newTask);
    
    const newTaskWithID = { ...newTask, id: docRef.id };
    setTasks(prevTasks => [...prevTasks, newTaskWithID]);

    setFormData({
      title: '',
      description: '',
      dueDate: '',
      category: 'all'
    });
    setIsModalOpen(false);

    } catch (error) {
      console.error("Error: ", error);
    }
}
const deleteTask = async (id) => {
  const collectionName = isAdmin ? "my-tasks" : "public-tasks";
  try{
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  } catch (error) {
      console.error("Error: ", error);
  }
};
const toggleUrgent = async (id) => {
  const collectionName = isAdmin ? "my-tasks" : "public-tasks";
  const taskToUpdate = tasks.find(t => t.id === id);

  if(!taskToUpdate) return; 

  const newCategory = taskToUpdate.category === 'urgent' ? 'all' : 'urgent';
  
  try{ 
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, { category: newCategory});

    setTasks(prevTasks => prevTasks.map(task => task.id === id ? { ...task, category: newCategory } : task 
    ));
  } catch(error) {
      console.error("Error: ", error);
  }
};

  return (
    <div className='min-h-screen bg-slate-50 p-8 text-slate-900'>
      <header className='mb-12'>
        <h1 className={`text-2xl font-bold italic ${isAdmin ? 'text-fuchsia-700' : 'text-blue-600'}`}>Todo Calendar</h1>
      </header>

    <div className="flex justify-start mb-8">
      <button 
         onClick={() => setIsModalOpen(true)}
         className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-100 flex items-center gap-2"
      >
      <span>+ Create Task</span>
      </button>
    </div>
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <TaskForm formData={formData} onChange={handleChange} onSave={saveTask}/>
    </Modal>

      <main className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        <Column title='All tasks' icon={ListTodo}>
          <div className='p-4 bg-white rounded-xl shadow-sm border border-slate-100'>
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} onDelete={deleteTask} onToggleUrgent={toggleUrgent}/>
            ))}
          </div>
        </Column>

        <Column title='Urgent' icon={Zap}>
        <div className='p-4 bg-white rounded-xl shadow-sm border border-slate-100'>
            {tasks.filter(t => t.category === 'urgent').map(task => (
              <TaskCard task={task} onDelete={() => deleteTask(task.id, isAdmin ? "my-tasks" : "public-tasks")}
              onToggleUrgent={() => toggleUrgent(task.id, isAdmin ? "my-tasks" : "public-tasks")}/>
            ))}
        </div>
        </Column>
        
        <Column title='History' icon={History}>
            {tasks.filter(t => t.status === 'completed').map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
        </Column>
      </main>
    </div>
  )
};
