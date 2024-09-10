import React from "react";
import {Col, Container, Row } from 'react-bootstrap';
import SimpleChats from '../components/SimpleChat';
import SimpleMessage from '../components/SimpleMessage';
import SignOut from '../components/SignOut';


type ChatPageProps = {
    socket: any;
};

const ChatPage: React.FC<ChatPageProps> = ({ socket }) => {

    return (
        <Container>
            <Row>
                <Col className="pt-3">
                <SignOut socket={socket} children={undefined} />
                </Col>
            
            </Row>
            <Container>
                <SimpleChats socket={socket} />
            </Container>
            <SimpleMessage socket={socket} />
        </Container>
    );
};

export default ChatPage;