import { StyleSheet, Image, Text, View, Pressable } from 'react-native';
import Colors from '../constants/Colors';
import products from '@assets/data/products';
import {Product} from '../types'
import { Link } from 'expo-router';
//default pizza image
export const defaultPizzaImage =
    'https://notjustdev-dummy.s3.u-east-2.amazonaws.com/foof/default.png';

//using real data

type ProductListItemProps={
    product: Product;
}
//custom component
const ProductListItem =({product}: ProductListItemProps)=>{
  return(
    // Link href={'/(tabs)/menu/[id]'} asChild>
    <Link href={`/menu/${product.id}`} asChild>

      <Pressable style={styles.container}>
        <Image source={{uri: product.image || defaultPizzaImage }} style={styles.image} resizeMode="contain"/>
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>

      </Pressable>
    </Link>
  );
}

export default ProductListItem

const styles = StyleSheet.create({
  container: {
    backgroundColor:'white',
    padding:10,
    borderRadius:20, 
    flex:1,
    maxWidth: '50%',
   },

  image:{
    width:'100%',
    aspectRatio:1,
  },
  title: {
    fontSize: 18,
    fontWeight:'600',
    marginVertical:18,
  },
  price:{
    color: Colors.light.tint,
    fontWeight:'bold',
  },
 
});
