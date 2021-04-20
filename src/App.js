import React, {useEffect, useState} from 'react'
import BookMarkGrid from './molecules/BookMarkGrid'
import NewBookMark from './molecules/NewBookMark'
import UpdateBookMark from './molecules/UpdateBookMark'
import HeaderComponent from './molecules/HeaderComponent'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import styled from 'styled-components'
import {Button, Modal} from 'react-bootstrap';

const Container = styled.div`
    background: linear-gradient(180deg, transparent, #F7F7F7);
    height: 100vh;
    padding-right: 5%;
    padding-left: 5%;
`;

const App = () => {

    const [bookMarks, setBookMarks] = useState([])

    const url = 'https://4jtjbb4yi8.execute-api.us-east-2.amazonaws.com/favoulinks';

    useEffect(() => {
        getBookMark();
    }, []);

    const getBookMark = () => {
        axios.get(`${url}/bookmarks`)
            .then((resp) => {
                setBookMarks(resp.data)
            })
            .catch(error => console.log(`Error: ${error}`));
    }

    const newBookMark = (bookMark) => {
        setBookMarks([...bookMarks, bookMark])
    }

    const initialBookMark = {title: '', url: '', category: ''}
    const [currentBookMark, setCurrentBookMark] = useState(initialBookMark)

    const deleteBookMark = (url) => {
        const urlAPI = 'https://4jtjbb4yi8.execute-api.us-east-2.amazonaws.com/favoulinks';
        axios.delete(`${urlAPI}/bookmarks?url=${url}`)
            .then((resp) => {
                if (resp.status === 200) {
                    setBookMarks(bookMarks.filter((bookMark) => bookMark.url !== url))
                }
            })
            .catch(error => console.log(`Error: ${error}`));
    }

    const [update, setUpdate] = useState(false)

    const updateRow = (bookMark) => {
        setUpdate(true)
        setCurrentBookMark({title: bookMark.title, url: bookMark.url, category: bookMark.category})
    }

    const updateBookMark = (url, updatedBookMark) => {
        setUpdate(false)
        setBookMarks(bookMarks.map((bookMark) => (bookMark.url === url ? updatedBookMark : bookMark)))
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Container className="">
            <HeaderComponent handleShow={handleShow}/>
            <div className="flex-large">
                <Modal show={show} onHide={handleClose}>
                    {update ? (
                        <div>
                            <Modal.Header closeButton>
                                <Modal.Title>Update bookmark</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <UpdateBookMark setUpdate={setUpdate} currentBookMark={currentBookMark}
                                                updateBookMark={updateBookMark}/>
                            </Modal.Body>
                        </div>
                    ) : (
                        <div>
                            <Modal.Header closeButton>
                                <Modal.Title>New bookmark</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <NewBookMark newBookMark={newBookMark}/>
                            </Modal.Body>
                        </div>
                    )}
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <div className="flex-large">
                <BookMarkGrid bookMarks={bookMarks} deleteBookMark={deleteBookMark} updateRow={updateRow} handleShow={handleShow}/>
            </div>
        </Container>
    )
}

export default App
