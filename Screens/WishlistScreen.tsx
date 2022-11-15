import { CountriesList } from '../Components/CountriesList';
import { Search } from '../Components/Search';
import styled from 'styled-components/native';
import { useEffect, useState } from 'react';
import { CountryType } from '../types';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSavedCountries } from '../lib/countriesState';
import { useNavigation } from '@react-navigation/native';
import { AddRemoveButtons } from '../Components/AddRemoveButtons';
import { NoCountries } from '../Components/NoCountries';

const ScreenContainer = styled.View`
  flex: 1;
  background-color: 'white';
  align-items: center;
  justify-content: center;
`;

const WishlistScreen = () => {
  const { clearSelected, selectedCountries, wishlistCountries } =
    useSavedCountries();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredCountries, setFilteredCountries] = useState<CountryType[]>([]);
  const [noCountriesFound, setNoCountriesFound] = useState<boolean>(false);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      clearSelected();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (searchTerm && wishlistCountries) {
      const filtered = wishlistCountries?.filter(
        (country: CountryType) =>
          country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          country.official.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (filtered.length) {
        setFilteredCountries(filtered);
        setNoCountriesFound(false);
      } else {
        setNoCountriesFound(true);
      }
    } else {
      setFilteredCountries([]);
      setNoCountriesFound(false);
    }
  }, [searchTerm]);

  return (
    <ScreenContainer>
      {/* <SafeAreaView
        //  style={{ width: Dimensions.get('window').width }}
        style={{ flex: 1 }}
      > */}
      <Search searchHandler={setSearchTerm} />
      <View style={{ flex: 1, width: '100%' }}>
        {!wishlistCountries.length ? (
          <NoCountries screen="Wishlist" />
        ) : !noCountriesFound ? (
          <CountriesList
            countriesList={
              filteredCountries.length ? filteredCountries : wishlistCountries
            }
          />
        ) : noCountriesFound ? (
          <Text>No countries found that match your search!</Text>
        ) : (
          <Text>Oops! Unable to return list of all countries!</Text>
        )}
      </View>
      {selectedCountries.length ? <AddRemoveButtons screen="Wishlist" /> : null}
      {/* </SafeAreaView> */}
    </ScreenContainer>
  );
};

export { WishlistScreen };
