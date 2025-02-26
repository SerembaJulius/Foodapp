import { StyleSheet, Image, Text, View } from 'react-native';
import Colors from '../constants/Colors';
import products from '../../assets/data/products';
import {Product} from '../types'
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
    <View style={styles.container}>
    <Image source={{uri: product.image || defaultPizzaImage }} style={styles.image}/>
    <Text style={styles.title}>{product.name}</Text>
    <Text style={styles.price}>${product.price}</Text>
  </View>
  );
}

export default ProductListItem

const styles = StyleSheet.create({
  container: {
    backgroundColor:'white',
    padding:10,
    borderRadius:20
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
