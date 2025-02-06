import { StatusBar } from 'expo-status-bar';
import { FlatList, Text, View, RefreshControl, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect, useCallback } from 'react';
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
    
  //   useEffect(()=> {
  //       setRefreshing(true); 
  //       loadList();
  //   },[]);

  //   async function loadList() {
  //     try {
  //         const storedList = await AsyncStorage.getItem('listOfUsers');
  //         if(storedList){
  //             const JsonParseList = JSON.parse(storedList);
  //             setUsers(JsonParseList);
  //             setTimeout(() => setRefreshing(false), 400);
  //         } else {
  //             setUsers(0);
  //         }
  //     } catch (err) {
  //         console.log('failed to load the list', err);
  //     } 
  // }

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
        // setUserNum(jsonObj.length);
        // console.log(jsonObj.response);        
      })
      .catch((err) => {
        //handle the error
        console.log('failed to fetch data', err);
      });
    
    }

    function goto(routeName) {
        
      if (routeName) {
        nav.navigate(routeName);
      } else {
        nav.popToTop();
        //back to the beginning of the navigation stack
      }
    }

      
    return (
        <View>
        {users.length === 0 ? (
          
            <Text style={theme.main}>No users yet buddy.</Text>

        ) : (
            <FlatList 
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            data={users} 
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => 

              // <TouchableOpacity onPress={() => goto('Details', item.id)}>
              <ListItem 
              id={item.id}
              firstName={item.first_name} 
              lastName={item.last_name}
              email={item.email} 
              lead={<Ionicons name="person-outline" size={20} />} 
              tail={<Ionicons name="chevron-forward-outline" size={20} />} 
              />
            // </TouchableOpacity>
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


// const styles = StyleSheet.create({
//     listitem: {
//       flex: 1,
//       flexDirection: 'row',
//       justifyContent: 'flex-start',
//       alignItems: 'center',
//       paddingBlock: 4,
//       borderBottomColor: '#999',
//       borderBottomWidth: 1,
//     },
//     lead: {
//       paddingInline: 4,
//     },
//     tail: {
//       paddingInline: 4,
//     },
//     main: {
//       flexDirection: 'column',
//       justifyContent: 'space-between',
//       paddingInline: 8,
//     },
//     heading: {
//         fontSize: 20,
//         fontWeight: 500,
//     },
//     title: {
//       fontWeight: 500,
//     },
//     subtitle: {
//       fontWeight: 300,
//     },
//     flatlist: {
//       width: '100%',
//       marginBlock: 12,
//     },
//     container: {
//       flex: 1,
//       backgroundColor: '#fff',
//       alignItems: 'center',
//       justifyContent: 'center',
//       paddingBlockStart: 80 /* instead of safearea... cuz I'm lazy */,
//     },
//   });