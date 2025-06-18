// import {
//     View,
//     Text,
//     TextInput,
//     SafeAreaView,
//     TouchableOpacity,
//     ToastAndroid,
//   } from "react-native";
//   import React, { useState, useRef } from "react";
//   import Colors from "../../presentation/Utils/Colors";
//   import { useNavigation, useRoute } from "@react-navigation/native";
//   import createAxiosInstance from "../../../core/config/Axios";
//   import { APP_ENV } from "../../../core/utils/BaseUrl";

//   const VerificationPhoneCode = () => {
//   const navigation = useNavigation();
//   const codeInputRefs = useRef([]);
//   const route = useRoute();
//   const [code, setCode] = useState(["", "", "", "", "", ""]); 
//   const [email, setEmail] = useState("");
//   const [codeError, setCodeError] = useState("");
//   ////////////////////////////////////////////////////////////////
//     const handleCodeChange = async (text, index) => {
//       const newCode = [...code];
//       newCode[index] = text;
//       setCode(newCode);
  
//       if (index === 5 && newCode.every((item) => item !== "")) {
//         const enteredCode = newCode.join("");
  
//         try {
//           const response = await createAxiosInstance(APP_ENV.AUTH_PORT).patch(
//             `tawasalna-user/auth/verifyAccount`,
//             {
//               email,
//               code: enteredCode,
//             }
//           );
//           console.log("Account Verified:", response.data);
//           navigation.navigate("EMAILMANAGMENT");
//         } catch (error) {
//           console.error("Error while verifying Account :", error);
//           ToastAndroid.show(
//             "Failed to verify Account. Please try again.",
//             ToastAndroid.SHORT
//           );
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
//        const response = await createAxiosInstance(APP_ENV.AUTH_PORT).patch(
//          `tawasalna-user/auth/reset-code`,
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
//           <View style={{ marginBottom: "6%", marginLeft: "6%" }}>
//             <Text style={{ fontSize: 35, fontWeight: "bold" }}>
//               Manage your Number
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
//               <Text style={{ color: "red", marginLeft: "37%" }}>{codeError}</Text>
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
//               <Text style={{ color: Colors.PURPLE, marginLeft: 5 }}>Resend</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </SafeAreaView>
//     );
//   };
  
//   export default VerificationPhoneCode;
  