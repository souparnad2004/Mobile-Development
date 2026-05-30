import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../../screens/HomeScreen';
import ProfileScreen from '../../screens/ProfileScreen';
import DetailsScreen from '../../screens/DetailsScreen';
import { createStaticNavigation } from '@react-navigation/native';

const MyDrawer = createDrawerNavigator({
  screens: {
    Home: HomeScreen,
    Details: DetailsScreen,
    Profile: ProfileScreen,
  },
});

const Navigation = createStaticNavigation(MyDrawer);

export default function StaticDrawerNavigation() {
    return <Navigation/>
}