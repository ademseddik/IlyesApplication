// import React from "react";
// import { View, Text, FlatList, StyleSheet } from "react-native";


// const FeedbackList = ({ feedbacks }) => {
    
//         const convertToDate = (dateArray) => {
//           const [year, month, day, hour, minute, second] = dateArray;
//           return new Date(year, month - 1, day, hour, minute, second);
//         };

//   const renderItem = ({ item }) => (
//     <View style={styles.card}>
//       <Text style={styles.comments}> {item.typeOfProblem}</Text>
//       <View style={styles.metadata}>
//         {item.suggestedFeatures ? (
//           <Text style={styles.metadataText}>
//             Suggested Features: {item.suggestedFeatures}
//           </Text>
//         ) : null}
//         <Text style={styles.metadataText}>Details: {item.comments}</Text>
//         <Text style={styles.metadataText}>
//           Date: {convertToDate(item.timestamp).toLocaleDateString()}
//         </Text>

//         <Text style={styles.metadataText}>Status: {item.status}</Text>
//       </View>
//     </View>
//   );

//   return (
//     <FlatList
//       data={feedbacks}
//       renderItem={renderItem}
//       keyExtractor={(item) => item.id}
//       contentContainerStyle={styles.list}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   list: {
//     padding: 20,
//   },
//   card: {
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     padding: 15,
//     marginBottom: 20,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     elevation: 2,
//   },
//   comments: {
//     fontSize: 20,
//     marginBottom: 10,
//     fontWeight:'bold'
//   },
//   metadata: {
//     marginTop: 10,
//     borderTopWidth: 1,
//     borderTopColor: "#eee",
//     paddingTop: 10,
//   },
//   metadataText: {
//     fontSize: 14,
//     color: "#555",
//   },
// });

// export default FeedbackList;
