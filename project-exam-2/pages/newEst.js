import { BASE_URL } from "../constans/api";
import axios from "axios";
import styles from "../styles/Home.module.scss";
// import DisplayMessage from "../components/common/displayMessage/DisplayMessage";
import AdminLayout from "../components/common/layout/AdminLayout";
import Head from "../components/common/head/Head";
import Heading from "../components/common/heading/Heading";
import NewEstForm from "../components/form/NewEstForm";

export default function NewEst(props){
    console.log(props)
    return(
        <AdminLayout>
            <Head title="Create new est"/>
            <div className={styles.container}>
                <Heading title="Create new establishment"/>
                <NewEstForm/>
            </div>
        </AdminLayout>
    )
}


// export async function getStaticProps(){
//     const newEstUrl = BASE_URL + "/new-establishment";
//     let newEstPage = [];
  
//     try {
//       const response = await axios.get(newEstUrl);
//       console.log(response.data);
//       newEstPage = response.data;
      
//     } catch(error){
//       DisplayMessage(`An error occured`, {error})
//       console.log(error)
//     }
  
//     return {
//       props: {
//         newEstPage: newEstPage,
//       },
//     };
//   }
  