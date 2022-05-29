import axios from "axios";
import Head from "../components/common/head/Head";
import Heading from "../components/common/heading/Heading";
import Layout from "../components/common/layout/Layout";
import { BASE_URL } from "../constans/api";
import BookingForm from "../components/form/BookingForm";
import styles from '../styles/Home.module.scss'
import DisplayMessage from "../components/common/displayMessage/DisplayMessage";



export default function Booking (props){
    return(
        <Layout>
            <Head title="Booking"/>
            <div className={styles.container}>
                <Heading title="Booking"/>
                <BookingForm/>
            </div>
        </Layout>
    )
}

export async function getStaticProps(){
    const bookingApi = BASE_URL + "/bookings?populate=*"
    let bookingpage = [];
    try{
        const response = await axios.get(bookingApi);
        bookingpage = response.data;
    } catch(error){
        DisplayMessage(`An error occured`, {error})
        console.log(error)
    }
    return {
        props: {
            bookingpage: bookingpage,
        }
    }
}