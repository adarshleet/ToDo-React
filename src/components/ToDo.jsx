import { useState } from 'react'
import './style.css'
function Todo(){
    const [work,setWork] = useState('')
    const [task,setTask] = useState([])
    const [error,setError] = useState('')
    let [edit,setEdit] = useState()

    const addToList = (event)=>{
        console.log(edit)
        if(work.length < 4){
            setError('Please Enter Valid Data')
        }
        else if(edit>=0){
            task[edit].task = work
            setTask([...task])
            setEdit()
            setWork('')
        }
        else{
            let date = new Date();
            const options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            };
            const formattedDate = date.toLocaleDateString('en-US', options);
            setTask([...task,{id: Date.now(),task:work,done:false,date:formattedDate}]);
            setError('')
            setWork('')
        }
        event.preventDefault();      
    }

    const taskDelete = (todo) =>{
        task.splice(todo,1)
        setTask([...task])
    }

    const taskDone = (todo) =>{
        task[todo].done = true
        setTask([...task])
    }

    const taskEdit = (todo) =>{
        if(!task[todo].done){
            const work = task[todo].task
            setWork(work)
            setEdit(todo)
        }
        else{
            setError(`Cant't update completed task`)
        }
    }

    return(
        <main className="d-flex justify-content-center align-items-center">
            <div className='todoForm p-4'>
                <h2>TODO LIST</h2>
                <form className='d-flex flex-column'>
                    <label className='fw-bold mb-1'>ENTER THE TASK</label>
                    <input className='taskInput' type="text" value={work} onChange={e=>{setWork(e.target.value)}} />
                    <p className='text-center text-danger'>{error}</p>
                    <button className='btn btn-secondary w-100 btn-sm my-2 mb-3 fw-bold' onClick={addToList}>{edit>=0 ? 'UPDATE TASK' :'ADD TASK TO LIST'}</button>
                </form>
                <div>
                    {task.map(todo=>
                    <div key={todo.id} className='singleTask p-2 mb-2'>
                        <div className='d-flex justify-content-between'>
                            <div className='text-start'>
                                <p>{todo.date}</p>
                                {todo.done ? 
                                    <s><h4>{todo.task}</h4></s>:
                                    <h4>{todo.task}</h4>
                                }
                            </div>
                            <div>
                                <button className='border-0 btns' onClick={()=>taskEdit(task.indexOf(todo))}><i className="fa-solid fa-pen-to-square"></i></button>
                                <button className='border-0 btns' onClick={()=>taskDone(task.indexOf(todo))}><i className="fa-solid fa-square-check"></i></button>
                                <button className='border-0 btns' onClick={()=>taskDelete(task.indexOf(todo))}><i className="fa-solid fa-trash"></i></button>
                            </div>
                        </div>
                    </div>    
                    )}
                </div>
            </div>
        </main>
    )
}

export default Todo