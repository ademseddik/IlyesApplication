// import React, { useState, useEffect, useRef, useCallback } from "react";
// import {
//   View,
//   ScrollView,
//   ActivityIndicator,
//   RefreshControl,
//   StyleSheet,
// } from "react-native";
// import Colors from "../../../Utils/Colors";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useNavigation } from "@react-navigation/native";
// import { encode } from "base64-arraybuffer";
// import createAxiosInstance from "../../core/config/Axios";
// import { useTranslation } from "react-i18next";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";





// // Define types and interfaces

// interface ResidentProfile {
//   fullName: string;
//   bio?: string;
//   address?: string;
//   interests?: string[];
//   residentPosts?: any[];
//   followers?: any[];
//   following?: any[];
// }

// interface UserProfileProps {
//   // Add any props if needed
// }

// const UserProfile: React.FC<UserProfileProps> = () => {
//   const [selectedButton, setSelectedButton] = useState<string>("Posts");
//   const [fullName, setFullName] = useState<string>("");
//   const [data, setData] = useState<ResidentProfile | null>(null);
//   const [userFollowers, setUserFollowers] = useState<any[]>([]);
//   const [userFollowing, setUserFollowing] = useState<any[]>([]);
//   const [followersIds, setFollowersIds] = useState<string[]>([]);
//   const [followingIds, setFollowingIds] = useState<string[]>([]);
//   const [profilePic, setProfilePic] = useState<string | null>(null);
//   const [coverPic, setCoverPic] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [refreshing, setRefreshing] = useState<boolean>(false);
//   const [userIdHome, setUserIdHome] = useState<string | null>(null);
//   const [followersProfilePics, setFollowersProfilePics] = useState<string[]>([]);
//   const [followingsProfilePics, setFollowingProfilePics] = useState<string[]>([]);
//   const [followersModalVisible, setFollowersModalVisible] = useState<boolean>(false);

//   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
//   const refRBSheetPhotoProfile = useRef<any>(null);
//   const refRBSheetCoverPhoto = useRef<any>(null);
//   const { t } = useTranslation();

//   const toggleFollowersModal = () => {
//     setFollowersModalVisible(!followersModalVisible);
//   };

//   // Fetch user ID from AsyncStorage
//   useEffect(() => {
//     const fetchUserId = async () => {
//       const storedUserId = await AsyncStorage.getItem("userId");
//       setUserIdHome(storedUserId);
//     };
//     fetchUserId();
//   }, []);

//   // Fetch profile data
//   const fetchProfile = async () => {
//     setIsLoading(true);
//     try {
//       const userId = await AsyncStorage.getItem("userId");
//       if (!userId) throw new Error("User ID not found");

//       const response = await createAxiosInstance().get<ResidentProfile>(
//         `tawasalna-community/residentprofile/getresidentprofile/${userId}`
//       );
//       setData(response.data);
//       setFullName(response.data.fullName);
//     } catch (error) {
//       console.error("Error getting resident profile:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Fetch user followers
//   const fetchUserFollowers = async () => {
//     setIsLoading(true);
//     try {
//       const userId = await AsyncStorage.getItem("userId");
//       if (!userId) throw new Error("User ID not found");

//       const response = await createAxiosInstance().get<any[]>(
//         `tawasalna-community/residentprofile/followers/${userId}`
//       );
//       setUserFollowers(response.data);
//       setFollowersIds(response.data.map((follower) => follower.id));
//     } catch (error) {
//       console.error("Error getting user followers:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Fetch user following
//   const fetchUserFollowing = async () => {
//     setIsLoading(true);
//     try {
//       const userId = await AsyncStorage.getItem("userId");
//       if (!userId) throw new Error("User ID not found");

//       const response = await createAxiosInstance().get<any[]>(
//         `tawasalna-community/residentprofile/following/${userId}`
//       );
//       setUserFollowing(response.data);
//       setFollowingIds(response.data.map((following) => following.id));
//     } catch (error) {
//       console.error("Error getting user following:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Fetch profile photo
//   const fetchProfilePhoto = async () => {
//     setIsLoading(true);
//     try {
//       const userId = await AsyncStorage.getItem("userId");
//       if (!userId) throw new Error("User ID not found");

//       const response = await createAxiosInstance().get<ArrayBuffer>(
//         `tawasalna-community/residentprofile/getprofilephoto/${userId}`,
//         { responseType: "arraybuffer" }
//       );
//       const base64Image = encode(response.data);
//       setProfilePic(`data:image/jpeg;base64,${base64Image}`);
//     } catch (error) {
//       console.error("Error getting profile photo:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Fetch cover photo
//   const fetchCoverPhoto = async () => {
//     setIsLoading(true);
//     try {
//       const userId = await AsyncStorage.getItem("userId");
//       if (!userId) throw new Error("User ID not found");

//       const response = await createAxiosInstance().get<ArrayBuffer>(
//         `tawasalna-community/residentprofile/getcoverphoto/${userId}`,
//         { responseType: "arraybuffer" }
//       );
//       const base64Image = encode(response.data);
//       setCoverPic(`data:image/jpeg;base64,${base64Image}`);
//     } catch (error) {
//       console.error("Error getting cover photo:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Fetch followers' profile photos
//   useEffect(() => {
//     const fetchFollowersProfilePhotos = async () => {
//       try {
//         const promises = followersIds.map(async (userId) => {
//           const response = await createAxiosInstance().get<ArrayBuffer>(
//             `tawasalna-community/residentprofile/getprofilephoto/${userId}`,
//             { responseType: "arraybuffer" }
//           );
//           const base64Image = encode(response.data);
//           return `data:image/jpeg;base64,${base64Image}`;
//         });
//         const profilePics = await Promise.all(promises);
//         setFollowersProfilePics(profilePics);
//       } catch (error) {
//         console.error("Error getting followers' profile photos:", error);
//       }
//     };
//     fetchFollowersProfilePhotos();
//   }, [followersIds]);

//   // Fetch followings' profile photos
//   useEffect(() => {
//     const fetchFollowingProfilePhotos = async () => {
//       try {
//         const promises = followingIds.map(async (userId) => {
//           const response = await createAxiosInstance().get<ArrayBuffer>(
//             `tawasalna-community/residentprofile/getprofilephoto/${userId}`,
//             { responseType: "arraybuffer" }
//           );
//           const base64Image = encode(response.data);
//           return `data:image/jpeg;base64,${base64Image}`;
//         });
//         const profilePics = await Promise.all(promises);
//         setFollowingProfilePics(profilePics);
//       } catch (error) {
//         console.error("Error getting followings' profile photos:", error);
//       }
//     };
//     fetchFollowingProfilePhotos();
//   }, [followingIds]);

//   // Refresh control
//   const onRefresh = useCallback(() => {
//     setRefreshing(true);
//     fetchProfile();
//     fetchProfilePhoto();
//     fetchCoverPhoto();
//     setTimeout(() => {
//       setRefreshing(false);
//     }, 2000);
//   }, []);

//   // Initial data fetch
//   useEffect(() => {
//     fetchProfile();
//     fetchUserFollowers();
//     fetchUserFollowing();
//     fetchProfilePhoto();
//     fetchCoverPhoto();
//   }, []);

//   if (isLoading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color={Colors.PURPLE} />
//       </View>
//     );
//   }

//   return (
//     <ScrollView
//       style={{ backgroundColor: Colors.WHITE }}
//       refreshControl={
//         <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//       }
//     >
//       {/* Render the rest of your component here */}
//       {/* ... */}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });

// export default UserProfile;