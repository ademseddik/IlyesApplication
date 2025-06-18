// import {
//     View,
//     Text,
//     TextInput,
//     SafeAreaView,
//     TouchableOpacity,
//     ToastAndroid,
//   } from "react-native";
//   import React, { useState, useRef , useEffect} from "react";
//   import Colors from "../../presentation/Utils/Colors";
//   import { useNavigation, useRoute } from "@react-navigation/native";
//   import { APP_ENV } from "../../../core/utils/BaseUrl";
//   import AsyncStorage from "@react-native-async-storage/async-storage";
// import {Axios} from "axios";


//   const VerificationCode = () => {
//   const navigation = useNavigation();
//   const codeInputRefs = useRef([]);
//   const route = useRoute();
//   const [code, setCode] = useState(["", "", "", "", "", ""]); 
//   const [codeError, setCodeError] = useState("");
//   const [email, setEmail] = useState(""); 
  
//      /////////////////////////////////////////////////////////////
//      useEffect(() => {
//        const fetchEmail = async () => {
//          try {
//            if (route.params && route.params.email) {
//              setEmail(route.params.email);
//            } else {
//              const storedEmail = await AsyncStorage.getItem("userEmail");
//              setEmail(storedEmail);
//            }
//          } catch (error) {
//            console.error("Error retrieving email:", error);
//          }
//        };

//        fetchEmail();
//      }, [route.params]);
//    ////////////////////////////////////////////////////////////////
//     const handleCodeChange = async (text, index) => {
//       const newCode = [...code];
//       newCode[index] = text;
//       setCode(newCode);
//       console.log("email :",email);

//       if (index === 5 && newCode.every((item) => item !== "")) {
//         const enteredCode = newCode.join("");

//    try {
//           const userId = await AsyncStorage.getItem("userId");
//           const token = await AsyncStorage.getItem("authToken");
//           console.log("responce   ",email)
//           console.log("responce   ",APP_ENV.AUTH_PORT)
//           // const response = await axios.post(
//           //   `${APP_ENV.AUTH_PORT}/tawasalna-user/residentmanagement/verifysecondaryemailcode/${userId}`,
//           //   { email, code: enteredCode },
//           //   {
//           //     headers: {
//           //       "Content-Type": "application/json", // Add headers
//           //       // Authorization: "Bearer ...", // Add if needed
//           //     },
//           //   }
//           // );

//           const response = await axiosInstance.post(
//             `tawasalna-user/residentmanagement/verifysecondaryemailcode/${userId}`,
//             {
//               email,
//               code: enteredCode,
//             }
//           );
//           console.log("responnnnnce ::::::::::::::: : "+response);

//        navigation.navigate("EMAILMANAGMENT");         
//        console.log("Code Verification done!");
//           }catch (error) {
//           if (error.response) {
//             if (
//               error.response &&
//               error.response.data &&
//               error.response.data.error
//             ) {
//               const errorMessage = error.response.data.error;
//               console.log(errorMessage);

//               if (errorMessage === "Invalide Code") {
//                 showToast("error", "Invalid Code", "The code you entered  is incorrect.");
//               } else if (errorMessage === "Code Expired") {
//                                 showToast(
//                                   "error",
//                                   "Code expired",
//                                   "Your  verfication code has been expired."
//                                 );

//               }
//             } else {
//               console.error("Error:", error);
//             }
//           }
//         }
//       } else if (text !== "") {
//         codeInputRefs.current[index + 1].focus();
//       }
//     };
//    /////////////////////////////////////////////////////////////
//    const handleResendCode = async (text, index) => {
//         const newCode = [...code];
//         newCode[index] = text;
//         setCode(newCode);
//      try {
//        const enteredCode = newCode.join("");
//        const response = await axios.patch(
//          `${APP_ENV.AUTH_PORT}/tawasalna-user/auth/reset-code`,
//          {
//            email,
//            code: enteredCode,
//          }
//        );
//        console.log("Code has been sended :", response.data);
//      } catch (error) {
//        console.error("Error while sending Code :", error);
//        ToastAndroid.show(
//          "Failed to send code. Please try again.",
//          ToastAndroid.SHORT
//        );
//      }
//    }; 
    
//     return (
//       <SafeAreaView style={{ backgroundColor: Colors.WHITE, height: 760 }}>
//         <View style={{ marginTop: "-1%" }}>
//           <View style={{ marginBottom: "6%", marginLeft: "8%" }}>
//             <Text style={{ fontSize: 35, fontWeight: "bold" }}>
//               Manage your Emails
//             </Text>
//           </View>
//           <View
//             style={{ marginBottom: "20%", marginLeft: "8%", marginRight: "4%" }}
//           >
//             <Text style={{ fontSize: 12, color: "gray", fontStyle: "italic" }}>
//               We've sent you a 6-digit code to {email}
//             </Text>
//           </View>
//           <View>
//             <View
//               style={{
//                 flexDirection: "row",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 marginTop: "-13%",
//               }}
//             >
//               {code.map((code, index) => (
//                 <TextInput
//                   key={index}
//                   ref={(ref) => (codeInputRefs.current[index] = ref)}
//                   style={{
//                     borderBottomWidth: 2,
//                     borderBottomColor: Colors.PURPLE,
//                     marginHorizontal: 5,
//                     width: 40,
//                     textAlign: "center",
//                     fontSize: 16,
//                   }}
//                   keyboardType="numeric"
//                   maxLength={1}
//                   value={code}
//                   onChangeText={(text) => handleCodeChange(text, index)}
//                 />
//               ))}
//             </View>
//             {codeError ? (
//               <Text style={{ color: "red", marginLeft: "37%" }}>
//                 {codeError}
//               </Text>
//             ) : null}
//           </View>
//           <View
//             style={{
//               flexDirection: "row",
//               justifyContent: "center",
//               alignItems: "center",
//               marginTop: "5%",
//               marginRight: 10,
//             }}
//           >
//             <Text>Did not receive a code?</Text>
//             <TouchableOpacity onPress={handleResendCode}>
//               <Text style={{ color: Colors.PURPLE, marginLeft: 5 }}>
//                 Resend
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </SafeAreaView>
//     );
//   };
  
//   export default VerificationCode;
  