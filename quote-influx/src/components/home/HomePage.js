import SideBar from './SideBar.js';
import QuoteDisplay from './QuoteDisplay.js';
import TagList from './TagList.js';
import {useEffect, useState } from "react";
import styles from './HomePage.module.css';

const HomePage = () => {
    const [tagList, setTagList] = useState([]);
    const [currentQuote, setCurrentQuote] = useState({});
    
    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await fetch("https://api.quotable.io/tags?sortBy=quoteCount", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const arr = await response.json();
                let unique = [...new Set(arr)];
                unique = [...unique];
                const extracted = unique.filter(tagInfo => tagInfo.quoteCount>0).map((tagInfo) => {
                    return tagInfo.name;
                })
                setTagList(extracted);
            }
            catch (error) {
                console.log("error: ", error);
            }
        }
        fetchTags();
        getRandom();
    }, [])

    const getRandom = async (tag) => {
        let url = `https://api.quotable.io/random`;
        if(tag) {
            url += `?tags=${tag}`
        }
        const options = {method: 'GET', headers: {'Content-Type': 'application/json'}};
    
        try {
            const response = await fetch(url, options);
            const data = await response.json();
            setCurrentQuote({"quote": data.content, "author": data.author, "id": data._id, "tags": data.tags});
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <div id={styles.homepage}>
            <SideBar tagList={tagList} getRandom={getRandom}></SideBar>
            <div id={styles.display}>
                <QuoteDisplay currentQuote={currentQuote} getRandom={getRandom}></QuoteDisplay>
                <TagList currentTags={currentQuote.tags}></TagList>
            </div>
        </div>
    )
}
export default HomePage;