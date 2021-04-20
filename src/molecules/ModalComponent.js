import {Button, Modal} from "react-bootstrap";
import UpdateBookMark from "./UpdateBookMark";
import NewBookMark from "./NewBookMark";
import React, {useRef} from "react";

const ModalComponent = (props) => {
    const newBookRef = useRef("newBookRef")
    const updateBookRef = useRef("updateBookRef")

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            {props.update ? (
                <div>
                    <Modal.Header>
                        <Modal.Title>Update bookmark</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <UpdateBookMark setUpdate={props.setUpdate} currentBookMark={props.currentBookMark}
                                        updateBookMark={props.updateBookMark} formRef={updateBookRef}
                                        handleClose={props.handleClose}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => {
                            props.setUpdate(false)
                            props.handleClose()
                        }}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={(event) => updateBookRef.current.requestSubmit()}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </div>
            ) : (
                <div>
                    <Modal.Header>
                        <Modal.Title>New bookmark</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <NewBookMark newBookMark={props.newBookMark} formRef={newBookRef}
                                     handleClose={props.handleClose}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => {
                            props.setUpdate(false)
                            props.handleClose()
                        }}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={(event) => newBookRef.current.requestSubmit() }>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </div>
            )}
        </Modal>
    )
}

export default ModalComponent
