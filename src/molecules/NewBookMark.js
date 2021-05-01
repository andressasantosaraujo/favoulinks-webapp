import React, {useState} from 'react'
import axios from "axios";
import {Form} from 'react-bootstrap';
import FormGroup from "../atoms/FormGroup";

const NewBookMark = (props) => {
    const initialBookMark = { title: '', url: '', category: '' }
    const [bookMark, setBookMark] = useState(initialBookMark)

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setBookMark({ ...bookMark, [name]: value })
    }

    const url = 'https://p0y7ssu9ik.execute-api.us-east-2.amazonaws.com/Prod/favoulinks/';

    const addBookMark = (bookMark) => {
        axios.post(`${url}`, bookMark)
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
            <FormGroup name="title" type="text" onChange={handleInputChange} value={bookMark.title} />
            <FormGroup name="url" type="text" onChange={handleInputChange} value={bookMark.url} />
            <FormGroup name="category" type="text" onChange={handleInputChange} value={bookMark.category} />
        </Form>
    )
}

export default NewBookMark
