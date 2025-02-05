import { createStaticNavigation, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import HomeScreen from './screens/HomeScreen';
import ListScreen from './screens/ListScreen';
import DetailScreen from './screens/DetailScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import each of the Screen for our app


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="List of Users" component={ListScreen} />
      <Stack.Screen name="Details" component={DetailScreen} />
    </Stack.Navigator>
  );  
}



export default function App() {

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        options={{
          tabBarLabelPosition: 'below-icon',
          tabBarLabelStyle: {
            fontSize: 16,
          },
        }}
        screenOptions={{}}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Home',
            tabBarIcon: ({ focused, color, size }) => {
              //focused is a boolean that we can use to change the icon or color
              return <MaterialIcons name="home" size={size} color={color} focused={focused} />;
            },
          }}
        />
        <Tab.Screen
          name="MyStack"
          component={MyStack}
          options={{
            title: 'List',
            // tabBarBadge: 1, //add a badge to the icon
            tabBarIcon: ({ focused, color, size }) => {
              //focused is a boolean that we can use to change the icon or color
              return <MaterialIcons name="list" size={size} color={color} focused={focused} />;
            },
          }}
        />
        
      </Tab.Navigator>
    </NavigationContainer>
  );
}
