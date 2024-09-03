import React from 'react';
import { Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { auth } from '@/firebase';

export default function LandingScreen() {


    const user = auth.currentUser

    if (user) {
        router.push('/home')
    }


    return (
        <SafeAreaView style={{ flex: 1 }} className="bg-white py-10">
            <Stack.Screen options={{ headerShown: false }} />

            {/* Welcome Section */}
            <View className="flex items-center justify-between w-full h-full">
                <View className="flex items-center justify-center p-6 mb-6 h-2/3">
                    <Text className="text-6xl font-extrabold text-center text-blue-900 mb-4">
                        Medi Care
                    </Text>
                <Text className="text-lg font-light text-center text-gray-600 mb-6">
                        mediCare provides a comprehensive online healthcare solution to manage and track your health seamlessly.
                        From scheduling appointments with healthcare professionals to accessing your medical records anytime and anywhere.
                    </Text>
                </View>

                {/* Action Buttons */}
                <View className="flex justify-center items-center gap-2 w-full h-1/3">
                    <TouchableOpacity
                        onPress={() => router.push('/login')}
                        className="bg-blue-600 p-4 rounded-lg flex-row items-center justify-center shadow-lg w-4/5"
                    >
                        <FontAwesome name="sign-in" size={20} color="white" />
                        <Text className="text-white text-lg font-bold ml-2">Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => router.push('/signUp')}
                        className="bg-green-600 p-4 rounded-lg flex-row items-center justify-center shadow-lg w-4/5"
                    >
                        <FontAwesome name="user-plus" size={20} color="white" />
                        <Text className="text-white text-lg font-bold ml-2">Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}
