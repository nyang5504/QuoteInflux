import styles from './SideBar.module.css';
import {useState } from "react";
import expand from './expand.svg';

const SideBar = ({tagList, getRandom}) => {
    const [expanded, setExpanded] = useState(false);

    const handleGetRandom = async(tag) => {
        try {
            await getRandom(tag);
        } catch {
            console.log("handle get random error");
        }
    }

    const expandAllCategories = () => {
        setExpanded(!expanded);
    }

    return(
        <div id={styles.sidebar}>
            <div id={styles["top-categories"]}>Top Categories</div>
            <div 
                id={styles["categories-container"]} 
                style={{maxHeight: expanded ? "100rem" : ""}}>
                {
                    tagList.map((tag, index) => (<div id={`category${index}`} className={styles['category']}  onClick={() => {handleGetRandom(tag)}} >{tag}</div>))
                }
            </div>
            <div id={styles['expand-button']} style={expanded ? {transform: 'scaleY(-1)'} : {}} onClick={() => {expandAllCategories()}}>
                <img src={expand} alt='expand-icon'/>
            </div>
        </div>
    );
}

export default SideBar;