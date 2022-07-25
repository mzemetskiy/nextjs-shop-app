import styles from '../styles/Home.module.css'
import { useAppContext } from '../components/context'
import { useState, useEffect } from 'react'
import data from '../public/data'
import Image from 'next/image'

export default function Home() {
  const [cartItems, setCartItems] = useAppContext()

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

  const [selectedFilter, setSelectedFilter] = useState("all")
  const selectedOptionStyles = {
    backgroundColor: "#FF7F50",
    color: "#FFFFFF"
  }

  const filterProducts = (category) => {
    setSelectedFilter(category)
  }

  const ProductPreview = ({category, name, price}) => {
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

    const ChangeQuantityButton = () => {
      return (
        <div className={styles.changeQuantity}>
          <button className={styles.changeQuantityButton} onClick={() => changeCart(-1)}>-</button>
          {cartItems.find(item => item.name === name).quantity === 1 ? 
            "Quantity: 1" : 
            `Quantity: ${cartItems.find(item => item.name === name).quantity}`
          }
          <button className={styles.changeQuantityButton} onClick={() => changeCart(1)}>+</button>
        </div> 
      )
    }

    const AddItemButton = () => {
      return (
        <button className={styles.addToCart} onClick={() => changeCart(1)}>ADD TO CART</button>
      )
    }

    return (
      <div className={styles.product}>
        <div className={styles.imgHolder}>
          <Image alt="" src={"/" + category + "/" + name.split(" ")[0].toLowerCase() + ".jpg"} layout={'fill'} objectFit={'cover'} />
        </div>
        <div className={styles.centerInfo}>
          <h2 className={styles.title}>{name}</h2>
          <small className={styles.small}>${price}</small>
        </div>
        {cartItems.some(e => e.name === `${name}`) ? <ChangeQuantityButton /> : <AddItemButton />}
        
      </div>
    )
  }

  return (
    <main id={styles.main}>
      <ul id={styles.sidebar}>
        <li onClick={() => filterProducts("all")} style={selectedFilter === "all" ? selectedOptionStyles : {}}>All Products</li>
        <li onClick={() => filterProducts("fruit")} style={selectedFilter === "fruit" ? selectedOptionStyles : {}}>Fruits</li>
        <li onClick={() => filterProducts("vegetables")} style={selectedFilter === "vegetables" ? selectedOptionStyles : {}}>Vegetables</li>
        <li onClick={() => filterProducts("grains")} style={selectedFilter === "grains" ? selectedOptionStyles : {}}>Grains</li>
        <li onClick={() => filterProducts("dairy")} style={selectedFilter === "dairy" ? selectedOptionStyles : {borderStyle: "none"}}>Dairy</li>
      </ul>
      <div id={styles.products}>
        {data.filter(item => {
          if (selectedFilter === "all" || selectedFilter === item.category) return item
        }).map(product => (
          <ProductPreview key={product.name} category={product.category} name={product.name} price={product.price} />
        ))}
      </div>
    </main>
  )
}
