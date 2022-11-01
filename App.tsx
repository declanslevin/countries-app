import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CountriesScreen } from './Screens/CountriesScreen';
import { CountryScreen } from './Screens/CountryScreen';
import { RootStackParamList } from './types';

const StackNav = createStackNavigator<RootStackParamList>();
// const TabNav = createBottomTabNavigator();

// export const OopsScreen = () => {
//   return (
//     <ScreenContainer>
//       <Heading>Oops!</Heading>
//     </ScreenContainer>
//   );
// };

export default function App() {
  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
}
