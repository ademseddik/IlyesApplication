import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { BlurView } from 'expo-blur';
const PrivacyPolicy = ({ visible, onClose }) => (

  <Modal
    visible={visible}
    animationType="slide"
    transparent={true}
    onRequestClose={onClose}
  >
    <View style={styles.modalContainer}>
   
      <View style={styles.modalContent}>
      <BlurView intensity={50} style={styles.blurContainer}>
        <Text style={styles.modalTitle}>Privacy and Policy</Text>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
        >
          
          <Text style={styles.textContent}>
          Our Privacy Policy describes how your personal information is
              collected, used, and shared when you use our mobile application
              ExampleApp.
              {"\n\n"}
              **Personal Information We Collect** When you use ExampleApp, we
              may collect certain information from your device, such as your
              device type, IP address, and usage information.
              {"\n\n"}
              **How We Use Your Information** We use the information we collect
              to improve ExampleApp and provide you with a better user
              experience.
              {"\n\n"}
              **Sharing Your Information** We may share your personal
              information with third-party service providers who assist us in
              operating ExampleApp or conducting our business.
              {"\n\n"}
              **Data Retention** We will retain your personal information only
              for as long as necessary for the purposes outlined in this Privacy
              Policy.
              {"\n\n"}
              **Changes to This Privacy Policy** We may update our Privacy
              Policy from time to time. We will notify you of any changes by
              posting the new Privacy Policy on this page.
              {"\n\n"}
              **Contact Us** If you have any questions or concerns about our
              Privacy Policy, please contact us at example@example.com.
          </Text>
         
        </ScrollView>
        </BlurView>
      </View>
     
    </View>
  </Modal>

);
const styles = StyleSheet.create({
  modalContainer: {
    width: 320,
    height: 600,
    justifyContent: 'space-around',
    alignItems: 'baseline',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    marginLeft: 20,
    marginTop: 100,
    borderRadius: 20,
  },
  modalContent: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    borderRadius: 20,
    padding: 10
  },
  scrollView: {
    flex: 1,
  },
  blurContainer: {
   flex:1,
   padding:10,
    borderRadius: 20,
    overflow: "hidden",
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  textContent: {
    fontSize: 16,
    color: 'white',
    lineHeight: 22,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    alignSelf: 'center',
    color: 'white'
  },
  closeButton: {
    color: 'rgb(0, 0, 0)',
    alignSelf: 'flex-end',
  },
})

export default PrivacyPolicy;
