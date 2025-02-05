import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View, RefreshControl, TouchableOpacity } from 'react-native';
import { Button } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect, useCallback } from 'react';

import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ListScreen({navigation}) {
    const [users, setUsers] = useState([]);
    const [refreshing, setRefreshing] = useState(false); //for RefreshControl
    const nav = useNavigation();
    
    useEffect(()=> {
        setRefreshing(true); 
        loadList();
    },[]);

    async function loadList() {
        try {
            const storedList = await AsyncStorage.getItem('listOfUsers');
            if(storedList){
                const JsonParseList = JSON.parse(storedList);
                setUsers(JsonParseList);
                setTimeout(() => setRefreshing(false), 400);
            } else {
                setUsers(0);
            }
        } catch (error) {
            console.log('failed to load the list', err);
        }
    }

    let onRefresh = useCallback(() => {
        //saves this callback function to use across reloads
        setRefreshing(true);
        loadList();
      });

      function goto(routeName, id) {
        
        if (routeName) {
          nav.navigate(routeName, { id: id });
        } else {
          nav.popToTop();
          //back to the beginning of the navigation stack
        }
      }

      
    return (
        <View>
        <Text style={styles.heading}>User List</Text>
        {users === 0 ? (
            <Text>No users yet buddy.</Text>
        ) : (
            <FlatList 
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            data={users} 
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => 

              <TouchableOpacity onPress={() => goto('Details', item.id)}>
              <ListItem 
              firstName={item.first_name} 
              lastName={item.last_name}
              email={item.email} 
              lead={<Ionicons name="person-outline" size={20} />} 
              tail={<Ionicons name="chevron-forward-outline" size={20} />} 
              />
            </TouchableOpacity>
            }
            />
         )}
            <StatusBar style="auto" />
        </View>
    );
}

function ListItem({ firstName, lastName, email = '', lead, tail }) {
    return (
      <View style={styles.listitem}>
        {lead ? lead : <View style={styles.lead}></View>}
        <View style={styles.main}>
          <Text style={styles.title}>{firstName} {lastName}</Text>
          <Text style={styles.subtitle}>{email}</Text>
        </View>
        {tail ? tail : <View style={styles.tail}></View>}
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