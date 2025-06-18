import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,  
  StyleSheet,
} from "react-native";

const LanguageModal = ({ visible, onClose, selectedValue, onValueChange }) => {
  const options = [
    {
      label: "English",
      value: "en",
      flag: require("../../assets/flags/enFlag.png"),
    },
    {
      label: "Spanish",
      value: "es",
      flag: require("../../assets/flags/SpainFlag.png"),
    },
    {
      label: "French",
      value: "fr",
      flag: require("../../assets/flags/FranceFlag.png"),
    },
    {
      label: "German",
      value: "de",
      flag: require("../../assets/flags/GermanyFlag.png"),
    },
    {
      label: "Arabic",
      value: "ar",
      flag: require("../../assets/flags/ArFlag.png"),
    },
    {
      label: "Portuguese",
      value: "pt",
      flag: require("../../assets/flags/portugalFlag.png"),
    },
  ];

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <FlatList
            data={options}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => {
                  onValueChange(item.value);
                  onClose();
                }}
              >
                <Image source={item.flag} style={styles.flag} />
                <Text style={styles.label}>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    backgroundColor: "white",
    width: "80%",
    borderRadius: 10,
    overflow: "hidden",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  flag: {
    width: 30,
    height: 20,
    marginRight: 10,
  },
  label: {
    fontSize: 18,
  },
  closeButton: {
    padding: 10,
    backgroundColor: "#ddd",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 16,
  },
});

export default LanguageModal;
