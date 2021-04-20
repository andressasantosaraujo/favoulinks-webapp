import React, {useEffect, useState} from 'react'
import axios from "axios";

const UpdateBookMark = (props) => {
    const [bookMark, setBookMark] = useState(props.currentBookMark)

    const handleInputChange = (event) => {
        const { name, value } = event.target

        setBookMark({ ...bookMark, [name]: value })
    }

    useEffect(() => {
        setBookMark(props.currentBookMark)
    }, [props])

    const url = 'https://4jtjbb4yi8.execute-api.us-east-2.amazonaws.com/favoulinks';

    const updateBookMark = (bookMark) => {
        axios.put(`${url}/bookmarks`, bookMark)
            .then((resp) => {
                if(resp.status === 200) {
                    props.updateBookMark(resp.data.url, resp.data)
                    props.handleClose()
                }
            })
            .catch(error => console.log(`Error: ${error}`));
    }

    return (
        <form ref={props.formRef}
            onSubmit={(event) => {
                event.preventDefault()
                updateBookMark(bookMark);
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
        </form>
    )
}

export default UpdateBookMark
