import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
    const navigation = useNavigation<any>();
  return (
    <View>
      <Text>ProfileScreen</Text>
      <Button title='Go to Home' onPress={() => navigation.popTo("Home")}/>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})