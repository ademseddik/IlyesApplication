import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, useRef } from 'react';
import { View, Platform } from 'react-native';
import LottieView from 'lottie-react-native';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useRouter } from 'expo-router';
import { ClerkProvider } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'




SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const animationRef = useRef<LottieView>(null);
  const colorScheme = useColorScheme();
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

  if (!publishableKey) {
    throw new Error('Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env')
  }
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      console.log(publishableKey)
    }
  }, [loaded]);

  useEffect(() => {
    if (animationCompleted) {
      const hasCompletedOnboarding = false;
      if (!hasCompletedOnboarding) {
        router.replace("/welcome");
      }
    }
  }, [animationCompleted]);

  if (!loaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      {!animationCompleted ? (
        <>
          {/* Hide status bar during splash animation */}
          <StatusBar 
            hidden 
            translucent 
            backgroundColor="transparent" 
            style="light" 
          />
          <LottieView
            ref={animationRef}
            source={require('../assets/animations/splash-animation.json')}
            loop={false}
            onAnimationFinish={() => setAnimationCompleted(true)}
            style={{
              flex: 1,
              backgroundColor: '#4e2eb0',
              paddingTop: Platform.OS === 'android' ? StatusBar.length : 0
            }}
            autoPlay
          />
        </>
      ) : (

        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
     
          <StatusBar
            style={colorScheme === 'dark' ? 'light' : 'dark'}
            translucent
            backgroundColor="transparent"
          />
          <Stack>
        <Stack.Screen 
          name="welcome" 
          options={{ 
            headerShown: false,

          }} 
        />
                <Stack.Screen 
          name="home" 
          options={{ 
            headerShown: false,

          }} 
        />
            <Stack.Screen name="+not-found" />
            <Stack.Screen
              name="verify-account" // Use the file name as the route name
              options={{
                headerTitle: "",
                headerShown: true,
                headerShadowVisible: false,
                animation: "fade_from_bottom",
              }}
            />
          </Stack>
        </ThemeProvider>
        

      )}
    </View>
  );
}