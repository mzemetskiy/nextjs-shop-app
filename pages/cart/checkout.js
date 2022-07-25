import { useAppContext } from '../../components/context'
import styles from "../../styles/checkout.module.css"
import { useState, useEffect } from 'react'
import Link from 'next/dist/client/link'

const Checkout = () => {
    const [cartItems, setCartItems] = useAppContext()
    const [shippingDetails, setShippingDetails] = useState({name: "", address1: "", address2: "", city: ""})

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

    const handleSubmit = (event) => {
        event.preventDefault()
    }

    const handleChange = (event) => {
        const {name, value} = event.target
        setShippingDetails(prevShippingDetails => ({...prevShippingDetails, [name]: value}))
    }

    const formNotFilled = {
        cursor: "not-allowed",
        backgroundColor: "#84b3ff"
    }

    const formFilled = {
        cursor: "pointer",
        backgroundColor: "#0645AD"
    }

    const isFormFilled = () => {
        if (shippingDetails.name != "" && shippingDetails.address1 != "" && shippingDetails.city != "") return true
        else return false
    }

    const ItemSummary = ({name, quantity, price}) => {
        return (
            <div className={styles.itemSummary}>
                <div>{name} x {quantity}</div>
                <div>${(price * quantity).toFixed(2)}</div>
            </div>
        )
    }

    let totalCost = 0
    {cartItems.map(item => totalCost = totalCost + (item.price * item.quantity))}

    const processOrder = () => {
        localStorage.clear() 
        setCartItems([])
    }

    return ( 
        <main id={styles.main}>
            <div id={styles.content}>
                <h1 id={styles.title}>Shipping</h1>
                <div id={styles.flex}>
                    <form id={styles.shippingForm} onSubmit={handleSubmit}>
                        <label className={styles.label}>Name</label>
                        <input className={styles.input} type="text" name="name" value={shippingDetails.name} onChange={handleChange} />
                        <label className={styles.label}>Address</label>
                        <input id={styles.input2} type="text" name="address1" value={shippingDetails.address1} onChange={handleChange} placeholder="Line 1" />
                        <input className={styles.input} type="text" name="address2" value={shippingDetails.address2} onChange={handleChange} placeholder="Line 2" />
                        <label className={styles.label}>City</label>
                        <input className={styles.input} type="text" name="city" value={shippingDetails.city} onChange={handleChange} />
                        <Link href={isFormFilled() ? "/cart/complete" : "/cart/checkout"}>
                            <a>
                                <button onClick={isFormFilled() ? processOrder : () => {/*pass*/}} style={isFormFilled() ? formFilled : formNotFilled} id={styles.submit}>Place Order</button>
                            </a>
                        </Link>
                    </form>
                    <div id={styles.summary}>
                        <h3 id={styles.subtitle}>Order Summary</h3>
                        {cartItems.map(item => <ItemSummary key={item.name} name={item.name} quantity={item.quantity} price={item.price} />)}
                        <div id={styles.total}><b>Total</b><b>${totalCost.toFixed(2)}</b></div>
                    </div>
                </div>
            </div>
        </main>
    );
}
 
export default Checkout;