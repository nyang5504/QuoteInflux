import { useNavigate } from "react-router-dom";
import styles from './Profile.module.css';

const Profile = ({username, setUsername}) => {
    const navigate = useNavigate();

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
        <div id={styles.profileContainer}>
            <div id={styles.heading}>
                Account Information
            </div>
            <div id={styles.infosContainer}>
                <div className={styles.infoContainer}>
                    <div className={styles.personalInfo}>
                        Username:&nbsp;{username}
                    </div>
                    <div className={styles.edit}>
                        edit
                    </div>
                </div>
                <div className={styles.infoContainer}>
                    <div className={styles.personalInfo}>
                        Password:&nbsp;&nbsp;********
                    </div>
                    <div className={styles.edit}>
                        edit
                    </div>
                </div>
            </div>
            <div id={styles.logoutButton}>
                <button onClick={handleLogOut}>Log out</button>
            </div>
        </div>
    );
}

export default Profile;