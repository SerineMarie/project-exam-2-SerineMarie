import { BASE_URL } from '../constans/api';
import axios from "axios";
import Layout from '../components/layout/Layout';
import Heading from '../components/heading/Heading';
import Head from '../components/head/Head';


export default function Contact(props) {
  console.log(props)
  return (
    <Layout>
      <Head title={props.contactpage.data.attributes.title}/>
      <Heading title={props.contactpage.data.attributes.title}/>
    </Layout>
  )
}


export async function getStaticProps(){
  const contactApi = BASE_URL + "contactpage";
  let contactpage = [] ;

  try {
    const response = await axios.get(contactApi)
    console.log(response.data);
    contactpage = response.data;
  } catch(error){
    console.log(error)
  }
  return {
    props: {
      contactpage: contactpage,
    }
  }
}