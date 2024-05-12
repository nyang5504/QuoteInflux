import { useNavigate } from "react-router-dom";
import styles from './Profile.module.css';
import { useState } from "react";

const Profile = ({username, setUsername, setError}) => {
    const navigate = useNavigate();
    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [confirmOldPassword, setConfirmOldPassword] = useState("");
    const [editing, setEditing] = useState("");
    const [errMsg, setErrMsg] = useState("");

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

    const handleEditUsername = async () => {
        try {
            const response = await fetch("http://localhost:8000/user/editUsername", {
                method: "PUT",
                credentials: "include",
                headers: {
					'Content-Type': 'application/json',
				},
                body: JSON.stringify({confirmOldPassword, newUsername})
            });
            const json = await response.json();
            console.log(json.message);
            if(response.ok) {
                console.log("Updated username");
                setUsername(newUsername);
            } else if(response.status == 404) {
                setError(json.message);
                setUsername("");
            } else {
                setErrMsg(json.message);
            }
        } catch(e) {
            console.log(e);
        }
    }

    const handleEditPassword = async () => {
        if(newPassword!=confirmNewPassword) {
            console.log('Passwords not the same');
            setErrMsg("Passwords not the same");
            return;
        }
        try {
            const response = await fetch("http://localhost:8000/user/editPassword", {
                method: "PUT",
                credentials: "include",
                headers: {
					'Content-Type': 'application/json',
				},
                body: JSON.stringify({confirmOldPassword, newPassword})
            });
            const json = await response.json();
            if(response.ok) {
                console.log("Updated password");
            } else if(response.status == 404) {
                setError(json.message);
                setUsername("");
            }else {
                setErrMsg(json.message);
            }
        } catch(e) {
            console.log(e);
        }
    }

    return(
        <div id={styles.profileContainer}>
            <div id={styles.heading}>
                Account Information
            </div>
            <div id={styles.infosContainer}>
                {errMsg && <div id={styles.error}>{errMsg}</div>}
                <div className={styles.infoContainer}>
                    <div className={styles.personalInfo}>
                        Username:&nbsp;{username}
                    </div>
                    <span className={styles.editContainer}>
                        {editing=="username" &&
                            <div>
                                <div>
                                    <label htmlFor="newUsername">New Username:</label>
                                    <input id="newUsername" type="text" onChange={(e) => setNewUsername(e.target.value)}/>
                                    
                                </div>
                                <div>
                                    <label htmlFor="editUserConfirmOldPass">Confirm Old Password:</label>
                                    <input id="editUserConfirmOldPass" type="password" onChange={(e) => setConfirmOldPassword(e.target.value)}/>
                                </div>
                            </div>   
                        }
                        <div className={styles.editToggle}>
                            {editing=="username"? 
                            <div className={styles.save}>
                                <button className={styles.profileBtn} onClick={handleEditUsername}>Save</button>
                                <div className={styles.edit} onClick={()=>setEditing("")}>
                                    cancel
                                </div>
                            </div >
                            : <div className={styles.edit} onClick={()=>setEditing("username")}>edit</div>}
                        </div>
                    </span>
                </div>
                <div className={styles.infoContainer}>
                    <div className={styles.personalInfo}>
                        Password:&nbsp;&nbsp;********
                    </div>
                    <div className={styles.editContainer}>
                        {editing=="password" &&
                            <div>
                                <div>
                                    <label htmlFor="newPass">New Password:</label>
                                    <input id="newPass" type="password" onChange={(e) => setNewPassword(e.target.value)}/>
                                </div>
                                <div>
                                    <label htmlFor="confirmNewPass">Confirm New Password:</label>
                                    <input id="confirmNewPass" type="password" onChange={(e) => setConfirmNewPassword(e.target.value)}/>
                                </div>
                                <div>
                                    <label htmlFor="editPassConfirmOldPass">Confirm Old Password:</label>
                                    <input id="editPassConfirmOldPass" type="password" onChange={(e) => setConfirmOldPassword(e.target.value)}/>
                                </div>
                            </div>
                        }
                        <div className={styles.editToggle}>
                            {editing=="password"? 
                            <div className={styles.save}>
                                <button className={styles.profileBtn} onClick={handleEditPassword}>Save</button>
                                <div className={styles.edit} onClick={()=>setEditing("")}>
                                    cancel
                                </div>
                            </div >
                            : <div className={styles.edit} onClick={()=>setEditing("password")}>edit</div>}
                        </div>
                    </div>
                </div>
            </div>
            <div id={styles.logoutButton}>
                <button className={styles.profileBtn} id={styles.logoutBtn} onClick={handleLogOut}>Log out</button>
            </div>
        </div>
    );
}

export default Profile;