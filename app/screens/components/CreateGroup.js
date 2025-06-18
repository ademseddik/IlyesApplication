// import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
// import React, { useEffect, useState } from "react";
// import { encode } from 'base64-arraybuffer';
// import createAxiosInstance from '../../../core/config/Axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { TextInput } from 'react-native';
// import { Picker } from '@react-native-picker/picker';

// const CreateGroup = () => {
//   const [data, setData] = useState([]);
//   const [profilePic, setProfilePic] = useState(null);
//   const [name, setGroupName] = useState("");
//   const [type, setSelectedOption] = useState("");
//   const [description, setDescription] = useState("");

//   const options = [
//     { label: "PUBLIC", value: "PUBLIC" },
//     { label: "PRIVATE", value: "PRIVATE" },
//   ];

//   const handlePickerChange = (itemValue) => {
//     setSelectedOption(itemValue);
//   };

//   const AddGroup = async () => {
//     try {
//       const userId = await AsyncStorage.getItem("userId");

//       const response = await createAxiosInstance().post(
//         `tawasalna-community/group/create/${userId}`,
//         {
//           name,
//           description,
//           type,
//         }
//       );
//       console.log("Add Goup successful");
//       alert(" Goup Added successfuly");
//       setDescription("");
//       setGroupName("");
//       setSelectedOption("Choose privacy");
//     } catch (error) {
//       console.error("Error Adding A Group:", error);
//       throw new Error(error);
//     }
//   };

//   const fetchProfile = async () => {
//     try {
//       const userId = await AsyncStorage.getItem("userId");
//       const response = await createAxiosInstance().get(
//         `tawasalna-community/residentprofile/getresidentprofile/${userId}`
//       );
//       //console.log(response.data);
//       if (response.data) {
//         setData(response.data);
//       }
//     } catch (error) {
//       console.error("Error getting resident profile:", error);
//       throw new Error(error);
//     }
//   };
//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const fetchProfilePhoto = async () => {
//     try {
//       const userId = await AsyncStorage.getItem("userId");
//       const response = await createAxiosInstance().get(
//         `tawasalna-community/residentprofile/getprofilephoto/${userId}`,
//         {
//           responseType: "arraybuffer",
//         }
//       );
//       const base64Image = encode(response.data);
//       const imageUrl = `data:image/jpeg;base64,${base64Image}`;

//       setProfilePic(imageUrl);
//     } catch (error) {
//       console.error("Error getting profile photo:", error);
//     }
//   };

//   useEffect(() => {
//     fetchProfilePhoto();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         {profilePic !== "data:image/jpeg;base64," ? (
//           <Image style={styles.profilePic} source={{ uri: profilePic }} />
//         ) : (
//           <Image
//             source={require("../../../../assets/photoprofil.png")}
//             style={styles.profilePic}
//           />
//         )}
//         <Text style={styles.name}>{data.fullName}</Text>
//       </View>
//       <Text style={styles.adminText}>Admin</Text>
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.textInput}
//           placeholder="Name of the group"
//           value={name}
//           onChangeText={(text) => setGroupName(text)}
//         />
//         <TextInput
//           style={[styles.textInput, styles.textInputMargin]}
//           placeholder="Description"
//           onChangeText={(text) => setDescription(text)}
//         />
//         <View style={[styles.pickerContainer, styles.textInputMargin]}>
//           <Picker
//             selectedValue={type}
//             style={styles.picker}
//             onValueChange={handlePickerChange}
//           >
//             <Picker.Item label="Choose privacy" value="" />
//             {options.map((option) => (
//               <Picker.Item
//                 key={option.value}
//                 label={option.label}
//                 value={option.value}
//               />
//             ))}
//           </Picker>
//         </View>
//       </View>
//       <TouchableOpacity
//         style={[
//           styles.button,
//           {
//             backgroundColor:
//               name !== "" && description !== "" && type !== ""
//                 ? Colors.LIGHT_PURPLE
//                 : "gray",
//           },
//         ]}
//         onPress={AddGroup}
//         disabled={
//           name === "" || description === "" || type === "Choose privacy"
//         }
//       >
//         <Text style={styles.buttonText}>Create</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "white",
//     height: "100%",
//     alignItems: "center",
//     padding: 20,
//   },
//   header: {
//     marginTop: "-5%",
//     flexDirection: "row",
//     alignItems: "center",
//     marginLeft:"-40%"
//   },
//   profilePic: {
//     borderRadius: 50,
//     width: 45,
//     height: 45,
//     borderWidth: 3,
//   },
//   name: {
//     fontWeight: "bold",
//     fontSize: 15,
//     marginLeft: 10,
//     marginTop:-28
//   },
//   adminText: {
//     fontSize: 15,
//     marginTop: -27,
//     marginBottom:20,
//     marginLeft:-140
//   },
//   inputContainer: {
//     marginTop: 30,
//     width: "80%",
//     alignItems: "center",
//   },
//   textInput: {
//     height: 40,
//     width: "100%",
//     borderColor: "gray",
//     borderWidth: 0.3,
//     borderRadius: 10,
//     paddingLeft: 10,
//   },
//   textInputMargin: {
//     marginTop: 13,
//   },
//   pickerContainer: {
//     height: 40,
//     width: "100%",
//     borderColor: "gray",
//     borderWidth: 0.3,
//     borderRadius: 10,
//     justifyContent: "center",
//   },
//   picker: {
//     height: 40,
//     width: "100%",
//     color: "grey",
//   },
//   button: {
//     height: 40,
//     width: "50%",
//     borderRadius: 10,
//     marginTop: 40,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 16,
//   },
// });

// export default CreateGroup;