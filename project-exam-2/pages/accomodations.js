import { BASE_URL } from '../constans/api';
import axios from "axios";
import Layout from '../components/layout/Layout';
import Heading from '../components/heading/Heading';
import Head from "../components/head/Head";


export default function Accomodations(props) {
  console.log(props)
  return (
    <Layout>
      <Head title="Accomodations"/>
      <div>
        <Heading title="Accomodations"/>
        {props.accomodations.data.map((hotels) => {
          return <>
              <h2 key={hotels.attributes.id}>{hotels.attributes.name}</h2>
              <div>IMAGES</div>
            </>
        })}
      </div>
    </Layout>
  )
}


export async function getStaticProps(){
  const accomodationsApi = BASE_URL + "hotels?populate=*";
  let accomodations = [];

  try {
    const response = await axios.get(accomodationsApi)
    console.log(response.data);
    accomodations = response.data
  } catch(error){
    console.log(error)
  }
  return {
    props: {
        accomodations: accomodations,
    }
  }
}