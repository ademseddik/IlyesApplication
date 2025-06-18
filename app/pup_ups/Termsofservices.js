import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { BlurView } from 'expo-blur';
const Termsofservices = ({ visible, onClose }) => (

  <Modal
    visible={visible}
    animationType="slide"
    transparent={true}
    onRequestClose={onClose}
  >
    <View style={styles.modalContainer}>
   
      <View style={styles.modalContent}>
      <BlurView intensity={80} style={styles.blurContainer}>
        <Text style={styles.modalTitle}>Terms of Service</Text>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
        >
          
          <Text style={styles.textContent}>
            Welcome to ExampleApp! By accessing or using ExampleApp, you agree
            to be bound by these terms of service. If you disagree with any
            part of the terms, you may not access the app.
            {"\n\n"}
            **1. Description of Service** ExampleApp is a mobile application
            that allows users to [brief description of app's purpose and
            features].
            {"\n\n"}
            **2. User Accounts** - You may be required to create an account to
            access certain features of the app. - You are responsible for
            maintaining the security of your account and password. - You must
            notify us immediately of any unauthorized use of your account.
            {"\n\n"}
            **3. User Conduct** - You agree not to engage in any unlawful or
            prohibited activities while using ExampleApp. - You agree not to
            harass, abuse, or harm other users of the app.
            {"\n\n"}
            **4. Content Ownership** - You retain ownership of any content you
            upload, share, or create within ExampleApp. - By submitting
            content to ExampleApp, you grant us a non-exclusive, royalty-free
            license to use, reproduce, modify, and distribute your content.
            {"\n\n"}
            **5. Privacy Policy** - Your use of ExampleApp is subject to our
            Privacy Policy, which can be found [link to privacy policy].
            {"\n\n"}
            **6. Intellectual Property Rights** - All trademarks, copyrights,
            and other intellectual property rights associated with ExampleApp
            are owned by [App Developer]. - You agree not to use any
            trademarks, logos, or other proprietary information without prior
            written consent.
            {"\n\n"}
            **7. Limitation of Liability** - ExampleApp and its affiliates
            will not be liable for any direct, indirect, incidental, special,
            or consequential damages arising out of the use or inability to
            use the app.
            {"\n\n"}
            **8. Indemnification** - You agree to indemnify and hold harmless
            ExampleApp and its affiliates from any claims, losses,
            liabilities, damages, or expenses arising from your use of the
            app.
            {"\n\n"}
            **9. Changes to Terms** - We reserve the right to modify or update
            these terms of service at any time without prior notice. - Your
            continued use of ExampleApp after any changes to the terms
            constitutes acceptance of the revised terms.
            {"\n\n"}
            **10. Governing Law and Dispute Resolution** - These terms of
            service are governed by the laws of [jurisdiction]. - Any disputes
            arising out of or relating to these terms will be resolved through
            arbitration in [jurisdiction].
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
    overflow: "scroll",
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

export default Termsofservices;
