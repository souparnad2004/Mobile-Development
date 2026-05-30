// components/CustomDrawerContent.js
import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { View, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../app/Providers/ThemeProvider';
import { useAuthStore } from '../../auth/store/auth.store';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { theme } = useTheme();
  const { logout } = useAuthStore(); 

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          onPress:() => {
            logout();
            props.navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          },
          style: "destructive"
        }
      ]
    );
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      
      <View style={{ marginTop: 20, borderTopWidth: 1, borderTopColor: theme.colors.surfaces.outline }}>
        <DrawerItem
          label="Logout"
          icon={({ color, size }) => (
            <MaterialIcons name="logout" size={size} color={theme.colors.system.error} />
          )}
          onPress={handleLogout}
          labelStyle={{
            fontSize: 16,
            fontWeight: "500",
            color: theme.colors.system.error, 
          }}
        />
      </View>
    </DrawerContentScrollView>
  );
}