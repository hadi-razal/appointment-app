import React, { useEffect, useState } from 'react';
import { Text, View, Pressable, TextInput, FlatList, Image } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth, db } from '@/firebase';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { doc, getDoc } from 'firebase/firestore';

const Book = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [userDetails, setUserDetails] = useState<any>('');
    const router = useRouter();

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const user = auth.currentUser; // Get the currently logged-in user
                if (user) {
                    const docRef = doc(db, "users", user.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        setUserDetails(docSnap.data()); // Set user details to state
                    }
                }
            } catch (err: any) {
                console.log(err)
            }
        };

        fetchUserDetails();
    }, []);

    // Hardcoded data for doctors and clinics
    const data = [
        {
            id: '1',
            name: 'Dr. John Doe',
            location: 'New York',
            specialization: 'Cardiologist',
            description: 'Experienced cardiologist specializing in heart diseases and preventive care.',
            contact: '555-1234',
            rating: 4.8,
        },
        {
            id: '2',
            name: 'Clinic XYZ',
            location: 'Los Angeles',
            specialization: 'General Practice',
            description: 'Multi-specialty clinic offering comprehensive healthcare services.',
            contact: '555-5678',
            rating: 4.5,
        },
        // ... (other data)
    ];

    // Render item for FlatList
    const renderItem = ({ item }: any) => (
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

            {/* FlatList for doctors and clinics */}
            <View className='mb-10 h-full'>
                <FlatList
                    data={data.filter(item =>
                        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.location.toLowerCase().includes(searchTerm.toLowerCase())
                    )}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
            </View>
        </View>
    );
};

export default Book;
