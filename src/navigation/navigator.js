import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddPage from '../screens/addPage';
import MainPage from '../screens/mainPage';
import LoadingPage from '../screens/loadingPage';


const Stack = createNativeStackNavigator();

const Navigator = () => {
    return (
        <NavigationContainer>

            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#0080FE',
                    },
                    headerTintColor: '#ffffff',
                    headerBackTitle: 'Back',
                }}>
                <Stack.Screen name="loading" component={LoadingPage} options={{ headerShown: false, headerLeft: null, gestureEnabled: false, headerBackVisible: false }} />
                <Stack.Screen name="home" component={MainPage} options={{ title: 'สมาชิก', headerTitleAlign: 'center', headerBackVisible: false, headerLeft: null, gestureEnabled: false }} />
                <Stack.Screen name="add" component={AddPage} options={{ title: '', headerTitleAlign: 'center' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigator;