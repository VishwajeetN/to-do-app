import { Console } from "console"
import { useRouter } from "next/router"
import { FormEvent, FormEventHandler, useRef } from "react"
import { Todo } from "../../utils/types"

// Define props
interface CreateProps {
    url: string
}

// Define Component
function Create(props: CreateProps) {
    // get the next route
    const router = useRouter()

    // since there is just one input we will use a uncontrolled form
    const item = useRef<HTMLInputElement>(null)

    // Function to create new todo
    const handleSubmit: FormEventHandler<HTMLFormElement> = async event => {
        event.preventDefault()

        // construct new todo, create variable, check it item.current is not null to pass type checks
        let todo: Todo = { item: "", completed: false }
        if (null !== item.current) {

            todo = { item: item.current.value, completed: false }

            if ( todo.item !== '') {
                // Make the API request
                await fetch(props.url, {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(todo),
                })

                // after api request, push back to main page
                router.push("/")
            }
            else {
                alert(`Please enter To Do !!!`)
            }


        }


    }

    return (
        <div className="border-2 bg-gray-100 ml-3">
            <h1 className="text-2xl font-bold ml-3 mb-8">Create a New Todo</h1>

            <form onSubmit={handleSubmit}>
                <input type="text" ref={item} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-80 ml-3 mb-5" placeholder="Complete the test"></input>

                <input className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-10 border-b-4 border-blue-700 hover:border-blue-500 ml-3 rounded" type="submit" value="create todo"></input>

                <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 ml-3 rounded" type="button"
                    onClick={() => {
                        router.push("/")
                    }}
                >
                    Cancel
                </button>
            </form>
        </div>
    )
}

// export getStaticProps to provie API_URL to component
export async function getStaticProps(context: any) {
    return {
        props: {
            url: process.env.API_URL,
        },
    }
}

// export component
export default Create


