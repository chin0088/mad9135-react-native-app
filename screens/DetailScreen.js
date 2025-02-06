import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'react-native';

import { theme } from '../theme/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DetailScreen({ route }) {
    const [user, setUser] = useState(null);
    const { id } = route.params;

    useEffect(()=> {
        loadUser();
    }, []);

    async function loadUser() {
        try {
            const storedList = await AsyncStorage.getItem('listOfUsers');
            if(storedList){
                const userData = JSON.parse(storedList);
                const pickedUser = userData.find((user)=> user.id === id);

                if(pickedUser) {
                    setUser(pickedUser);

                } else {
                    console.log('no user is selected');
                }
            } else {
                console.log('no data in storage');   
            }
        } catch (error) {
            console.log('failed to load user data', err);
        }
    }

    return (
        <View>
            <View style={theme.header}>
            <Text style={theme.headerText}>User Details</Text>
        </View>
        {user === null ? (
            <Text>No users data.</Text>
        ) : (
            <View style={theme.detailMain}>
                <Image source={{ uri: user.avatar }} style={{ width: 300, height: 300 }} />
                <Text style={theme.heading}>{user.first_name} {user.last_name}</Text>
                <Text style={theme.detailText}>User ID: {user.id}</Text>
                <Text style={theme.detailText}>Email: {user.email}</Text>
                <Text style={theme.detailText}>Gender: {user.gender}</Text>
                <Text style={theme.detailText}>Date of Birth: {user.date_of_birth}</Text>
                <Text style={theme.detailText}>City: {user.address.city}</Text>
                <Text style={theme.detailText}>State: {user.address.state}</Text>
                <Text style={theme.detailText}>Country: {user.address.country}</Text>
            </View>
         )}
            <StatusBar style="auto" />
        </View>
    );

    
}