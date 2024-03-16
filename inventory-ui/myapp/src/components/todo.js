import { useEffect, useState } from "react";

function Todo(){
    const [todos, setTodo] = useState([]);
    const [temp, setTemp] = useState([]);
    useEffect(()=>{
        fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response=>response.json())
        .then(data=> { 
            setTodo(data) 
            setTemp(data)
        }) 
    },[]);
    const filterTodo = (status)=>{
        setTodo(temp)
        if(status === 'true'){
            setTodo(temp.filter(e=>e.completed === true))
        }
        else 
        if(status === 'false'){
            setTodo(temp.filter(e=>e.completed === false))
        }
        
    }

    const onDelete = (id) =>{
        setTodo( temp.filter(t=>t.id !== id))
    }
    return(
        <div>
            <button onClick={()=>filterTodo('true')}>Show Completed</button> &nbsp;&nbsp; 
            <button onClick={()=>filterTodo('false')}>Show Not COmpleted</button>&nbsp;&nbsp;
            <button onClick={()=>filterTodo('all')}>Show All</button>

            <hr />
            {
                todos.map((e,index)=>{
                    return(
                        <div key={index}> 
                            {e.id} -- {e.title} -- {e.userId} -- {e.completed?'Completed':'Not Completed'} 
                            &nbsp;&nbsp; <button onClick={()=>onDelete(e.id) }>Delete</button><br />
                        </div>
                    )
                })
            }
        </div>
    )
}
export default Todo;