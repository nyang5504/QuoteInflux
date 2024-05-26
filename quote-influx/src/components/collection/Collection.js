import { useEffect, useState } from "react";
import QuoteCard from './QuoteCard';
import styles from './Collections.module.css';
const Collection = () => {
    const [myCollection, setMyCollection] = useState([]);

    useEffect(()=> {
        const getCollection = async () => {
            try{
                const response = await fetch("http://localhost:8000/collection/collection", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
                });
                const data = await response.json();
                setMyCollection(data.collectionArr);
            }catch (error){
                console.log("error: ", error);
            }
        }
        getCollection();
    },[]);

    return(
        <div className={styles.collectionContainer}>
            <div className={styles.titleContainer}>
                My Collection
            </div>
            <div className={styles.quotesContainer}>
                {myCollection ?
                myCollection.map((myQuote) => (
                    <div>
                        <QuoteCard quote={{quote: myQuote.quote, author: myQuote.author, tags: myQuote.tags, id: myQuote.id}} myCollection={myCollection} setMyCollection={setMyCollection}/>
                    </div>
                )):
                <div>Login to see your collection</div>
                }
            </div>
        </div>
    )
}

export default Collection;