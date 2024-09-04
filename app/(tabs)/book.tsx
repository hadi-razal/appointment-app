import React, { useEffect, useState } from 'react';
import { Text, View, Pressable, TextInput, FlatList, Image } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth, db } from '@/firebase';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { doc, getDoc } from 'firebase/firestore';
import { clinics } from '@/data/data';

interface Clinic {
    id: string;
    name: string;
    location: string;
    specialization: string;
    description: string;
    contact: string;
    rating: number;
}

const Book = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [userDetails, setUserDetails] = useState<any>('');
    const [selectedSpecialization, setSelectedSpecialization] = useState<any>();
    const router = useRouter();

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const user = auth.currentUser; // Get the currently logged-in user
                if (user) {
                    const docRef = doc(db, 'users', user.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        setUserDetails(docSnap.data()); // Set user details to state
                    }
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchUserDetails();
    }, []);

    // Render item for FlatList
    const clinicItem = ({ item }: { item: Clinic }) => (
        <Pressable
            className="p-4 border border-gray-300 rounded-md my-2 bg-white"
        >
            {/* Doctor/Clinic Name */}
            <Text className="text-lg font-bold text-blue-900">{item.name}</Text>

            {/* Specialization and Location */}
            <View className="flex-row justify-between mt-2">
                <View>
                    <Text className="text-sm text-gray-600">{item.specialization}</Text>
                    <Text className="text-sm text-gray-600">{item.location}</Text>
                </View>
            </View>

            {/* Description */}
            <Text className="text-sm text-gray-800 mt-2">{item.description}</Text>

            {/* Contact and Rating */}
            <View className="flex-row justify-between items-center mt-2">
                <Text className="text-sm text-gray-600">Contact: {item.contact}</Text>
                <Text className="text-sm text-yellow-500">
                    <FontAwesome name="star" size={14} color="gold" /> {item.rating.toFixed(1)}
                </Text>
            </View>

            {/* Action Buttons */}
            <View className="flex-row justify-between mt-4">
                {/* Take Appointment Button */}
                <Pressable
                    onPress={() => console.log(`Taking appointment with ${item.name}`)}
                    className="bg-blue-500 px-4 py-2 rounded-md"
                >
                    <Text className="text-white font-bold">Take Appointment</Text>
                </Pressable>

                {/* Save Button */}
                <Pressable
                    onPress={() => console.log(`Saving ${item.name} to favorites`)}
                    className="flex-row items-center px-4 py-2 border border-gray-300 rounded-md"
                >
                    <FontAwesome name="bookmark" size={16} color="gray" />
                    <Text className="ml-2 text-gray-700">Save</Text>
                </Pressable>
            </View>
        </Pressable>
    );

    const specializationItem = ({ item }: { item: string }) => (
        <Pressable
            onPress={() => setSelectedSpecialization(item)}
            className={`mr-2 border border-gray-300 rounded-md bg-white h-10 flex items-center justify-center px-2 ${selectedSpecialization === item ? 'bg-blue-500' : ''}`}
        >
            <Text className={`text-lg font-bold ${selectedSpecialization === item ? 'text-white' : 'text-blue-900'}`}>
                {item}
            </Text>
        </Pressable>
    );


    return (
        <View className="flex-1 pt-10 px-4 bg-white">
            {/* Header */}
            <View className='flex flex-row items-center justify-between'>
                <View className="pt-4">
                    <Text className="text-blue-900 text-3xl font-bold">Medi Care</Text>
                    <Text className="text-blue-900 text-xl mt-2">Book an appointment</Text>
                </View>

                {/* User Profile Image */}
                <View className="flex-row items-center mr-2">
                    {userDetails?.profileImageUrl ? (
                        <Image
                            source={{ uri: userDetails.profileImageUrl }}
                            className="w-14 h-14 rounded-full"
                        />
                    ) : (
                        <View className="w-14 h-14 rounded-full bg-gray-300" />
                    )}
                </View>
            </View>

            {/* Search Input */}
            <View className="my-4">
                <TextInput
                    placeholder='Search doctor, clinic, or location'
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                    className='border border-gray-300 px-4 py-2 rounded-md'
                />
            </View>

            {/* Specialization Filter */}
            <View className='mb-3'>
                <FlatList
                    horizontal
                    data={[...new Set(clinics.map((item) => item.specialization))]}
                    renderItem={specializationItem}
                    keyExtractor={(item) => item}
                    showsHorizontalScrollIndicator={false}
                />
            </View>


            {/* FlatList for doctors and clinics */}
            <View className='mb-10 h-full'>
                <FlatList
                    data={clinics.filter((item: Clinic) =>
                        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.location.toLowerCase().includes(searchTerm.toLowerCase())
                    )}
                    renderItem={clinicItem}
                    keyExtractor={(item) => item.id}
                />
            </View>
        </View>
    );
};

export default Book;
