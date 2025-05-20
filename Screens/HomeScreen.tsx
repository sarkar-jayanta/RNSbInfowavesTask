import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Availability, generateSlots, SlotGroup} from '../Utils/generateSlots';
import {getTimingData} from '../Redux/services/services';
import TimeSlotList from '../Components/TimeSlotList';

const HomeScreen = () => {
  const [slots, setSlots] = useState<SlotGroup[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchTimingsData = async () => {
    setLoading(true);
    try {
      const result: Availability[] = await getTimingData();
      const slotData = generateSlots(result);
      console.log(result);
      setSlots(slotData);
    } catch (error) {
      console.error('Failed to fetch timings:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTimingsData();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="black"
          style={StyleSheet.absoluteFill}
        />
      ) : (
        <TimeSlotList data={slots} />
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
