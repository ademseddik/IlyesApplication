// import {
//     View,
//     Text,
//     StyleSheet,
//     Dimensions,
//     TouchableOpacity,
//   } from "react-native";
//   import React,{useState,useEffect} from "react";
//   import RBSheet from "react-native-raw-bottom-sheet";
//   import {
//     MaterialIcons,
//     MaterialCommunityIcons,
//     Ionicons,
//     FontAwesome,
//     FontAwesome6,
//   } from "@expo/vector-icons";
//   import SeeCoverPhoto from "./SeeCoverPhoto"
//   const { width, height } = Dimensions.get("window");
//   import AsyncStorage from "@react-native-async-storage/async-storage";
//   import * as ImagePicker from "expo-image-picker";
//   import createAxiosInstance from "../../../core/config/Axios";

//   const ButtomSheetCoverPhoto = ({ bottomSheetRef, coverPic }) => {
//     const [modalVisible, setModalVisible] = useState(false);
//     const [refresh, setRefresh] = useState(true);
//     const [coverImage, setCoverImage] = useState(null);
//     const [shouldUpdatePicture, setShouldUpdatePicture] = useState(false);

//     const handleCloseSeeCoverPhoto = () => {
//       setModalVisible(false);
//     };
//     const handleOpenSeeCoverPhoto = () => {
//       setModalVisible(true);
//     };
//     //////////////////////////////////////////////////////////////////////////

//     useEffect(() => {
//       if (shouldUpdatePicture) {
//         UpdateCoverPicture();
//         setShouldUpdatePicture(false);
//       }
//     }, [shouldUpdatePicture]);
    
//     const handleImageSelection = async () => {
//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         aspect: [5, 5],
//         quality: 1,
//       });

//       console.log(result);

//       if (!result.canceled) {
//         setCoverImage(result.assets[0].uri);
//         setShouldUpdatePicture(true);
//       } else {
//         console.log("Image selection canceled");
//       }
//     };


  
//     ///////////////////////////////////////////////////////////////////////
//     const UpdateCoverPicture = async () => {
//       const userId = await AsyncStorage.getItem("userId");
//       //console.log("userId from Edit Profile:", userId);

//       const response = await fetch(coverImage);
//       const blob = await response.blob();

//       const formData = new FormData();
//       formData.append("coverPhoto", {
//         uri: coverImage,
//         name: "profile_photo.jpg",
//         type: "image/jpeg",
//       });

//       await createAxiosInstance().put(
//         `tawasalna-community/residentprofile/updatecoverpictures/${userId}`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       // console.log("Update Image successful");
//       setRefresh(!refresh);
//     };
//     ///////////////////////////////////////////////////////////////////////////////////////////
//     return (
//       <RBSheet
//         ref={bottomSheetRef}
//         height={150}
//         openDuration={250}
//         closeOnDragDown={true}
//         closeOnPressBack={true}
//         closeOnPressMask={true}
//         customStyles={{
//           wrapper: {
//             backgroundColor: "rgba(0,0,0,0.5)",
//           },
//           draggableIcon: {
//             backgroundColor: "#d5d5d5",
//             width: 60,
//           },
//           container: {
//             borderTopLeftRadius: 30,
//             borderTopRightRadius: 30,
//           },
//         }}
//       >
//         <View style={styles.container}>
//           <TouchableOpacity
//             style={styles.btnContainer}
//             onPress={() => handleOpenSeeCoverPhoto()}
//           >
//             <View style={styles.iconContainer}>
//               <FontAwesome name="photo" size={22} color="black" />
//             </View>
//             <Text style={styles.text}>See cover photo</Text>
//           </TouchableOpacity>
//           <TouchableOpacity  onPress={handleImageSelection} style={styles.btnContainer}>
//             <View style={styles.iconContainer}>
//               <FontAwesome6 name="photo-film" size={21} color="black" />
//             </View>
//             <Text style={styles.text}>Edit cover photo</Text>
//           </TouchableOpacity>
//           <SeeCoverPhoto
//             handleCloseSeeCoverPhoto={handleCloseSeeCoverPhoto}
//             modalVisible={modalVisible}
//             coverPic={coverPic}
//           />
//         </View>
//       </RBSheet>
//     );
//   };
  
//   const styles = StyleSheet.create({
//     container: {
//       padding: 20,
//       flexDirection: "column",
//       gap: 5,
//       justifyContent: "space-between",
//       alignItems: "center",
//       height: "90%",
//       width: width * 1,
//     },
//     btnContainer: {
//       flexDirection: "row",
//       justifyContent: "flex-start",
//       alignItems: "center",
//       gap: 25,
//       width: "100%",
//     },
//     iconContainer: {
//       justifyContent: "center",
//       alignItems: "center",
//       backgroundColor: "#dedede",
//       borderRadius: 100,
//       height: height * 0.05,
//       width: width * 0.1,
//     },
//     text: {
//       fontSize: 18,
//       fontWeight: "600",
//     },
//   });
  
//   export default ButtomSheetCoverPhoto;
  