// import {
//   View,
//   Text,
//   StyleSheet,
//   Dimensions,
//   TouchableOpacity,
// } from "react-native";
// import React,{useState,useEffect} from "react";
// import RBSheet from "react-native-raw-bottom-sheet";
// import {
//   MaterialIcons,
//   MaterialCommunityIcons,
//   Ionicons,
// } from "@expo/vector-icons";
// import SeeProfilePhoto from "./SeeProfilePhoto"
// const { width, height } = Dimensions.get("window");
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import * as ImagePicker from "expo-image-picker";
// import createAxiosInstance from "../../../core/config/Axios";

// const ButtomSheetProfilePhoto = ({ bottomSheetRef, profilePic }) => {
//   const [modalVisible, setModalVisible] = useState(false);
//   const [refresh, setRefresh] = useState(true);
//   const [profileImage, setProfileImage] = useState(null);
//   const [shouldUpdatePicture, setShouldUpdatePicture] = useState(false);

//   const handleCloseSeeProfilePhoto = () => {
//     setModalVisible(false);
//   };
//   const handleOpenSeeProfilePhoto = () => {
//     setModalVisible(true);
//   };
// //////////////////////////////////////////////////////////////////////////
// useEffect(() => {
//   if (shouldUpdatePicture) {
//     UpdateProfilePicture();
//     setShouldUpdatePicture(false);
//   }
// }, [shouldUpdatePicture]);

// const handleImageSelection = async () => {
//   const result = await ImagePicker.launchImageLibraryAsync({
//     mediaTypes: ImagePicker.MediaTypeOptions.Images,
//     allowsEditing: true,
//     aspect: [4, 4],
//     quality: 1,
//   });

//   console.log(result);

//    if (!result.canceled) {
//      setProfileImage(result.assets[0].uri);
//      setShouldUpdatePicture(true);
//    } else {
//      console.log("Image selection canceled");
//    }

// };

// ///////////////////////////////////////////////////////////////////////
// const UpdateProfilePicture = async () => {
//   const userId = await AsyncStorage.getItem("userId");
//   //console.log("userId from Edit Profile:", userId);

//   const response = await fetch(profileImage);
//   const blob = await response.blob();

//   const formData = new FormData();
//   formData.append("profilePhoto", {
//     uri: profileImage,
//     name: "profile_photo.jpg",
//     type: "image/jpeg",
//   });

//   await createAxiosInstance().put(
//     `tawasalna-community/residentprofile/updateprofilepictures/${userId}`,
//     formData,
//     {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     }
//   );
//   // console.log("Update Image successful");
//   setRefresh(!refresh);
// };
// ///////////////////////////////////////////////////////////////////////////////////////////
//   return (
//     <RBSheet
//       ref={bottomSheetRef}
//       height={280}
//       openDuration={250}
//       closeOnDragDown={true}
//       closeOnPressBack={true}
//       closeOnPressMask={true}
//       customStyles={{
//         wrapper: {
//           backgroundColor: "rgba(0,0,0,0.5)",
//         },
//         draggableIcon: {
//           backgroundColor: "#d5d5d5",
//           width: 60,
//         },
//         container: {
//           borderTopLeftRadius: 30,
//           borderTopRightRadius: 30,
//         },
//       }}
//     >
//       <View style={styles.container}>
//         <TouchableOpacity
//           style={styles.btnContainer}
//           onPress={() => handleOpenSeeProfilePhoto()}
//         >
//           <View style={styles.iconContainer}>
//             <MaterialIcons name="account-circle" size={30} color="black" />
//           </View>
//           <Text style={styles.text}>See profile photo</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.btnContainer}>
//           <View style={styles.iconContainer}>
//             <MaterialIcons name="history" size={30} color="black" />
//           </View>
//           <Text style={styles.text}>See your story</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={handleImageSelection}
//           style={styles.btnContainer}
//         >
//           <View style={styles.iconContainer}>
//             <MaterialCommunityIcons
//               name="image-album"
//               size={30}
//               color="black"
//             />
//           </View>
//           <Text style={styles.text}>Edit profile photo</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.btnContainer}>
//           <View style={styles.iconContainer}>
//             <Ionicons name="add-circle-outline" size={30} color="black" />
//           </View>
//           <Text style={styles.text}>Add your story</Text>
//         </TouchableOpacity>
//         <SeeProfilePhoto
//           handleCloseSeeProfilePhoto={handleCloseSeeProfilePhoto}
//           modalVisible={modalVisible}
//           profilePic={profilePic}
//         />
//       </View>
//     </RBSheet>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     flexDirection: "column",
//     gap: 5,
//     justifyContent: "space-between",
//     alignItems: "center",
//     height: "90%",
//     width: width * 1,
//   },
//   btnContainer: {
//     flexDirection: "row",
//     justifyContent: "flex-start",
//     alignItems: "center",
//     gap: 25,
//     width: "100%",
//   },
//   iconContainer: {
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#dedede",
//     borderRadius: 100,
//     height: height * 0.05,
//     width: width * 0.1,
//   },
//   text: {
//     fontSize: 18,
//     fontWeight: "600",
//   },
//   photoDeProfile: {
//     borderRadius: 100,
//     height: 140,
//     width: 140,
//   },
// });

// export default ButtomSheetProfilePhoto;
