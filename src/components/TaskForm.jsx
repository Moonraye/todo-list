export default function TaskForm ({formData, onChange, onSave}){
    return (
        <form onSubmit={onSave} className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-slate-800 mb-2">New Task</h2>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                <input type="text" name="title" value={formData.title} onChange={onChange} required
                className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"/>
            </div>

            <div>               
                <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                <textarea name="description" value={formData.description} onChange={onChange} rows="3" placeholder="Add the description"
                className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none resize-none">
                </textarea>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Дедлайн</label>
                <input type="date" name="dueDate" value={formData.dueDate} onChange={onChange}
                className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"/>
            </div>

            <button type="submit" className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all">Save task</button>
        </form>
    )

}