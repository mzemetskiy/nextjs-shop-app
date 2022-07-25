import styles from "../../styles/complete.module.css"

const Complete = () => {
    return ( 
        <div id={styles.container}>
            <h1 id={styles.title}>Thank you!</h1>
            <p id={styles.info}>Your order will be processed within the next 24 hours.</p>
        </div>
    );
}
 
export default Complete;