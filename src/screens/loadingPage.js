import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

export default function LoadingPage({ navigation }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.push('home')} style={styles.Button}>
                <Text style={{ color: 'white', fontSize: 18 }}>Get Started</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    Button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
        padding: 12,
        width: 200,
        backgroundColor: '#0080FE',
    },
})