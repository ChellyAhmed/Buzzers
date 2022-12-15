import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';


function Home() {
    const [rooms, setRooms] = useState([]);


    //Connect to socket.io:
    const socket = io('http://localhost:3001');

    //Get all rooms :
    const fetchRooms = async () => {
        try {
            const response = await fetch('http://localhost:3001/rooms/',
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            const data = await response.json();
            setRooms(data.rooms);
        } catch (error) {
            console.error(error);
            console.log(error);
        }
    }


    useEffect(() => {

        fetchRooms();

        //Console log hello when receive roomUpdate from socket.io:
        socket.on('roomUpdate', () => {
            fetchRooms();
        });

    }, []);

    if (!rooms.length) {
        return <h1>Loading...</h1>;
    }


    return (
        <div>
            <h1>Home</h1>
            {rooms.map((room) => (
                <div key={room._id}>
                    <h2>{room.name}</h2>
                    <ul>
                        {room.users.map((user) => (
                            <li key={user.name}>{user.name} : {
                                user.buzz ? 'Buzzed' : 'Not Buzzed'
                            }</li>
                        ))}
                    </ul>

                </div>
            ))}
        </div>
    )
}
export default Home;
