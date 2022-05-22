import Link from "next/link";
import {useRouter} from "next/router";
import styles from "../../styles/Home.module.scss";
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
                    <label className={styles.hamburgerLabel} for={styles.hamburgerMenu}>
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
                <Link href="adminLogin">
                    <a>Admin</a>
                </Link>
                </div>
            </footer>
        </>
    )
}




// const { pathname } = document.location;

// const adminLogin = a function;

// let adminLink = `<Link href="/admin" className="${pathname === "/admin" ? "active" : ""}">Log Out</Link>`


// export default function menu(){
//     const { pathname } = document.location;

//     const container = document.querySelector(".menu-container")

//     const username = getUser();

//     let logInLink = `<a href="login.html" class ="${pathname === "/login.html" ? "active" : ""}">Log in <a/>`;

//     if(username){
//         logInLink = `<span> Welcome ${username}!</span>`;
//     }

//     container.innerHTML = `<div class="menu">
//                                 <a href="/" class="${pathname === "/" ? "active" : ""}">Home</a>
//                                 ${logInLink}
//                             </div>`
// }