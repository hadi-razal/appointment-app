import React, { useState } from 'react';
import { Link, Stack } from 'expo-router';
import { View, Text, TextInput, Pressable, ScrollView, Image, Button, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';

const SignUpPage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [gender, setGender] = useState<string>('');
    const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>(undefined);
    const [profileImage, setProfileImage] = useState<string | undefined>(undefined);
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

    const handleSignup = async () => {
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        try {
            setLoading(true);
            // Simulate signup process
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network request
            setLoading(false);
            alert('Signup Successful'); // Or handle successful signup logic here
        } catch (error) {
            setLoading(false);
            alert('Signup Failed');
            console.log(error);
        }
    };

    const pickImage = async () => {
        let result: any = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setProfileImage(result.assets[0].uri);
        }
    };

    const onDateChange = (event: any, selectedDate?: Date) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setDateOfBirth(selectedDate);
        }
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className='bg-gray-100'>
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
            />

            <View className="flex flex-col items-center px-6 py-8 pt-[80px]">
                <View className='w-full items-start justify-start'>
                    <Text className="text-blue-900 text-2xl font-bold text-start">mediCare</Text>
                    <Text className="text-gray-500 text-base mb-4">Sign up to create an account</Text>
                </View>

                {/* Profile Picture */}
                <View className="w-full items-center mb-4">
                    {profileImage ? (
                        <Image
                            source={{ uri: profileImage }}
                            style={{ width: 100, height: 100, borderRadius: 50 }}
                        />
                    ) : (
                        <View style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: '#ddd' }} />
                    )}
                    <Button title="Pick an Image" onPress={pickImage} />
                </View>

                <TextInput
                    value={name}
                    onChangeText={(text) => setName(text)}
                    className="rounded-md px-4 py-2 mb-2 bg-white text-base w-full focus:outline-none"
                    placeholder="Full Name"
                    placeholderTextColor="#aaa"
                />

                <TextInput
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    className="rounded-md px-4 py-2 mb-2 bg-white text-base w-full focus:outline-none"
                    placeholder="Email"
                    placeholderTextColor="#aaa"
                />

                <TextInput
                    value={phoneNumber}
                    onChangeText={(text) => setPhoneNumber(text)}
                    className="rounded-md px-4 py-2 mb-2 bg-white text-base w-full focus:outline-none"
                    placeholder="Phone Number"
                    placeholderTextColor="#aaa"
                    keyboardType="phone-pad"
                />

                <TextInput
                    value={location}
                    onChangeText={(text) => setLocation(text)}
                    className="rounded-md px-4 py-2 mb-2 bg-white text-base w-full focus:outline-none"
                    placeholder="Location"
                    placeholderTextColor="#aaa"
                />

                <TextInput
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    className="rounded-md px-4 py-2 mb-2 bg-white text-base w-full focus:outline-none"
                    placeholder="Password"
                    placeholderTextColor="#aaa"
                    secureTextEntry
                />

                <TextInput
                    value={confirmPassword}
                    onChangeText={(text) => setConfirmPassword(text)}
                    className="rounded-md px-4 py-2 mb-2 bg-white text-base w-full focus:outline-none"
                    placeholder="Confirm Password"
                    placeholderTextColor="#aaa"
                    secureTextEntry
                />

                <View className="w-full mb-4">
                    <Text className="text-gray-700 mb-2">Gender</Text>
                    <View className="flex-row">
                        <Pressable
                            onPress={() => setGender('male')}
                            className={`bg-white rounded-md p-2 mr-2 ${gender === 'male' ? 'bg-blue-200' : ''}`}
                        >
                            <Text className="text-gray-700">Male</Text>
                        </Pressable>
                        <Pressable
                            onPress={() => setGender('female')}
                            className={`bg-white rounded-md p-2 ${gender === 'female' ? 'bg-blue-200' : ''}`}
                        >
                            <Text className="text-gray-700">Female</Text>
                        </Pressable>
                    </View>
                </View>

                <View className="w-full mb-4">
                    <Text className="text-gray-700 mb-2">Date of Birth</Text>
                    <Pressable
                        onPress={() => setShowDatePicker(true)}
                        className="bg-white  border-gray-300 rounded-md p-2"
                    >
                        <Text className="text-gray-700 opacity-50">
                            {dateOfBirth ? dateOfBirth.toDateString() : 'Select Date of Birth'}
                        </Text>
                    </Pressable>
                    {showDatePicker && (
                        <DateTimePicker
                            value={dateOfBirth || new Date()}
                            mode="date"
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            onChange={onDateChange}
                        />
                    )}
                </View>

                <Pressable onPress={handleSignup} className='bg-blue-600 shadow-md p-4 w-full rounded-md'>
                    <Text className='text-white text-center font-normal'>{loading ? 'Signing up...' : 'Sign Up'}</Text>
                </Pressable>

                <View className="mt-4 flex flex-col items-center justify-center gap-1 py-3">
                    <Text>Already have an account?{" "}
                        <Link href={'/loginModal'} className="text-blue-800 text-sm">Log in</Link>
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
};

export default SignUpPage;
