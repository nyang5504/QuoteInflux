import { useEffect, useState } from "react";
import QuoteDisplay from '../../components/home/QuoteDisplay';
import TagList from '../../components/home/TagList';
const Collection = () => {

    const [myCollection, setMyCollection] = useState([]);
    useEffect(()=> {
        const getCollection = async () => {
            const data = await fetch("http://localhost:8000/collection/collection", {
                method: 'GET',
                headers: {
                    // 'Authorization': token
                }
            });
            setMyCollection(data.collectionArr);
        }
        getCollection();
    },[]);
    return(
        <div>My Collection</div>
        // {myCollection.map((myQuote) => (
        //     <div>
        //         <QuoteDisplay quote={{quote: myQuote.quote, author: myQuote.author}}/>
        //         <TagList currentTags={myQuote.tags}/>
        //     </div>
        // ))}
    )
}

export default Collection;