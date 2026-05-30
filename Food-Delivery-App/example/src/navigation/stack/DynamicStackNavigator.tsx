import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../../screens/HomeScreen";
import DetailsScreen from "../../screens/DetailsScreen";
import ProfileScreen from "../../screens/ProfileScreen";
import { StatusBar } from "expo-status-bar";

const Stack = createNativeStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{headerStyle: {
                backgroundColor: "black"
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
                fontFamily: "Helvetica-Bold", 
            },
            }}/>
            <Stack.Screen name="Details" component={DetailsScreen}/>
            <Stack.Screen name="Profile" component={ProfileScreen}/>
        </Stack.Navigator>
    )
}

export default function DynamicStackNavigator() {
    return (
        <NavigationContainer>
            <StatusBar style="light" hideTransitionAnimation="slide" hidden/>
            <MyStack/>
        </NavigationContainer>
    )
}