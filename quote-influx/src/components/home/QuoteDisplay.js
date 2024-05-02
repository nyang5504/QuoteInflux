import styles from './QuoteDisplay.module.css';
import reload from './reload.svg';
// import star from './star.svg';

const QuoteDisplay = ({currentQuote, getRandom}) => {
    const handleFavorite = async() => {
        handleStarColor();
        console.log(currentQuote);
        const response = await fetch('http://localhost:8000/quote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({currentQuote}),
        });
        
    }


    const handleStarColor = () => {
        const starSvg = document.getElementById('star');
        const polygon = starSvg.querySelector('polygon');
        const fill = polygon.getAttribute('fill');
        if(fill === 'none'){
            polygon.setAttribute('fill', 'yellow');
        }
        else{
            polygon.setAttribute('fill', 'none');
        }
    }

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
                        fill="none"
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