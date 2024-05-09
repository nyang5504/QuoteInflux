import styles from './QuoteCard.module.css';
const QuoteCard = ({quote, myCollection, setMyCollection}) => {

    const handleRemove = async() => {
        try{
            const response = await fetch(`http://localhost:8000/collection/quote/${quote.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });
            if(response.ok) {
                setMyCollection(prev => prev.filter(e => e.id!==quote.id));
                console.log("successfully removed");
            }
        } catch(error) {
            console.log("handleRemove: ", error);
        }
    }

    return(
        <div className={styles.cardContainer}>
            
            <div className={styles.removeIcon} onClick={handleRemove}>X</div>
            <div className={styles.cardQuote}>{quote.quote}</div>
            <div className={styles.authorContainer}>
                <div className={styles.cardAuthor}>- {quote.author}</div>
            </div>
            
            <div className={styles.tagsContainer}>
                {quote.tags.map((e)=>(
                    <div className={styles.cardTag}>{e}</div>
                ))}
            </div>
            
        </div>
    );
}
export default QuoteCard;