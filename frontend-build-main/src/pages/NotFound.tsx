import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Crown as CrownIcon, Home as HomeIcon, ArrowLeft as ArrowLeftIcon } from 'lucide-react-native';

const Crown = CrownIcon as any;
const Home = HomeIcon as any;
const ArrowLeft = ArrowLeftIcon as any;

const NotFound = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.logoBadge}>
          <Crown size={40} color="#000" />
        </View>
        <Text style={styles.errorText}>404</Text>
        <Text style={styles.title}>Page Not Found</Text>
        <Text style={styles.subtitle}>
          The page you're looking for doesn't exist or has been moved.
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.outlineBtn} onPress={() => navigation.goBack()}>
            <ArrowLeft size={18} color="#000" />
            <Text style={styles.outlineText}>Go Back</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.heroBtn} onPress={() => navigation.navigate('Home')}>
            <Home size={18} color="#fff" />
            <Text style={styles.heroText}>Go Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  logoBadge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#EAB308',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  errorText: {
    fontSize: 64,
    fontWeight: '900',
    color: '#EAB308',
    marginBottom: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginBottom: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  outlineBtn: {
    flex: 1,
    height: 54,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  outlineText: {
    fontSize: 14,
    fontWeight: '600',
  },
  heroBtn: {
    flex: 1,
    height: 54,
    borderRadius: 12,
    backgroundColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  heroText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
});

export default NotFound;
