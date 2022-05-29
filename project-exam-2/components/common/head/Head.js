import NextHead from "next/head";
export default function Head({ title = "" }) {
 return (
    <NextHead>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
    <link href="https://fonts.googleapis.com/css2?family=Anek+Odia:wght@300;400;500;600&display=swap" rel="stylesheet"></link>
        <title>
            {title}
            {title ? " | " : ""}Holidaze Booking
        </title>
        <link rel="icon" href="/favicon.ico" />
    </NextHead>
 );
}

