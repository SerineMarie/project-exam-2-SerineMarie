import styles from "../styles/Home.module.scss";
import AdminLayout from "../components/common/layout/AdminLayout";
import Head from "../components/common/head/Head";
import Heading from "../components/common/heading/Heading";
import NewEstForm from "../components/form/NewEstForm";

export default function NewEst(props){
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
  