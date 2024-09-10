import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { Container, Form } from 'react-bootstrap';

// Define the type for the socket prop
interface SocketIO {
  emit(event: string, ...args: any[]): void;
}

type SimpleMessageInputProps = {
  socket: SocketIO;
};

const SimpleMessageInput: React.FC<SimpleMessageInputProps> = ({ socket }) => {
  const [messageText, setMessageText] = useState<string>("");

  const sendMessage = () => {
    const userId = sessionStorage.getItem('userName') || 'Anonymous';
    if (messageText.trim()) {
      socket.emit("message", { userId, text: messageText });
      setMessageText("");
    }
  };

  const handleEnterKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Container>
      <Form>
        <Form.Label style={{ fontFamily: 'Arial', color: 'lightgray' }}>
          Type Message Here
        </Form.Label>
        <Form.Control
          type="text"
          id="text"
          value={messageText}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setMessageText(e.target.value)}
          onKeyDown={handleEnterKey}
          autoComplete="off"
        />
      </Form>
    </Container>
  );
};

export default SimpleMessageInput;
