import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = ({username, setUsername}) => {
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchProfile = async () => {
            try{
                const response = await fetch('http://localhost:8000/user/profile', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: "include"
                })
                if(response.ok){
                    const json = await response.json();
                    setUsername(json.username);
                } else {
                    setUsername("");
                    navigate('/signin');
                }
            } catch(error){
                navigate('/signin');
            }
        }
        if(username==="") {
            fetchProfile();
        }
    },[username]);

    const handleLogOut = async () => {
        try{
            const response = await fetch("http://localhost:8000/user/logout", {
                method: "POST",
                credentials: "include"
            });
            if (response.ok) {
                setUsername("");
                navigate('/signin');
              } else {
                console.error('Error signing out:', response.status);
              }
        } catch (e) {
            console.log(e);
        }
    }

    return(
        <div>
            my profile
            <div>
                user: {username}
            </div>
            <button onClick={handleLogOut}>Log out</button>
        </div>
    );
}

export default Profile;