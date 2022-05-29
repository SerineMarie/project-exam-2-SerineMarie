import styles from "../styles/Home.module.scss";
import { BASE_URL } from "../constans/api";
import axios from "axios";
import Heading from '../components/common/heading/Heading';
import Head from "../components/common/head/Head";
import DisplayMessage from "../components/common/displayMessage/DisplayMessage";
import AdminLayout from "../components/common/layout/AdminLayout";

export default function AdminBooking(props){
    return(
        <AdminLayout>
            <Head title="Bookings"/>
            <div className={styles.container}>
                <Heading title="Bookings"/>
                <div className={styles.bookingContent}>
                  {props.enquiryPage.data.map((bookings) =>{
                      return( <div className={styles.bookingContainer} key={bookings.id}>
                                <h2 className={styles.subTitle}>Booking {bookings.id}</h2>
                                <p>Name: {bookings.attributes.fullname}</p>
                                <p>How many: {bookings.attributes.howMany}</p>
                                <p>Check in date: {bookings.attributes.checkIn}</p>
                                <p>Check out date: {bookings.attributes.checkOut}</p>
                              </div>
                      )
                  })}
                </div>
            </div>
        </AdminLayout>
    )
}

export async function getStaticProps(){
    const enquiryUrl = BASE_URL + "/bookings?populate=*";
    let enquiryPage = [];
    try {
      const response = await axios.get(enquiryUrl);
      enquiryPage = response.data;
    } catch(error){
      DisplayMessage(`An error occured`, {error})
      console.log(error)
    }
    return {
      props: {
        enquiryPage: enquiryPage,
      },
    };
  }
  