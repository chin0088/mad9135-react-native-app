import { createStaticNavigation, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import HomeScreen from './screens/HomeScreen';
import ListScreen from './screens/ListScreen';
import DetailScreen from './screens/DetailScreen';
//import each of the Screen for our app


const Tab = createBottomTabNavigator();

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
          name="List"
          component={ListScreen}
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
