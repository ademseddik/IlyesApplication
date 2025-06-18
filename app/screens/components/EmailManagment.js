// import { StyleSheet, Text, View, Dimensions,TouchableOpacity } from "react-native";
// import React,{useRef, useState, useEffect} from "react";
// import EditEmailPassword from "./EditEmailPassword";
// const { width, height } = Dimensions.get("window");
// import Colors from "../Utils/Colors";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import Toast from "react-native-toast-message";
// import createAxiosInstance from "../../../core/config/Axios";
// import { APP_ENV } from "../../../core/utils/BaseUrl";

// const EmailManagment = () => {

//     const refRBSheetPasswordDelete = useRef()
//     const refRBSheetPasswordPrimaryAccount = useRef()
//     const refRBSheetPasswordAddAccount = useRef()
//     const [email,setEmail]=useState("");
//     const [secondaryemail, setSecondaryEmail] = useState("");
//     const [data, setData] = useState([]);
// //////////////////////////////////////////////////////////
// const showToast = (type, text1, text2) => {
//   Toast.show({
//     type: type,
//     position: "top",
//     text1: text1,
//     text2: text2,
//     visibilityTime: 4000,
//     autoHide: true,
//     topOffset: 80,
//     bottomOffset: 40,
//   });
// };
// //////////////////////////////////////////////////////////
//     useEffect(() => {
//       const fetchUser = async () => {
//         try {
//           const userId = await AsyncStorage.getItem("userId");
//           console.log(userId);
//           const response = await createAxiosInstance(APP_ENV.AUTH_PORT).get(
//             `tawasalna-user/residentmanagement/getuser/${userId}`
//           );
//           setData(response.data);
//           console.log(response.data);
//           const userData = response.data;
//           setEmail(userData.email);
//           setSecondaryEmail(userData.secondaryemail);
//         } catch (error) {
//           console.error("Error getting User:", error);
//            throw new Error(error);
//         }
//       };
//       fetchUser();
//     }, []);
// /////////////////////////////////////////////////////////////////

//   return (
//     <View style={styles.container}>
//       <View style={styles.containerTitle}>
//         <Text style={styles.titleText}> Emails that you have added</Text>
//       </View>
//       <View style={styles.emailsContainer}>
//         <View style={styles.emailContenContainer}>
//           <Text style={styles.emailTitle}>Your principal e-mail</Text>
//           <Text style={styles.emailText}>{email}</Text>
//         </View>
//         <View style={styles.emailContenContainer}>
//           <Text style={styles.emailTitle}>Your secondary e-mail</Text>
//           {secondaryemail ? (
//             <Text style={styles.emailText}>{secondaryemail}</Text>
//           ) : (
//             <Text style={styles.emailText}>
//               You don't have any secondary email yet
//             </Text>
//           )}
//           <View style={styles.emailConfig}>
//             <TouchableOpacity
//               style={styles.btnCont}
//               onPress={async () => { refRBSheetPasswordPrimaryAccount.current.open()
              
//               try {
//                     const userId = await AsyncStorage.getItem("userId");

//                     const response = await axiosInstance.post(
//                       `tawasalna-user/residentmanagement/deletesecondaryemail/${userId}`,
//                       {
//                         email,
//                       }
//                     );
//                     // showToast(
//                     //   "success",
//                     //   "Success",
//                     //   `Email submitted: ${email}`
//                     // );
//                     navigation.navigate("VERIFICATIONCODE", { email });
//                     console.log("Password Verification done!");
//                   } catch (error) {
//                     if (error.response) {
//                       if (
//                         error.response &&
//                         error.response.data &&
//                         error.response.data.error
//                       ) {
//                         const errorMessage = error.response.data.error;
//                         console.log(errorMessage);

//                         if (
//                           errorMessage ===
//                           "Secondary email cannot be the same as the primary email"
//                         ) {
//                           showToast(
//                             "error",
//                             "Invalid Email",
//                             "Secondary email cannot be the same as the primary email"
//                           );
//                         }
//                       } else {
//                         console.error("Error:", error);
//                       }
//                     }
//                   }
              
//                }

              
//               }
//             >
//               <Text style={styles.textBtns}>To select as primary account</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.btnCont}
//               onPress={async () => {
//                 if (!secondaryemail) {
//                   showToast(
//                     "error",
//                     "Error deleting secondary email",
//                     "You don't have a second email to delete!"
//                   );
//                 } else {
//                   refRBSheetPasswordDelete.current.open();
//                   try {
//                     const userId = await AsyncStorage.getItem("userId");

//                     const response = await axiosInstance.post(
//                       `tawasalna-user/residentmanagement/deletesecondaryemail/${userId}`,
//                       {
//                         email,
//                       }
//                     );
//                     // showToast(
//                     //   "success",
//                     //   "Success",
//                     //   `Email submitted: ${email}`
//                     // );
//                     navigation.navigate("VERIFICATIONCODE", { email });
//                     console.log("Password Verification done!");
//                   } catch (error) {
//                     if (error.response) {
//                       if (
//                         error.response &&
//                         error.response.data &&
//                         error.response.data.error
//                       ) {
//                         const errorMessage = error.response.data.error;
//                         console.log(errorMessage);

//                         if (
//                           errorMessage ===
//                           "Secondary email cannot be the same as the primary email"
//                         ) {
//                           showToast(
//                             "error",
//                             "Invalid Email",
//                             "Secondary email cannot be the same as the primary email"
//                           );
//                         }
//                       } else {
//                         console.error("Error:", error);
//                       }
//                     }
//                   }
//                 }
//               }}
//             >
//               <Text style={styles.textBtns}>Delete</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//       <View style={styles.addEmailContainer}>
//         <View style={styles.addEmailBtnContainer}>
//           <TouchableOpacity
//             style={styles.addEmailBtn}
//             onPress={() => {
//               if (secondaryemail) {
//                 showToast(
//                   "error",
//                   "Secodnary Email",
//                   "You already have a second email!"
//                 );
//               } else {
//                 refRBSheetPasswordAddAccount.current.open();
//               }
//             }}
//           >
//             <Text style={styles.addEmailBtnText}>Add e-mail address</Text>
//           </TouchableOpacity>
//         </View>
//         <View style={styles.buttomTextCont}>
//           <Text style={styles.buttomtext}>
//             Manage your emails effortlessly. Your primary email stays secure
//             while you can easily add and manage secondary emails for extra
//             convenience and organization.
//           </Text>
//         </View>
//       </View>
//       <EditEmailPassword
//         bottomSheetRef={refRBSheetPasswordPrimaryAccount}
//         navPath={"VERIFICATIONCODE"}
//       />
//       <EditEmailPassword
//         bottomSheetRef={refRBSheetPasswordDelete}
//         navPath={"VERIFICATIONCODE"}
//       />
//       <EditEmailPassword
//         bottomSheetRef={refRBSheetPasswordAddAccount}
//         navPath={"ADDEMAIL"}
//       />
//     </View>
//   );
// };

// export default EmailManagment;

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: "column",
//     justifyContent: "flex-start",
//     alignItems: "center",
//     padding:5,
//     gap:5,
//     backgroundColor:"white",
//     width:width*1,
//     height:height*1
//   },
//   containerTitle: {
//     flexDirection: "row",
//     justifyContent: "flex-start",
//     alignItems: "center",
//     width: width * 1,
//     height: height * 0.08,
//     // backgroundColor: "red",
//     padding:20
//   },
//   titleText: {
//     fontSize: 17,
//     fontWeight: "500",
//   },
//   emailsContainer: {
//     flexDirection: "column",
//     justifyContent: "flex-start",
//     alignItems: "flex-start",
//     // backgroundColor: "green",
//     width: width * 1,
//     height: height * 0.35,
//     padding:20,
//     gap:30
//   },
//   nestedContainers: {
//     flexDirection: "colmun",
//     alignItems: "flex-start",
//     justifyContent: "flex-start",
//   },
//   emailContenContainer:{
//     flexDirection: "column",
//     justifyContent: "flex-start",
//     alignItems:"flex-start",
//     gap:8,

//   },
//   emailTitle: {
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   emailText:{
//     fontSize:18,
//     fontWeight:"400"
//   },
//   emailConfig:{
//     flexDirection: "row",
//     justifyContent:"space-between",
//     alignItems:"center",
//     width:"100%",
//     // paddingLeft:15,
//     paddingRight:15,
//     paddingTop:5,
//     paddingBottom:5
//   },
//   btnCont:{
//     justifyContent:"center",
//     alignItems:"center",
//   },
//   textBtns:{
//     fontSize:17,
//     fontWeight:"600",
//     color:"grey"
//   },
//   addEmailContainer:{
//     flexDirection:"column",
//     justifyContent:"flex-start",
//     alignItems:"flex-start",
//     // backgroundColor:"blue",
//     width:"100%",
//     height:height*0.2,
//     padding:20,
//     gap:25
//   },
//   addEmailBtnContainer:{
//     flexDirection:"row",
//     justifyContent:"flex-start",
//     alignItems:"center",
//     width:"100%",
//   },
//   addEmailBtn:{
//     justifyContent:"center",
//     alignItems:"center",
//     borderRadius:20,
//     borderWidth:1.5,
//     borderColor:Colors.PURPLE,
//     width:width*0.5,
//     height:height*0.05
//   },
//   addEmailBtnText:{
//     fontSize:18,
//     fontWeight:"600",
//     color:Colors.PURPLE,
//   },
//   buttomTextCont:{
//     justifyContent:"flex-start",
//     alignItems:"flex-start"
//   },
//   buttomtext:{
//     fontSize:12,
//     fontWeight:"400"
//   }
// });
