import styles from './TagList.module.css';

const TagList = ({currentTags}) => {
    return(
        <div id={styles.taglist}>
            <div className={styles.title}>Tag List</div>
            <div className={styles.tagsContainer}>
                {currentTags.map((tag, index) => (
                    <div id={`tag${index}`} className={styles.singleTag}>{tag}</div>
                ))}
            </div>
        </div>
    );
}
export default TagList;