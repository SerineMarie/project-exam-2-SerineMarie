import styles from "../styles/Home.module.scss";
import { BASE_URL } from "../constans/api";
import axios from "axios";
import Heading from '../components/common/heading/Heading';
import Head from "../components/common/head/Head";
import DisplayMessage from "../components/common/displayMessage/DisplayMessage";
import AdminLayout from "../components/common/layout/AdminLayout";

export default function AdminContact(props){
    return(
        <AdminLayout>
            <Head title="Contacts"/>
            <div className={styles.container}>
                <Heading title="Contacts"/>
                <div className={styles.contactContent}>
                {props.adminContact.data.map((contacts) =>{
                    return( <div className={styles.contactContainer} key={contacts.slug}>
                              <h2 className={styles.subTitle}>Contact number: {contacts.id}</h2>
                              <p>From: {contacts.attributes.email}</p>
                              <p>Name: {contacts.attributes.fullname}</p>
                              <p>Message: {contacts.attributes.contactMessage}</p>
                            </div> 
                  )  
                })}
                </div>
            </div>
        </AdminLayout>
    )
}
export async function getStaticProps(){
    const adminContactUrl = BASE_URL + "/contactpages?populate=*";
    let adminContact = [];
  
    try {
      const response = await axios.get(adminContactUrl);
      adminContact = response.data;
      
    } catch(error){
      DisplayMessage(`An error occured`, {error})
      console.log(error)
    }
  
    return {
      props: {
        adminContact: adminContact,
      },
    };
  }
  