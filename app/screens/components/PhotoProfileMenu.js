// import {
//   View,
//   Modal,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   Dimensions,
//   Image,
//   TextInput,
//   Platform,
// } from "react-native";
// import React, { useState, useEffect } from "react";
// import {
//   Ionicons,
//   MaterialIcons,
//   Foundation,
//   Entypo,
//   FontAwesome,
//   MaterialCommunityIcons,
// } from "@expo/vector-icons";
// import Colors from "../Utils/Colors";
// import * as ImagePicker from "expo-image-picker";

// const { width, height } = Dimensions.get("window");

// const PhotoProfileMenu = ({ handleCloseCreatePost, modalVisible }) => {
//   const [image, setImage] = useState(null);
//   const [textInputValue, setTextInputValue] = useState("");
//   const [showOptions, setShowOptions] = useState(false);

//   const handleTextChange = (text) => {
//     setTextInputValue(text);
//   };

//   useEffect(() => {
//     (async () => {
//       if (Platform.OS !== "web") {
//         const { status } =
//           await ImagePicker.requestMediaLibraryPermissionsAsync();
//         if (status !== "granted") {
//           alert("Sorry, we need media library permissions to make this work!");
//         }
//       }
//     })();
//   }, []);

//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     console.log(result);

//     if (!result.canceled) {
//       setImage(result.uri);
//     }
//   };

//   const renderOptions = () => {
//     return (
//       <Modal
//         visible={showOptions}
//         animationType="slide"
//         transparent={true}
//         onRequestClose={() => setShowOptions(false)}
//       >
//         <View style={styles.optionsModalContainer}>
//           <View style={styles.optionsModalContent}>
//             <TouchableOpacity
//               style={styles.closeOptionsModal}
//               onPress={() => setShowOptions(false)}
//             >
//               <Ionicons name="close" size={30} color="black" />
//             </TouchableOpacity>
//             <View style={styles.optionsContainer}>
//               <TouchableOpacity style={styles.option}>
//                 <Foundation
//                   name="video"
//                   size={22}
//                   color={Colors.LIGHT_PURPLE}
//                   style={{ marginRight: 10 }}
//                 />
//                 <Text style={styles.optionText}>Live Video</Text>
//               </TouchableOpacity>
//               <View style={styles.horizontalLine} />

//               <TouchableOpacity style={styles.option}>
//                 <Entypo
//                   name="camera"
//                   size={20}
//                   color={Colors.LIGHT_PURPLE}
//                   style={{ marginRight: 10 }}
//                 />

//                 <Text style={styles.optionText}>camera</Text>
//               </TouchableOpacity>
//               <View style={styles.horizontalLine} />

//               <TouchableOpacity style={styles.option}>
//                 <FontAwesome
//                   name="music"
//                   size={22}
//                   color={Colors.LIGHT_PURPLE}
//                   style={{ marginRight: 10 }}
//                 />
//                 <Text style={styles.optionText}>Music</Text>
//               </TouchableOpacity>
//               <View style={styles.horizontalLine} />

//               <TouchableOpacity style={styles.option}>
//                 <MaterialCommunityIcons
//                   name="file-gif-box"
//                   size={24}
//                   color={Colors.LIGHT_PURPLE}
//                   style={{ marginRight: 10 }}
//                 />
//                 <Text style={styles.optionText}>GIF</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     );
//   };


//   return (
//     <View>
//       <Modal
//         visible={modalVisible}
//         animationType="slide"
//         transparent={true}
//         onRequestClose={() => handleCloseCreatePost()}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <View style={styles.containerUp}>
//               <TouchableOpacity onPress={() => handleCloseCreatePost()}>
//                 <Ionicons name="close" size={30} color="black" />
//               </TouchableOpacity>
//               <View>
//                 <Image
//                   style={{ height: 50, width: 50, borderRadius: 30 }}
//                   source={require("../../../../assets/photoprofil.png")}
//                 />
//               </View>
//             </View>
//             <TouchableOpacity style={styles.btnShare}>
//               <Text style={styles.textShare}>Share</Text>
//             </TouchableOpacity>
//           </View>
//           <TextInput
//             placeholder="What do you want to discuss ?"
//             value={textInputValue}
//             onChangeText={handleTextChange}
//             style={styles.textInput}
//             multiline={true}
//             textAlignVertical="top"
//             textAlign="left"
//             lineHeight={35}
//           />
//           {image && (
//             <View style={styles.mediaContainer}>
//               <Image
//                 source={{ uri: image }}
//                 style={{ width: 200, height: 200 }}
//               />
//             </View>
//           )}
//           {showOptions && renderOptions()}

//           <View style={styles.containerButtom}>
//             <TouchableOpacity style={styles.btnsButtom} onPress={pickImage}>
//               <View style={styles.containerIcon}>
//                 <MaterialIcons name="perm-media" size={24} color="black" />
//               </View>
//               <Text style={styles.textIcon}>Media</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.btnsButtom}
//               onPress={() => setShowOptions(!showOptions)}
//             >
//               <View style={styles.containerIcon}>
//                 <MaterialIcons name="more-horiz" size={24} color="black" />
//               </View>
//               <Text style={styles.textIcon}>More</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// export default PhotoProfileMenu;

// const styles = StyleSheet.create({
//   modalContainer: {
//     flexDirection: "column",
//     justifyContent: "flex-start",
//     alignItems: "center",
//     backgroundColor: "transparent",
//     height: height * 1,
//     width: width * 1,
//     backgroundColor: "white",
//     padding: 10,
//   },
//   modalContent: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     backgroundColor: "white",
//     padding: 20,
//     width: width * 1,
//     height: "10%",
//   },
//   containerUp: {
//     justifyContent: "center",
//     alignItems: "center",
//     flexDirection: "row",
//     gap: 10,
//   },
//   mediaContainer: {
//     alignItems: "center",
//     marginTop: 10,
//   },

//   btnShare: {
//     height: 40,
//     width: 70,
//     backgroundColor: Colors.LIGHT_PURPLE,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 10,
//   },
//   textShare: {
//     fontSize: 16,
//     color: "white",
//   },
//   textInput: {
//     height: "75%",
//     width: width * 1,
//     borderColor: "white",
//     borderWidth: 1,
//     borderRadius: 5,
//     marginTop: 10,
//     padding: 20,
//     fontSize: 20,
//   },
//   containerButtom: {
//     width: width * 1,
//     height: "15%",
//     justifyContent: "center",
//     alignItems: "center",
//     gap: 70,
//     flexDirection: "row",
//   },
//   btnsButtom: {
//     justifyContent: "center",
//     alignItems: "center",
//     flexDirection: "column",
//     gap: 5,
//   },
//   containerIcon: {
//     width: 50,
//     height: 50,
//     backgroundColor: "#dedede",
//     borderRadius: 100,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   textIcon: {
//     fontSize: 18,
//     fontWeight: "500",
//   },
//   optionsContainer: {
//     marginTop: 10,
//     borderTopColor: "#ccc",
//     paddingTop: 10,
//   },
//   option: {
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     flexDirection: "row",
//   },
//   optionText: {
//     fontSize: 16,
//   },
//   optionsModalContainer: {
//     flex: 1,
//     justifyContent: "flex-end",
//     alignItems: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//   },
//   optionsModalContent: {
//     backgroundColor: "white",
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     width: width,
//     maxHeight: height * 0.5,
//     padding: 20,
//     justifyContent: "flex-start",
//   },
//   closeOptionsModal: {
//     position: "absolute",
//     top: 10,
//     right: 10,
//     zIndex: 1,
//   },
//   horizontalLine: {
//     borderBottomWidth: 1,
//     borderBottomColor: "#ccc",
//     marginVertical: 5,
//     width: "100%",
//   },
// });
