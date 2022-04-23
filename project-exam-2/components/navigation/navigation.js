import Link from "next/link";

export default function Navigation({children}){
    return (
        <>
            <nav>
                <Link href="/">
                    <a>LOGO</a>
                </Link>
                <Link href="/accomodations">
                    <a>Accomodations</a>
                </Link>
                <Link href="/contact">
                    <a>Contact</a>
                </Link>
                <p>SEARCH FIELD</p>
            </nav>
        </>
    )
}