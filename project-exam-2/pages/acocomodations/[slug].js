import axios from "axios";
import { BASE_URL } from "../../constans/api";
import Head from "../../components/head/Head";
import Heading from "../../components/heading/Heading";
import Layout from "../../components/layout/Layout";

export default function Accomodations({hotels}){
    return (
        <Layout>
            <Head title="name of hotel"/>
            <Heading title="name of hotel"/>
        </Layout>
    )
}

export async function getStaticPaths(){
    const hotelApi = BASE_URL + ""
    try{
        const response = await axios.get(BASE_URL);
        console.log(response.data)
        const hotel = response.data.data
        const paths = hotel.map((hotel) ({
            params: {slug: hotel.slug},
        }));

        console.log(paths)

        return {
            paths: paths, 
            fallback: false
        };
    } catch(error){
        console.log(error)
    }
}