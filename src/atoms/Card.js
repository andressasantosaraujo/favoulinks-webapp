import React from "react";
import styled from "styled-components";

const CardBoard = styled.div`
    display: flex;
    flex-flow: row;
    justify-content: space-between;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-flow: column;
    justify-content: space-between;`;

const CardContainer = styled.div`
    width: 200px;
    height: 250px;
    box-shadow: 0 10px 6px -6px #777;
    margin: 10px;
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

const Card = (props) => {
 return (
     <CardContainer className="card">
         <div className="card-header">{props.bookMark.category}</div>
         <CardBoard className="card-body">
             <Text className="card-title">{props.bookMark.title}</Text>
             <ButtonContainer>
                 <Button onClick={() => props.deleteBookMark(props.bookMark.url)}><Icon className="bi bi-trash-fill"/>
                 </Button>
                 <Button onClick={() => {
                     props.handleShow()
                     props.updateRow(props.bookMark)
                 }}><Icon className="bi bi-pencil-fill"/></Button>
             </ButtonContainer>
         </CardBoard>
         <Footer className="card-footer">
             <a rel="noreferrer" href={`https://${props.bookMark.url}`} target="_blank"
                className="btn btn-primary">{props.bookMark.url}</a>
         </Footer>
     </CardContainer>
 )
}

export default Card
