import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useTranslation } from "react-i18next";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
//import LanguageModal from "../../PopUps/LanguageModal";

const ApplicationLanguage = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  const [isLoading, setIsLoading] = useState(true);
  const [pickerVisible, setPickerVisible] = useState(false);

  useEffect(() => {
    const fetchAndApplyLanguage = async () => {
      const userId = await AsyncStorage.getItem("userId");
      if (userId) {
        const savedLanguage = await AsyncStorage.getItem(`Applanguage`);
        if (savedLanguage) {
          i18n.changeLanguage(savedLanguage);
          setSelectedLanguage(savedLanguage);
        }
      }
      setIsLoading(false);
    };

    fetchAndApplyLanguage();
  }, []);

  const changeLanguage = async (value) => {
    const userId = await AsyncStorage.getItem("userId");
    if (userId) {
      await AsyncStorage.setItem(`Applanguage`, value);
      i18n.changeLanguage(value);
      setSelectedLanguage(value);
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View>
      <View style={{ flexDirection: "row", marginTop: "12%" }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: "5%",
            }}
          >
            <AntDesign name="arrowleft" size={35} color="black" />
          </View>
        </TouchableOpacity>

        <View
          style={{
            borderRadius: 10,
            height: 40,
            flexDirection: "row",
            width: 300,
            marginLeft: "1%",
            top: "-15%",
          }}
        >
          <Text style={{ fontSize: 28, fontWeight: "400" }}>
            {t("Application Language")}
          </Text>
        </View>
      </View>
      <View style={{ marginLeft: 30, marginTop: 40 }}>
        <Text style={{ marginBottom: 10 }}>{t("selectLanguage")}</Text>
        <TouchableOpacity
          style={styles.pickerButton}
          onPress={() => setPickerVisible(true)}
        >
          <Text style={styles.pickerText}>{t(selectedLanguage)}</Text>
        </TouchableOpacity>
        <Text style={{ marginTop: 10 }}>
          {t("selectedLanguage")} {t(selectedLanguage)}
        </Text>
      </View>
      <LanguageModal
        visible={pickerVisible}
        onClose={() => setPickerVisible(false)}
        selectedValue={selectedLanguage}
        onValueChange={changeLanguage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  pickerButton: {
    height: 40,
    width: "90%",
    borderColor: "gray",
    borderWidth: 0.3,
    borderRadius: 10,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  pickerText: {
    fontSize: 16,
    color: "grey",
  },
});

export default ApplicationLanguage;
