import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';


type HomePageProps = {
    socket: any;
}

const HomePage: React.FC<HomePageProps> = ({socket}) => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');


    const handleSubmit = (e: any) => {
        e.preventDefault()
        let userName = e.target.username.value
        sessionStorage.setItem('userName', userName)
        navigate("/chat")
    };
    return (
        <form className="home_container" onSubmit={handleSubmit}>
            <h2 className="home_header">Sign in to Open Chat</h2>
            <label htmlFor="username">Username</label>
            <input
            type="text"
            minLength={6}
            name="username"
            id="username"
            className="username__input"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            />
            <button className="home__cta">SIGN IN</button>
        </form>
    );
};

export default HomePage