import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

// Pages
import SplashScreen from './src/pages/SplashScreen';
import AuthScreen from './src/pages/AuthScreen';
import HomeScreen from './src/pages/HomeScreen';
import BanquetListScreen from './src/pages/BanquetListScreen';
import BanquetDetailScreen from './src/pages/BanquetDetailScreen';
import BookingScreen from './src/pages/BookingScreen';
import BookingStatusScreen from './src/pages/BookingStatusScreen';
import UserProfileScreen from './src/pages/UserProfileScreen';
import NotFound from './src/pages/NotFound';

// Owner Pages
import OwnerDashboard from './src/pages/owner/OwnerDashboard';
import AvailabilityManagement from './src/pages/owner/AvailabilityManagement';
import SubscriptionScreen from './src/pages/owner/SubscriptionScreen';

// Admin Pages
import AdminDashboard from './src/pages/admin/AdminDashboard';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <StatusBar style="auto" />
            <Stack.Navigator
                initialRouteName="Splash"
                screenOptions={{
                    headerShown: false,
                    animation: 'slide_from_right',
                }}
            >
                <Stack.Screen name="Splash" component={SplashScreenWrapper} />
                <Stack.Screen name="Auth" component={AuthScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="BanquetList" component={BanquetListScreen} />
                <Stack.Screen name="BanquetDetail" component={BanquetDetailScreen} />
                <Stack.Screen name="Booking" component={BookingScreen} />
                <Stack.Screen name="BookingStatus" component={BookingStatusScreen} />
                <Stack.Screen name="Profile" component={UserProfileScreen} />

                {/* Owner Screens */}
                <Stack.Screen name="OwnerDashboard" component={OwnerDashboard} />
                <Stack.Screen name="AvailabilityManagement" component={AvailabilityManagement} />
                <Stack.Screen name="SubscriptionScreen" component={SubscriptionScreen} />

                {/* Admin Screens */}
                <Stack.Screen name="AdminDashboard" component={AdminDashboard} />

                <Stack.Screen name="NotFound" component={NotFound} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

// Wrapper for Splash to handle the callback
const SplashScreenWrapper = ({ navigation }: any) => {
    return <SplashScreen onFinish={() => navigation.replace('Auth')} />;
};
