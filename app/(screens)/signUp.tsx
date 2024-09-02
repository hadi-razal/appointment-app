import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';
import { Stack } from 'expo-router';

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
            // Simulate an API call or signup process
            await new Promise(resolve => setTimeout(resolve, 2000));
            setLoading(false);
            Alert.alert('Success', 'Signup Successful');
        } catch (error) {
            setLoading(false);
            Alert.alert('Error', 'Signup Failed');
            console.error(error);
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

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-white">
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
            />
            <View className="flex flex-col items-center px-6 py-8 pt-20">
                <View className="w-full items-start justify-start mb-6">
                    <Text className="text-blue-900 text-3xl font-bold">mediCare</Text>
                    <Text className="text-gray-500 text-lg">Sign up to create an account</Text>
                </View>

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
                        />
                    </View>

                    {/* Confirm Password */}
                    <View className="w-full mb-4">
                        <Text className="text-gray-700 mb-2">Confirm Password</Text>
                        <TextInput
                            className="bg-gray-100 px-4 py-2 rounded-md"
                            placeholder="Confirm your password"
                            secureTextEntry
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />
                    </View>
                </View>

                {/* Sign Up Button */}
                <Pressable onPress={handleSignup} className="bg-blue-600 shadow-md p-4 w-full rounded-md mb-6">
                    {loading ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <Text className="text-white text-center font-normal">Sign Up</Text>
                    )}
                </Pressable>
            </View>
        </ScrollView>
    );
};

export default SignUpPage;
