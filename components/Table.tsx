import { NextPage } from "next";
import React from 'react'
import { Todo } from "../utils/types"
import Link from "next/link"
import { TableRow } from "../components/TableRow"

interface TodoListProps {
    todos: Array<Todo>
}

export const Table: NextPage<TodoListProps> = ({ todos }) => {
    return (
        <>
            <table className="w-auto" >
                <thead >
                <tr >
                    <td className="bg-gray-600 text-white pl-6">ToDos &nbsp;&nbsp;Status</td>
                </tr>
                </thead>
                
                <tbody >
                {/* {todos.map((row,index) => ( <tr style={{ border:"1px solid black"}} key={row._id}><h3>{index + 1}</h3><TableRow  row={row} /></tr>))} */}
                {/* {todos.map(row => <TableRow row={row} />)} */}
                {todos.map((row,index) => (<TableRow key={row._id} row={row} />))}
                </tbody>
                
            </table>
        </>
    )
}
