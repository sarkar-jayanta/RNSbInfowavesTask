import { FlatList, StyleSheet, Text, View } from "react-native";

const TimeSlotList = ({ data }: any) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.container}>
          <Text style={styles.date}>{item.date}</Text>
          <View style={styles.slotContainer}>
            {item.slots.map((slot: string, index: number) => (
              <View key={index} style={styles.slot}>
                <Text>{slot}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
      contentContainerStyle={{ paddingBottom: 40 }}
    />
  );
};

export default TimeSlotList;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#f0f0f0',
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  slotContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  slot: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    margin: 4,
    backgroundColor: '#dfe6e9',
  },
});
