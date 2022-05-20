import styles from "../styles/Home.module.scss";
import { BASE_URL } from "../constans/api";
import axios from "axios";
import Layout from '../components/layout/Layout';
import Heading from '../components/heading/Heading';
import Head from "../components/head/Head";
import DisplayMessage from "../components/displayMessage/DisplayMessage";

export default function Accomodations(props){
  return (
    <Layout>
      <Head title="Accomodations"/>
      <div className={styles.container}>
        <Heading title="Accomodations"/>
        {props.accomodations.data.map((hotel)=>{
          return(<a key={hotel.slug} href={`hotel/${hotel.attributes.slug}`} className={styles.accomodationsCard}>
                    <img src={hotel.attributes.images.data[0].attributes.url} className={styles.images}></img>
                    <h2 className={styles.subTitle}>{hotel.attributes.name}</h2>
                    <p className={styles.location} key={hotel.attributes.id}>{hotel.attributes.location}</p>
                    <p className={styles.excerpt} key={hotel.attributes.id}>{hotel.attributes.excerpt}</p>
                    <p className={styles.price} key={hotel.attributes.id}>Price from: ${hotel.attributes.price}</p>
                    <button className={styles.bookBtn}>BOOK NOW</button>
                  </a>
                  
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


// {props.accomodations.data.map((hotels) => {
//   return <div key={hotels.slug} href={`hotels/${hotels.slug}`} className={styles.accomodationsCard}>
//               <div>IMAGES</div>
//               <div className={styles.card}>
//                 <h2 key={hotels.attributes.id}>{hotels.attributes.name}</h2>
//                 <p key={hotels.attributes.id}>{hotels.attributes.location}</p>
//                 <p key={hotels.attributes.id}>{hotels.attributes.excerpt}</p>
//               </div>
//               <button className={styles.bookBtn}>BOOK NOW</button>
//           </div>
// })}