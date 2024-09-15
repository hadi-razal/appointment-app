import React, { useEffect, useState } from 'react';
import { Text, View, SafeAreaView, FlatList, StatusBar, Pressable, ActivityIndicator } from 'react-native';
import { auth, db } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';
import HeaderBar from '@/components/HeaderBar';

// Mocked appointments data
const appointments = [
  { id: 1, doctor: 'Dr. Smith', time: '10:00 AM - 11:00 AM', date: 'Sep 5, 2024', clinic: 'City Health Clinic', status: 'Confirmed' },
  { id: 3, doctor: 'Dr. Smith', time: '10:00 AM - 11:00 AM', date: 'Sep 5, 2024', clinic: 'City Health Clinic', status: 'Confirmed' },
  { id: 4, doctor: 'Dr. Smith', time: '10:00 AM - 11:00 AM', date: 'Sep 5, 2024', clinic: 'City Health Clinic', status: 'Cancelled' },
  { id: 2, doctor: 'Dr. Jane Doe', time: '2:00 PM - 3:00 PM', date: 'Sep 7, 2024', clinic: 'Downtown Medical', status: 'Confirmed' },
];

export default function HomeScreen() {
  const [userDetails, setUserDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserDetails(docSnap.data());
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserDetails();
  }, []);

  const renderAppointment = ({ item }: { item: any }) => (
    <View key={item.id} className="mb-4 p-4 rounded-md border border-gray-300 shadow bg-white">
      <Text className="text-lg font-semibold text-gray-800">Appointment with Dr. {item.doctor}</Text>
      <Text className="text-sm text-gray-500 mb-1">{item.specialization}</Text>
      <Text className="text-sm text-gray-600">Date: {item.date} | Time: {item.time}</Text>
      <Text className="text-sm text-gray-600">Clinic: {item.clinic}</Text>
      <Text className="text-xs text-gray-400 mb-2">Appointment ID: {item.id}</Text>

      {/* Appointment Actions */}
      <View className="flex-row justify-between items-center">
        <Text className="text-sm text-gray-600">Status: {item.status}</Text>
        {item.status === 'Confirmed' && (
          <Pressable
            onPress={() => {}}
            className="bg-red-500 py-2 px-4 rounded-md"
          >
            <Text className="text-sm text-white font-semibold">Cancel Appointment</Text>
          </Pressable>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView className="bg-white flex-1 pt-10">
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      {/* Header */}
      <HeaderBar
        subHeading={
          loading
            ? 'Loading...'
            : `Welcome back, ${userDetails?.name || 'Guest'}`
        }
      />

      {/* Main Content */}
      <View className="flex-1 px-4">
        {/* About Section */}
        <View className="my-6">
          <Text className="text-xl font-semibold text-blue-900 mb-2">What We Do?</Text>
          <Text className="text-gray-700 mb-4">
            At Medi Care, we revolutionize healthcare. Our platform allows you to:
          </Text>
          <View className="space-y-2">
            <Text className="text-gray-600">• Book appointments with qualified doctors.</Text>
            <Text className="text-gray-600">• Chat directly with doctors for consultations.</Text>
            <Text className="text-gray-600">• Send and receive prescriptions electronically.</Text>
            <Text className="text-gray-600">• Get follow-up care without clinic visits.</Text>
          </View>
        </View>

        {/* Appointments Section */}
        <Text className="text-xl font-semibold text-blue-900 mb-2">Upcoming Appointments</Text>

        {appointments.length > 0 ? (
          <FlatList
            data={appointments}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderAppointment}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        ) : (
          <View className="flex-1 justify-center items-center">
            <Text className="text-gray-500 text-center">No upcoming appointments.</Text>
          </View>
        )}
      </View>

      {/* Loading Indicator */}
      {loading && (
        <View className="absolute inset-0 flex items-center justify-center bg-white opacity-75">
          <ActivityIndicator size="large" color="#1e3a8a" />
        </View>
      )}
    </SafeAreaView>
  );
}
