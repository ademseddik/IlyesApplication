// import React, { useState, useRef, forwardRef, useImperativeHandle, useEffect } from 'react';
// import { View, Text, Animated, StyleSheet } from 'react-native';
// import { TextInput } from 'react-native-paper';
// import { EvilIcons, MaterialCommunityIcons } from "@expo/vector-icons";

// const CustomInput = forwardRef(({ label, nextInputRef, errorCondition, value, inputOnChange, style, keyboardType   }, ref) => {
//   const [internalErrorMessage, setInternalErrorMessage] = useState('');
//   const [error, setError] = useState(false);
//   const shakeAnimation = new Animated.Value(0);
//   const inputRef = useRef(null);

//   const shakeInput = () => {
//     Animated.sequence([
//       Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
//       Animated.timing(shakeAnimation, { toValue: -10, duration: 50, useNativeDriver: true }),
//       Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
//       Animated.timing(shakeAnimation, { toValue: 0, duration: 50, useNativeDriver: true })
//     ]).start();
//   };

//   const onChangeText = newText => {
//     const errorResult = errorCondition(newText);
//     setError(errorResult.error);
//     setInternalErrorMessage(errorResult.errorMessage);
//     inputOnChange(newText);
//   };

//   useImperativeHandle(ref, () => ({
//     focus: () => {
//       inputRef.current.focus();
//     }
//   }));

//   const focusNextInput = () => {
//     if (nextInputRef && nextInputRef.current) {
//       nextInputRef.current.focus();
//     }
//   };

//   useEffect(() => {
//     if (error) {
//       shakeInput();
//     }
//   }, [error]);

//   return (
//     <View style={styles.container}>
//       <Animated.View
//         style={[
//           styles.inputContainer,
//           { borderColor: error ? "red" : "black" },
//           {
//             transform: [
//               {
//                 translateX: shakeAnimation.interpolate({
//                   inputRange: [-10, 10],
//                   outputRange: [-5, 5],
//                 }),
//               },
//             ],
//           },
//         ]}
//       >
//         <TextInput
//           mode="outlined"
//           label={label}
//           value={value}
//           onChangeText={onChangeText}
//           onSubmitEditing={focusNextInput}
//           style={style}
//           error={error}
//           ref={inputRef}
//           keyboardType={keyboardType}
//           returnKeyType="next"
//         />
//       </Animated.View>
//       {error && <Text style={styles.errorText}>{internalErrorMessage}</Text>}
//     </View>
//   );
// });

// const styles = StyleSheet.create({
//   container: {
//     // marginBottom: 10,
//   },
//   inputContainer: {
//     // borderBottomWidth: 1,
//   },
//   input: {
//     height: 40,
//     // paddingHorizontal: 5,
//   },
//   errorText: {
//     color: 'red',
//     marginTop: 5,
//   },
// });

// export default CustomInput;
