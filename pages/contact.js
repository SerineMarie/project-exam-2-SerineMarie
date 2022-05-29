import { BASE_URL } from '../constans/api';
import axios from "axios";
import styles from "../styles/Home.module.scss";
import Layout from '../components/common/layout/Layout';
import Heading from '../components/common/heading/Heading';
import Head from '../components/common/head/Head';
import ContactForm from '../components/form/ContactForm';
import DisplayMessage from '../components/common/displayMessage/DisplayMessage';

export default function Contact(props) {
  return (
    <Layout>
      <Head title="Contact"/>
      <div className={styles.container}>
        <Heading title="Contact"/>
        <ContactForm/>
      </div>
    </Layout>
  )
}

export async function getStaticProps(){
  const contactUrl = BASE_URL + "/contactpages?populate=*";
  let contactpage = [] ;

  try {
    const response = await axios.get(contactUrl)
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