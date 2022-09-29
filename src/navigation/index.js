import * as React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from "../screens/Splash";
import Main from "../screens/Main";
import CreateNote from "../screens/CreateNote";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import UsersLocation from "../screens/location/userLocation";
import Weather from "../screens/weather";
import LocationApp from "../screens/location/Location";

const Stack = createNativeStackNavigator()

export default function Navigation (props){
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Splash">
                 {/* Splash screen navigation */}
                <Stack.Screen 
                    name='Splash' 
                    component={Splash}
                    options= {{headerShown:false}}
                />
                <Stack.Screen
                    name="Create Account"
                    component={Signup}
                />
                <Stack.Screen
                    name="Login"
                    component={Login}
                />
                {/* Main Screen Navigation */}
                <Stack.Screen
                    name="Main"
                    component={Main}
                      options={({ navigation, route }) => ({
                        headerTitle: 'Note Taking App',
                        headerBackVisible:false,
                      })}
                />
                <Stack.Screen
                    name="create"
                    component={CreateNote}
                />
                <Stack.Screen
                    name="userLocation"
                    component={UsersLocation}
                    options={{headerShown:false}}
                />
                <Stack.Screen
                    name="weather"
                    component={Weather}
                />
                <Stack.Screen
                    name="location"
                    component={LocationApp}
                    options={{headerShown:false}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
