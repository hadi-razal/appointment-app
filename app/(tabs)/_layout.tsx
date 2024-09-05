import React from 'react';
import { Tabs } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#1e3a8a",
        tabBarStyle: {
          paddingVertical: 3,
          backgroundColor: Colors.secondaryColor,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='home' color={color} size={30} />
          ),
        }}
      />
      <Tabs.Screen
        name="book"
        options={{
          title: 'Take App',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='plus-box' color={color} size={30} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='person' color={color} size={30} />
          ),
        }}
      />
    </Tabs>
  );
}
