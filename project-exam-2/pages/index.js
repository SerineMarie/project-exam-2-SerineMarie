import styles from "../styles/Home.module.scss";
import { BASE_URL } from '../constans/api';
import axios from "axios";
import Layout from '../components/layout/Layout';
import Head from '../components/head/Head';
import Heading from "../components/heading/Heading";


export default function Home(props) {
  console.log(props)
  return (
    <Layout>
      <Head title={props.content.data.attributes.title}/>
      <div>
        <Heading title={props.content.data.attributes.title}/>
        <p className={styles.infocard}>{props.content.data.attributes.description}</p>
      </div>
      <div className={styles.cardContainer}>
          {props.content.data.attributes.hotels.data.map((shortcut) =>{
            return <div className={styles.card}>
                      <div>IMAGE</div>
                      <h2 key={shortcut.attributes.id} className={styles.title}>{shortcut.attributes.name}</h2>
                      <p>{shortcut.attributes.excerpt}</p>
                      <button>Read more...</button>
                  </div>
          })}
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
    console.log(error)
  }

  return {
    props: {
      content: content,
    },
  };
}

export async function getImages(){
  const imageApi = BASE_URL + "upload/files";

  try {
    const response = await fetch(imageApi);
    const images = response.json();
    console.log(images)
    images.then(function(result){
      console.log(result)
    })
  } catch(error){
    console.log(error)
  }
}

getImages()