// import { View, Text, TouchableOpacity, TextInput, Switch } from 'react-native'
// import React, { useState, useEffect } from "react";
// import { AntDesign } from "@expo/vector-icons";
// import Colors from '../../../Utils/Colors';
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import createAxiosInstance from '../../../core/config/Axios';

// const AccountPrivacy = ({navigation}) => {
//  const [isPrivate, setIsPrivate] = useState(false);
//  const [data, setData] = useState([]);

//  const togglePrivacy = async () => {
//    try {
//      setIsPrivate((previousState) => !previousState);
//      const userId = await AsyncStorage.getItem("userId");
//      await UpdateProfile(userId, !isPrivate); 
//    } catch (error) {
//      console.error("Error toggling privacy:", error);
//    }
//  };
// ///////////////////////////////////////////////////////////////////////
//  const UpdateProfile = async (userId, newPrivacyStatus) => {
//    try {
//      const response = await createAxiosInstance().put(
//        `tawasalna-community/residentprofile/updateresidenprofile/${userId}`,
//        {
//          accounttype: newPrivacyStatus ? "PRIVATE" : "PUBLIC", 
//        }
//      );
//      console.log("Update successful");
//    } catch (error) {
//      console.error("Error updating profile:", error);
//    }
//  };
//  //////////////////////////////////////////////////////////////////////
//  useEffect(() => {
//    const fetchProfile = async () => {
//      try {
//        const userId = await AsyncStorage.getItem("userId");
//        const response = await createAxiosInstance().get(
//          `tawasalna-community/residentprofile/getresidentprofile/${userId}`
//        );
//        setData(response.data);
//        const fetchedAccountType = response.data.accountType;
//        const isPrivate = fetchedAccountType === "PRIVATE"; 
//        setIsPrivate(isPrivate); 
//      } catch (error) {
//        console.error("Error getting resident profile:", error);
//        throw new Error(error);
//      }
//    };

//    fetchProfile();
//  }, []);
//  //////////////////////////////////////////////////////////////////////

//   return (
//     <View>
//       <View style={{ flexDirection: "row", marginTop: "12%" }}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <View
//             style={{
//               flexDirection: "row",
//               alignItems: "center",
//               marginLeft:"5%"
//             }}
//           >
//             <AntDesign name="arrowleft" size={35} color={Colors.BLACK} />
//           </View>
//         </TouchableOpacity>

//         <View
//           style={{
//             borderRadius: 10,
//             height: 40,
//             flexDirection: "row",
//             width: 300,
//             marginLeft: "7%",
//             top: "-15%",
//           }}
//         >
//           <Text style={{ fontSize: 28, fontWeight: "400" }}>
//             Account privacy
//           </Text>
//         </View>
//       </View>
//       <View style={{ flexDirection: "row", alignItems: "center" }}>
//         <Text style={{ fontSize: 20, marginLeft: "5%" }}>private account</Text>

//         <TouchableOpacity onPress={togglePrivacy}>
//           <Switch
//             trackColor={{ false: Colors.GRAY, true: Colors.LIGHT_PURPLE }}
//             thumbColor={isPrivate ? Colors.WHITE : Colors.WHITE}
//             ios_backgroundColor={Colors.GRAY}
//             onValueChange={togglePrivacy}
//             value={isPrivate}
//             style={{
//               marginLeft: "40%",
//             }}
//           />
//         </TouchableOpacity>
//       </View>
//       <View style={{ marginLeft: "3%", marginRight: "auto" , width:330 , top:20}}>
//         <Text style={{ color: "grey" }}>
//           When an account is public, the profile and posts can be seen by
//           anyone, on Tawasalna or not, even if they don't have an Tawasalna
//           account.
//         </Text>
//         <Text style={{ marginTop: 5, color: "grey" }}>
//           When an account is private, only approved followers can see what is
//           shared, including photos or videos on pages.
//         </Text>
//       </View>
//     </View>
//   );
// }

// export default AccountPrivacy