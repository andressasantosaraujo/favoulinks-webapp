import React, {useState} from 'react'
import axios from "axios";
import {Form} from 'react-bootstrap';

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
                    props.handleClose()
                }
            })
            .catch(error => console.log(`Error: ${error}`));
    }


    return (
        <Form ref={props.formRef}
                onSubmit={event => {
                    event.preventDefault()
                    if (!bookMark.title || !bookMark.url || !bookMark.category) return
                    addBookMark(bookMark)
                }}
        >
            <Form.Group controlId="title" >
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Enter title" name="title"
                              onChange={handleInputChange} value={bookMark.title}  />
            </Form.Group>

            <Form.Group controlId="url" >
                <Form.Label>URL</Form.Label>
                <Form.Control type="text" placeholder="Enter URL" name="url"
                              onChange={handleInputChange} value={bookMark.url} />
            </Form.Group>
            <Form.Group controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Control type="text" placeholder="Enter category" name="category"
                              onChange={handleInputChange}  value={bookMark.category} />
            </Form.Group>
        </Form>
    )
}

export default NewBookMark
