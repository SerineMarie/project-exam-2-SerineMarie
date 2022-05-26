import styles from "../styles/Home.module.scss";
// import { useState } from "react";
// import { BASE_URL } from '../constans/api';
// import axios from "axios";
import Layout from '../components/common/layout/Layout';
import Head from '../components/common/head/Head';
// import DisplayMessage from "../components/common/displayMessage/DisplayMessage";
import Heading from "../components/common/heading/Heading";
import LoginForm from "../components/form/LoginForm";

export default function AdminLogIn(props){
    console.log(props)
    return (
        <Layout>
            <Head title="Admin login"/>
            <div className={styles.container}>
                <Heading title="Admin login"/>
                <LoginForm/>
            </div>
        </Layout>
    )
}


// export async function getStaticProps(){
//     const adminlogin = BASE_URL + "/adminlogin";
//     let logInPage = [];
  
//     try {
//       const response = await axios.get(adminlogin);
//       console.log(response.data);
//       logInPage = response.data;
      
//     } catch(error){
//       DisplayMessage(`An error occured`, {error})
//       console.log(error)
//     }
  
//     return {
//       props: {
//         logInPage: logInPage,
//       },
//     };
//   }
  