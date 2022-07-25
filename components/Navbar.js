import styles from "../styles/Navbar.module.css"
import Link from "next/link"
import Image from "next/dist/client/image";
import { useAppContext } from '../components/context'

const Navbar = () => {
    const [cartItems, setCartItems] = useAppContext()

    let totalItems = 0
    cartItems.map(item => totalItems = totalItems + item.quantity)

    return ( 
        <nav id={styles.nav}>
            <div className={styles.iconContainer}><Link href="/"><a><Image alt="" src="/bowl.svg" height={60} width={60}/></a></Link></div>
            <Link href="/cart"><a id={styles.link}>
                <div id={styles.cart}>
                    <div className={styles.iconContainer}>
                        <Image alt="" src="/cart.svg" height={60} width={60}/>
                    </div>
                    <div id={styles.cartItems}>{totalItems}</div>
                </div>
            </a></Link>
        </nav>
    );
}
 
export default Navbar;
