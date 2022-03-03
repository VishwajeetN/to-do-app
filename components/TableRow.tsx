import { NextPage } from "next";
import React from 'react'
import { Todo } from "../utils/types"
import Link from "next/link"

interface TodoListProps {
    //    row: Array<Todo>
    row: Todo
}

export const TableRow: NextPage<TodoListProps> = ({ row }) => {
    return (
        < >
        <tr className="bg-gray-100" key={row._id} >
            <td key={row._id}>
                <Link href={`/todos/${row._id}`}>
                    <h3 className="border-2 px-3 py-3 text-blue-700 cursor-pointer transition duration-150 ease-out hover:ease-in ">
                        {row.item} - {row.completed ? <span className="text-white bg-green-600">Completed</span> : <span className="text-white bg-red-600">Incomplete</span>}
                    </h3>
                </Link>
            </td>
            </tr>
        </>
    )
}
