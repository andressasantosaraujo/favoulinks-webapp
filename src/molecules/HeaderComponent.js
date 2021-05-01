import React from 'react'
import styled from 'styled-components'

const Container = styled.header`
    margin-bottom: 5%;

`;
const Logo = styled.div`
    margin-bottom: 30px;
`;

const Navbar = styled.nav`
    justify-content: space-around;
    align-content: space-around;
    display: flex;
    flex-flow: row wrap;
`;

const Image = styled.img`
    position: relative;
    left: 260px;
    top: 40px;
`;

const Title = styled.h1`
    font-family: 'Eagle Lake', cursive;
    text-shadow: 2px 4px 3px rgba(0,0,0,0.3);
`;

const Link = styled.a`
    padding: 10px;
    display: flex;
    flex-flow: row;
    align-items: center;
`;

const Icon = styled.i`
    margin-right: 10px;
    line-height: 0;
`;

const HeaderComponent = (props) => (
    <Container>
        <Navbar className="navbar navbar-expand-lg navbar-light">
            <Logo>
                <Image src="logo.png" width="128" height="128"/>
                <Title>FavouLinks</Title>
            </Logo>
            <div className="container-fluid">
                <div className="navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="btn btn-secondary" aria-current="page"
                                  onClick={() => {
                                      props.handleShow()
                                  }}>
                                <Icon className="bi bi-plus-square" />Add bookmark
                            </Link>
                        </li>
                    </ul>
                    <form className="d-flex" onSubmit={() => {

                    }}>
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-secondary" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </Navbar>
    </Container>
)

export default HeaderComponent
