import styles from "../styles/Home.module.scss";
import AdminLayout from "../components/common/layout/AdminLayout";
import Head from '../components/common/head/Head';
import Heading from "../components/common/heading/Heading";
import Link from "next/link";

export default function AdminLogIn(props){
    return (
        <AdminLayout>
            <Head title="Admin homepage"/>
            <div className={styles.container}>
                <Heading title="Admin homepage"/>
                <div className={styles.adminContent}>
                    <Link href="/adminBooking">
                        <a>Bookings</a>
                    </Link>
                    <Link href="/adminContact">
                        <a>Contact messages</a>
                    </Link>
                    <Link href="/newEst">
                        <a>Create new establishment</a>
                    </Link>
                </div>
            </div>
        </AdminLayout>
    )
}