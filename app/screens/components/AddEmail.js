// import {
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
//   Dimensions,
// } from "react-native";
// import React, { useState } from "react";
// import Toast from "react-native-toast-message";
// import { useNavigation } from "@react-navigation/native";
// import Colors from "../Utils/Colors";
// const { width, height } = Dimensions.get("window");
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import createAxiosInstance from "../../../core/config/Axios";
// import { APP_ENV } from "../../../core/utils/BaseUrl";
// import Axios from "axios";


// const AddEmail = () => {
//   const [email, setEmail] = useState("");
//   const navigation = useNavigation();

//   const showToast = (type, text1, text2) => {
//     Toast.show({
//       type: type,
//       position: "top",
//       text1: text1,
//       text2: text2,
//       visibilityTime: 4000,
//       autoHide: true,
//       topOffset: 80,
//       bottomOffset: 40,
//     });
//   };

//   const handleEmailChange = (text) => {
//     setEmail(text);
//   };

//   const handleEmailSubmit = async () => {
//     if (email.trim() === "") {
//       showToast("error", "Empty e-mail field", "Please enter an email address");
//     } else if (!validateEmail(email)) {
//       showToast(
//         "error",
//         "Invalid e-mail",
//         "Please enter a valid email address"
//       );
//     } 

//      try {
//           const userId = await AsyncStorage.getItem("userId");

          
//           const response = await createAxiosInstance(APP_ENV.AUTH_PORT).post(
//             `tawasalna-user/residentmanagement/addsecondaryemail/${userId}`,
//             {
//               email,
//             }
//           );
//           console.log(" responce ::: ",response);
//           console.log(" responce ::: ",response.data);
//        showToast("success", "Success", `Email submitted: ${email}`);
//        navigation.navigate("VERIFICATIONCODE" , {email});         
//        console.log("Password Verification done!");
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
//                 "Secondary email cannot be the same as the primary email"
//               ) {
//                 showToast(
//                   "error",
//                   "Invalid Email",
//                   "Secondary email cannot be the same as the primary email"
//                 );
//               }  
//             } else {
//               console.error("Error:", error);
//             }
//           }
//         }
//   };

//   const validateEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };
//   return (
//     <View style={styles.container}>
//       <View style={styles.textTitleCont}>
//         <Text style={styles.textTitle}>Add a new e-mail</Text>
//       </View>

//       <View style={styles.contEmail}>
//         <Text style={styles.texEmail}>Write a new adress mail</Text>
//         <TextInput
//           placeholder="Enter your email..."
//           style={{
//             borderBottomWidth: 1,
//             borderBottomColor: "black",
//             paddingVertical: 5,
//             marginBottom: 20,
//             width: "100%",
//           }}
//           value={email}
//           onChangeText={handleEmailChange}
//           keyboardType="email-address"
//           autoCapitalize="none"
//         />
//         <Text style={styles.textGuide}>
//           A confirmation will be sent to this account. Write the confirmation
//           code to confirm and add this email.
//         </Text>
//       </View>
//       <TouchableOpacity onPress={() => handleEmailSubmit()} style={styles.btn}>
//         <Text style={styles.btnText}>Next</Text>
//       </TouchableOpacity>
//       {/* <Toast ref={(ref) => Toast.setRef(ref)} />  */}
//     </View>
//   );
// };

// export default AddEmail;

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: "column",
//     justifyContent: "flex-start",
//     alignItems: "center",
//     padding: 5,
//     gap: 5,
//     backgroundColor: "white",
//     width: width * 1,
//     height: height * 1,
//   },
//   textTitle: {
//     fontSize: 17,
//     fontWeight: "500",
//   },
//   textTitleCont: {
//     flexDirection: "row",
//     justifyContent: "flex-start",
//     alignItems: "flex-start",
//     width:"100%",
//     padding:20
//   },
//   texEmail: {
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   contEmail: {
//     flexDirection: "column",
//     justifyContent: "flex-start",
//     alignItems: "flex-start",
//     // backgroundColor: "green",
//     width: width * 1,
//     padding: 20,
//     gap: 10,
//   },
//   textGuide: {
//     fontSize: 12,
//     fontWeight: "400",
//   },
//   btn:{
//     width:width*0.3,
//     height:height*0.05,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: Colors.PURPLE,
//     borderRadius: 8,
//     padding: 12,
//     width:"100%",
//     height:height*0.06
//   },
//   btnText:{
//     fontSize:16,
//     color: "white",
//     fontWeight: "bold",

//   }
// });
