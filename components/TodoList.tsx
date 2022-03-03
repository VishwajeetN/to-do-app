import { NextPage } from "next";
import React from 'react'
import { Todo } from "../utils/types"
import Link from "next/link"
import { Table } from "../components/Table"

interface TodoListProps {
  todos: Array<Todo>
}

export const TodoList: NextPage<TodoListProps> = ({ todos }) => {
  console.log(todos)
  return (
    <>
      <h1 className="text-3xl font-bold ml-3">My Todo List</h1>
      <h2 className="text-2xl font-bold ml-3">Click On Todo to see it individually</h2>
      <Link href="/todos/create">
        <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-10 border-b-4 border-blue-700 hover:border-blue-500 mt-5 ml-3 rounded">
          Create a New Todo
        </button>
      </Link>
      {/* MAPPING OVER THE TODOS */}
      <br /><br />
      <div className="ml-3">{<Table  todos={todos} />}</div>
      {/* 
      {
          
      todos.map((t,index) => (
        <div key={t._id}>
          <Link href={`/todos/${t._id}`}>
            <h3 style={{ cursor: "pointer" }}>
           {index +1 } {')'} {t.item} - {t.completed ? "completed" : "incomplete"}
            </h3>
          </Link>
        </div>
      ))
      } */}
    </>
  )
}
