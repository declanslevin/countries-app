import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CountriesScreen } from './Screens/CountriesScreen';
import { CountryScreen } from './Screens/CountryScreen';
import { RootStackParamList } from './types';
import { Text, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView from 'react-native-maps';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SavedCountriesProvider } from './lib/countriesState';
import { VisitedScreen } from './Screens/VisitedScreen';
import { WishlistScreen } from './Screens/WishlistScreen';

const StackNav = createStackNavigator<RootStackParamList>();
const TabNav = createBottomTabNavigator();

// export const OopsScreen = () => {
//   return (
//     <ScreenContainer>
//       <Heading>Oops!</Heading>
//     </ScreenContainer>
//   );
// };

const CountriesTab = () => (
  <StackNav.Navigator>
    <StackNav.Screen
      name="Countries"
      component={CountriesScreen}
      options={{
        title: 'All Countries',
        headerStyle: { backgroundColor: 'skyblue' },
      }}
    />
    <StackNav.Screen
      name="Country"
      component={CountryScreen}
      options={({ route }) => ({
        title: route.params.name,
        headerStyle: { backgroundColor: 'skyblue' },
      })}
    />
  </StackNav.Navigator>
);

const VisitedTab = () => (
  <StackNav.Navigator>
    <StackNav.Screen
      name="Visited"
      component={VisitedScreen}
      options={{
        title: 'Visited Countries',
        headerStyle: { backgroundColor: 'skyblue' },
      }}
    />
    <StackNav.Screen
      name="Country"
      component={CountryScreen}
      options={({ route }) => ({
        title: route.params.name,
        headerStyle: { backgroundColor: 'skyblue' },
      })}
    />
  </StackNav.Navigator>
);

const WishlistTab = () => (
  <StackNav.Navigator>
    <StackNav.Screen
      name="Wishlist"
      component={WishlistScreen}
      options={{
        title: 'Countries Wishlist',
        headerStyle: { backgroundColor: 'skyblue' },
      }}
    />
    <StackNav.Screen
      name="Country"
      component={CountryScreen}
      options={({ route }) => ({
        title: route.params.name,
        headerStyle: { backgroundColor: 'skyblue' },
      })}
    />
  </StackNav.Navigator>
);

const MapTab = () => (
  <SafeAreaView>
    <Text>Hello world</Text>
    <MapView
      style={{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 150,
      }}
    />
  </SafeAreaView>
);

export default function App() {
  return (
    <SavedCountriesProvider>
      <NavigationContainer>
        <TabNav.Navigator screenOptions={{ headerShown: false }}>
          <TabNav.Screen
            name="CountriesTab"
            component={CountriesTab}
            options={{
              title: 'Countries',
              tabBarIcon: () => <Entypo name="globe" size={24} color="black" />,
            }}
          />
          <TabNav.Screen
            name="VisitedTab"
            component={VisitedTab}
            options={{
              title: 'Visited',
              tabBarIcon: () => (
                <MaterialCommunityIcons
                  name="playlist-check"
                  size={24}
                  color="black"
                />
              ),
            }}
          />
          <TabNav.Screen
            name="WishlistTab"
            component={WishlistTab}
            options={{
              title: 'Wishlist',
              tabBarIcon: () => (
                <MaterialCommunityIcons
                  name="playlist-edit"
                  size={24}
                  color="black"
                />
              ),
            }}
          />
          <TabNav.Screen
            name="Map"
            component={MapTab}
            options={{
              tabBarIcon: () => <Entypo name="map" size={24} color="black" />,
            }}
          />
        </TabNav.Navigator>
      </NavigationContainer>
    </SavedCountriesProvider>
  );
}
