import React from 'react'
import styled from 'styled-components'

const CardBoard = styled.div`
    display: flex;
    flex-flow: row;
    justify-content: space-between;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-flow: column;
    justify-content: space-between;`;

const Container = styled.div`
        display: flex;
    justify-content: space-between;
    flex-flow: row wrap;
`;

const Card = styled.div`
    width: 200px;
    height: 250px;
    box-shadow: 0 10px 6px -6px #777;
 `;

const Footer = styled.div`
    text-align: center;
`;

const Button = styled.button`
    display: block;
    border: 1px solid;
    border-radius: 4px;
    background: #F7F7F7;
    color: #000000;
    cursor: pointer;
    padding: 10px;
`;

const Text = styled.h5`
    font-weight: bold;
`;

const Icon = styled.i`
`;

const BookMarkGrid = (props) => (
    <Container className="">
        {props.bookMarks.length > 0 ? (
            props.bookMarks.map((bookMark) => (
                <Card className="card" key={bookMark.url}>
                    <div className="card-header">{bookMark.category}</div>
                    <CardBoard className="card-body">
                        <Text className="card-title">{bookMark.title}</Text>
                        <ButtonContainer>
                            <Button onClick={() => props.deleteBookMark(bookMark.url)}><Icon className="bi bi-trash-fill"/>
                            </Button>
                            <Button onClick={() => {
                                props.updateRow(bookMark)
                                props.handleShow()
                            }}><Icon className="bi bi-pencil-fill"/></Button>
                        </ButtonContainer>
                    </CardBoard>
                    <Footer className="card-footer">
                        <a rel="noreferrer" href={`https://${bookMark.url}`} target="_blank"
                           className="btn btn-primary">{bookMark.url}</a>
                    </Footer>
                </Card>
            ))) : (<div className="container"> No bookmarks ...</div>)}
    </Container>
)

export default BookMarkGrid
