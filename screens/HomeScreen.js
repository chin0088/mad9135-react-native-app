import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { Button } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { theme } from '../theme/theme';

export default function HomeScreen() {
  // props children, props.route

  const nav = useNavigation();
  
  const [userNum, setUserNum] = useState(0); // list of users
  const storageKey = 'listOfUsers';
  const url = 'https://random-data-api.com/api/v2/users?size=20';

  useEffect(()=> {
    loadStorage();
  }, []);

  async function loadStorage() {
    let str = await AsyncStorage.getItem(storageKey);

    if(str) {
        let people = JSON.parse(str);
        setUserNum(people.length);
    } else {
        getData();
    }
  };

  // let onRefresh = useCallback(()=> {
  //   loadStorage();
  // });


  function getData(){
    console.log('start fetching');
    
    fetch(url)
      .then(resp=>{
        if(!resp.ok) throw new Error(resp.statusText);
        return resp.json();
      })
      .then(jsonObj=>{
        AsyncStorage.setItem(storageKey, JSON.stringify(jsonObj))
        setUserNum(jsonObj.length);
        // console.log(jsonObj.response);        
      })
      .catch((err) => {
        //handle the error
        console.log('failed to fetch data', err);
      });
  }

  function clearList() {
    AsyncStorage.removeItem(storageKey)
    .then(()=>{
        setUserNum(0);
    })
    .catch((err)=> {
        console.log('failed to clear the list', err);
    })
  }


  return (

    <View style={theme.container}>
      <View style={theme.header}>
        <Text style={theme.headerText}>Random User Data</Text>
      </View>
        <Text style={theme.heading}>Welcome!</Text>
        <Text style={theme.content}>The number of users is {userNum}.</Text>
        <Button 
        color="#23a49f"
        style={theme.btn} onPress={clearList}>
          Clear the list
        </Button>
        <StatusBar style="auto" />
    </View>
  );
}
