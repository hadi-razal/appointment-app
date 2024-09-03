import React from 'react';
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function LandingScreen() {
    return (
        <SafeAreaView style={{ flex: 1 }} className="bg-gray-100">
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="py-6 px-4">
                {/* Welcome Section */}
                <View className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <Text className="text-3xl font-bold text-center text-blue-900 mb-4">
                        mediCare
                    </Text>
                    <Text className="text-lg text-center text-gray-600 mb-6">
                        Your comprehensive online healthcare solution
                    </Text>
                </View>

                {/* Action Buttons */}
                <View className="flex-row justify-between">
                    <TouchableOpacity
                        onPress={() => router.push('/login')}
                        className="bg-blue-600 p-4 rounded-lg flex-row items-center justify-center shadow-lg"
                    >
                        <FontAwesome name="sign-in" size={20} color="white" />
                        <Text className="text-white text-lg font-bold ml-2">Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => router.push('/signUp')}
                        className="bg-green-600 p-4 rounded-lg flex-row items-center justify-center shadow-lg"
                    >
                        <FontAwesome name="user-plus" size={20} color="white" />
                        <Text className="text-white text-lg font-bold ml-2">Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}