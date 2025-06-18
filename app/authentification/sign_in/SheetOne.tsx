import React, { forwardRef, useMemo, useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, ActivityIndicator,Image,ScrollView,KeyboardAvoidingView } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { APP_ENV } from "../../core/utils/BaseUrl";
import Axios, { AxiosError } from "axios";
import { useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';

interface SheetOneProps {
  onChange?: (index: number) => void;
  index?: number;
}

const SheetOne = forwardRef<BottomSheet, SheetOneProps>(({ onChange, index = -1 }, ref) => {
  const snapPoints = useMemo(() => ["60%", "70%", "90%"], []);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigation = useNavigation();

  const visibleIcon = require('../../../assets/images/icons/visible.png');
  const hideIcon = require('../../../assets/images/icons/hide.png');

  const router = useRouter(); 
  // Email validation helper function
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Login handler
const handleLogin = async () => {
  if (!email.trim()) {
    setEmailError("Email is required!");
    return;
  // } 
  // else if (!isValidEmail(email)) {
  //   setEmailError("Invalid email address!");
  //   return;
  } else if (!password.trim()) {
    setPasswordError("Password isrequired");
    return;
  } else {
    setEmailError("");
    setPasswordError("");
  }

  setIsLoading(true);

  try {
   
   
  

    // Custom navigation logic for specific credentials
    if (email === "ilyesgharbi@gmail.com" && password === "123456789") {
router.push('/gridScreen');

    } else {
    router.push("/gridScreen");

    }

    console.log("Logged in succesflly");
  } catch (error) {
    // Handle errors
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.error || "An error occurred";
      console.log(errorMessage);

      if (errorMessage === "User not found") {
        setEmailError("User not found");
      } else if (errorMessage === "User account disabled") {
        setEmailError("User account disabled");
      } else if (errorMessage === "Invalid credentials") {
        setEmailError("Invalid credentials");
        const loginAttempts = parseInt(await AsyncStorage.getItem("loginAttempts") || "0", 10);
        if (loginAttempts >= 2) {
          // navigation.navigate("ForgotPassword");
        } else {
          await AsyncStorage.setItem("loginAttempts", (loginAttempts + 1).toString());
        }
      }
    } else if (error instanceof Error) {
      console.error("Error:", error.message);
    } else {
      console.error("Unknown error occurred:", error);
    }
  } finally {
    setIsLoading(false);
  }
};

  return (
    <BottomSheet
    ref={ref}
    index={index}
    snapPoints={snapPoints}
    keyboardBehavior="fillParent"
    enableDynamicSizing={false}
    enableContentPanningGesture={false}
    enablePanDownToClose={true}
    backgroundStyle={styles.background}
    >
      <BottomSheetView style={styles.contentContainer}>
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

        <View style={styles.formContainer}>
          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[styles.input, emailError ? styles.inputError : null]}
              placeholder="Joybee@gmail.com"
              placeholderTextColor="#999"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setEmailError("");
              }}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={[styles.input, passwordError ? styles.inputError : null]}
              placeholder="**********"
              placeholderTextColor="#999"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setPasswordError("");
              }}
              secureTextEntry={!showPassword}
            />
            <Pressable
                               style={styles.showPasswordButton}
                               onPress={() => setShowPassword(!showPassword)}
                               hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                             >
                               <Image
                                 source={showPassword ? hideIcon : visibleIcon}
                                 style={styles.passwordIcon}
                               />
            </Pressable>
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
          </View>

          {/* Forgot Password */}
          <Pressable
            style={styles.forgotPasswordButton}
            onPress={() => router.push('../../screens/gridScreen.tsx')}
          >
            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
          </Pressable>

          {/* Sign In Button */}
          <Pressable
            style={styles.signInButton}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.signInText}>SIGN IN</Text>
            )}
          </Pressable>

          {/* Sign Up Section */}
          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Don't have an account?</Text>
            <Pressable
              style={styles.signUpButton}
              //onPress={() => navigation.navigate("SignUp")}
            >
              <Text style={[styles.signUpText, { color: '#4e2eb0' }]}>Sign up</Text>
            </Pressable>
          </View>
        </View>
        </ScrollView>
        </KeyboardAvoidingView>

      </BottomSheetView>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'white',
    borderRadius: 40,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: -4 },
    elevation: 20,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  formContainer: {
    flex: 1,
    marginTop: 40,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    color: '#4e2eb0',
    fontSize: 16,
    marginBottom: 8,
    paddingLeft: 10,
    fontWeight: '300',
  },
  input: {
    backgroundColor: 'rgba(78, 46, 176, 0.1)',
    borderRadius: 20,
    height: 50,
    marginEnd: 10,
    paddingLeft: 15,
    fontSize: 16,
    color: '#000',
  },
  inputError: {
    borderColor: 'red',
    borderWidth: 1,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
    paddingLeft: 10,
  },
  passwordIcon: {
    width: 24,
    height: 24,
    tintColor: '#4e2eb0', // Optional: if you want to color the icons
  },
  showPasswordButton: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
  showPasswordText: {
    color: '#4e2eb0',
    fontWeight: 'bold',
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginBottom: 32,
  },
  forgotPasswordText: {
    color: '#4e2eb0',
    fontSize: 14,
  },
  signInButton: {
    backgroundColor: '#4e2eb0',
    borderRadius: 35,
    padding: 18,
    alignItems: 'center',
    marginVertical: 8,
  },
  signInText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  signUpText: {
    color: '#4e2eb0',
    marginRight: 8,
  },
  signUpButton: {
    marginLeft: 4,
  },
});

export default SheetOne;