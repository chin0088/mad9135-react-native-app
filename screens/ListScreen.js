import { StatusBar } from 'expo-status-bar';
import { FlatList, Text, View, RefreshControl, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from '../theme/theme';

export default function ListScreen({navigation}) {
    const [users, setUsers] = useState([]);
    const [refreshing, setRefreshing] = useState(false); //for RefreshControl
    const nav = useNavigation();

    const storageKey = 'listOfUsers';
    const url = 'https://random-data-api.com/api/v2/users?size=20';

    useFocusEffect(
        useCallback(() => {
            loadList();
        }, [])
    );

    async function loadList() {
        try {
            setRefreshing(true);
            const storedList = await AsyncStorage.getItem(storageKey);
            if(storedList){
                const JsonParseList = JSON.parse(storedList);
                setUsers(JsonParseList);
            } else {
                setUsers([]);
                setTimeout(() => {
                  navigation.getParent()?.navigate('Home');
              }, 400);
            }
        } catch (err) {
            console.log('failed to load the list', err);
            setUsers([]);
        } finally {
            setRefreshing(false);
        }
    }
  

  let onRefresh = useCallback(() => {
      //saves this callback function to use across reloads
      setRefreshing(true);
      getData();
      setRefreshing(false);
    });

    function getData(){
      fetch(url)
      .then(resp=>{
        if(!resp.ok) throw new Error(resp.statusText);
        return resp.json();
      })
      .then(jsonObj=>{
        AsyncStorage.setItem(storageKey, JSON.stringify(jsonObj))
        setUsers(jsonObj);      
      })
      .catch((err) => {
        //handle the error
        console.log('failed to fetch data', err);
      });
    
    }

      
    return (
        <View>
          <View style={theme.header}>
          <Text style={theme.headerText}>User List</Text>
      </View>
        {users.length === 0 ? (
          
            <Text style={theme.main}>No users yet buddy.</Text>

        ) : (
            <FlatList 
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            data={users} 
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => 


            <ListItem 
              id={item.id}
             firstName={item.first_name} 
             lastName={item.last_name}
             email={item.email} 
             lead={<Ionicons name="person-outline" size={20} />} 
              tail={<Ionicons name="chevron-forward-outline" size={20} />} 
              />
            }
            />
         )}
            <StatusBar style="auto" />
        </View>
    );
}

function ListItem({ id, firstName, lastName, email = '', lead, tail }) {
  const nav = useNavigation();
    return (
      <View style={theme.listitem}>
        {lead ? lead : <View style={theme.lead}></View>}
        <View style={theme.main}>
          <Text style={theme.title}>{firstName} {lastName}</Text>
          <Text style={theme.subtitle}>{email}</Text>
        </View>
        <TouchableOpacity onPress={() => nav.navigate('Details', { id })}>
        {tail ? tail : <View style={theme.tail}></View>}
        </TouchableOpacity>
      </View>
    );
  }

