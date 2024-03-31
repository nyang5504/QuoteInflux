import styles from './NavBar.module.css';
const NavBar = () => {
    return(
        <div>
            <div id={styles.logo}>QuoteInflux</div>
            <div className={styles.navlinks}>
                <ul>
                    <li>My Collection</li>
                    <li>Sign In</li>
                </ul>
            </div>
        </div>
    );
}
export default NavBar;