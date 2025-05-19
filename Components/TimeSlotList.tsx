import { FlatList } from "react-native-gesture-handler"
import { SlotGroup } from "../Utils/generateSlots"
import { StyleSheet, Text, View } from "react-native"

const TimeSlotList = ({data}: any)=>{
 return(
    <FlatList 
    data={data}
    keyExtractor={(item)=>item.index}
    renderItem={({item})=>(
        <View style={styles.container}>
            <Text>{item.date}</Text>
            <View>
                {item.slots.map((slot, index)=>{
                    <View style={styles.slot}>
                        <Text>{slot}</Text>
                    </View>
                })}
            </View>
        </View>
    )}
    contentContainerStyle={{paddingBottom: 40}}
    />
 )
}
export default TimeSlotList;

const styles = StyleSheet.create({
    container :{
        marginBottom: 20,
        borderRadius: 8,
        padding: 12,
        elevation: 2,
        shadowOpacity: 0.1,

    },
    date : {
        fontSize: 16 ,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    slot : {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        margin: 4
    }
})