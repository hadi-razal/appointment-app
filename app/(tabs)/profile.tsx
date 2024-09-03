import React, { useEffect, useState } from 'react';
import { Image, Text, View, Alert, Pressable, ScrollView, TextInput } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/firebase';
import { router } from 'expo-router';

const Profile = () => {
    const [userDetails, setUserDetails] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const user = auth.currentUser; // Get the currently logged-in user
                if (user) {
                    const docRef = doc(db, "users", user.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        setUserDetails(docSnap.data()); // Set user details to state
                    } else {
                        setError('No document found for the current user.');
                    }
                } else {
                    setError('No user is signed in.');
                }
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, []);

    const handleLogout = async () => {
        try {
            await auth.signOut();
            router.replace('/login');
            Alert.alert('Success', 'You have been logged out.');
        } catch (error: any) {
            Alert.alert('Error', error.message);
        }
    };

    if (loading) {
        return (
            <View className="flex-1 items-center justify-center bg-white">
                <Text>Loading...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View className="flex-1 items-center justify-center bg-white">
                <Text>Error: {error}</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-white">

            <View className="flex-1 py-10 px-4">
                {/* Header */}
                <View className="px-6 py-4">
                    <Text className="text-blue-900 text-3xl font-bold">mediCare</Text>
                    <Text className="text-blue-900 text-xl mt-2">My Profile</Text>
                </View>

                {/* Profile Details */}
                <View className="flex-1 items-center justify-start pt-10 w-full">
                    {userDetails ? (
                        <View className="items-center  rounded-lg w-full max-w-md px-5">
                            {userDetails.profileImageUrl ? (
                                <Image
                                    source={{ uri: userDetails.profileImageUrl }}
                                    className="w-24 h-24 rounded-full mb-4"
                                />
                            ) : (
                                <View className="w-24 h-24 rounded-full bg-gray-300 mb-4" />
                            )}
                            <TextInput
                                className="bg-gray-100  px-4 py-2 rounded-md mb-2 w-full"
                                placeholder="Name"
                                value={userDetails.name}
                                editable={false}
                            />
                            <TextInput
                                className="bg-gray-100  px-4 py-2 rounded-md mb-2 w-full"
                                placeholder="Email"
                                value={userDetails.email}
                                editable={false}
                            />
                            <TextInput
                                className="bg-gray-100 px-4 py-2 rounded-md mb-2 w-full"
                                placeholder="Phone"
                                value={userDetails.phone}
                                editable={false}
                            />
                            <TextInput
                                className="bg-gray-100 px-4 py-2 rounded-md mb-2 w-full"
                                placeholder="Gender"
                                value={userDetails.gender}
                                editable={false}
                            />
                            <View className="flex items-center justify-center w-full">
                                <Pressable onPress={handleLogout} className="bg-red-500  py-4 rounded-md shadow-md w-full">
                                    <Text className="text-center text-white text-lg font-bold">Logout</Text>
                                </Pressable>
                            </View>
                        </View>
                    ) : (
                        <Text>No user data available.</Text>
                    )}
                </View>

                {/* Logout Button */}

            </View>
        </ScrollView>
    );
};

export default Profile;