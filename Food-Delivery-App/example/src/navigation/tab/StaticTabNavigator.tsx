import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/HomeScreen';
import ProfileScreen from '../../screens/ProfileScreen';
import { createStaticNavigation } from '@react-navigation/native';

const MyTabs = createBottomTabNavigator({
  screens: {
    Home: HomeScreen,
    Profile: ProfileScreen,
  },
});


const Navigation = createStaticNavigation(MyTabs);

export default function StaticTabNavigator() {
    return <Navigation/>
}