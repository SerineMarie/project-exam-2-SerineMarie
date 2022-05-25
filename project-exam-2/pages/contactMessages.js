import styles from "../styles/Home.module.scss";
import { BASE_URL } from "../constans/api";
import axios from "axios";
import Heading from '../components/common/heading/Heading';
import Head from "../components/common/head/Head";
import DisplayMessage from "../components/common/displayMessage/DisplayMessage";
import AdminLayout from "../components/common/layout/AdminLayout";

export default function ContactMessages(props){
    console.log(props)
    return(
        <AdminLayout>
            {/* <Head title={props.messagesPage.data.attributes.title}/> */}
            <div className={styles.container}>
                {/* <Heading title={props.messagesPage.data.attributes.title}/> */}
            </div>
        </AdminLayout>
    )
}

export async function getStaticProps(){
    const messagesUrl = BASE_URL + "/contactPage";
    let messagesPage = [];
    try {
      const response = await axios.get(messagesUrl);
      console.log(response.data);
      messagesPage = response.data;
    } catch(error){
      DisplayMessage(`An error occured`, {error})
      console.log(error)
    }
    return {
      props: {
        messagesPage: messagesPage,
      },
    };
  }