import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Availability, generateSlots, SlotGroup } from '../Utils/generateSlots';
import { getTimingData } from '../Redux/services/services';
import { SafeAreaView } from 'react-native-safe-area-context';
import TimeSlotList from '../Components/TimeSlotList';

const HomeScreen = () => {

  const [slots, setSlots] = useState<SlotGroup[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);

  const fetchTimingsdata = async()=>{
    const result : Availability[] = await getTimingData();
    if(result!= null){
      const slotData = generateSlots(result)
      setSlots(slotData)
    }else{
      console.log("something went wrong");
    }
  }

  useEffect(()=>{

  },[])

  return (
    <SafeAreaView style= {styles.container}>
      {loading ? <ActivityIndicator size="large" color="black" /> : <TimeSlotList data={slots} />}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'green',
  },
});
