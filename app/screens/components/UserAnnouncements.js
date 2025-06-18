// import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity, Image } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import createAxiosInstance from '../../../core/config/Axios';
// import { encode } from "base64-arraybuffer";
// import { EvilIcons, Feather, Entypo } from "@expo/vector-icons";


// const UserAnnouncements = () => {


//     const [data, setData] = useState([]);
//     const [imageUris, setImageUris] = useState([]);
//     const [fetched, setFetched] = useState(false);
//     const [isFetchingPosts, setIsFetchingPosts] = useState(false);
//     const [isFetchingImages, setIsFetchingImages] = useState(false);
//     const [profilePic, setProfilePic] = useState(null);
//     const [userId, setUserId] = useState(null);

//  useEffect(() => {
//    const fetchUserId = async () => {
//      const storedUserId = await AsyncStorage.getItem("userId");
//      setUserId(storedUserId);
//    };
//    fetchUserId();
//  }, []);

//     const fetchUserAnnouncements = async () => {
//       setIsFetchingPosts(true);
//       try {
//         let userId = await AsyncStorage.getItem("userId");

//         const response = await createAxiosInstance().get(
//           `tawasalna-community/residentprofile/announcements/${userId}`
//         );

//         if (
//           response.data &&
//           response.data !== "No announcements found for user"
//         ) {
//           const annoucements = response.data;
//           console.log("Annoucement Post Response : ", response.data);
//           if (annoucements.length > 0) {
//             annoucements.sort((a, b) => {
//               const dateA = new Date(a.postDateTime);
//               const dateB = new Date(b.postDateTime);
//               return dateB - dateA;
//             });

//             setData(annoucements);
//           }
//           setFetched(true);
//         } else {
//           console.log("No annoucements posts found.");
//         }
//       } catch (error) {
//         console.error("Error getting resident posts:", error);
//       } finally {
//         setIsFetchingPosts(false);
//       }
//     };

//     useEffect(() => {
//       if (!fetched) {
//         fetchUserAnnouncements();
//       }
//     }, [fetched]);
//     ///////////////////////////////////////////////////////////////////////////
//     const fetchImage = async (data) => {
//       setIsFetchingImages(true);
//       try {
//         const newImageUris = {};

//         for (const post of data) {
//           const photoPromises = post.photos.map(async (photoId) => {
//             try {
//               const response = await createAxiosInstance().get(
//                 `tawasalna-community/residentprofile/images?fileUrl=${encodeURIComponent(
//                   photoId
//                 )}`,
//                 {
//                   responseType: "arraybuffer",
//                 }
//               );
//               const base64Image = encode(response.data);
//               return `data:image/jpeg;base64,${base64Image}`;
//             } catch (error) {
//               console.error(
//                 `Error fetching image ${photoId} for post ${post.id}:`,
//                 error
//               );
//               return null;
//             }
//           });

//           const photoResults = await Promise.all(photoPromises);
//           newImageUris[post.id] = photoResults.filter(
//             (image) => image !== null
//           );
//         }

//         setImageUris(newImageUris);
//         console.log(
//           "Fetched images for posts:",
//           Object.keys(newImageUris).length
//         );
//       } catch (error) {
//         console.error("Error fetching images:", error);
//       } finally {
//         setIsFetchingImages(false);
//       }
//     };
//     useEffect(() => {
//       if (data.length > 0) {
//         fetchImage(data);
//       }
//     }, [data]);
//     ///////////////////////////////////////////////////////////////////////////
//     const formatDateTime = (dateTimeString) => {
//       const date = new Date(dateTimeString);
//       const now = new Date();
//       const diffInSeconds = Math.floor((now - date) / 1000);

//       if (diffInSeconds < 60) {
//         return `${diffInSeconds} second${diffInSeconds === 1 ? "" : "s"} ago`;
//       } else if (diffInSeconds < 3600) {
//         const diffInMinutes = Math.floor(diffInSeconds / 60);
//         return `${diffInMinutes} minute${diffInMinutes === 1 ? "" : "s"} ago`;
//       } else if (diffInSeconds < 86400) {
//         const diffInHours = Math.floor(diffInSeconds / 3600);
//         return `${diffInHours} hour${diffInHours === 1 ? "" : "s"} ago`;
//       } else {
//         const diffInDays = Math.floor(diffInSeconds / 86400);
//         return `${diffInDays} day${diffInDays === 1 ? "" : "s"} ago`;
//       }
//     };

// const fetchProfilePhoto = async () => {
//   try {
//     const userId = await AsyncStorage.getItem("userId");
//     const response = await createAxiosInstance().get(
//       `tawasalna-community/residentprofile/getprofilephoto/${userId}`,
//       {
//         responseType: "arraybuffer",
//       }
//     );
//     const base64Image = encode(response.data);
//     const imageUrl = `data:image/jpeg;base64,${base64Image}`;

//     setProfilePic(imageUrl);
//   } catch (error) {
//     console.error("Error getting profile photo:", error);
//   } 
// };

// useEffect(() => {
//   fetchProfilePhoto();
// }, []);

//      const chunkArray = (arr, size) => {
//        const chunkedArr = [];
//        for (let i = 0; i < arr.length; i += size) {
//          chunkedArr.push(arr.slice(i, i + size));
//        }
//        return chunkedArr;
//      };

//   return (
//     <ScrollView style={{ backgroundColor: Colors.BACKGROUND }}>
//       {isFetchingPosts ? (
//         <View style={styles.loaderContainer}>
//           <ActivityIndicator size="large" color={Colors.PURPLE} />
//         </View>
//       ) : (
//         <>
//           {data.length === 0 ? (
//             <View style={styles.noPostsContainer}>
//               <Text style={styles.noPostsText}>No annoucements yet</Text>
//             </View>
//           ) : (
//             data.map((post, index) => (
//               <View key={post.id} style={styles.card}>
//                 <View style={styles.header}>
//                   <Image
//                     source={{ uri: profilePic !== "data:image/jpeg;base64," ? profilePic : require('../../../../assets/photoprofil.png') }}
//                     style={styles.profilePic}
//                   />
//                   <View style={styles.headerText}>
//                     <Text style={styles.userName}>{post.user.residentProfile.fullName}</Text>
//                     <Text style={styles.postDate}>{formatDateTime(post.postDateTime)}</Text>
//                   </View>
//                   {/* Uncomment this if you need more options button */}
//                   {/* <TouchableOpacity style={styles.moreOptions} onPressIn={() => toggleOptionsPostModal(post.id)}>
//                     <Feather name="more-horizontal" size={25} />
//                   </TouchableOpacity> */}
//                 </View>
//                 <View style={styles.content}>
//                   <Text style={styles.caption}>{post.caption}</Text>
//                   <Text style={styles.category}>#{post.category}</Text>
//                   <Text style={styles.title}>{post.title}</Text>
//                   <Text style={styles.description}>{post.description}</Text>
//                   {isFetchingImages ? (
//                     <View style={styles.loaderContainer}>
//                       <ActivityIndicator size="large" color={Colors.PURPLE} />
//                     </View>
//                   ) : (
//                     <TouchableOpacity style={styles.imageContainer}>
//                       {post.photos && post.photos.length > 0 ? (
//                         post.photos.length === 1 ? (
//                           <Image
//                             source={{ uri: imageUris[post.id] && imageUris[post.id][0] }}
//                             style={styles.singleImage}
//                             resizeMode="cover"
//                           />
//                         ) : post.photos.length <= 4 ? (
//                           chunkArray(post.photos, 2).map((photoRow, rowIndex) => (
//                             <View key={rowIndex} style={styles.photoRow}>
//                               {photoRow.map((photo, photoIndex) => (
//                                 <Image
//                                   key={photoIndex}
//                                   source={{ uri: imageUris[post.id] && imageUris[post.id][rowIndex * 2 + photoIndex] }}
//                                   style={styles.photo}
//                                   resizeMode="cover"
//                                 />
//                               ))}
//                             </View>
//                           ))
//                         ) : (
//                           <>
//                             <View style={styles.photoRow}>
//                               {post.photos.slice(0, 2).map((photo, index) => (
//                                 <Image
//                                   key={index}
//                                   source={{ uri: imageUris[post.id] && imageUris[post.id][index] }}
//                                   style={styles.photo}
//                                   resizeMode="cover"
//                                 />
//                               ))}
//                             </View>
//                             <View style={styles.photoRow}>
//                               <FastImage
//                                 source={{ uri: imageUris[post.id] && imageUris[post.id][2] }}
//                                 style={styles.photo}
//                                 resizeMode="cover"
//                               />
//                               <TouchableOpacity onPress={handleImagePress}>
//                                 <View style={styles.morePhotosContainer}>
//                                   <Text style={styles.morePhotosText}>+{post.photos.length - 3}</Text>
//                                 </View>
//                               </TouchableOpacity>
//                             </View>
//                           </>
//                         )
//                       ) : null}
//                     </TouchableOpacity>
//                   )}
//                 </View>
//                 <View style={styles.footer}>
//                   <View style={styles.likesCommentsContainer}>
//                     <Text style={styles.likesCommentsText}>
//                       {post.likedBy.length} {post.likedBy.length === 1 ? "like" : "likes"}
//                     </Text>
//                     <Text style={styles.likesCommentsText}>
//                       {post.comments.length} {post.comments.length === 1 ? "comment" : "comments"}
//                     </Text>
//                   </View>
//                   <View style={styles.divider} />
//                   <View style={styles.actions}>
//                     <TouchableOpacity style={styles.actionButton}>
//                       <EvilIcons
//                         name={"like"}
//                         size={30}
//                         color={post.likedBy.includes(userId) ? Colors.LIGHT_PURPLE : Colors.BLACK}
//                         style={styles.actionIcon}
//                       />
//                     </TouchableOpacity>
//                     <TouchableOpacity style={styles.actionButton}>
//                       <EvilIcons name="comment" size={30} color={Colors.BLACK} />
//                     </TouchableOpacity>
//                     {/* <TouchableOpacity style={styles.actionButton}>
//                       <Feather name="send" size={22} color={Colors.LIGHT_PURPLE} style={styles.actionIcon} />
//                     </TouchableOpacity> */}
//                     <TouchableOpacity style={styles.actionButton}>
//                       <Entypo name="share" size={22} color={Colors.BLACK} style={styles.actionIcon} />
//                     </TouchableOpacity>
//                   </View>
//                   <View style={styles.divider} />
//                 </View>
//               </View>
//             ))
//           )}
//         </>
//       )}
//     </ScrollView>
//   );
// };

// const styles = {
//   loaderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: '30%',
//   },
//   noPostsContainer: {
//     alignItems: 'center',
//     marginTop: '50%',
//   },
//   noPostsText: {
//     fontSize: 18,
//     color: Colors.GRAY,
//   },
//   card: {
//     borderRadius: 10,
//     margin: '2%',
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//     backgroundColor: Colors.WHITE,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 3,
//     elevation: 5,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   profilePic: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     borderWidth: 1,
//   },
//   headerText: {
//     marginLeft: 10,
//   },
//   userName: {
//     color: 'black',
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   postDate: {
//     color: 'grey',
//     fontSize: 13,
//   },
//   content: {
//     marginTop: -15,
//   },
//   caption: {
//     color: 'black',
//     fontSize: 14,
//     marginBottom: 5,
//   },
//   category: {
//     color: 'grey',
//     fontSize: 12,
//     fontStyle: 'italic',
//   },
//   title: {
//     color: Colors.BLACK,
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   description: {
//     color: Colors.BLACK,
//     fontSize: 14,
//     marginTop: 5,
//   },
//   imageContainer: {
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   singleImage: {
//     width: '95%',
//     height: 200,
//     borderRadius: 10,
//   },
//   photoRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '90%',
//     marginTop: 10,
//   },
//   photo: {
//     width: '48%',
//     height: 200,
//     borderRadius: 10,
//   },
//   morePhotosContainer: {
//     width: 150,
//     height: 200,
//     borderRadius: 10,
//     backgroundColor: 'black',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   morePhotosText: {
//     color: 'white',
//     fontSize: 18,
//   },
//   footer: {
//     marginTop: 10,
//   },
//   likesCommentsContainer: {
//     flexDirection: 'row',
//     marginLeft: 20,
//   },
//   likesCommentsText: {
//     color: Colors.BLACK,
//     marginRight: 20,
//     marginTop: 8,
//   },
//   divider: {
//     backgroundColor: Colors.GunmetalGray,
//     alignItems: 'center',
//     width: '95%',
//     height: 1,
//     marginTop: 10,
//     marginLeft: '3%',
//   },
//   actions: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 40,
//     marginTop: 5,
//     paddingTop: 5,
//   },
//   actionButton: {
//     alignItems: 'center',
//     flexDirection: 'row',
//   },
//   actionIcon: {
//     marginRight: 5,
//   },
// };


// export default UserAnnouncements