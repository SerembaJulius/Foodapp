import orders from "@assets/data/orders";
import OrderItemListItem from "components/OrderItemListItem";
import OrderListItem from "components/OrderListItem";
import { Stack,useLocalSearchParams } from "expo-router";
import { Text, View, FlatList } from "react-native";

export default function OrderDetailsScreen() {
    const {id} = useLocalSearchParams();

    //manually searching  for the order
    const order = orders.find((o)=>o.id.toString()===id);

    if(!order){
        <Text> Not found</Text>
    }
    console.log(order);

    return (
        <View style={{padding:10, gap:20, flex:1}}>
            <Stack.Screen options={{title: 'Order #${id}'}}/>
            <OrderListItem order={order}/>
            <FlatList data={order.order_items} renderItem={({item})=><OrderItemListItem item={item}/>}
            contentContainerStyle={{gap:10}}
            // ListFooterComponent={()=> <OrderListItem order={order}/>}
            />
        </View>
    );
}