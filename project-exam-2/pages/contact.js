import { BASE_URL } from '../constans/api';
import axios from "axios";
import styles from "../styles/Home.module.scss";
import Layout from '../components/layout/Layout';
import Heading from '../components/heading/Heading';
import Head from '../components/head/Head';
import ContactForm from '../components/form/ContactForm';
import DisplayMessage from '../components/displayMessage/DisplayMessage';


export default function Contact(props) {
  console.log(props)
  return (
    <Layout>
      <Head title={props.contactpage.data.attributes.title}/>
      <div className={styles.container}>
        <Heading title={props.contactpage.data.attributes.title}/>
        <ContactForm/>
      </div>
    </Layout>
  )
}


export async function getStaticProps(){
  const contactApi = BASE_URL + "/contactpage";
  let contactpage = [] ;

  try {
    const response = await axios.get(contactApi)
    console.log(response.data);
    contactpage = response.data;
  } catch(error){
    DisplayMessage(`An error occured`, {error})
    console.log(error)
  }
  return {
    props: {
      contactpage: contactpage,
    }
  }
}