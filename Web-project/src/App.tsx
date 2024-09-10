import { useEffect, useState } from "react";
import { io } from 'socket.io-client';
import React from "react";
import { Route, Routes } from 'react-router-dom'
import HomePage from "./Pages/HomePage";
import ChatPage from "./Pages/ChatPages";


const socket = io('http://127.0.0.1:5000');

function App() {


  useEffect(() =>{
    console.log("Connecting to server...");
    socket.on("connect", () => {
      console.log("Connected to server ");
    
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
  
    });
  }, []);


  return (
    <Routes>
      <Route path="/home" element={<HomePage socket={socket} />} />
      <Route path="/chat" element={<ChatPage socket={socket} />}></Route>
    </Routes>
  )
};

export default App;