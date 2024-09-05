import React, { useEffect, useState } from 'react';
import { Link, router, Stack } from 'expo-router';
import { View, Text, TextInput, Pressable, ScrollView, SafeAreaView } from 'react-native';
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

            await new Promise(resolve => setTimeout(resolve, 2000));
            setLoading(false);
            alert('Login Successful');
        } catch (error) {
            setLoading(false);
            alert('Login Failed');
            console.log(error);
        }
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
        <SafeAreaView className='flex-1 bg-white pt-10'>

            <View className='flex flex-row items-center justify-start px-4'>
                <View className="">
                    <Text className="text-blue-900 text-3xl font-bold">Medi Care</Text>
                    <Text className="text-blue-900 text-md">Sign in to continue</Text>
                </View>
            </View>

            <Stack.Screen
                options={{
                    headerShown: false,
                }}
            />

            <View className="flex flex-col items-center px-4 py-6">

                <View className="w-full mb-2">
                    <Text className="text-gray-700 mb-2">Email</Text>
                    <TextInput
                        className="bg-gray-100 px-4 py-2 rounded-md"
                        placeholder="Enter your email"
                        keyboardType="email-address"
                        value={email}
                        placeholderTextColor='gray'
                        onChangeText={setEmail}
                    />
                </View>


                <View className="w-full mb-3">
                    <Text className="text-gray-700 mb-2">Passowrd</Text>
                    <TextInput
                        className="bg-gray-100 px-4 py-2 rounded-md"
                        placeholder="Enter your password"
                        value={password}
                        onChangeText={setPassword}
                        placeholderTextColor='gray'
                    />
                </View>


                <Pressable onPress={handleLogin} className='bg-blue-900 shadow-md p-4 w-full rounded-md'>
                    <Text className='text-white text-center font-normal'>{loading ? 'Logging in...' : 'Login'}</Text>
                </Pressable>

                <View className="mt-4 flex flex-col items-center justify-center gap-1 py-3">
                    <Text>Don't have an account?{" "}
                        <Link href={'/signUp'} className="text-blue-800 text-sm">Sign up</Link>
                    </Text>

                    <Link href={'/forgotpassword'} className="text-blue-800 text-sm">
                        Forgot Password?
                    </Link>
                </View>

            </View>
        </SafeAreaView>
    );
};

export default LoginPage;
