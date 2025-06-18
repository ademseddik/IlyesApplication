// import {
//     View,
//     Modal,
//     StyleSheet,
//     Text,
//     TouchableOpacity,
//     Dimensions,
//     Image,
//     TextInput,
//   } from "react-native";
//   import React, { useState } from "react";
//   import { Ionicons, MaterialIcons } from "@expo/vector-icons";
//   const { width, height } = Dimensions.get("window");
  
//   const PhotoProfileMenu = ({
//     handleCloseSeeCoverPhoto,
//     modalVisible,
//     coverPic,
//   }) => {
//     const [image, setImage] = useState("");

//     return (
//       <View>
//         <Modal
//           visible={modalVisible}
//           animationType="slide"
//           transparent={true}
//           onRequestClose={() => handleCloseSeeCoverPhoto()}
//         >
//           <View style={styles.container}>
//             <View style={styles.overlay}></View>

//             <View style={styles.modalContent}>
//               <View style={styles.imageContainer}>
//                 <Image
//                   source={{ uri: coverPic }}
//                   style={styles.photoDeCouverture}
//                 />
//               </View>
//               <TouchableOpacity
//                 style={styles.btn}
//                 onPress={handleCloseSeeCoverPhoto}
//               >
//                 <Text style={styles.btnText}>Close</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </Modal>
//       </View>
//     );
//   };
  
//   export default PhotoProfileMenu;
  
//   const styles = StyleSheet.create({
//     container: {
//       justifyContent: "center",
//       alignItems: "center",
//       padding: 10,
//       height: height * 1,
//       width: width * 1,
//     },
//     overlay: {
//       position: "absolute",
//       top: 0,
//       left: 0,
//       bottom: 0,
//       right: 0,
//       backgroundColor: "rgba(0, 0, 0, 0.5)",
//     },
//     modalContent: {
//       justifyContent: "center",
//       alignItems: "center",
//       zIndex: 1,
//       flexDirection: "column",
//       gap: 25,
//     },
//     imageContainer: {
//       height: height * 0.3,
//       width: width * 0.9,
//       backgroundColor: "white",
//       borderRadius: 10,
//     },
//     btn: {
//       justifyContent: "center",
//       alignItems: "center",
//       borderWidth: 1,
//       borderColor: "white",
//       height: height * 0.06,
//       width: width * 0.3,
//       borderRadius: 40,
//     },
//     btnText: {
//       fontSize: 24,
//       fontWeight: "700",
//       color: "white",
//     },
//     photoDeCouverture: {
//       height: "100%",
//       width: "100%",
//     },
//   });
  