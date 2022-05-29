import styles from "../styles/Home.module.scss";
import { BASE_URL } from '../constans/api';
import axios from "axios";
import {useRouter} from "next/router";
import Layout from '../components/common/layout/Layout';
import Head from "../components/common/head/Head";
import DisplayMessage from "../components/common/displayMessage/DisplayMessage";

export default function Home(props) {

  const router = useRouter();
  return (
    <Layout>
      <Head title={props.content.data.attributes.title}/>
          <div className={styles.containerTop}>
            <div className={styles.imageContainer}>
              <img src={props.content.data.attributes.images.data[1].attributes.url} className={styles.bgImage}></img>
            </div>
            <section className={styles.section}>
              <div className={styles.infoCard}>
                <h1 className={styles.mainTitle}>{props.content.data.attributes.name}</h1>
                <p>{props.content.data.attributes.description}</p>
              </div>
              <button type="button" onClick={() => router.push('/accomodations')} className={styles.bookBtn}>BOOK NOW</button>
            </section>
          </div>
          <div className={styles.containerBottom}>
            <div className={styles.imageContainer}>
              <img src={props.content.data.attributes.images.data[2].attributes.url} className={styles.bgImage2}></img>
            </div>
            <div className={styles.cardContainer}>
              {props.content.data.attributes.hotels.data.map((shortcut) =>{
                return <section className={styles.cardContent} key={shortcut.id}>
                          <a href={`/accomodation/${shortcut.attributes.slug}`}>
                            <img src={props.content.data.attributes.images.data[4].attributes.url} className={styles.images}></img>
                            <h2 key={shortcut.attributes.id} className={styles.subTitle}>{shortcut.attributes.name}</h2>
                            <p>{shortcut.attributes.excerpt}</p>
                            <button className={styles.infoBtn}>Read more...</button>
                          </a>
                        </section>
                })}
            </div>
          </div>
    </Layout>
  )
}

export async function getStaticProps(){
  const homeApi = BASE_URL + "/homepage?populate=*";
  let content = [];

  try {
    const response = await axios.get(homeApi);
    content = response.data;
    
  } catch(error){
    DisplayMessage(`An error occured`, {error})
    console.log(error)
  }

  return {
    props: {
      content: content
    },
  };
}