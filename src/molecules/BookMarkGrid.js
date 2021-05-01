import React from 'react'
import styled from 'styled-components'
import Card from '../atoms/Card'

const Container = styled.div`
    display: flex;
    justify-content: start;
    flex-flow: row wrap;
`;

const BookMarkGrid = (props) => (
    <Container>
        {props.bookMarks.length > 0 ? (
            props.bookMarks.map((bookMark) => (
                <Card key={bookMark.url} handleShow={props.handleShow} updateRow={props.updateRow}
                      deleteBookMark={props.deleteBookMark} bookMark={bookMark}/>
            ))) : (<div className="container"> No bookmarks ...</div>)}
    </Container>
)

export default BookMarkGrid
