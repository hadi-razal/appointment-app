import React, { useEffect, useState } from 'react';
import { Text, View, SafeAreaView, ScrollView, Image, FlatList, StatusBar } from 'react-native';
import { router } from 'expo-router';
import { auth, db } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';
import HeaderBar from '@/components/HeaderBar';

const appointments: any = [
  { id: 1, doctor: 'Dr. Smith', time: '10:00 AM - 11:00 AM', date: 'Sep 5, 2024' },
  { id: 3, doctor: 'Dr. Smith', time: '10:00 AM - 11:00 AM', date: 'Sep 5, 2024' },
  { id: 4, doctor: 'Dr. Smith', time: '10:00 AM - 11:00 AM', date: 'Sep 5, 2024' },
  { id: 2, doctor: 'Dr. Jane Doe', time: '2:00 PM - 3:00 PM', date: 'Sep 7, 2024' },
];


export default function HomeScreen() {

  const [userDetails, setUserDetails] = useState<any>();

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
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <View className="bg-white px-4">


      <StatusBar barStyle="dark-content" backgroundColor="white" />

      {/* Header */}
      <HeaderBar subHeading={`Welcome back , ${userDetails?.name}`} />



      {/* About Section */}
      <View className=" mb-6 mt-4">
        <Text className="text-xl font-semibold text-blue-900  mb-2">What We Do?</Text>
        <Text className="text-gray-700 mb-4">
          At Medi Care, we revolutionize the way you manage your health. Our platform allows you to:
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
      <View className=" mb-10 bg-white">
        <Text className="text-xl font-semibold text-center text-blue-900 mb-2">Upcoming Appointments</Text>
        {appointments.length > 0 ? (
          <FlatList
            data={appointments}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View key={item.id} className="mb-4 rounded-md p-4 border border-gray-300 mr-2">
                <Text className="text-lg font-semibold text-gray-800">
                  Appointment with {item.doctor}
                </Text>
                <Text className="text-sm text-gray-600">{item.date}</Text>
                <Text className="text-sm text-gray-600">{item.time}</Text>
              </View>
            )}
          />
        ) : (
          <Text className="text-lg text-center text-blue-900 mt-10">
            You have no appointments booked.
          </Text>
        )}
      </View>
    </View>
  );
}
