import React, { useCallback, useRef,useEffect } from "react";
import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';
import { LinearGradient } from 'expo-linear-gradient';
import SheetOne from './authentification/sign_in/SheetOne';
import SheetTwo from './authentification/sign_up/SheetTwo';
import { useFonts } from 'expo-font';
import { BlurView } from 'expo-blur';
// import * as WebBrowser from 'expo-web-browser';
// import { useOAuth } from "@clerk/clerk-expo";
// import * as Linking from 'expo-linking'

export const useWarmUpBrowser = () => {
  // useEffect(() => {
  //   // Warm up the android browser to improve UX
  //   // https://docs.expo.dev/guides/authentication/#improving-user-experience
  //   void WebBrowser.warmUpAsync()
  //   return () => {
  //     void WebBrowser.coolDownAsync()
  //   }
  // }, [])
}

//WebBrowser.maybeCompleteAuthSession()

const Welcome = () => {
  // Refs for both sheets
  const sheetRef1 = useRef<BottomSheet>(null);
  const sheetRef2 = useRef<BottomSheet>(null);
  useWarmUpBrowser()
  //const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })
  // Load fonts
  const [fontsLoaded] = useFonts({
    'welcome': require('../assets/fonts/Queensides-3z7Ey.ttf'),
  });
  // const onPress = React.useCallback(async () => {
  //   try {
  //     const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
  //       redirectUrl: Linking.createURL('/dashboard', { scheme: 'myapp' }),
  //     })

  //     // If sign in was successful, set the active session
  //     if (createdSessionId) {
  //       setActive!({ session: createdSessionId })
  //     } else {
  //       // Use signIn or signUp returned from startOAuthFlow
  //       // for next steps, such as MFA
  //     }
  //   } catch (err) {
  //     // See https://clerk.com/docs/custom-flows/error-handling
  //     // for more info on error handling
  //     console.error(JSON.stringify(err, null, 2))
  //   }
  // }, [])
  
  // Callbacks for bottom sheet controls
  const handleSnapPress1 = useCallback((index: number) => {
    sheetRef1.current?.snapToIndex(index);
  }, []);

  const handleSnapPress2 = useCallback((index: number) => {
    sheetRef2.current?.snapToIndex(index);
  }, []);

  const handleSheet1Change = useCallback((index: number) => {
    console.log("Sheet 1 position:", index);
  }, []);

  // Show loading state if fonts are not loaded
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#4e2eb0" }} />
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <LinearGradient
        colors={['#4e2eb0', '#a38cd6']}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={styles.container}
      >
        {/* Top Right Buttons Container */}
        <View style={styles.topButtonsContainer}>
          <Pressable
            style={styles.iconButton}
            onPress={() => console.log('Language pressed')}
          >
            <Image
              source={require('../assets/images/icons/earth1.png')}
              style={styles.iconEarth}
            />
          </Pressable>

          <Pressable
            style={styles.iconButton}
            onPress={() => console.log('Information pressed')}
          >
            <Image
              source={require('../assets/images/icons/information.png')}
              style={styles.iconInfo}
            />
          </Pressable>
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          <Image
            source={require('../assets/images/santour.png')}
            style={styles.logo}
          />
          <Text style={styles.title}>Welcome Back</Text>

          <Pressable
            style={styles.primaryButton}
            onPress={() => handleSnapPress1(1)}
          >
            <BlurView
              intensity={25}
              tint="light"
              style={styles.blurButtonContainer}
            >
              <Text style={styles.buttonText}>SIGN IN</Text>
            </BlurView>
          </Pressable>

          <Pressable
            style={styles.secondaryButton}
            onPress={() => handleSnapPress2(1)}
          >
            <BlurView
              intensity={8}
              tint="light"
              style={styles.blurButtonContainer}
            >
              <Text style={styles.secondaryButtonText}>SIGN UP</Text>
            </BlurView>
          </Pressable>
        </View>

        {/* Bottom Section */}
        <View style={styles.bottomSection}>


          <Text style={styles.socialText}>Login with Social Media</Text>



          <View style={styles.socialContainer}>
            <Pressable style={styles.socialButton} >
              <Image source={require('../assets/images/icons/twitter.png')} style={styles.icon} />
            </Pressable>

            <Pressable style={styles.socialButtoapplen}>
              <Image source={require('../assets/images/icons/apple.png')} style={styles.iconapple} />
            </Pressable>

            <Pressable style={styles.socialButton}>
              <Image source={require('../assets/images/icons/google.png')} style={styles.icon} />
            </Pressable>

            <Pressable style={styles.socialButton}>
              <Image source={require('../assets/images/icons/linkedin.png')} style={styles.icon} />
            </Pressable>
          </View>
        </View>
      </LinearGradient>

      <SheetOne ref={sheetRef1} index={-1} onChange={handleSheet1Change} />
      <SheetTwo ref={sheetRef2} index={-1} />
    </GestureHandlerRootView>
  );
};

// Updated styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#4e2eb0',
    paddingBottom: 0,
  },
  blurButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(143, 97, 249, 0.3)',
    padding: 16,
    borderRadius: 35, // 🔄 Match parent radius
  },
  topButtonsContainer: {
    position: 'absolute',
    right: 10,
    top: 45,
    flexDirection: 'row',
    gap: 0,
    zIndex: 1,
  },
  iconButton: {
    paddingRight: 10,
    paddingLeft: 255,
  },
  icon: {
    width: 30,
    height: 30,

  },
  iconEarth: {
    width: 27,
    height: 27,
    tintColor: 'white',
  },
  iconInfo: {
    width: 28,
    height: 28,
    tintColor: 'white',
  },
  // Keep the rest of your existing styles
  logo: {
    width: 260,
    height: 100,
    marginBottom: 72,
    marginTop: 90,
    elevation: 20,
  },
  title: {
    fontFamily: 'welcome',
    fontSize: 24,
    color: 'white',
    marginBottom: 50,
  },
  primaryButton: {
    width: '90%',
    height: 55,
    borderRadius: 35, // This sets the rounded corners
    overflow: 'hidden', // 🔑 Crucial for clipping the blur effect

    borderColor: 'rgba(255,255,255,0.3)',
    marginBottom: 16,
  },
  secondaryButton: {
    width: '90%',
    height: 55,
    borderRadius: 35, // Match the same radius
    overflow: 'hidden', // 🔑 Same here

    borderColor: 'rgba(255,255,255,0.3)',
    marginBottom: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#4e2eb0',
    fontSize: 18,
    fontWeight: '600',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height:300
  },
  bottomSection: {
    width: '100%',
    paddingBottom: 10,
  },
  socialSeparator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    width: '100%',

    marginTop: 'auto',
  },
  line: {
    flex: 1,
    height: 0.5,
    backgroundColor: '#ddd',
  },
  socialText: {
    color: '#666',
    fontSize: 14,
    textAlign: "center",
    marginBottom: 15

  },
  socialContainer: {
    flexDirection: 'row',
    alignSelf: "center",
    gap: 15,
  },
  socialButton: {
    width: 35,
    height: 35,
    borderRadius: 28,
    backgroundColor: '#666',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialButtoapplen: {
    width: 35,
    height: 35,
    borderRadius: 28,
    backgroundColor: '#666',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconapple: {
    width: 35,
    height: 35,

  },
});

export default Welcome;