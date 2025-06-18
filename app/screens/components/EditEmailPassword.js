// import {
//   View,
//   Text,
//   StyleSheet,
//   Dimensions,
//   TouchableOpacity,
//   TextInput
// } from "react-native";
// import React, { useState } from "react";
// import RBSheet from "react-native-raw-bottom-sheet";
// import {
//     MaterialCommunityIcons,
//   } from "@expo/vector-icons";
//   import { useNavigation } from "@react-navigation/native";
// import Colors from "../Utils/Colors";
// const { width, height } = Dimensions.get("window");
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import Toast from "react-native-toast-message";
// import createAxiosInstance from "../../../core/config/Axios";
// import { APP_ENV } from "../../../core/utils/BaseUrl";

// const EditEmailPassword = ({ bottomSheetRef,navPath }) => {
    
    
//     const [enteredpassword, setPassword] = useState("");
//     const [showPassword, setShowPassword] = useState(true);
//     const [passwordTouched, setPasswordTouched] = useState(false);
//     const navigation = useNavigation();
// //////////////////////////////////////////////////////////////////////
//  const showToast = (type, text1, text2) => {
//    Toast.show({
//      type: type,
//      position: "top",
//      text1: text1,
//      text2: text2,
//      visibilityTime: 4000,
//      autoHide: true,
//      topOffset: 80,
//      bottomOffset: 40,
//    });
//  };
// //////////////////////////////////////////////////////////////////////
//     const handleSubmit = async ()=>{
//         try {
//           const userId = await AsyncStorage.getItem("userId");

//           const response = await createAxiosInstance(APP_ENV.AUTH_PORT).post(
//             `tawasalna-user/residentmanagement/checkPasswordMatch/${userId}`,
//             {
//               enteredpassword,
//             }
//           );
//           navigation.navigate(navPath)
//           console.log("Password Verification done!");
//         } catch (error) {
//           if (error.response) {
//             if (
//               error.response &&
//               error.response.data &&
//               error.response.data.error
//             ) {
//               const errorMessage = error.response.data.error;
//               console.log(errorMessage);

//               if (
//                 errorMessage ===
//                 "Entred Password  is  not equal to your password."
//               ) {
//                 showToast(
//                   "error",
//                   "Invalid password",
//                   "Entred Password  is  not equal to your password."
//                 );
//               }  
//             } else {
//               console.error("Error:", error);
//             }
//           }
//         }
      
//     }


//   const handlePasswordChange = (text) => {
//     setPassword(text);
//     setPasswordTouched(true);
//   };

//   const toggleShowPassword = () => {
//     setShowPassword(!showPassword);
//   };
//   return (
//     <RBSheet
//       ref={bottomSheetRef}
//       height={200}
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
//         <Text style={styles.textPassTitle}>
//           Enter your Tawasalna password to make this modification
//         </Text>
//         <View
//           style={{
//             flexDirection: "row",
//             borderColor:
//               passwordTouched && !enteredpassword.trim() ? "red" : "gray",
//             borderWidth: 1,
//             borderRadius: 8,
//             padding: 8,
//             marginBottom: 10,
//             marginTop: 5,
//             width: "92%",
//             marginLeft: "4%",
//           }}
//         >
//           <TextInput
//             placeholder="Password"
//             secureTextEntry={showPassword}
//             autoCapitalize="none"
//             autoCompleteType="password"
//             autoCorrect={false}
//             value={enteredpassword}
//             onChangeText={handlePasswordChange}
//             style={{ flex: 1 }}
//           />
//           <TouchableOpacity onPress={toggleShowPassword}>
//             <MaterialCommunityIcons
//               name={showPassword ? "eye-off" : "eye"}
//               size={24}
//               color="black"
//             />
//           </TouchableOpacity>
//         </View>
//         <View style={styles.btnCont}>
//           <TouchableOpacity
//             style={styles.btnSubmit}
//             onPress={() => handleSubmit()}
//           >
//             <Text style={styles.textSubmit}>Submit</Text>
//           </TouchableOpacity>
//         </View>
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
//   textPassTitle:{
//     fontWeight:"400"
//   },
//   btnCont:{
//     justifyContent: "center",
//     alignItems: "center",
//     width:"100%"
//   },
//   btnSubmit:{
//     backgroundColor:Colors.PURPLE,
//     width:width*0.3,
//     height:height*0.05,
//     borderRadius:20,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   textSubmit:{
//     fontSize:16,
//     color: "white",
//     fontWeight: "bold",
//   }
// });

// export default EditEmailPassword;
