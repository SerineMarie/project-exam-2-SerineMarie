import axios from "axios";
import { BASE_URL } from "../../constans/api";
import Head from "../../components/head/Head";
import Heading from "../../components/heading/Heading";
import Layout from "../../components/layout/Layout";


export default function Accomodation({hotel}){
    return (
        <Layout>
            <Head title={hotel.attributes.name}/>
            <Heading title={hotel.attributes.name}/>
            <h1>Hello</h1>
        </Layout>
    );
}

export async function getStaticPaths(){
    const hotelApi = BASE_URL + "/hotels?populate=*";
    try{
        const response = await axios.get(hotelApi);
        console.log(response)
        const accomodations = response.data.data;
        const paths = accomodations.map((accomodations)=>({
            params: {slug: accomodations.attributes.slug}
        }));
        console.log(paths);
        return {
            paths: paths, 
            fallback: false,
        };
    } catch(error){
        console.log(error)
    }
}

export async function getStaticProps({params}){
    const url = `${hotelApi}/${params.slug}`;
    let accomodation = null;
    try {
        const response = await axios.get(url);
        console.log(response.data);
        accomodation = response.data;
    } catch(error){
        console.log(error)
    }
    return {
        props: {accomodation: accomodation},
    }
}