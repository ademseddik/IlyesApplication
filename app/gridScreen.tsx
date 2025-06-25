import React from 'react';
import { View, Text, StyleSheet, FlatList ,Image, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRouter } from 'expo-router';
type AppRoutes = 
  '/ProfileScreen' | 
  '/ProfileScreen' | 
  '/DataTableScreen' | 
  '/ProfileScreen' | 
  '/ProfileScreen' | 
  '/StreamingScreen' | 
  '/Maintenance';
const data: {
  id: string;
  title: string;
  icon: string;
  route: AppRoutes; // Use the typed route
}[] = [
  { id: '1', title: 'Profile', icon: 'person-outline', route: '/ProfileScreen' },
  { id: '2', title: 'Info', icon: 'information-circle-outline', route: '/ProfileScreen'  },
  { id: '3', title: 'Data', icon: 'cloud-outline' , route: '/DataTableScreen' },
  { id: '4', title: 'Messages', icon: 'chatbox-ellipses-outline', route: '/ProfileScreen'  },
  { id: '5', title: 'Live Streaming', icon: 'videocam-outline', route: '/StreamingScreen'  },
  { id: '6', title: 'Maintenance', icon: 'construct-outline', route: '/Maintenance'  },
];

const GridScreen = () => {
   const router = useRouter(); 

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
        numColumns={3}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.gridItem}
             onPress={() => router.push(item.route)}
          >
            <Ionicons name={item.icon} size={24} color="white" />
            <Text style={styles.itemText}>{item.title}</Text>
          </TouchableOpacity>
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
    borderRadius:20,

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
    color: '#7590d9',
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