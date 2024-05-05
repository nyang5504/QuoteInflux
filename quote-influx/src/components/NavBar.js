import styles from './NavBar.module.css';
import { Link } from 'react-router-dom';

const NavBar = ({username}) => {

    return(
        <div id={styles.header}>
            <Link to={'/'}><div id={styles.logo}>QuoteInflux</div></Link>
            <div className={styles.navlinks}>
                <ul>
                    <li><Link to='/'>Generate Quote</Link></li>
                    <li><Link to='/collection'>My Collection</Link></li>
                    <li><Link to={username?'/account':'/signin'}>Account</Link></li>
                </ul>
            </div>
        </div>
    );
}
export default NavBar;