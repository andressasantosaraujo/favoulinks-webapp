import React, { useState } from 'react'
import axios from "axios";

const NewBookMark = (props) => {
    const initialBookMark = { title: '', url: '', category: '' }
    const [bookMark, setBookMark] = useState(initialBookMark)

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setBookMark({ ...bookMark, [name]: value })
    }

    const url = 'https://4jtjbb4yi8.execute-api.us-east-2.amazonaws.com/favoulinks';

    const addBookMark = (bookMark) => {
        axios.post(`${url}/bookmarks`, bookMark)
            .then((resp) => {
                if(resp.status === 201) {
                    props.newBookMark(resp.data)
                    setBookMark(initialBookMark)
                }
            })
            .catch(error => console.log(`Error: ${error}`));
    }

    return (
        <form
            onSubmit={event => {
                event.preventDefault()
                if (!bookMark.title || !bookMark.url || !bookMark.category) return
                addBookMark(bookMark)
            }}
        >
            <label>Title</label>
            <input
                type="text"
                name="title"
                value={bookMark.title}
                onChange={handleInputChange}
            />
            <label>URL</label>
            <input
                type="text"
                name="url"
                value={bookMark.url}
                onChange={handleInputChange}
            />
            <label>Category</label>
            <input
                type="text"
                name="category"
                value={bookMark.category}
                onChange={handleInputChange}
            />
            <button>Add new bookmark</button>
        </form>
    )
}

export default NewBookMark
