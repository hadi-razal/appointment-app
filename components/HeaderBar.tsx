import { auth, db } from '@/firebase';
import { router } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Image, Pressable, Text, View } from 'react-native'

const HeaderBar = ({ subHeading }: { subHeading: string }) => {


    const [userDetails, setUserDetails] = useState<any>();


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




    return (
        <View className='flex flex-row items-center justify-between pt-14'>
            <View className="">
                <Text className="text-blue-900 text-3xl font-bold">Medi Care</Text>
                <Text className="text-blue-900 text-md">{subHeading}</Text>
            </View>

            {/* User Profile Image */}
            <Pressable onPress={() => router.push('/profile')} className="flex-row items-center mr-2">
                {userDetails?.profileImageUrl ? (
                    <Image
                        source={{ uri: userDetails.profileImageUrl }}
                        className="w-10 h-10 rounded-full"
                    />
                ) : (
                    <View className="w-10 h-10 rounded-full bg-gray-300" />
                )}
            </Pressable>
        </View>
    )
}

export default HeaderBar