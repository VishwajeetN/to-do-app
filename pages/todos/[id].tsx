import { Todo } from "../../utils/types"
import { useRouter } from "next/router"
import { useState,useRef } from "react"
import React from "react";

// Define Prop Interface
interface ShowProps {
  todo: Todo
  url: string
}

// Define Component
function Show(props: ShowProps) {
  ////let textInput = useRef<HTMLInputElement>(null!)
  // get the next router, so we can use router.push later
  const router = useRouter()
  
  // set the todo as state for modification
  const [todo, setTodo] = useState<Todo>(props.todo)
  const isComplete = !todo.completed ? true : false
  //const [todoItem,setTodoItem] = useState<Todo>(props.todo)

  // // function handleChange() {
  // //   console.log(textInput.current.value);
  // // }
  

  // function to complete a todo
  const handleComplete = async () => {
     // if (!todo.completed) {
      
      //// make copy of todo with completed set to true
      const newTodo: Todo = { ...todo,completed: isComplete }
      //// make api call to change completed in database
      await fetch(props.url + "/" + todo._id, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        // send copy of todo with property
        body: JSON.stringify(newTodo),
      })
      //// once data is updated update state so ui matches without needed to refresh
      setTodo(newTodo)
   // }
    //// if completed is already true this function won't do anything
    router.push("/")
  }


//// Function for handling clicking the edit button
// function to Edit a todo
const handleEdit = async () => {
  // if (!todo.completed) {
   
   //// make copy of todo with edited set to true
   const newTodo: Todo = { ...todo,completed: todo.completed }
   //// make api call to change completed in database
   await fetch(props.url + "/" + todo._id, {
     method: "put",
     headers: {
       "Content-Type": "application/json",
     },
     // send copy of todo with property
     body: JSON.stringify(newTodo),
   })
   //// once data is updated update state so ui matches without needed to refresh
   setTodo(newTodo)
// }
 //// if completed is already true this function won't do anything
 router.push("/")
}

  //// function for handling clicking the delete button
  const handleDelete = async () => {
    await fetch(props.url + "/" + todo._id, {
      method: "delete",
    })
    ////push user back to main page after deleting
    router.push("/")
  }

  ////return JSX
  return (
    <div className="border-2 bg-gray-100 ml-3">
      <h4 className="text-2xl ml-4  text-blue-600 font-bold"><span style={{ fontSize: "20px",color:"black"}}>ToDo - </span>{todo.item}</h4>
      <h4 className="text-2xl ml-4  text-green-600 font-bold"><span style={{ fontSize: "20px",color:"black"}}>Status - </span> {todo.completed ? <span className="text-white bg-green-600">Completed</span> : <span className="text-white bg-red-600">Incomplete</span>}</h4>

      {/* <input type="text"  ref={textInput} onChange={()=>handleChange()} ></input> */}
      <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ml-3 mt-10 w-80"
       type="text" value={todo.item} onChange={(e)=>setTodo({...todo,item:e.target.value})} ></input><br/><br/>
      
      <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 ml-3 rounded"
      onClick={handleComplete}>{!isComplete ? "Incomplete" : "Completed"}</button>

      <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 ml-3 rounded"
      onClick={handleEdit}>Edit To Do</button>
      
      
      <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 ml-3 rounded"
      onClick={handleDelete}>Delete</button>

      <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 ml-3 rounded"
        onClick={() => {
          router.push("/")
        }}
      >
        Go Back
      </button>
    </div>
  )
}
// Define Server Side Props
export async function getServerSideProps(context: any) {
  // fetch the todo, the param was received via context.query.id
  const res = await fetch(process.env.API_URL + "/" + context.query.id)
  const todo = await res.json()

  //return the serverSideProps the todo and the url from out env variables for frontend api calls
  return { props: { todo, url: process.env.API_URL } }
}

// export component
export default Show
