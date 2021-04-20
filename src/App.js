import React, {useEffect, useState} from 'react'
import BookMarkGrid from './molecules/BookMarkGrid'
import HeaderComponent from './molecules/HeaderComponent'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import styled from 'styled-components'
import ModalComponent from "./molecules/ModalComponent";

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
    const initialBookMark = {title: '', url: '', category: ''}
    const [currentBookMark, setCurrentBookMark] = useState(initialBookMark)
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
            <ModalComponent show={show} handleClose={handleClose} updateBookMark={updateBookMark}
                            setUpdate={setUpdate} currentBookMark={currentBookMark}
                            newBookMark={newBookMark} update={update}/>
            <div className="flex-large">
                <BookMarkGrid bookMarks={bookMarks} deleteBookMark={deleteBookMark} updateRow={updateRow} handleShow={handleShow}/>
            </div>
        </Container>
    )
}

export default App
