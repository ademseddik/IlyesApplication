// import React, { useState, useRef, forwardRef, useImperativeHandle,useEffect } from "react";
// import { View, StyleSheet,Animated, Text } from "react-native";
// import CountryPicker from "react-native-country-picker-modal";
// import { TextInput } from "react-native-paper";
// import parsePhoneNumber from "libphonenumber-js";


// const PhoneNumberInput = ({
//   countryCode,
//   handleCountryCode,
//   handlePhoneNumber,
//   phoneNumber,
//   handleError,
//   error,
//   style,
// }) => {
//   // const [error, setError] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   const shakeInput = () => {
//     Animated.sequence([
//       Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
//       Animated.timing(shakeAnimation, { toValue: -10, duration: 50, useNativeDriver: true }),
//       Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
//       Animated.timing(shakeAnimation, { toValue: 0, duration: 50, useNativeDriver: true })
//     ]).start();
//   }

//   const shakeAnimation = new Animated.Value(0)


//   const handleCountryCodeChange = (text) => {
//     console.log(countryCode,"TTTTTTTTTTTTTTTTTTTTT");
//     if (text !== countryCode) {
//       handleCountryCode(text);
//       if (phoneNumber.length === 0) {
//         handleError(true);
//         setErrorMessage(`Shouldn't be empty`);
//       } else {
//         handleError(false);
//         setErrorMessage("");
//       }
//     }
//   };

//   const handlePhoneNumberChange = (text) => {
//     handlePhoneNumber(text);
//     if (text.length === 0) {
//       handleError(true);
//       setErrorMessage(`Should not be empty`);
//     } else {
//       handleError(false);
//       setErrorMessage("");
//     }
//   };

//   const formatPhoneNumber = text => {
//     try {
//       const phoneNumberObj = parsePhoneNumber(text, countryCode);
//       if (phoneNumberObj) {
//         return phoneNumberObj.formatNational();
//       }
//     } catch (error) {
//       handleError(true);
//       setErrorMessage('Invalid phone number');
//     }
//     return text;
//   };

  
//   useEffect(() => {
//     if (error) {
//       shakeInput();
//     }
//   }, [error])

//   return (
//     <View >
//      <View style={styles.container} >
      
//         <CountryPicker
//           withCallingCodeButton
//           withCallingCode
//           withFilter
//           withFlag
//           countryCode={countryCode}
//           onSelect={(country) => handleCountryCodeChange(country.cca2)}
//           containerButtonStyle={styles.countryPicker}
//         />
//        <Animated.View
//         style={[
//           styles.inputContainer,
//           { borderColor: error ? 'red' : 'black' },
//           {
//             transform: [
//               {
//                 translateX: shakeAnimation.interpolate({
//                   inputRange: [-10, 10],
//                   outputRange: [-5, 5]
//                 })
//               }
//             ]
//           }
//         ]}
//       >

//       <TextInput
//         mode="outlined"
//         label="Phone Number"
//         value={formatPhoneNumber(phoneNumber)} 
//         onChangeText={handlePhoneNumberChange}
//         error={error}
//         // errorMessage={errorMessage}
//         style={style}
//         keyboardType="phone-pad"
//       />
//       </Animated.View>
//       </View>
//       {error && <Text style={styles.errorText}>{errorMessage}</Text>}
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   container:{
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   errorText: {
//     color: "red",
//     marginTop: 5,
//   },
//   countryPicker: {
//     borderWidth: 1,
//     borderRadius: 5,
//     borderColor: "gray",
//     marginBottom: 10,
//     width:120,
//     height:50,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });

// export default PhoneNumberInput;
