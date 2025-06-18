// import { View, Text, StyleSheet } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import FeedbackList from './FeedbackList ';
// import createAxiosInstance from '../../../core/config/Axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';




// const UserFeedbacks = () => {
//       const [feedbacks, setFeedbacks] = useState([]);



// const fetchUserFeedbacks = async () => {
//   try {
//     const userId = await AsyncStorage.getItem("userId");
//     const response = await createAxiosInstance().get(
//       `tawasalna-community/feedback/getUserFeedbacks/${userId}`
//     );

//     if (response.data) {
//       //console.log(response.data);
//       const userGroups = response.data;
//       setFeedbacks(userGroups);
//     }
//   } catch (error) {
//     console.error("Error getting User Feedbacks:", error);
//   }
// };

// useEffect(() => {
//   fetchUserFeedbacks();
// }, []);


//   return (
//     <View style={styles.container}>
//       <FeedbackList feedbacks={feedbacks} />
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f5f5f5",
//   },
//   loader: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });
// export default UserFeedbacks