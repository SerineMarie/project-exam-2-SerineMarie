import styles from "../../styles/Home.module.scss"

export default function DisplayMessage({message}){
    return <h2 className={styles.message}>{message}</h2>
}