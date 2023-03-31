import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';
import './Shop.css';
import Cart from '../Cart/Cart';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([])

    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);

    const handleAddToCart = (product) => {
        // cart.push(product); 
        let newCart=[];
        // const newCart = [...cart, product];
        // if product doesn't exist set product quantity=1
        // if exist update quantity by 1
        let exists = cart.find(pd=>pd.id === product.id);
        if(!exists){
            product.quantity=1;
            newCart=[...cart,product];
        }
        else{
            exists.quantity=exists.quantity+1;
            const remaining= cart.filter(pd=>pd.id !== product.id);
            newCart=[...remaining,exists]

        }
        setCart(newCart);
        // add in local Storage 
        addToDb(product.id);
    }

    // get from localStorage 
    useEffect(()=>{
        let storedCart= getShoppingCart();
        const savedCart=[];
        // console.log(storedCart);

        // step 1: get id 
        for(let id in storedCart){
            // step 2 :get the product by using id 
            let addedProduct=products.find(product => product.id === id);
            if(addedProduct){
                // step 3: get quantity of the product 
                let quantity=storedCart[id];
                addedProduct.quantity=quantity;
                // step 4: add the addedProduct to the savedCart 
                savedCart.push(addedProduct);
            }
            // console.log(addedProduct);
        }
        // step 5: set the cart
        setCart(savedCart);
        
    },[products])

    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product
                        key={product.id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                    ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;