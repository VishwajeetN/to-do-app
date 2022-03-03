import { Todo } from "../utils/types"
import Link from "next/link"
import {TodoList} from '../components/TodoList'

// Define the components props
interface IndexProps {
  todos: Array<Todo>
}

// define the page component
function Index(props: IndexProps) {
  const { todos } = props
  
  return (
    <div>
      <TodoList todos ={todos}/>
    </div>
  )
}

// GET PROPS FOR SERVER SIDE RENDERING
export async function getServerSideProps() {
  // get todo data from API
  const res = await fetch(process.env.API_URL as string)
  const todos = await res.json()

  // return props
  return {
    props: { todos },
  }
}

export default Index

