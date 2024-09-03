import React from 'react';
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';

const appointments = [
  // Example appointments, replace with your data fetching logic
  // { id: 1, doctor: 'Dr. Smith', time: '10:00 AM - 11:00 AM', date: 'Sep 5, 2024' },
  { id: 2, doctor: 'Dr. Jane Doe', time: '2:00 PM - 3:00 PM', date: 'Sep 7, 2024' },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-white">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Stack.Screen options={{ headerShown: false }} />

        <View className="py-10 px-4">
          {/* Welcome Section */}
          <View className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
            <Text className="text-3xl font-bold text-center text-blue-900 mb-4">
              Hey, Hadi Razal Welcome to Medi Care
            </Text>
            <Text className="text-lg text-center text-gray-600 mb-6">
              Your comprehensive online healthcare solution
            </Text>
          </View>

          {/* About Section */}
          <View className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
            <Text className="text-xl font-semibold text-gray-800 mb-2">What We Do</Text>
            <Text className="text-gray-700 mb-4">
              At mediCare, we revolutionize the way you manage your health. Our platform allows you to:
            </Text>
            <Text className="text-gray-600 mb-2">
              • Book appointments with qualified doctors from the comfort of your home.
            </Text>
            <Text className="text-gray-600 mb-2">
              • Chat with doctors directly for consultations and advice.
            </Text>
            <Text className="text-gray-600 mb-2">
              • Send and receive prescriptions electronically.
            </Text>
            <Text className="text-gray-600 mb-2">
              • Get follow-up care and treatment plans without needing to visit a clinic.
            </Text>
          </View>

          {/* Appointments Section */}
          {appointments.length > 0 ? (
            <View className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
              <Text className="text-xl font-semibold text-gray-800 mb-2">Upcoming Appointments</Text>
              {appointments.map((appointment) => (
                <View key={appointment.id} className="mb-4">
                  <Text className="text-lg font-semibold text-gray-800">
                    Appointment with {appointment.doctor}
                  </Text>
                  <Text className="text-sm text-gray-600">{appointment.date}</Text>
                  <Text className="text-sm text-gray-600">{appointment.time}</Text>
                </View>
              ))}
            </View>
          ) : (
            <View className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
              <Text className="text-lg text-center text-gray-800">
                You have no appointments booked.
              </Text>
            </View>
          )}

          {/* Action Buttons */}
          <View className="flex-row gap-2 justify-between items-center">
            <TouchableOpacity
              onPress={() => router.push('/login')}
              className="bg-blue-600 p-4 rounded-lg flex-row items-center justify-center shadow-lg"
            >
              <Text className="text-white text-md font-norma ml-2">Book Appointment</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push('/signUp')}
              className="bg-green-600 p-4 rounded-lg flex-row items-center justify-center shadow-lg"
            >
              <Text className="text-white text-md font-normal ml-2">View Available Slots</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
