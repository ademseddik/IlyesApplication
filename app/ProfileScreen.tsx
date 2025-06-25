import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, StatusBar } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const profileData = [
  { id: '1', label: 'CIN/Passeport', value: '07999907', icon: 'card-outline' },
  { id: '2', label: 'Nationalité', value: 'Tunisienne', icon: 'flag-outline' },
  { id: '3', label: 'Date, Lieu de naissance', value: '28-01-1998, Jendouba', icon: 'calendar-outline' },
  { id: '4', label: 'Adresse', value: 'jendouba', icon: 'home-outline' },
  { id: '5', label: 'Gouvernerat', value: 'Jendouba', icon: 'location-outline' },
  { id: '6', label: 'Tél / GSM', value: '25435490', icon: 'call-outline' },
  { id: '7', label: 'Tél Parent', value: '51161441', icon: 'people-outline' },
];

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#dc2626" barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mon Profil</Text>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image
              source={require('../assets/images/ilyes.jpg')}
              style={styles.profileImage}
            />
          </View>
          <Text style={styles.profileName}>Ilyes Gharbi</Text>
          <Text style={styles.profileId}>2022cj625</Text>
          <Text style={styles.profileEmail}>ilyesgharbi104@gmail.com</Text>
        </View>

        {/* Profile Details */}
        <View style={styles.detailsContainer}>
          {profileData.map((item) => (
            <View key={item.id} style={styles.detailItem}>
              <View style={styles.iconContainer}>
                <Ionicons name={item.icon} size={20} color="#6b7280" />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.detailLabel}>{item.label}</Text>
                <Text style={styles.detailValue}>{item.value}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Footer Logo */}
        <View style={styles.footerContainer}>
          <Image
            source={require('../assets/images/coverpic.jpg')}
            style={styles.footerLogo}
            resizeMode="contain"
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: '#d40214',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    bottom:15,
    fontWeight: 'bold',
  },
  scrollContainer: {
    flex: 1,
    
  },
  profileSection: {
    backgroundColor: '#7590d9',
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  profileImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'white',
    padding: 4,
    marginBottom: 15,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 56,
  },
  profileName: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
   
  },
  profileId: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    opacity: 0.9,
  },
  profileEmail: {
    color: 'white',
    fontSize: 16,
    opacity: 0.8,
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: 'white',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 16,
    color: '#1f2937',
    fontWeight: '600',
  },
  footerContainer: {
    padding: 0,
    width:'100%',
    height:200,
bottom:100,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  footerLogo: {
    width: '100%',
    height: '100%',
    opacity: 0.3,
  },
});

export default ProfileScreen;