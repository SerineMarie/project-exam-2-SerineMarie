import Link from "next/link";
import {useRouter} from "next/router";
import styles from "../../../styles/Home.module.scss";
import Logo from "../logo/logo";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { clearStorage } from "../../../utils/storage";

export default function AdminLayout({children}){
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
                            <Link href="/adminPage">
                                <a className={styles.logo}><Logo/></a>
                            </Link>
                            <Link href="/adminBooking">
                                <a className={router.pathname == "/adminBooking" ? "active" : ""}>Enquiries</a>
                            </Link>
                            <Link href="/adminContact">
                                <a className={router.pathname == "/adminContact" ? "active" : ""}>Messages</a>
                            </Link>
                            <Link href="/newEst">
                                <a className={router.pathname == "/newEst" ? "active" : ""}>New establishment</a>
                            </Link> 
                        </ul>
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
                <Link href="/">
                    <a className={styles.logOut} onClick={() => clearStorage()}>Log out</a>
                </Link>
                </div>
            </footer>
        </>
    )
}