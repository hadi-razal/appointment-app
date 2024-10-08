import React, { useEffect, useState } from 'react';
import { Text, View, Pressable, TextInput, FlatList, SafeAreaView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { auth, db } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { clinics } from '@/data/data';
import HeaderBar from '@/components/HeaderBar';

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
    
    const [searchTerm, setSearchTerm] = useState<string>('');  
    const [searchQuery, setSearchQuery] = useState<string>(''); 
    const [userDetails, setUserDetails] = useState<{ profileImageUrl?: string } | null>(null);
    const [selectedSpecialization, setSelectedSpecialization] = useState<string | undefined>(undefined);
    const [filteredClinics, setFilteredClinics] = useState<Clinic[]>(clinics);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const user = auth.currentUser; 
                if (user) {
                    const docRef = doc(db, 'users', user.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        setUserDetails(docSnap.data()); 
                    }
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchUserDetails();
    }, []);

    // Update filtered clinics when search query or specialization changes
    useEffect(() => {
        const results = clinics.filter((item) =>
            (item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.location.toLowerCase().includes(searchQuery.toLowerCase())) &&
            (selectedSpecialization ? item.specialization === selectedSpecialization : true)
        );
        setFilteredClinics(results);
    }, [searchQuery, selectedSpecialization]);

    // Trigger search on button click
    const handleSearch = () => {
        setSearchQuery(searchTerm);  // Set the search query to the current search term
    };

    // Render item for FlatList
    const clinicItem = ({ item }: { item: Clinic }) => (
        <Pressable className="p-4 border border-gray-300 rounded-md my-2 bg-white shadow-sm">
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
                    className="bg-blue-900 px-4 py-2 rounded-md"
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
            onPress={() => setSelectedSpecialization(item === selectedSpecialization ? undefined : item)}
            className={`mr-2 border border-gray-300 rounded-md bg-white h-8 flex items-center justify-center px-2 ${selectedSpecialization === item ? 'bg-blue-900' : ''}`}
        >
            <Text className={`text-md font-normal ${selectedSpecialization === item ? 'text-white' : 'text-blue-900'}`}>
                {item}
            </Text>
        </Pressable>
    );

    // Extract unique specializations from clinics
    const specializations = [...new Set(clinics.map((item) => item.specialization))];

    return (
        <SafeAreaView className="flex-1 bg-white pt-10">
            {/* Header */}
            <HeaderBar subHeading='Take an appointment' />

            <View className="flex-1 px-4">
                {/* Search Input */}
                <View className="my-3 border border-gray-300 rounded-md flex flex-row items-center justify-center w-full h-10">
                    <TextInput
                        placeholder='Search doctor, clinic, or location'
                        value={searchTerm}
                        onChangeText={setSearchTerm}
                        className='flex-1 px-4 py-2 rounded-md placeholder:text-gray-900'
                        placeholderTextColor='gray'
                    />
                    <Pressable className='bg-blue-900 p-2 px-3 border border-blue-900 rounded-r-md h-full flex items-center justify-center' onPress={handleSearch}>
                        <FontAwesome name="search" size={16} color="white" />
                    </Pressable>
                </View>

                {/* Specialization Filter */}
                <View className='mb-1'>
                    <FlatList
                        horizontal
                        data={specializations}
                        renderItem={specializationItem}
                        keyExtractor={(item) => item}
                        
                        showsHorizontalScrollIndicator={false}
                    />
                </View>

                <View className='mb-10'>
                    <FlatList
                        data={filteredClinics}
                        renderItem={clinicItem}
                        keyExtractor={(item) => item.id}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Book;
