import { createContext, PropsWithChildren, useContext, useState } from "react";
import { CartItem, Product } from "types";

type CartType={
    items:CartItem[],
    addItem:(product:Product, size: CartItem['size'])=>void;
}

export const CartContext = createContext<CartType>({
    items: [],
    addItem:()=>{},

});

export const CartProvider =({children}: PropsWithChildren)=>{

    const [items, setItems] = useState<CartItem[]>([]);

    const addItem = (product: Product, size: CartItem['size']) => {
        //if already in cart, update quantity
        const newCartItem: CartItem ={
            id: '1',//generate
            product,
            product_id: product.id,
            size,
            quantity: 1,
        };

        setItems([newCartItem, ...items ]);
    };
    //update quantity

    console.log(items)

    return (
        <CartContext.Provider 
        value={{items, addItem}}>

            {children}

        </CartContext.Provider>
    )
}

export default CartProvider;

export const useCart = ()=> useContext(CartContext);