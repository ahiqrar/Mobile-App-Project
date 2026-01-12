import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Animated,
} from 'react-native';
import { Crown } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ onFinish }: { onFinish: () => void }) => {
  const [progress] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 2500,
      useNativeDriver: false,
    }).start(() => {
      setTimeout(onFinish, 500);
    });
  }, []);

  const widthInterpolate = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      {/* Decorative Gradients (circles for simple native look) */}
      <View style={[styles.circle, styles.circleTop]} />
      <View style={[styles.circle, styles.circleBottom]} />

      <View style={styles.content}>
        <View style={styles.logoBadge}>
          <Crown size={48} color="#000" />
        </View>
        <Text style={styles.title}>BanquetBook</Text>
        <Text style={styles.subtitle}>Find Your Perfect Venue</Text>
      </View>

      <View style={styles.loaderContainer}>
        <View style={styles.progressBarBg}>
          <Animated.View style={[styles.progressBar, { width: widthInterpolate }]} />
        </View>
        <Text style={styles.loadingText}>Loading experience...</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#EAB308',
    opacity: 0.1,
  },
  circleTop: {
    top: -100,
    right: -100,
  },
  circleBottom: {
    bottom: -100,
    left: -100,
  },
  content: {
    alignItems: 'center',
  },
  logoBadge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#EAB308',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#EAB308',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 8,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.6)',
    letterSpacing: 1,
  },
  loaderContainer: {
    position: 'absolute',
    bottom: 60,
    width: width * 0.6,
  },
  progressBarBg: {
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#EAB308',
  },
  loadingText: {
    textAlign: 'center',
    color: 'rgba(255,255,255,0.4)',
    fontSize: 12,
    marginTop: 12,
  },
});

export default SplashScreen;
