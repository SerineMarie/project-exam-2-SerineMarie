import styles from "../styles/Home.module.scss";
import Layout from '../components/common/layout/Layout';
import Head from '../components/common/head/Head';
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