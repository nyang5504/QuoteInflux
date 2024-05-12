import styles from "./TimedOutModal.module.css";
import { useNavigate } from "react-router-dom";
const TimedOutModal = ({setError}) => {
    const navigate = useNavigate();
    const handleMoveToLogin = () => {
        setError("");
        navigate('/signin');
    }
    return (
        <div className={styles.modalContainer}>
            <div className={styles.modalContents}>
                <div>Session timed out</div>
                <button onClick={handleMoveToLogin}>Login Again</button>
            </div>
        </div>
    );
}

export default TimedOutModal;