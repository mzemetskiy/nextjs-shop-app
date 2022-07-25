import styles from "../../styles/cart.module.css"
import { useAppContext } from '../../components/context'
import Image from "next/dist/client/image"
import Link from "next/link"
import { useEffect } from "react"

const Cart = () => {
    const [cartItems, setCartItems] = useAppContext()
    let totalItems = 0
    cartItems.map(item => totalItems = totalItems + item.quantity)

    let firstRender
    useEffect(() => {
        setCartItems(JSON.parse(localStorage.getItem("cartItems")) || [])
        firstRender = true
    }, [])
    
    useEffect(() => {
        if(cartItems.length > 0) {firstRender = false}
        if(firstRender === false || firstRender === undefined) {
            localStorage.setItem("cartItems", JSON.stringify(cartItems))
        }
    }, [cartItems])

    const ItemList = () => {
        const List = ({name, price, quantity, category}) => {

            const productInCart = cartItems.some(e => e.name === `${name}`)
            function changeCart (action) {
                if (!productInCart) {
                  setCartItems(x => [...x, {name: name, category: category, price: price, quantity: 1}])
                }
                else if (cartItems.find(item => item.name === name).quantity === 1 && action === -1) {
                  setCartItems(x => x.filter(item => item != cartItems.find(item => item.name === name)))
                }
                else {
                  setCartItems(x => x.map(item => item.name === name ? {...item, quantity: (item.quantity + action)} : item))
                }
            }

            return (
                <div className={styles.list}>
                    <div className={styles.icon}>
                        <Image alt="" src={"/" + category + "/" + name.split(" ")[0].toLowerCase() + ".jpg"} layout={'fill'} objectFit={'cover'} />
                    </div>
                    <div className={styles.detail}>{name}</div>
                    <div className={styles.quantityDetails}>
                        <button onClick={() => changeCart(1)} className={styles.quantityButtons}>+</button>
                        <div className={styles.detail}>{quantity}</div>
                        <button onClick={() => changeCart(-1)} className={styles.quantityButtons}>-</button>
                    </div>
                    <div className={styles.detail}>${(price * quantity).toFixed(2)}</div>
                </div>
            )
        }

        let totalCost = 0
        {cartItems.map(item => totalCost = totalCost + (item.price * item.quantity))}

        return (
            <>
                <div id={styles.labels}>
                    <b className={styles.detail}>Image</b>
                    <b className={styles.detail}>Product</b>
                    <b className={styles.amount}>Amount</b>
                    <b className={styles.detail}>Price</b>
                </div>
                {cartItems.map(item => 
                    <List key={item.name} name={item.name} price={item.price} quantity={item.quantity} category={item.category} />)
                }
                <div id={styles.totalCost}><b id={styles.costNumber}>${totalCost.toFixed(2)}</b></div>
            </>
        )
    }

    const Checkout = () => {
        return (
            <div id={styles.checkoutWrapper}>
                <button id={styles.checkout}><Link href="/cart/checkout"><a id={styles.link}>Checkout</a></Link></button>
            </div>
        )
    }

    return (
        <main id={styles.main}>
            <div id={styles.container}>
                <h1 id={styles.title}>Shopping Cart</h1>
                <div id={styles.cart}>
                    <div id={styles.intro}>
                        <p>You have {totalItems != 1 ? `${totalItems} items` : `${totalItems} items`} in your shopping cart.</p>
                        {totalItems != 0 && <button onClick={() => setCartItems([])} id={styles.clearCart}>Clear Cart</button>}
                    </div>
                    {totalItems != 0 && <ItemList />}
                </div>
            </div>
            {totalItems != 0 && <Checkout />}
        </main>
     );
}
 
export default Cart;