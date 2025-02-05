import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  function getData(){
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
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome!</Text>
      <Text style={styles.title}>The number of users is {userNum}.</Text>
      <Button style={styles.btn} onPress={clearList}>
        Clear the list
      </Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({

  btn: {
    marginBlock: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: 500,
  },
  title: {
    fontSize: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
