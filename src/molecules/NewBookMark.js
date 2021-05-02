import React, {useState} from 'react'
import {Form} from 'react-bootstrap';
import FormGroup from "../atoms/FormGroup";
import Api from '../service/Api'

const NewBookMark = (props) => {
    const initialBookMark = { title: '', url: '', category: '' }
    const [bookMark, setBookMark] = useState(initialBookMark)

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setBookMark({ ...bookMark, [name]: value })
    }

    const addBookMark = (bookMark) => {
        Api.addBookMark(bookMark).then((resp) => {
            if (resp.status === 201) {
                props.newBookMark(resp.data)
                setBookMark(initialBookMark)
                props.handleClose()
            }
        })
    }

    return (
        <Form ref={props.formRef}
                onSubmit={event => {
                    event.preventDefault()
                    if (!bookMark.title || !bookMark.url || !bookMark.category) return
                    addBookMark(bookMark)
                }}
        >
            <FormGroup name="Title" type="text" onChange={handleInputChange} value={bookMark.title} />
            <FormGroup name="URL" type="text" onChange={handleInputChange} value={bookMark.url} />
            <FormGroup name="Category" type="text" onChange={handleInputChange} value={bookMark.category} />
        </Form>
    )
}

export default NewBookMark
