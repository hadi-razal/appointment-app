import React, { useState } from 'react';
import { Link, router, Stack } from 'expo-router';
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase';

const LoginPage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLogin = async () => {
        try {

            signInWithEmailAndPassword(auth, email, password).then((usercredential) => {
                router.push("/home")
            })

            setLoading(true);

            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network request
            setLoading(false);
            alert('Login Successful'); // Or handle successful login logic here
        } catch (error) {
            setLoading(false);
            alert('Login Failed');
            console.log(error);
        }
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className='bg-white'>

            <Stack.Screen
                options={{
                    headerShown: false,
                }}
            />

            <View className="flex flex-col items-center px-6 py-8 pt-[80px]">
                <View className='w-full items-start justify-start'>
                    <Text className="text-blue-900 text-2xl font-bold text-start">mediCare</Text>
                    <Text className="text-gray-500 text-base mb-4">Sign in to continue</Text>
                </View>

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


                <View className="w-full mb-2">
                    <Text className="text-gray-700 mb-2">Passowrd</Text>
                    <TextInput
                        className="bg-gray-100 px-4 py-2 rounded-md"
                        placeholder="Enter your password"
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>


                <Pressable onPress={handleLogin} className='bg-blue-600 shadow-md p-4 w-full rounded-md'>
                    <Text className='text-white text-center font-normal'>{loading ? 'Logging in...' : 'Login'}</Text>
                </Pressable>

                <View className="mt-4 flex flex-col items-center justify-center gap-1 py-3">
                    <Text>Don't have an account?{" "}
                        <Link href={'/signup'} className="text-blue-800 text-sm">Sign up</Link>
                    </Text>

                    <Link href={'/forgotpassword'} className="text-blue-800 text-sm">
                        Forgot Password?
                    </Link>
                </View>

            </View>
        </ScrollView>
    );
};

export default LoginPage;
