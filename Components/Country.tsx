import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Image, Pressable, Text, View } from 'react-native';
import { useSavedCountries } from '../lib/countriesState';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { Flag } from './Flag';

import { CountryType, RootStackParamList } from '../types';

const Country = ({ country }: { country: CountryType }) => {
  const {
    name,
    flag,
    official,
    population,
    capital,
    continents,
    map,
    latitude,
    longitude,
  } = country;
  const {
    addToSelected,
    removeFromSelected,
    selectedCountries,
    visitedCountries,
    wishlistCountries,
  } = useSavedCountries();
  const nav = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleLongPress = () => {
    selectedCountries.includes(country)
      ? removeFromSelected(country)
      : addToSelected(country);
  };

  return (
    <Pressable
      onLongPress={handleLongPress}
      onPress={() =>
        nav.navigate('Country', {
          name,
          flag,
          official,
          population,
          capital,
          continents,
          map,
          latitude,
          longitude,
        })
      }
    >
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 10,
          },
          selectedCountries.includes(country) && {
            backgroundColor: 'steelblue',
          },
        ]}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={{ uri: flag }}
            style={{
              height: 50,
              width: 75,
              marginRight: 8,
              borderColor: 'black',
              borderWidth: 1,
              resizeMode: 'contain',
            }}
          />
          {/* <Flag source={flag} avatar /> */}
          <Text
            style={[selectedCountries.includes(country) && { color: 'white' }]}
          >
            {name}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {visitedCountries.includes(country) && (
            <MaterialCommunityIcons
              name="playlist-check"
              size={24}
              color="black"
            />
          )}
          {wishlistCountries.includes(country) && (
            <MaterialCommunityIcons
              name="playlist-edit"
              size={24}
              color="black"
            />
          )}
        </View>
      </View>
    </Pressable>
  );
};

export { Country };
