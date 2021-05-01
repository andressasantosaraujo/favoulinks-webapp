import React, {useEffect, useState} from 'react'
import axios from "axios";
import {Form} from 'react-bootstrap';
import FormGroup from "../atoms/FormGroup";

const UpdateBookMark = (props) => {
    const [bookMark, setBookMark] = useState(props.currentBookMark)

    const handleInputChange = (event) => {
        const { name, value } = event.target

        setBookMark({ ...bookMark, [name]: value })
    }

    useEffect(() => {
        setBookMark(props.currentBookMark)
    }, [props])

    const url = 'https://p0y7ssu9ik.execute-api.us-east-2.amazonaws.com/Prod/favoulinks/';

    const updateBookMark = (bookMark) => {
        axios.put(`${url}`, bookMark)
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
            <FormGroup name="Title" type="text" onChange={handleInputChange} value={bookMark.title} />
            <FormGroup name="URL" type="text" onChange={handleInputChange} value={bookMark.url} />
            <FormGroup name="Category" type="text" onChange={handleInputChange} value={bookMark.category} />
        </Form>
    )
}

export default UpdateBookMark
