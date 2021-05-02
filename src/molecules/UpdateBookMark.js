import React, {useEffect, useState} from 'react'
import {Form} from 'react-bootstrap';
import FormGroup from "../atoms/FormGroup";
import Api from '../service/Api'

const UpdateBookMark = (props) => {
    const [bookMark, setBookMark] = useState(props.currentBookMark)

    const handleInputChange = (event) => {
        const { name, value } = event.target

        setBookMark({ ...bookMark, [name]: value })
    }

    const updateBookMark = (bookMark) => {
        Api.updateBookMark(bookMark).then((resp) => {
            if (resp.status === 200) {
                props.updateBookMark(resp.data.url, resp.data)
                props.handleClose()
            }
        })
    }

    useEffect(() => {
        setBookMark(props.currentBookMark)
    }, [props])

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
