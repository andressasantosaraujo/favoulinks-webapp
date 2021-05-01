import {Form} from "react-bootstrap";
import React from "react";


const FormGroup = (props) => {
    return (
        <Form.Group controlId={props.name.toLocaleLowerCase()}>
            <Form.Label>{props.name}</Form.Label>
            <Form.Control type={props.type} placeholder={`Enter ${props.name}`} name={props.name.toLocaleLowerCase()}
                          onChange={props.onChange} value={props.value}/>
        </Form.Group>
    )
}

export default FormGroup
