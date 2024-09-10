import React, { useEffect, useState } from 'react';
import { ListGroup, Card } from 'react-bootstrap';

// Define the type for the socket prop
interface SocketIO {
  on(event: string, callback: (data: any) => void): void;
  off(event: string, callback?: (data: any) => void): void;
}

interface Message {
  userId: string;
  text: string;
}

type SimpleChatsProps = {
  socket: SocketIO;
};

const SimpleChats: React.FC<SimpleChatsProps> = ({ socket }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const userID = sessionStorage.getItem('userName') || 'Anonymous';

  useEffect(() => {
    const handleNewMessage = (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.on("message", handleNewMessage);

    // Cleanup on component unmount
    return () => {
      socket.off("message", handleNewMessage);
    };
  }, [socket]);

  return (
    <ListGroup>
      {messages.map((message, index) => (
        <ListGroup.Item key={index}>
          <Card>
            <Card.Body>
              <Card.Text
                style={{
                  color: message.userId === userID ? 'blue' : 'green',
                  float: message.userId === userID ? 'right' : 'left',
                  clear: 'both' // To clear floats for proper layout
                }}
              >
                <strong>{message.userId}</strong>: {message.text}
              </Card.Text>
            </Card.Body>
          </Card>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default SimpleChats;
