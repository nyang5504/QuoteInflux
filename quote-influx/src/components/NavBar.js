import styles from './NavBar.module.css';
const NavBar = () => {
    return(
        <div id={styles.header}>
            <div id={styles.logo}>QuoteInflux</div>
            <div className={styles.navlinks}>
                <ul>
                    <li>My Collection</li>
                    <li>Account</li>
                </ul>
            </div>
        </div>
    );
}
export default NavBar;