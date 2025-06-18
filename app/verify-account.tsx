import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useState, useRef } from "react";

import Axios from "axios";
import { APP_ENV } from "./core/utils/BaseUrl";
import { useLocalSearchParams, useRouter } from "expo-router";

const VerifyAccount = () => {
  const router = useRouter();
  const codeInputRefs = useRef<TextInput[]>(Array(6).fill(null));
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const { email } = useLocalSearchParams<{ email: string }>();
  const [codeError, setCodeError] = useState("");

  const handleCodeChange = async (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (index === 5 && newCode.every((item) => item !== "")) {
      const enteredCode = newCode.join("");

      try {
        const response = await Axios.patch(
          `${APP_ENV.AUTH_PORT}/tawasalna-user/auth/verifyAccount`,
          {
            email,
            code: enteredCode,
          }
        );
        console.log("Account Verified:", response.data);
        router.push("/welcome");
      } catch (error) {
        console.error("Error while verifying Account:", error);
        ToastAndroid.show(
          "Failed to verify Account. Please try again.",
          ToastAndroid.SHORT
        );
      }
    } else if (text !== "") {
      codeInputRefs.current[index + 1]?.focus();
    }
  };

  const handleResendCode = async () => {
    try {
      const response = await Axios.post(
        `${APP_ENV.AUTH_PORT}/tawasalna-user/auth/resend-code`,
        { email }
      );
      console.log("Code resent:", response.data);
      ToastAndroid.show("Verification code resent", ToastAndroid.SHORT);
    } catch (error) {
      console.error("Error resending code:", error);
      ToastAndroid.show("Failed to resend code", ToastAndroid.SHORT);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
        <View style={{ marginBottom: 24 }}>
          <Text style={{ fontSize: 35, fontWeight: "bold" }}>
            Verify your account
          </Text>
        </View>
        
        <View style={{ marginBottom: 40 }}>
          <Text style={{ fontSize: 12, color: "gray", fontStyle: "italic" }}>
            We've sent you a 6-digit code to {email}
          </Text>
        </View>

        <View style={{ alignItems: "center" }}>
          <View style={{ flexDirection: "row", gap: 10 }}>
            {code.map((_, index) => (
              <TextInput
                key={index}
                ref={(ref) => ref && (codeInputRefs.current[index] = ref)}
                style={{
                  borderBottomWidth: 2,
                  borderBottomColor: "#770b7b",
                  width: 40,
                  textAlign: "center",
                  fontSize: 16,
                }}
                keyboardType="numeric"
                maxLength={1}
                value={code[index]}
                onChangeText={(text) => handleCodeChange(text, index)}
              />
            ))}
          </View>
          {codeError && (
            <Text style={{ color: "red", marginTop: 8 }}>{codeError}</Text>
          )}
        </View>

        <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 20 }}>
          <Text>Did not receive a code?</Text>
          <TouchableOpacity onPress={handleResendCode}>
            <Text style={{ color: "#770b7b", marginLeft: 5 }}>Resend</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default VerifyAccount;