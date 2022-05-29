import styles from "../styles/Home.module.scss";
import { BASE_URL } from "../constans/api";
import axios from "axios";
import {useRouter} from "next/router";
import Layout from '../components/common/layout/Layout';
import Heading from '../components/common/heading/Heading';
import Head from "../components/common/head/Head";
import DisplayMessage from "../components/common/displayMessage/DisplayMessage";

export default function Accomodations(props){
  const router = useRouter();
  return (
    <Layout>
      <Head title="Accomodations"/>
      <div className={styles.container}>
        <Heading title="Accomodations"/>
        <div className={styles.accomodationsContainer}>
          {props.accomodations.data.map((hotel)=>{
            let imageUrl = "http://placehold.jp/fafafa/0016ff/150x150.png?text=No%20image";
            if(hotel.attributes.images.data){
              imageUrl = hotel.attributes.images.data[0].attributes.url;
            }
            return ( <div key={hotel.id} className={styles.accomodationsCard}>
                          <img src={imageUrl} className={styles.images}></img>
                          <div className={styles.accomodationsText}>
                            <h2 className={styles.subTitle}>{hotel.attributes.name}</h2>
                            <p className={styles.location} key={hotel.attributes.id}>{hotel.attributes.location}</p>
                            <p className={styles.excerpt} key={hotel.attributes.id}>{hotel.attributes.excerpt}</p>
                            <a href={`/accomodation/${hotel.attributes.slug}`} className={styles.readMoreBtn}>Read more...</a>
                            <p>Price from: ${hotel.attributes.price}</p>
                          </div>
                          <button key={hotel.id} onClick={() => router.push('/booking')} className={styles.bookBtn}>BOOK NOW</button>
                      </div>
            );
          })}
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps(){
  const accomodationsApi = BASE_URL + "/hotels?populate=*";
  let accomodations = [];

  try {
    const response = await axios.get(accomodationsApi)
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