import React, {useEffect, useState} from 'react'
import axios from "axios";
import {Form} from 'react-bootstrap';

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
        <Form ref={props.formRef}
            onSubmit={(event) => {
                event.preventDefault()
                updateBookMark(bookMark);
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

export default UpdateBookMark
