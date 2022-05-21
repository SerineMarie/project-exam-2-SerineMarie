import styles from "../styles/Home.module.scss";
import { BASE_URL } from "../constans/api";
import axios from "axios";
import {useRouter} from "next/router";
import Layout from '../components/layout/Layout';
import Heading from '../components/heading/Heading';
import Head from "../components/head/Head";
import DisplayMessage from "../components/displayMessage/DisplayMessage";
import { saveIDParam } from "../utils/storage";

export default function Accomodations(props){
  const router = useRouter();
  return (
    <Layout>
      <Head title="Accomodations"/>
      <div className={styles.container}>
        <Heading title="Accomodations"/>
        {props.accomodations.data.map((hotel)=>{
          return(
            <div key={hotel.slug} className={styles.accomodationsCard}>
              <a href={`hotels/${hotel.attributes.slug}`} className={styles.accomodationsContent}>
                <img src={hotel.attributes.images.data[0].attributes.url} className={styles.images}></img>
                <h2 className={styles.subTitle}>{hotel.attributes.name}</h2>
                <p className={styles.location} key={hotel.attributes.id}>{hotel.attributes.location}</p>
                <p className={styles.excerpt} key={hotel.attributes.id}>{hotel.attributes.excerpt}</p>
                <p className={styles.price} key={hotel.attributes.id}>Price from: ${hotel.attributes.price}</p>
              </a>
              <button key={hotel.id} onClick={() => router.push('/booking')} className={styles.bookBtn}>BOOK NOW</button>
            </div>
          );
        })}
      </div>
    </Layout>
  )
}

export async function getStaticProps(){
  const accomodationsApi = BASE_URL + "/hotels?populate=*";
  let accomodations = [];

  try {
    const response = await axios.get(accomodationsApi)
    console.log(response.data);
    accomodations = response.data
  } catch(error){
    DisplayMessage(`An error occured`, {error})

    console.log(error)
  }
  return {
    props: {
        accomodations: accomodations,
    }
  }
}