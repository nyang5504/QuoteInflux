import styles from './QuoteDisplay.module.css';
import reload from './reload.svg';
import star from './star.svg';

const QuoteDisplay = ({currentQuote, getRandom}) => {
    return(
        <div id={styles.quoteContainer}>
            <div className={styles.icons}>
                <img src={reload} onClick={() => {getRandom(null)}}/>
                <img src={star}/>
            </div>
            <div className={styles.content}>{currentQuote.quote}</div>
            <div className={styles.author}>- {currentQuote.author}</div>
        </div>
    );
}
export default QuoteDisplay;