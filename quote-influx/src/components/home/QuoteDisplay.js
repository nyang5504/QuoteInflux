import styles from './QuoteDisplay.module.css';
import reload from './reload.svg';
import { useState, useEffect } from 'react';

const QuoteDisplay = ({currentQuote, getRandom}) => {
    const [favorite, setFavorite] = useState(false);

    const handleFavorite = async() => {
        favorite ? unsaveQuote() : saveQuote();
        setFavorite(prev => !prev);
    }

    const saveQuote = async () => {
        try{
            const response = await fetch('http://localhost:8000/collection/quote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({currentQuote}),
        });
        } catch(error) {
            console.log("save favorite: ", error);
        }
    }

    const unsaveQuote = async () => {
        try{
            const response = await fetch(`http://localhost:8000/collection/quote/${currentQuote.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });
            //console.log(response);
        } catch(error) {
            console.log("unsave favorite: ", error);
        }
    }
    
    useEffect(() => {
        const getQuote = async () => {
            try {
                const response = await fetch(`http://localhost:8000/collection/quote/${currentQuote.id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include'
                });
                if(response.status == 200) {
                    console.log("should be yellow");
                    setFavorite(true);
                } 
                else{
                    console.log("should be white");
                    setFavorite(false);
                }
                console.log(response);
            } catch (e) {
                console.log("id undefined: " + e);
            }
        }
        if(currentQuote.id){
            getQuote();
        }
    }, [currentQuote]);

    return(
        <div id={styles.quoteContainer}>
            <div className={styles.icons}>
                <img src={reload} onClick={() => {getRandom(null)}}/>
                <svg onClick={handleFavorite}
                    enableBackground="new 0 0 50 50"
                    height="50px"
                    id="star"
                    version="1.1"
                    viewBox="0 0 50 50"
                    width="50px"
                    xmlSpace="preserve"
                >
                    <rect fill="none" height="50" width="50" />
                    <polygon
                        fill= {favorite ? "yellow" : "none"}
                        points="25,3.553 30.695,18.321 46.5,19.173 34.214,29.152 38.287,44.447 25,35.848 11.712,44.447 15.786,29.152 3.5,19.173 19.305,18.321"
                        stroke="#000000"
                        strokeMiterlimit="10"
                        strokeWidth="2"
                    />
                </svg>
            </div>
            <div className={styles.content}>{currentQuote.quote}</div>
            <div className={styles.author}>- {currentQuote.author}</div>
        </div>
    );
}
export default QuoteDisplay;