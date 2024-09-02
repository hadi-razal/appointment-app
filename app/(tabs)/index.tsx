import React from 'react';
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';

const appointments = [
  // Example appointments, replace with your data fetching logic
  { id: 1, doctor: 'Dr. Smith', time: '10:00 AM - 11:00 AM', date: 'Sep 5, 2024' },
  { id: 2, doctor: 'Dr. Jane Doe', time: '2:00 PM - 3:00 PM', date: 'Sep 7, 2024' },
];

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} className='bg-gray-100'>
      <View className="flex-1 bg-gray-100 py-14">
        <View className="p-4">
          <Text className="text-3xl font-bold text-center text-blue-900 mb-6">
            Welcome to mediCare
          </Text>
          <Text className="text-lg text-center text-gray-600 mb-6">
            Your online doctor
          </Text>

          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <View key={appointment.id} className="bg-white p-4 mb-4 rounded-lg shadow-lg">
                <Text className="text-lg font-semibold text-gray-800">
                  Appointment with {appointment.doctor}
                </Text>
                <Text className="text-sm text-gray-600">{appointment.date}</Text>
                <Text className="text-sm text-gray-600">{appointment.time}</Text>
              </View>
            ))
          ) : (
            <View className="bg-white p-6 rounded-lg shadow-lg">
              <Text className="text-lg text-center text-gray-800">
                You have no appointments booked.
              </Text>
            </View>
          )}

          <TouchableOpacity className="bg-blue-600 p-4 mt-6 rounded-lg flex-row items-center justify-center shadow-lg">
            <FontAwesome name="comments" size={20} color="white" />
            <Text className="text-white text-lg font-bold ml-2">Chat with a Doctor</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/signUp')} className="bg-green-600 p-4 mt-4 rounded-lg flex-row items-center justify-center shadow-lg">
            <FontAwesome name="plus" size={20} color="white" />
            <Text className="text-white text-lg font-bold ml-2">Book a New Appointment</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ ScrollView>
  );
}
