import Link from "next/link";
import {useRouter} from "next/router";
import styles from "../../../styles/Home.module.scss";
import Logo from "../logo/logo";
import SearchBar from "../search/Search";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Layout({children}){
    const router = useRouter();
    return (
        <>
            <div className="wrapper">
                <div className={styles.navigationContainer}>
                    <Link href="/">
                        <a className={styles.titleSmall}>Holidaze</a>
                    </Link>
                    <label className={styles.hamburgerLabel} htmlFor={styles.hamburgerMenu}>
                        <FontAwesomeIcon icon={faBars} className={styles.faBars}/>
                    </label>
                    <input type="checkbox" id={styles.hamburgerMenu}/> 
                    <nav className={styles.nav}>
                        <ul>
                            <Link href="/">
                                <a className={styles.logo}><Logo/></a>
                            </Link>
                            <Link href="/accomodations">
                                <a className={router.pathname == "/accomodations" ? "active" : ""}>Accomodations</a>
                            </Link>
                            <Link href="/contact">
                                <a className={router.pathname == "/contact" ? "active" : ""}>Contact</a>
                            </Link>
                        </ul>
                        <SearchBar/>
                    </nav>
                </div>
                {children}
            </div>
            <footer className={styles.footer}>
                <div className={styles.footerDiv}>
                    <p>Holidaze</p>
                    <p>Copyright 2022</p>
                </div>
                <div>
                <Link href="/adminLogin">
                    <a>Admin</a>
                </Link>
                </div>
            </footer>
        </>
    )
}