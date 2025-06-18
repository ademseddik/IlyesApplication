// import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import React from "react";
// import { useNavigation } from "@react-navigation/native";
// import Ionicons from "@expo/vector-icons/Ionicons";
// import Colors from "../Utils/Colors";

// const Stories = () => {
//   const navigation = useNavigation();
//   const stories = [
//     {
//       content: require("../../../../assets/user-1.jpg"),
//       userName: "John Doe",
//     },
//     {
//       content: require("../../../../assets/user-2.jpg"),
//       userName: "John Doe",
//     },
//     {
//       content: require("../../../../assets/user-3.jpg"),
//       userName: "John Doe",
//     },
//     {
//       content: require("../../../../assets/user-4.jpg"),
//       userName: "John Doe",
//     },
//     {
//       content: require("../../../../assets/user-5.jpg"),
//       userName: "John Doe",
//     },
//     {
//       content: require("../../../../assets/user-6.jpg"),
//       userName: "John Doe",
//     },
//   ];

//   return (
//     <ScrollView
//       style={{ paddingTop: 20, backgroundColor: Colors.WHITE, height: 150 }}
//       horizontal
//       showsHorizontalScrollIndicator={false}
//     >
//       <View style={{ padding: 7 }}>
//         <Image
//           source={require("../../../../assets/photoprofil.png")}
//           style={styles.userImage}
//         />
//         <View style={{ position: "absolute" }}>
//           <View style={styles.addBtnContainer}>
//             <Ionicons name="add" style={styles.addBtn} />
//           </View>
//           <Text style={[styles.userName, { textTransform: "capitalize" }]}>
//             Your story
//           </Text>
//         </View>
//       </View>
//       {stories.map((item, index) => (
//         <View style={{ width: 85, padding: 5 }} key={index}>
//           <LinearGradient
//             colors={["#bc2a8d", "#bc2a8d", "#bc2a8d"]}
//             style={{ padding: 2, borderRadius: 50 }}
//           >
//             <Image
//               source={item.content}
//               style={[styles.userImage, { borderWidth: 4 }]}
//             />
//           </LinearGradient>
//           <Text style={styles.userName}>{item.userName}</Text>
//         </View>
//       ))}
//     </ScrollView>
//   );
// };

// export default Stories;

// const styles = StyleSheet.create({
//   userImage: {
//     height: 70,
//     width: 70,
//     borderRadius: 50,
//     borderColor: "#ffffff",
//   },
//   userName: {
//     textAlign: "center",
//     fontSize: 12,
//     textTransform: "capitalize", // Change to capitalize
//     marginTop: 5,
//   },
//   addBtnContainer: {
//     marginTop: 55,
//     backgroundColor: "#4c68d7",
//     marginLeft: 55,
//     width: 23,
//     height: 23,
//     borderRadius: 50,
//     borderColor: "#ffffff",
//     justifyContent: "center",
//   },
//   addBtn: {
//     color: "#ffffff",
//     textAlign: "center",
//     textAlignVertical: "center",
//     fontSize: 12,
//   },
// });
