import React, { useEffect, useState } from 'react';
import { Image, Text, View, Alert, Pressable, ActivityIndicator, TextInput, SafeAreaView } from 'react-native';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '@/firebase';
import { router } from 'expo-router';
import HeaderBar from '@/components/HeaderBar';

const Profile = () => {
    const [userDetails, setUserDetails] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [gender, setGender] = useState('');

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const user = auth.currentUser;
                if (user) {
                    const docRef = doc(db, 'users', user.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        setUserDetails(data);
                        setName(data.name || '');
                        setPhone(data.phone || '');
                        setGender(data.gender || '');
                    } else {
                        setError('No user data found.');
                    }
                } else {
                    setError('No user is signed in.');
                }
            } catch (err: any) {
                setError('Failed to load user details.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, []);

    const handleSave = async () => {
        if (!name || !phone || !gender) {
            Alert.alert('Error', 'Please fill out all fields.');
            return;
        }

        try {
            const user = auth.currentUser;
            if (user) {
                const userRef = doc(db, 'users', user.uid);
                await updateDoc(userRef, { name, phone, gender });
                Alert.alert('Success', 'Profile updated successfully.');
                setIsEditing(false);
            }
        } catch (error: any) {
            Alert.alert('Error', 'Failed to update profile.');
        }
    };

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
            <SafeAreaView className="flex-1 items-center justify-center bg-white">
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading...</Text>
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView className="flex-1 items-center justify-center bg-white">
                <Text>Error: {error}</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-white pt-10">
            {/* Header */}
            <HeaderBar subHeading="My Profile" />

            {/* Profile Details */}
            <View className="flex-1 items-center justify-start pt-10 w-full">
                {userDetails ? (
                    <View className="items-center rounded-lg w-full max-w-md px-5">
                        {/* Profile Image */}
                        {userDetails.profileImageUrl ? (
                            <Image
                                source={{ uri: userDetails.profileImageUrl }}
                                className="w-24 h-24 rounded-full mb-4"
                            />
                        ) : (
                            <View className="w-24 h-24 rounded-full bg-gray-300 mb-4" />
                        )}

                        {/* Profile Fields */}
                        <TextInput
                            className="bg-gray-100 px-4 py-2 rounded-md mb-2 w-full"
                            placeholder="Name"
                            value={name}
                            onChangeText={(text) => setName(text)}
                            editable={isEditing}
                        />
                        <TextInput
                            className="bg-gray-100 px-4 py-2 rounded-md mb-2 w-full"
                            placeholder="Email"
                            value={userDetails.email || ''}
                            editable={false} // Email cannot be edited
                        />
                        <TextInput
                            className="bg-gray-100 px-4 py-2 rounded-md mb-2 w-full"
                            placeholder="Phone"
                            value={phone}
                            onChangeText={(text) => setPhone(text)}
                            editable={isEditing}
                        />
                        <TextInput
                            className="bg-gray-100 px-4 py-2 rounded-md mb-2 w-full"
                            placeholder="Gender"
                            value={gender}
                            onChangeText={(text) => setGender(text)}
                            editable={isEditing}
                        />

                        {/* Save / Edit Button */}
                        {isEditing ? (
                            <Pressable onPress={handleSave} className="bg-blue-500 py-4 rounded-md shadow-md w-full">
                                <Text className="text-center text-white text-lg font-bold">Save Changes</Text>
                            </Pressable>
                        ) : (
                            <Pressable onPress={() => setIsEditing(true)} className="bg-blue-500 py-4 rounded-md shadow-md w-full">
                                <Text className="text-center text-white text-lg font-bold">Edit Profile</Text>
                            </Pressable>
                        )}

                        {/* Logout Button */}
                        <View className="flex items-center justify-center w-full mt-4">
                            <Pressable onPress={handleLogout} className="bg-red-500 py-4 rounded-md shadow-md w-full">
                                <Text className="text-center text-white text-lg font-bold">Logout</Text>
                            </Pressable>
                        </View>
                    </View>
                ) : (
                    <Text>No user data available.</Text>
                )}
            </View>
        </SafeAreaView>
    );
};

export default Profile;
