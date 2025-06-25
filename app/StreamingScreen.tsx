import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Video, ResizeMode } from 'expo-av';


const StreamingScreen = () => {
  const videoRef = React.useRef(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎬 Live Stream Preview</Text>
  <Video
  source={{ uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4' }}
  useNativeControls
  resizeMode={ResizeMode.CONTAIN}
  isLooping
  shouldPlay
  style={styles.video}
/>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0e0e2c',
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
  },
  video: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    backgroundColor: '#000',
  },
});

export default StreamingScreen;