import { motion } from "framer-motion";
import { Trash,  Calendar, Star } from 'lucide-react';

export default function TaskCard ({task, onDelete, onToggleUrgent}) {
    if (!task) return null;

    return (
        <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{  opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-3">
            <div className="flex justify-between items-start mb-2">
               <h3 className="font-semibold text-slate-800">{task.title}</h3> 
              <div className="flex gap-3">
                <button onClick={() => onToggleUrgent(task.id)} className="transition-colors"> 
                    <Star size={16} className={task.category === 'urgent' ? 'text-yellow-400 fill-yellow-400 hover:text-red-500' : 'text-slate-800 hover:text-red-500'}/>
               </button>
               <button onClick={() => onDelete(task.id)} className="text-slate-800 hover:text-red-500 transition-colors"> 
                    <Trash size={16} />
               </button>
            </div> 
            </div>

            <p className="text-sm text-slate-500 mb-4">{task.description}</p>

            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase">
                <Calendar size={12} />
                <span>{task.dueDate}</span>
            </div>
        </motion.div>
    )
}