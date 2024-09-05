import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, Image, TouchableOpacity, Alert, ActivityIndicator, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';
import { Link, router, Stack } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db, storage } from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import HeaderBar from '@/components/HeaderBar';

const SignUpPage = () => {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [gender, setGender] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState<any>();
    const [profileImage, setProfileImage] = useState<string>();
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const handleSignup = async () => {
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        try {
            setLoading(true);
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            let profileImageUrl = '';

            if (profileImage) {
                const storageRef = ref(storage, `profileImages/${user.uid}`);
                const img = await fetch(profileImage);
                const bytes = await img.blob();
                await uploadBytes(storageRef, bytes);
                profileImageUrl = await getDownloadURL(storageRef);
            }

            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                name: name,
                phone: phoneNumber,
                gender: gender,
                dateOfBirth: dateOfBirth,
                email: user.email,
                profileImageUrl: profileImageUrl,
                createdAt: new Date(),
            });

            setLoading(false);
            Alert.alert('Success', 'Signup Successful');
            router.push('/login');
        } catch (error: any) {
            setLoading(false);
            Alert.alert('Error', `Signup Failed: ${error.message}`);
            console.error('Signup error:', error);
        }
    };

    const pickImage = async () => {
        const result: any = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setProfileImage(result.assets[0].uri);
        }
    };

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (selectedDate: any) => {
        setDateOfBirth(selectedDate);
        hideDatePicker();
    };


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                router.replace('/home');
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <SafeAreaView className='flex-1 bg-white pt-10' >



            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >

                <View className='flex flex-row items-center justify-start px-4'>
                    <View className="">
                        <Text className="text-blue-900 text-3xl font-bold">Medi Care</Text>
                        <Text className="text-blue-900 text-md">Sign up to create an account</Text>
                    </View>
                </View>

                <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-white">
                    <Stack.Screen options={{ headerShown: false }} />



                    <View className="flex flex-col items-center px-4 pt-10">


                        {/* Profile Picture */}
                        <View className="w-full items-center mb-6">
                            <TouchableOpacity onPress={pickImage} className="flex items-center justify-center">
                                {profileImage ? (
                                    <Image
                                        source={{ uri: profileImage }}
                                        style={{ width: 100, height: 100, borderRadius: 50 }}
                                    />
                                ) : (
                                    <View style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center' }}>
                                        <FontAwesome name="camera" size={30} color="black" />
                                    </View>
                                )}
                            </TouchableOpacity>
                        </View>

                        {/* Input Fields */}
                        <View className="w-full">
                            {/* Name */}
                            <View className="w-full mb-2">
                                <Text className="text-gray-700 mb-2">Full Name</Text>
                                <TextInput
                                    className="bg-gray-100 px-4 py-2 rounded-md"
                                    placeholder="Enter your full name"
                                    value={name}
                                    onChangeText={setName}
                                    placeholderTextColor='gray'

                                />
                            </View>

                            {/* Email */}
                            <View className="w-full mb-2">
                                <Text className="text-gray-700 mb-2">Email</Text>
                                <TextInput
                                    className="bg-gray-100 px-4 py-2 rounded-md"
                                    placeholder="Enter your email"
                                    keyboardType="email-address"
                                    value={email}
                                    onChangeText={setEmail}
                                    placeholderTextColor='gray'

                                />
                            </View>

                            {/* Phone Number */}
                            <View className="w-full mb-2">
                                <Text className="text-gray-700 mb-2">Phone Number</Text>
                                <TextInput
                                    className="bg-gray-100 px-4 py-2 rounded-md"
                                    placeholder="Enter your phone number"
                                    keyboardType="phone-pad"
                                    value={phoneNumber}
                                    onChangeText={setPhoneNumber}
                                    placeholderTextColor='gray'

                                />
                            </View>

                            {/* Gender */}
                            <View className="w-full mb-2">
                                <Text className="text-gray-700 mb-2">Gender</Text>
                                <View className="flex flex-row">
                                    <TouchableOpacity
                                        onPress={() => setGender('Male')}
                                        className={`flex-1 py-2 rounded-md mr-2 ${gender === 'Male' ? 'bg-blue-500' : 'bg-gray-100 '}`}
                                    >
                                        <Text className={`text-center ${gender === 'Male' ? 'text-white' : 'text-gray-700'}`}>
                                            Male
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => setGender('Female')}
                                        className={`flex-1 py-2 rounded-md ${gender === 'Female' ? 'bg-blue-500' : 'bg-gray-100'}`}
                                    >
                                        <Text className={`text-center ${gender === 'Female' ? 'text-white' : 'text-gray-700'}`}>
                                            Female
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* Date of Birth */}
                            <View className="w-full mb-2">
                                <Text className="text-gray-700 mb-2">Date of Birth</Text>
                                <Pressable onPress={showDatePicker} className="bg-gray-100 px-4 py-2 rounded-md">
                                    <Text className="text-gray-700">
                                        {dateOfBirth ? dateOfBirth.toDateString() : 'Select Date of Birth'}
                                    </Text>
                                </Pressable>
                                <DateTimePickerModal
                                    isVisible={isDatePickerVisible}
                                    mode="date"
                                    onConfirm={handleConfirm}
                                    onCancel={hideDatePicker}
                                />
                            </View>

                            {/* Password */}
                            <View className="w-full mb-2">
                                <Text className="text-gray-700 mb-2">Password</Text>
                                <TextInput
                                    className="bg-gray-100 px-4 py-2 rounded-md"
                                    placeholder="Enter your password"
                                    secureTextEntry
                                    value={password}
                                    onChangeText={setPassword}
                                    placeholderTextColor='gray'
                                />
                            </View>

                            {/* Confirm Password */}
                            <View className="w-full mb-4">
                                <Text className="text-gray-700 mb-2">Confirm Password</Text>
                                <TextInput
                                    placeholderTextColor='gray'

                                    className="bg-gray-100 px-4 py-2 rounded-md"
                                    placeholder="Confirm your password"
                                    secureTextEntry
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                />
                            </View>
                        </View>

                        {/* Sign Up Button */}
                        <Pressable onPress={handleSignup} className="bg-blue-900 shadow-md p-4 w-full rounded-md mb-6">
                            {loading ? (
                                <ActivityIndicator size="small" color="#fff" />
                            ) : (
                                <Text className="text-white text-center font-normal">Sign Up</Text>
                            )}
                        </Pressable>

                        {/* Existing User Link */}
                        <View className="w-full flex flex-row justify-center mb-6">
                            <Text className="text-gray-600">Already have an account? </Text>
                            <Link href="/login">
                                <Text className="text-blue-600">Log In</Text>
                            </Link>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>

    );
};

export default SignUpPage;
