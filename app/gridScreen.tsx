import React from 'react';
import { View, Text, StyleSheet, FlatList ,Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const data = [
  { id: '1', title: 'Profile', icon: 'person-outline' },
  { id: '2', title: 'Info', icon: 'information-circle-outline' },
  { id: '3', title: 'Data', icon: 'cloud-outline' },
  { id: '4', title: 'Messages', icon: 'chatbox-ellipses-outline' },
  { id: '5', title: 'Live Streaming', icon: 'videocam-outline' },
  { id: '6', title: 'Maintenance', icon: 'construct-outline' },
];

const GridScreen = () => {
  return (

    <View style={styles.container}>
      <View style={styles.container2}>
               <Image
                 source={require('../assets/images/ilyes.jpg')}
                 style={styles.logo2}
               />
   <Text style={styles.itemText2}>Ilyes Gharbi</Text>
      </View>
         <Image
                 source={require('../assets/images/coverpic.jpg')}
                 style={styles.logo}
               />
    <FlatList
  data={data}
  numColumns={3} // Ensure fixed columns
  key={`${data.length}-grid`} // Forces re-render when numColumns changes
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <View style={styles.gridItem}>
      <Ionicons name={item.icon} size={24} color="white" />
      <Text style={styles.itemText}>{item.title}</Text>
    </View>
  )}
/>

    </View>
  );
};

const styles = StyleSheet.create({
    logo: {
    width: '100%',
    height: 170,
    marginBottom: 52,
  borderRadius:50,
    elevation: 20,
  },
      logo2: {
    width: 30,
    height: 30,
margin:5,
    borderRadius:20
  },
  container: {
    flex: 1,
    
    padding: 16,
    backgroundColor: "#f8f8f8",
  },
    container2: {
marginBottom:30,
 flexDirection: "row",
    alignItems: "center",
  width:'100%',
  padding:5,
    backgroundColor: "#9003fc",
    borderRadius:20
  },
  gridItem: {
    flex: 1,
    margin: 8,
    padding: 20,
    backgroundColor: "#4e2eb0",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  itemText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 8, // Space between icon and text
  },
  itemText2: {
    color: "white",
    fontSize: 16,

    fontWeight: "600",
    marginLeft:10
  },
});

export default GridScreen;