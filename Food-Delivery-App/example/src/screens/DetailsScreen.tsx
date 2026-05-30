import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const DetailsScreen = ({route}: any) => {
    const navigation = useNavigation<any>();
  return (
    <View>
      <Text style={{color: "red"}}>DetailsScreen</Text>
      <Button title='Go to Profile' onPress={() => navigation.replace("Profile")}/>
    </View>
  )
}

export default DetailsScreen

const styles = StyleSheet.create({})