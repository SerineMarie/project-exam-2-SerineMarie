import styles from "../../../styles/Home.module.scss";

export default function Heading({title}){
    return <h1 className={styles.title}>{title}</h1>
}