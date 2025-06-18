// import { View, Text, TouchableOpacity, TextInput } from 'react-native'
// import React, { useState } from 'react'
// import { Picker } from '@react-native-picker/picker';
// import Colors from '../Utils/Colors';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import createAxiosInstance from '../../../core/config/Axios';

// const CreateFeedback = () => {
//     const [comments, setComments] = useState("");
//     const [suggestedFeatures, setSuggestedFeatures] = useState("");
//     const [typeOfProblem, setProblemType] = useState(""); 
//     const [FeedbackCategory, setFeedbackCategory] = useState(""); 

//      const problemTypeoptions = [
//        { label: "BUG", value: "BUG" },
//        { label: "FEATURE_REQUEST", value: "FEATURE_REQUEST" },
//        { label: "GENERAL_FEEDBACK", value: "GENERAL_FEEDBACK" },
//        { label: "OTHER", value: "OTHER" },
//      ];
//       const feedbackCategoryoptions = [
//         { label: "UI", value: "UI" },
//         { label: "FUNCTIONALITY", value: "FUNCTIONALITY" },
//         { label: "PERFORMANCE", value: "PERFORMANCE" },
//         { label: "SECURITY", value: "SECURITY" },
//         { label: "OTHER", value: "OTHER" },
//       ];
//      const handleProblemTypePickerChange = (itemValue) => {
//        setProblemType(itemValue);
//      };
//      const handleFeedbackCategoryPickerChange = (itemValue) => {
//        setFeedbackCategory(itemValue);
//      };


//      const AddFeedBack = async () => {
//        try {
//          const userId = await AsyncStorage.getItem("userId");

//          const response = await createAxiosInstance().post(
//            `tawasalna-community/feedback/createFeedback/${userId}`,
//            {
//              typeOfProblem,
//              FeedbackCategory,
//              comments,
//            }
//          );
//          console.log("Add Feedback successful");
//          alert(" Feedback Added successfuly");
//          setComments("");
//          setProblemType("Choose Problem Type");
//          setFeedbackCategory("Choose Feedback Category");
//        } catch (error) {
//          console.error("Error Adding A Feedback:", error);
//          throw new Error(error);
//        }
//      };


//     return (
//       <View
//         style={{
//           backgroundColor: "white",
//           height: "100%",
//           alignItems: "center",
//         }}
//       >
//         <View style={{ width: "80%", marginTop: 30 }}>
//           <View
//             style={{
//               height: 40,
//               borderColor: "gray",
//               borderWidth: 0.3,
//               borderRadius: 10,
//             }}
//           >
//             <Picker
//               selectedValue={typeOfProblem}
//               style={{
//                 height: 40,
//                 width: "100%",
//                 color: "grey",
//                 marginTop: -5,
//               }}
//               onValueChange={(itemValue) =>
//                 handleProblemTypePickerChange(itemValue)
//               }
//             >
//               <Picker.Item label="Choose Problem Type" />
//               {problemTypeoptions.map((option) => (
//                 <Picker.Item
//                   key={option.value}
//                   label={option.label}
//                   value={option.value}
//                 />
//               ))}
//             </Picker>
//           </View>
//           <View
//             style={{
//               height: 40,
//               borderColor: "gray",
//               borderWidth: 0.3,
//               borderRadius: 10,
//               marginTop: 13,
//             }}
//           >
//             <Picker
//               selectedValue={FeedbackCategory}
//               style={{
//                 height: 40,
//                 width: "100%",
//                 color: "grey",
//                 marginTop: -5,
//               }}
//               onValueChange={(itemValue) =>
//                 handleFeedbackCategoryPickerChange(itemValue)
//               }
//             >
//               <Picker.Item label="Choose Feedback Category" />
//               {feedbackCategoryoptions.map((option) => (
//                 <Picker.Item
//                   key={option.value}
//                   label={option.label}
//                   value={option.value}
//                 />
//               ))}
//             </Picker>
//           </View>

//           <TextInput
//             style={{
//               height: 150,
//               borderColor: "gray",
//               borderWidth: 0.3,
//               borderRadius: 10,
//               paddingLeft: 10,
//               paddingTop: 10,
//               marginTop: 13,
//             }}
//             placeholder="Write your feedback with more details"
//             value={comments}
//             onChangeText={(text) => setComments(text)}
//             multiline={true}
//             textAlignVertical="top"
//           />
//           <TouchableOpacity
//             style={{
//               height: 30,
//               width: "50%",
//               borderColor: "gray",
//               borderWidth: 0.3,
//               borderRadius: 10,
//               marginTop: 40,
//               alignItems: "center",
//               backgroundColor:
//                 comments !== "" &&
//                 FeedbackCategory !== "" &&
//                 typeOfProblem !== ""
//                   ? Colors.LIGHT_PURPLE
//                   : "gray",
//               alignSelf: "center",
//             }}
//             onPress={AddFeedBack}
//             disabled={
//               comments === "" ||
//               FeedbackCategory === "Choose Feedback Category" ||
//               typeOfProblem === "Choose Problem Type"
//             }
//           >
//             <Text style={{ marginTop: 5, color: "white" }}>Create</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
// }

// export default CreateFeedback