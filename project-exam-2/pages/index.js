import styles from "../styles/Home.module.scss";
import { useState } from "react";
import { BASE_URL } from '../constans/api';
import axios from "axios";
import {useRouter} from "next/router";
import Layout from '../components/layout/Layout';
import Head from '../components/head/Head';
import DisplayMessage from "../components/displayMessage/DisplayMessage";


export default function Home(props) {
  console.log(props)

  const [filters, setFilters] = useState({s:``});

  const router = useRouter();
  return (
    <Layout>
      <Head title={props.content.data.attributes.title}/>
      <div className={styles.container}>
        <div className={styles.contentContainer}>
          <img src={props.content.data.attributes.images.data[1].attributes.url} className={styles.bgImage}></img>
          <section className={styles.section}>
            <p className={styles.infocard}>{props.content.data.attributes.description}</p>
            <button type="button" onClick={() => router.push('/accomodations')} className={styles.bookBtn}>BOOK NOW</button>
          </section>
        </div>
        <div className={styles.contentContainer}>
          <div className={`${styles.cardContainer} ${styles.card1}`}>
            {props.content.data.attributes.hotels.data.map((shortcut) =>{
              return <section className={styles.card}>
                  <a key={shortcut.id}>
                    <h2 key={shortcut.attributes.id} className={styles.subTitle}>{shortcut.attributes.name}</h2>
                    <p>{shortcut.attributes.excerpt}</p>
                    <button className={styles.infoBtn}>Read more...</button>
                  </a>
                </section>
              })}
          </div>
          <img src={props.content.data.attributes.images.data[0].attributes.url} className={styles.bgImage}></img>
        </div>
      </div>
    </Layout>
  )
}


export async function getStaticProps(){
  const homeApi = BASE_URL + "homepage?populate=*";
  let content = [];

  try {
    const response = await axios.get(homeApi);
    console.log(response.data);
    content = response.data;
    
  } catch(error){
    DisplayMessage(`An error occured`, {error})
    console.log(error)
  }

  return {
    props: {
      content: content,
    },
  };
}
