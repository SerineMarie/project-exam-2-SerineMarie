import styles from "../styles/Home.module.scss";
// import { useState } from "react";
import { BASE_URL } from '../constans/api';
import axios from "axios";
import AdminLayout from "../components/common/layout/AdminLayout";
import Head from '../components/common/head/Head';
import DisplayMessage from "../components/common/displayMessage/DisplayMessage";
import Heading from "../components/common/heading/Heading";
import Link from "next/link";

export default function AdminLogIn(props){
    console.log(props)
    return (
        <AdminLayout>
            <Head title={props.adminPage.data.attributes.title}/>
            <div className={styles.container}>
                <Heading title={props.adminPage.data.attributes.title}/>
                <div className={styles.adminContent}>
                    <Link href="/enquiries">
                        <a>Enquiries</a>
                    </Link>
                    <Link href="/messages">
                        <a>Messages</a>
                    </Link>
                    <Link href="/newEst">
                        <a>Create new establishment</a>
                    </Link>
                </div>
            </div>
        </AdminLayout>
    )
}


export async function getStaticProps(){
    const admin = BASE_URL + "/adminpage";
    let adminPage = [];
  
    try {
      const response = await axios.get(admin);
      console.log(response.data);
      adminPage = response.data;
      
    } catch(error){
      DisplayMessage(`An error occured`, {error})
      console.log(error)
    }
  
    return {
      props: {
        adminPage: adminPage,
      },
    };
  }
  