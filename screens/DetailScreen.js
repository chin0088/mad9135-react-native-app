import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'react-native';

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
        {user === null ? (
            <Text>No users data.</Text>
        ) : (
            <View>
                <Text style={styles.heading}>{user.first_name} {user.last_name}</Text>
                <Text>User ID: {user.id}</Text>
                <Text>Email: {user.email}</Text>
                <Text>Gender: {user.gender}</Text>
                <Text>Date of Birth: {user.date_of_birth}</Text>
                <Text>City: {user.address.city}</Text>
                <Text>State: {user.address.state}</Text>
                <Text>Country: {user.address.country}</Text>
            </View>
         )}
            <StatusBar style="auto" />
        </View>
    );

    
}


const styles = StyleSheet.create({
    input: {
      borderColor: '#999',
      borderWidth: 1,
      height: 40,
      alignSelf: 'stretch',
      marginInline: 24,
      marginBlock: 12,
      paddingInline: 12,
    },
    listitem: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingBlock: 4,
      borderBottomColor: '#999',
      borderBottomWidth: 1,
    },
    lead: {
      paddingInline: 4,
    },
    tail: {
      paddingInline: 4,
    },
    main: {
      flexDirection: 'column',
      paddingInline: 8,
    },
    heading: {
        fontSize: 20,
        fontWeight: 500,
    },
    title: {
      fontWeight: 500,
    },
    subtitle: {
      fontWeight: 300,
    },
    flatlist: {
      width: '100%',
      marginBlock: 12,
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      paddingBlockStart: 80 /* instead of safearea... cuz I'm lazy */,
    },
  });