import axios from "axios";
import { useRouter } from "next/router";
import Head from "../components/head/Head";
import Heading from "../components/heading/Heading";
import Layout from "../components/layout/Layout";
import { BASE_URL } from "../constans/api";
import BookingForm from "../components/form/BookingForm";
import styles from '../styles/Home.module.scss'
import DisplayMessage from "../components/displayMessage/DisplayMessage";



export default function Booking (props){
    console.log(props);
    const router = useRouter();
    const {id} = router.query;

    console.log(id)
    return(
        <Layout>
            <Head title={props.bookingpage.data.attributes.title}/>
            <div className={styles.container}>
                <Heading title={props.bookingpage.data.attributes.title}/>
                <BookingForm/>
            </div>
        </Layout>
    )
}

export async function getStaticProps(){
    const bookingApi = BASE_URL + "/booking"
    let bookingpage = [];
    try{
        const response = await axios.get(bookingApi);
        console.log(response.data);
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