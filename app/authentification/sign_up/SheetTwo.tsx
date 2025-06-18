import React, { forwardRef, useMemo, useState, useEffect } from 'react';
import { StyleSheet, Pressable, TextInput, ScrollView, Image, ActivityIndicator, Modal, TouchableOpacity } from 'react-native';
import { View, Text } from "react-native";
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Asset } from 'expo-asset';
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { MaterialIcons } from '@expo/vector-icons';
import Axios from 'axios';
import { APP_ENV } from '../../core/utils/BaseUrl';
import { KeyboardAvoidingView, Platform } from 'react-native';
import Termsofservices from "../../pup_ups/Termsofservices";
import PrivacyPolicy from "../../pup_ups/PrivacyPolicy";
import { useRouter } from 'expo-router';

interface SheetTwoProps {
  index?: number;
  navigation?: any;

}

const SheetTwo = forwardRef<BottomSheet, SheetTwoProps>(({ index = -1, navigation,
}, ref) => {
  const snapPoints = useMemo(() => ["30%","70%", "90%"], []);
  const visibleIcon = require('../../../assets/images/icons/visible.png');
  const hideIcon = require('../../../assets/images/icons/hide.png');
  const router = useRouter();

  // State variables
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [termsVisible, setTermsVisible] = useState(false);
  const [privacyVisible, setPrivacyVisible] = useState(false);
  const [role] = useState("65d6717f31baa16064d291dc");

  // Error states
  const [dateofbirthError, setDateOfBirthError] = useState("");
  const [fullnameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmpasswordError, setConfirmPasswordError] = useState("");
  const [termspolicyError, setTermsPolicyError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  // Modals


  const isValidEmail = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };
  const isValidPhone = (phone: string) => {
    const phonePattern = /^\+?[1-9]\d{1,14}$/; // E.164 format
    return phonePattern.test(phone);
  };

  const isValidPassword = (password: string) => {
    const errors = {
      minLength: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      symbol: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      number: /\d/.test(password),
    };
    return { isValid: Object.values(errors).every(valid => valid), errors };
  };

  //////////////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////////////
  const validateForm = () => {
    let isValid = true;
    const passwordValidation = isValidPassword(password);

    // Reset errors
    setDateOfBirthError("");
    setFullNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setTermsPolicyError("");
    setPhoneError("");

    if (new Date(dateOfBirth) > new Date()) {
      setDateOfBirthError("Date of birth cannot be in the future");
      isValid = false;
    }

    if (!name.trim()) {
      setFullNameError("FullName is required!");
      isValid = false;
    }

    if (!email.trim()) {
      setEmailError("Email is required!");
      isValid = false;
    } else if (!isValidEmail(email)) {
      setEmailError("Invalid email address!");
      isValid = false;
    }
    if (!phoneNumber.trim()) {
      setPhoneError("Phone number is required!");
      isValid = false;
    } else if (!isValidPhone(phoneNumber)) {
      setPhoneError("Invalid phone number format!");
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (!passwordValidation.isValid) {
      let errorMessage = "";
      if (!passwordValidation.errors.minLength) errorMessage += "• At least 8 characters\n";
      if (!passwordValidation.errors.uppercase) errorMessage += "• One uppercase letter\n";
      if (!passwordValidation.errors.lowercase) errorMessage += "• One lowercase letter\n";
      if (!passwordValidation.errors.symbol) errorMessage += "• One symbol\n";
      if (!passwordValidation.errors.number) errorMessage += "• One number";
      setPasswordError(errorMessage);
      isValid = false;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match!");
      isValid = false;
    }

    if (!isChecked) {
      setTermsPolicyError("Please accept the Terms and Privacy Policy!");
      isValid = false;
    }

    return isValid;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await Axios.post(`${APP_ENV.AUTH_PORT}/tawasalna-user/auth/signup`, {
        fullname: name,
        dateOfBirth: new Date(dateOfBirth),
        email,
        password,
        role,
        phoneNumber,
      });

      console.log("Sign-up successful:", response.data);
      router.push({ pathname: "/verify-account", params: { email } });
    } catch (error: any) {
      if (error.response?.data?.error === "User already exists") {
        setEmailError("User already exists");
      } else {
        console.error("Error signing up:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDatePicker = () => setShowPicker(!showPicker);

  const onchangeDatePicker = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    if (event.type === "dismissed") {
      setShowPicker(false);
      return;
    }

    if (selectedDate) {
      setDate(selectedDate);
      const formattedDate = `${selectedDate.getFullYear()}-${String(
        selectedDate.getMonth() + 1
      ).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`;
      setDateOfBirth(formattedDate);
    }
    setShowPicker(false);
  };

  return (
    <BottomSheet
      ref={ref}
      index={index}
      snapPoints={snapPoints}
      keyboardBehavior="extend"
      enableDynamicSizing={false}
      enableContentPanningGesture={false}
      enablePanDownToClose={true}
      backgroundStyle={styles.background}
      android_keyboardInputMode="adjustResize"
     
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        <ScrollView
          style={styles.scrollContent}
          contentContainerStyle={styles.formContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <BottomSheetView style={styles.contentContainer}>
                    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.formContainer}>

              {/* Full Name Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                  style={[styles.input, fullnameError ? styles.errorInput : null]}
                  placeholder="Enter your name"
                  placeholderTextColor="#999"
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                />
                {fullnameError && <Text style={styles.errorText}>{fullnameError}</Text>}
              </View>

              {/* Date of Birth Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Date of Birth</Text>
                <Pressable onPress={toggleDatePicker}>
                  <TextInput
                    style={[styles.input, dateofbirthError ? styles.errorInput : null]}
                    placeholder="Select your date of birth"
                    placeholderTextColor="#999"
                    value={dateOfBirth}
                    editable={false}
                    onPressIn={toggleDatePicker}
                  />
                </Pressable>
                {showPicker && (
                  <View style={styles.pickerContainer}>
                    <DateTimePicker
                      value={date}
                      mode="date"
                      display="spinner"
                      onChange={onchangeDatePicker}
                      maximumDate={new Date()}
                      themeVariant="light"
                    />
                  </View>
                )}
                {dateofbirthError && <Text style={styles.errorText}>{dateofbirthError}</Text>}
              </View>

              {/* Email Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={[styles.input, emailError ? styles.errorInput : null]}
                  placeholder="Joybee@gmail.com"
                  placeholderTextColor="#999"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                {emailError && <Text style={styles.errorText}>{emailError}</Text>}
              </View>

              {/* Password Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  style={[styles.input, passwordError ? styles.errorInput : null]}
                  placeholder="**********"
                  placeholderTextColor="#999"
                  value={password}
                  onChangeText={setPassword}
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
                {passwordError && (
                  <Text style={[styles.errorText, { marginTop: 4 }]}>{passwordError}</Text>
                )}
              </View>

              {/* Confirm Password Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Confirm Password</Text>
                <TextInput
                  style={[styles.input, confirmpasswordError ? styles.errorInput : null]}
                  placeholder="**********"
                  placeholderTextColor="#999"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                />
                <Pressable
                  style={styles.showPasswordButton}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Image
                    source={showConfirmPassword ? hideIcon : visibleIcon}
                    style={styles.passwordIcon}
                  />
                </Pressable>
                {confirmpasswordError && (
                  <Text style={styles.errorText}>{confirmpasswordError}</Text>
                )}
              </View>

              {/* Resident ID Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                  style={[styles.input, phoneError ? styles.errorInput : null]}
                  placeholder="+971501234567"
                  placeholderTextColor="#999"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  keyboardType="phone-pad"
                  autoComplete="tel"
                />
                {phoneError && <Text style={styles.errorText}>{phoneError}</Text>}
              </View>

              {/* Terms Checkbox */}
              <View style={styles.termsContainer}>
                <TouchableOpacity onPress={() => setIsChecked(!isChecked)}>
                  <MaterialIcons
                    name={isChecked ? "check-box" : "check-box-outline-blank"}
                    size={24}
                    color={isChecked ? '#4e2eb0' : '#666'}
                  />
                </TouchableOpacity>
                <Text style={styles.termsText}>
                  I accept the{' '}
                  <Text style={styles.linkText} onPress={() => setTermsVisible(true)}>
                    Terms of Service
                  </Text>{' '}
                  and{' '}
                  <Text style={styles.linkText}  onPress={() => setPrivacyVisible(true)}>
                    Privacy Policy
                  </Text>
                </Text>
              </View>

            
            
             
              {termspolicyError && (
                <Text style={[styles.errorText, { marginLeft: 10 }]}>{termspolicyError}</Text>
              )}

              {/* Sign Up Button */}
              <Pressable
                style={styles.signUpButton}
                onPress={handleSignUp}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={styles.signUpButtonText}>SIGN UP</Text>
                )}
              </Pressable>

              {/* Login Link */}
              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Already have an account?</Text>
                <Pressable onPress={() => navigation.navigate("Log-In")}>
                  <Text style={styles.loginLink}>Login</Text>
                </Pressable>
              </View>
            </View>
                    </ScrollView>
                    </KeyboardAvoidingView>

          </BottomSheetView>

   
        
        </ScrollView>
      </KeyboardAvoidingView>
      <Termsofservices
          visible={termsVisible}
          onClose={() => setTermsVisible(false)
            
          }
        />
        <PrivacyPolicy
          visible={privacyVisible}
          onClose={() => setPrivacyVisible(false)
            
          }
        />
    </BottomSheet>
    

  );
});



const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  background: {
    backgroundColor: 'white',
    borderRadius: 40,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: -4 },
    elevation: 20,
  },
  pickerContainer: {
    backgroundColor: 'rgba(255, 246, 246, 0.1)',
    borderRadius: 20,
    overflow: 'hidden',
    marginHorizontal: 10,
  },
  datePicker: {
    transform: [{ scale: 0.9 }], // Adjust size
    backgroundColor: 'rgba(238, 238, 238, 0.1)',
  },
  scrollContent: {
    paddingBottom: 100, // Add padding to accommodate keyboard
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  formContainer: {
    justifyContent: 'center',
    paddingBottom: 50, // Combined with scrollContent
    marginTop: 20
  },
  inputContainer: {
    marginBottom: 15,
    height: 80
  },
  label: {
    color: '#4e2eb0',
    fontSize: 16,
    paddingLeft: 10,
    fontWeight: '300',
  },
  input: {
    backgroundColor: 'rgba(78, 46, 176, 0.1)',
    borderRadius: 20,
    height: 60,
    marginEnd: 10,
    paddingLeft: 15,
    fontSize: 16,
    color: '#FFFFFFF',
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
    margin: 3,
    right: 16,
    bottom: 13,
  },
  showPasswordText: {
    color: '#4e2eb0',
    fontWeight: 'bold',
  },
  signUpButton: {
    backgroundColor: '#4e2eb0',
    borderRadius: 35,
    padding: 18,
    alignItems: 'center',
    marginVertical: 16,
  },
  signUpButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 'auto', // Pushes to bottom
    paddingVertical: 20,
  },
  loginText: {
    color: '#4e2eb0',
    marginRight: 8,
  },
  loginButton: {
    marginLeft: 4,
  },
  errorInput: {
    borderColor: 'red',
    borderWidth: 1,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  termsText: {
    color: '#666',
    marginLeft: 8,
    flexShrink: 1,
  },
  linkText: {
    color: '#4e2eb0',
    textDecorationLine: 'underline',
  },
  loginLink: {
    color: '#4e2eb0',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default SheetTwo;