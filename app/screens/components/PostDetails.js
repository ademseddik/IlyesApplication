// import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import createAxiosInstance from "../../../core/config/Axios";
// import { Avatar } from 'react-native-elements';
// import { encode } from 'base64-arraybuffer';
// import { EvilIcons, Feather, Entypo, FontAwesome } from "@expo/vector-icons";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { TextInput } from 'react-native';
// import Toast from "react-native-toast-message";


// const PostDetails = ({ route }) => {
//   const { postId } = route.params;
//   const [post, setPost] = useState({});
//   const [profilePic, setProfilePic] = useState(null);
//   const [imageUris, setImageUris] = useState([]);
//   const [data, setData] = useState([]);
//   const [userId, setUserId] = useState([]);
//   const [userIdStorage, setUserIdStorage] = useState(null);
//   const [profilePics, setProfilePics] = useState(null);
//   const [replyprofilePic, setReplyProfilePic] = useState({});
//   const [replies, setReplies] = useState([]);
//   const [showAllReplies, setShowAllReplies] = useState(false);
//   const [commentText, setCommentText] = useState("");
//   const [isTyping, setIsTyping] = useState(false);
//   const [isAddingComment, setIsAddingComment] = useState(false);
//   const [userFullname, setFullName] = useState("");
//   const [userprofilePic, setUserProfilePic] = useState(null);
//   const [replyingToCommentId, setReplyingToCommentId] = useState(null);
//   const [replyingToUserName, setReplyingToUserName] = useState("");
//   const [isReplying, setIsReplying] = useState(false);

// ////////////////////////////////////////////////////////////////////////
// const handleTextInputFocus = () => {
//   setIsTyping(true);
// };

// const handleTextInputBlur = () => {
//   setIsTyping(false);
// };
// const showEmptyFieldsToast = () => {
//   Toast.show({
//     type: "info",
//     text1: "Please write a comment.",
//     visibilityTime: 3000,
//     autoHide: true,
//   });
// };
// const showaddedcommentToast = () => {
//   Toast.show({
//     type: "info",
//     text1: "comment added successfully .",
//     visibilityTime: 3000,
//     autoHide: true,
//   });
// };
// const handleReplyButtonPress = (commentId, userName) => {
//   setReplyingToCommentId(commentId);
//   setReplyingToUserName(userName);
//   setIsReplying(true);
//   setCommentText(`@${userName} `);
// };
// ////////////////////////////////////////////////////////////////////////////
// useEffect(() => {
//   const fetchProfile = async () => {
//     try {
//       const userId = await AsyncStorage.getItem("userId");
//       const response = await createAxiosInstance().get(
//         `tawasalna-community/residentprofile/getresidentprofile/${userId}`
//       );
//       setFullName(response.data.fullName);
//     } catch (error) {
//       console.error("Error getting resident profile:", error);
//       throw new Error(error);
//     }
//   };

//   fetchProfile();
// }, []);
//   /////////////////////////////////////////////////////////////////
//   useEffect(() => {
//     const fetchUserProfilePhoto = async () => {
//       try {
//         const userId = await AsyncStorage.getItem("userId");
//         const response = await createAxiosInstance().get(
//           `tawasalna-community/residentprofile/getprofilephoto/${userId}`,
//           {
//             responseType: "arraybuffer",
//           }
//         );
//         const base64Image = encode(response.data);

//         const imageUrl = `data:image/jpeg;base64,${base64Image}`;

//         setUserProfilePic(imageUrl);
//       } catch (error) {
//         console.error("Error getting profile photo:", error);
//         throw new Error(error);
//       }
//     };

//     fetchUserProfilePhoto();
//   }, []);
//   /////////////////////////////////////////////////////////////////
//   useEffect(() => {
//     const fetchUserId = async () => {
//       const storedUserId = await AsyncStorage.getItem("userId");
//       if (!storedUserId) return;
//       setUserIdStorage(storedUserId);
//     };
//     fetchUserId();
//   }, []);
//   //////////////////////////////////////////////////////////////////
//   const fetchPost = async () => {
//     if (!postId) {
//       console.log('no postId found ')
//       return
//     };

//     try {
//       const response = await createAxiosInstance().get(
//         `tawasalna-community/residentprofile/getPost/${postId}`
//       );
      
//       const postData = response.data;
//       setPost(postData);
//       fetchProfilePhoto(postData.user.id);
//       //fetchImage(response.data.photos);
//       //console.log(response.data.photos);
//       console.log("postId : ",postId)
//       console.log("post from postDetail",response.data.user.id);

//     } catch (error) {
//       console.error("Error fetching post:", error);
//     }
//   };
//   useEffect(() => {
//     fetchPost();
//   }, [postId]);
//   ////////////////////////////////////////////////////////////////
//   const addCommentToPost = async () => {
//     if (!commentText.trim()) {
//       showEmptyFieldsToast();
//       return;
//     }
//         setIsAddingComment(true);


//     try {
//       const userId = await AsyncStorage.getItem("userId");
//       if (isReplying && replyingToCommentId) {
//         // Add reply to comment
//         await createAxiosInstance().post(
//           `tawasalna-community/residentprofile/replytocomment/${userId}/${replyingToCommentId}`,
//           { replyText: commentText }
//         );
//       } else {
//         // Add new comment
//         await createAxiosInstance().post(
//           `tawasalna-community/residentprofile/addcomment/${postId}/${userId}`,
//           { commentText }
//         );
//         showaddedcommentToast();
//       }

//       setCommentText("");
//       setIsReplying(false);
//       setReplyingToCommentId(null);
//       setReplyingToUserName("");
//       fetchCommentsPost();
//     } catch (error) {
//       console.error("Error while adding comment or reply:", error);
//     } finally {
//       setIsAddingComment(false);
//     }
//   };
//   ////////////////////////////////////////////////////////////////
//   const fetchRepliesForComment = async (commentId) => {
//     try {
//       const response = await createAxiosInstance().get(
//         `tawasalna-community/residentprofile/getreplies/${commentId}`
//       );
//       if (
//         response.data &&
//         response.data !== "No replies found for the specified comment"
//       ) {  

//         console.log('replies:,response.data')

//         setReplies((prevReplies) => ({
//           ...prevReplies,
//           [commentId]: response.data,
//         }));

//         const profilePicPromises = response.data.map(async (reply) => {
//           const response = await createAxiosInstance().get(
//             `tawasalna-community/residentprofile/getprofilephoto/${reply.residentId}`,
//             { responseType: "arraybuffer" }
//           );
//           const base64Image = encode(response.data);
//           return {
//             residentId: reply.residentId,
//             profilePic: `data:image/jpeg;base64,${base64Image}`,
//           };
//         });

//         const profilePics = await Promise.all(profilePicPromises);
//         const profilePicMap = profilePics.reduce((acc, pic) => {
//           acc[pic.residentId] = pic.profilePic;
//           return acc;
//         }, {});

//         setReplyProfilePic((prev) => ({
//           ...prev,
//           ...profilePicMap,
//         }));
//       } else {
//         setReplies((prevReplies) => ({
//           ...prevReplies,
//           [commentId]: [],
//         }));
//       }

//             console.log("CommentID from replies  : ", commentId);

//     } catch (error) {
//       console.error(
//         "Error while fetching replies to the comment: ",
//         error.response ? error.response.data : error.message
//       );
//     }
//   };
//  useEffect(() => {
//    data.forEach((comment) => {
//      if (comment.replies && comment.replies.length > 0) {
//        fetchRepliesForComment(comment.id);
//      }
//    });
//  }, [data]);
//   ////////////////////////////////////////////////////////////////
//   const fetchProfilePhoto = async (id) => {
//        if(!id) {
//         return;
//        }
//     try {
//       const response = await createAxiosInstance().get(
//         `tawasalna-community/residentprofile/getprofilephoto/${id}`,
//         {
//           responseType: "arraybuffer",
//         }
//       );
//       const base64Image = encode(response.data);

//       const imageUrl = `data:image/jpeg;base64,${base64Image}`;

//       setProfilePic(imageUrl);
//       //console.log("profile image : ",imageUrl)
//     } catch (error) {
//       console.error("Error getting profile photo:", error);
//       throw new Error(error);
//     }
//   };
//   // useEffect(() => {
//   //   fetchProfilePhoto();
//   // }, []);
//   ////////////////////////////////////////////////////////////////
//   const fetchImage = async (photoIds) => {
//     console.log("photo from fetch image", photoIds);
//     if (!photoIds || photoIds.length === 0) return;

//     try {
//       const photoPromises = photoIds.map(async (photoId) => {
//         try {
//           const response = await createAxiosInstance().get(
//             `tawasalna-community/residentprofile/images?fileUrl=${encodeURIComponent(
//               photoId
//             )}`,
//             {
//               responseType: "arraybuffer",
//             }
//           );
//           const base64Image = encode(response.data);
//           return `data:image/jpeg;base64,${base64Image}`;
//         } catch (error) {
//           console.error(`Error fetching image ${photoId}:`, error);
//           return null;
//         }
//       });

//       const photoResults = await Promise.all(photoPromises);
//       setImageUris(photoResults.filter((image) => image !== null));
//     } catch (error) {
//       console.error("Error fetching images:", error);
//     }
//   };
//   useEffect(() => {
//     fetchImage(post.photos);
//   }, [post]);
//   ///////////////////////////////////////////////////////////////
//   const fetchCommentsPost = async () => {
//     if (!postId) {
//       return;
//     }

//     try {
//       const response = await createAxiosInstance().get(
//         `tawasalna-community/residentprofile/getcomments/${postId}`
//       );

//       if (
//         response.data &&
//         response.data !== "No comments found for the specified post" && postId
//       ) {
//         const residentComments = response.data;
//         //console.log("resident comments Response : ", residentComments);
//         setData(residentComments);
//         //console.log("PostId from Comment Model : ", postId);
//         const userIds = residentComments.map((comment) => comment.user.id);
//         setUserId(userIds);
//       } else if (response.data === "No comments found for the specified post") {
//         console.log("No resident comments found on this post !.", data.length);
//       }
//     } catch (error) {
//       console.error("Error getting resident comments:", error);
//     }
//   };

//   useEffect(() => {
//     if (postId) {
//       fetchCommentsPost();
//     }
//   }, [postId]);
//   ///////////////////////////////////////////////////////////////
//   useEffect(() => {
//     const fetchProfilePhotosForComments = async () => {
//       try {
//         const promises = userId.map(async (userId) => {
//           const response = await createAxiosInstance().get(
//             `tawasalna-community/residentprofile/getprofilephoto/${userId}`,
//             { responseType: "arraybuffer" }
//           );
//           const base64Image = encode(response.data);
//           return `data:image/jpeg;base64,${base64Image}`;
//         });
//         const profilePics = await Promise.all(promises);
//         setProfilePics(profilePics);
//       } catch (error) {
//         console.error("Error getting profile photos:", error);
//         throw new Error(error);
//       }
//     };

//     fetchProfilePhotosForComments();
//   }, [userId]);
//   ///////////////////////////////////////////////////////////////
//   const formatDateTime = (dateTimeString) => {
//     const date = new Date(dateTimeString);
//     const now = new Date();
//     const diffInSeconds = Math.floor((now - date) / 1000);

//     if (diffInSeconds < 60) {
//       return `${diffInSeconds} second${diffInSeconds === 1 ? "" : "s"} `;
//     } else if (diffInSeconds < 3600) {
//       const diffInMinutes = Math.floor(diffInSeconds / 60);
//       return `${diffInMinutes} mn${diffInMinutes === 1 ? "" : "s"} `;
//     } else if (diffInSeconds < 86400) {
//       const diffInHours = Math.floor(diffInSeconds / 3600);
//       return `${diffInHours} hr${diffInHours === 1 ? "" : "s"} `;
//     } else {
//       const diffInDays = Math.floor(diffInSeconds / 86400);
//       return `${diffInDays} day${diffInDays === 1 ? "" : "s"} `;
//     }
//   };
//   ///////////////////////////////////////////////////////////////
//    const chunkArray = (arr, size) => {
//     const chunkedArr = [];
//     for (let i = 0; i < arr.length; i += size) {
//       chunkedArr.push(arr.slice(i, i + size));
//     }
//     return chunkedArr;
//   };
//   ///////////////////////////////////////////////////////////////
//   const renderPhotos = (photos) => {
//     if (photos.length === 1) {
//       return (
//         <Image
//           key={0}
//           source={{ uri: imageUris[0] }}
//           style={styles.singleImage}
//         />
//       );
//     } else if (photos.length > 1 && photos.length <= 4) {
//       const chunks = chunkArray(photos, 2);
//       return chunks.map((chunk, chunkIndex) => (
//         <View key={chunkIndex} style={styles.imageRow}>
//           {chunk.map((photo, photoIndex) => (
//             <Image
//               key={photoIndex}
//               source={{ uri: imageUris[chunkIndex * 2 + photoIndex] }}
//               style={styles.gridImage}
//             />
//           ))}
//         </View>
//       ));
//     } else if (photos.length > 4) {
//       return (
//         <View>
//           <View style={styles.imageRow}>
//             <Image source={{ uri: imageUris[0] }} style={styles.gridImage} />
//             <Image source={{ uri: imageUris[1] }} style={styles.gridImage} />
//           </View>
//           <View style={styles.imageRow}>
//             <Image source={{ uri: imageUris[2] }} style={styles.gridImage} />
//             <View style={styles.moreImagesContainer}>
//               <Image source={{ uri: imageUris[3] }} style={styles.gridImage} />
//               <View style={styles.moreImagesOverlay}>
//                 <Text style={styles.moreImagesText}>+{photos.length - 3}</Text>
//               </View>
//             </View>
//           </View>
//         </View>
//       );
//     }
//   };
//   ///////////////////////////////////////////////////////////////
//   if (!post) {
//     return (
//       <View>
//         <Text>Loading...</Text>
//       </View>
//     );
//   }

//  return (
//    <ScrollView style={styles.container}>
//      <View style={styles.postContainer}>
//        <View style={styles.userInfo}>
//          {profilePic !== "data:image/jpeg;base64," ? (
//            <Avatar rounded source={{ uri: profilePic }} size="medium" />
//          ) : (
//            <Avatar
//              rounded
//              source={require("../../../../assets/photoprofil.png")}
//              size="medium"
//            />
//          )}
//          <Text style={styles.userName}>
//            {post.user?.residentProfile?.fullName || "Unknown User"}
//          </Text>
//        </View>
//        {post.caption && <Text style={styles.caption}>{post.caption}</Text>}
//        {post.photos && renderPhotos(post.photos)}
//        <View style={{ flexDirection: "row", marginLeft: -25 }}>
//          <Text
//            style={{
//              color: Colors.BLACK,
//              marginLeft: 20,
//              marginTop: 8,
//            }}
//          >
//            {post.likedBy
//              ? `${post.likedBy.length} ${
//                  post.likedBy.length === 1 ? "like" : "likes"
//                }`
//              : null}
//          </Text>
//          <Text
//            style={{
//              color: Colors.BLACK,
//              marginLeft: 20,
//              marginTop: 8,
//            }}
//          >
//            {post.comments
//              ? `${post.comments.length} ${
//                  post.comments.length === 1 ? "comment" : "comments"
//                }`
//              : null}
//          </Text>
//        </View>
//        <View
//          style={{
//            backgroundColor: Colors.GunmetalGray,
//            alignItems: "center",
//            width: "107%",
//            height: 1,
//            marginTop: 10,
//            marginLeft: "-4%",
//          }}
//        />
//        <View
//          style={{
//            flexDirection: "row",
//            alignItems: "center",
//            justifyContent: "space-between",
//            paddingHorizontal: 25,
//            marginTop: 5,
//            paddingTop: 5,
//          }}
//        >
//          <TouchableOpacity
//            style={{
//              alignItems: "center",
//              flexDirection: "row",
//              marginRight: "5%",
//              marginLeft: "-11%",
//            }}
//            // onPress={() => toggleLike(post.id)}
//          >
//            <EvilIcons
//              name={"like"}
//              size={30}
//              color={
//                post.likedBy && post.likedBy.includes(userIdStorage)
//                  ? "blue"
//                  : Colors.BLACK
//              }
//              style={{ marginRight: -2 }}
//            />
//            <Text
//              style={{
//                color:
//                  post.likedBy && post.likedBy.includes(userIdStorage)
//                    ? "blue"
//                    : Colors.BLACK,
//              }}
//            >
//              Like
//            </Text>
//          </TouchableOpacity>
//          <TouchableOpacity
//            style={{
//              alignItems: "center",
//              flexDirection: "row",
//              marginLeft: "1%",
//            }}
//            // onPressIn={() => toggleCommentModal(post.id)}
//          >
//            <EvilIcons name="comment" size={30} color={Colors.BLACK} />
//            <Text style={{ color: Colors.BLACK }}> Comment </Text>
//          </TouchableOpacity>
//          <TouchableOpacity
//            style={{
//              alignItems: "center",
//              flexDirection: "row",
//              left: "5%",
//            }}
//            Entypo
//            // onPress={toggleSendModal}
//          >
//            <Feather
//              name="send"
//              size={22}
//              color={Colors.BLACK}
//              style={{ marginRight: 5 }}
//            />
//            <Text style={{ color: Colors.BLACK }}> Send </Text>
//          </TouchableOpacity>
//          <TouchableOpacity
//            style={{
//              alignItems: "center",
//              flexDirection: "row",
//              left: "9%",
//            }}
//            // onPress={toggleShareModal}
//          >
//            <Entypo
//              name="share"
//              size={22}
//              color={Colors.BLACK}
//              style={{ marginRight: 5 }}
//            />
//            <Text style={{ color: Colors.BLACK }}> Share </Text>
//          </TouchableOpacity>
//        </View>
//        <View
//          style={{
//            backgroundColor: Colors.GunmetalGray,
//            alignItems: "center",
//            width: "107%",
//            height: 1,
//            marginTop: 10,
//            marginLeft: "-4%",
//          }}
//        />
//        <View style={styles.commentsContainer}>
//          {data.length > 0 ? (
//            data.map((item, index) => (
//              <View key={index} style={styles.commentContainer}>
//                <View style={styles.comment}>
//                  {profilePics[index] !== "data:image/jpeg;base64," ? (
//                    <Avatar
//                      rounded
//                      source={{ uri: profilePics[index] }}
//                      size="small"
//                    />
//                  ) : (
//                    <Avatar
//                      rounded
//                      source={require("../../../../assets/photoprofil.png")}
//                      size="small"
//                    />
//                  )}
//                  <View style={styles.commentTextContainer}>
//                    <Text style={styles.commentUserName}>
//                      {item.user.residentProfile.fullName}
//                    </Text>
//                    <Text>{item.text}</Text>
//                    <View style={{ flexDirection: "row" }}>
//                      <Text style={{ color: "grey", fontSize: 12 }}>
//                        {formatDateTime(item.createdAt)}
//                      </Text>
//                      <TouchableOpacity
//                        style={{ marginLeft: 7 }}
//                        onPress={() =>
//                          handleReplyButtonPress(
//                            item.id,
//                            item.user.residentProfile.fullName
//                          )
//                        }
//                      >
//                        <Text style={{ color: "grey", fontSize: 12 }}>
//                          Reply
//                        </Text>
//                      </TouchableOpacity>
//                    </View>
//                  </View>
//                </View>
//                {replies[item.id] && (
//                  <View style={styles.repliesContainer}>
//                    {replies[item.id]
//                      .slice(
//                        0,
//                        showAllReplies[item.id] ? replies[item.id].length : 1
//                      )
//                      .map((reply, replyIndex) => (
//                        <View key={replyIndex} style={styles.reply}>
//                          <View style={styles.replyLine} />
//                          {replyprofilePic[reply.residentId] !==
//                          "data:image/jpeg;base64," ? (
//                            <Image
//                              style={styles.replyProfilePic}
//                              source={{
//                                uri: replyprofilePic[reply.residentId],
//                              }}
//                            />
//                          ) : (
//                            <Image
//                              style={styles.replyProfilePic}
//                              source={require("../../../../assets/photoprofil.png")}
//                            />
//                          )}
//                          <View style={styles.replyTextContainer}>
//                            <Text style={styles.replyUserName}>
//                              {reply.userName}
//                            </Text>
//                            <Text style={styles.replyText}>{reply.text}</Text>
//                            <Text style={styles.replyDate}>
//                              {formatDateTime(reply.createdAt)}
//                            </Text>
//                          </View>
//                        </View>
//                      ))}
//                    {replies[item.id].length > 1 && (
//                      <TouchableOpacity
//                        onPress={() => setShowAllReplies(!showAllReplies)}
//                      >
//                        <Text style={styles.showRepliesText}>
//                          {showAllReplies ? "Hide Replies" : "Show More Replies"}
//                        </Text>
//                      </TouchableOpacity>
//                    )}
//                    {showAllReplies &&
//                      replies[item.id].slice(1).map((reply, replyIndex) => (
//                        <View key={replyIndex} style={styles.reply}>
//                          <View style={styles.replyLine} />
//                          {replyprofilePic[reply.residentId] !==
//                          "data:image/jpeg;base64,"  ? (
//                            <Image
//                              style={styles.replyProfilePic}
//                              source={{
//                                uri: replyprofilePic[reply.residentId],
//                              }}
//                            />
//                          ) : (
//                            <Image
//                              style={styles.replyProfilePic}
//                              source={require("../../../../assets/photoprofil.png")}
//                            />
//                          )}
//                          <View style={styles.replyTextContainer}>
//                            <Text style={styles.replyUserName}>
//                              {reply.userName}
//                            </Text>
//                            <Text style={styles.replyText}>{reply.text}</Text>
//                            <Text style={styles.replyDate}>
//                              {formatDateTime(reply.createdAt)}
//                            </Text>
//                          </View>
//                        </View>
//                      ))}
//                  </View>
//                )}
//              </View>
//            ))
//          ) : (
//            <Text>No comments yet</Text>
//          )}
//          <View
//            style={{
//              backgroundColor: Colors.GunmetalGray,
//              alignItems: "center",
//              width: "107%",
//              height: 1,
//              marginTop: 10,
//              marginLeft: "-4%",
//            }}
//          />
//          <View style={styles.addCommentContainer}>
//            {userprofilePic ? (
//              <Image
//                source={{ uri: userprofilePic }}
//                style={styles.userProfileImage}
//              />
//            ) : (
//              <Image
//                source={require("../../../../assets/photoprofil.png")}
//                style={styles.userProfileImage}
//              />
//            )}
//            <TextInput
//              placeholder={`add a comment as ${userFullname}`}
//              multiline={true}
//              value={commentText}
//              onChangeText={(text) => {
//                setCommentText(text);
//                setIsTyping(text.trim().length > 0);
//              }}
//              onFocus={handleTextInputFocus}
//              onBlur={handleTextInputBlur}
//              style={styles.commentInput}
//            />
//            <TouchableOpacity
//              onPress={addCommentToPost}
//              disabled={isAddingComment}
//            >
//              {isAddingComment ? (
//                <ActivityIndicator size="small" color={Colors.PURPLE} />
//              ) : (
//                <FontAwesome
//                  name="send"
//                  size={20}
//                  style={[
//                    styles.sendIcon,
//                    { color: isTyping ? Colors.PURPLE : Colors.PLATINUM },
//                  ]}
//                />
//              )}
//            </TouchableOpacity>
//          </View>
//        </View>
//      </View>
//    </ScrollView>
//  );
// };

// export default PostDetails;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f0f0f0",
//   },
//   postContainer: {
//     backgroundColor: "#fff",
//     margin: 10,
//     borderRadius: 10,
//     padding: 15,
//   },
//   userInfo: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   userName: {
//     marginLeft: 10,
//     fontWeight: "bold",
//     fontSize: 16,
//   },
//   singleImage: {
//     width: "100%",
//     height: 300,
//     borderRadius: 10,
//     marginVertical: 15,
//   },
//   imageRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   gridImage: {
//     width: "48%",
//     height: 150,
//     borderRadius: 10,
//     marginVertical: 5,
//   },
//   moreImagesContainer: {
//     position: "relative",
//   },
//   moreImagesOverlay: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 10,
//   },
//   moreImagesText: {
//     color: "#fff",
//     fontWeight: "bold",
//     fontSize: 18,
//   },
//   commentsContainer: {
//     marginTop: 20,
//   },
//   commentsTitle: {
//     fontWeight: "bold",
//     fontSize: 16,
//     marginBottom: 10,
//   },
//   commentContainer: {
//     marginBottom: 20,
//   },
//   comment: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   commentTextContainer: {
//     marginLeft: 10,
//   },
//   commentUserName: {
//     fontWeight: "bold",
//   },
//   repliesContainer: {
//     marginLeft: 45,
//     marginTop: 10,
//   },
//   reply: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   replyLine: {
//     width: 1,
//     height: "100%",
//     backgroundColor: "#ddd",
//     marginRight: 10,
//   },
//   replyProfilePic: {
//     width: 35,
//     height: 35,
//     borderRadius: 25,
//   },
//   replyTextContainer: {
//     marginLeft: 8,
//     flex: 1,
//   },
//   replyUserName: {
//     fontWeight: "bold",
//   },
//   replyDate: {
//     color: "grey",
//     fontSize: 12,
//     marginLeft: 3,
//     marginTop: 3,
//   },
//   showRepliesText: {
//     color: "purple",
//     marginLeft: 45,
//     marginTop: 5,
//   },
//   commentInput: {
//     borderRadius: 20,
//     padding: 7,
//     marginTop: 10,
//     textAlign: "center",
//     left: -3,
//     width: 250,
//   },
//   addCommentContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   userProfileImage: {
//     height: 35,
//     width: 35,
//     borderRadius: 20,
//     marginTop: 7,
//     left: -10,
//   },
//   replyText: {
//     color: Colors.BLACK,
//     flexShrink: 1,
//     flexWrap: "wrap",
//   },
// });