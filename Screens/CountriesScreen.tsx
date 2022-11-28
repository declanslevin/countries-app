import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AddRemoveButtons } from '../Components/AddRemoveButtons';
import { CountriesList } from '../Components/CountriesList';
import { Filter } from '../Components/Filter';
import { Search } from '../Components/Search';
import { Spinner } from '../Components/Spinner';
import { fetchAllCountries } from '../lib/requests';
import { useSavedCountries } from '../lib/countriesState';
import { getAllCountries, storeAllCountries } from '../lib/localStorage';
import { CountryType } from '../types';
import styled from 'styled-components/native';
import { usePromiseTracker } from 'react-promise-tracker';
import { EmptySearch } from '../Components/EmptySearch';
import { ErrorScreen } from '../Components/Error';

interface CountryDataType {
  name: {
    common: string;
    official: string;
  };
  flags: {
    png: string;
  };
  population: number;
  capital: string[];
  continents: string[];
  maps: {
    googleMaps: string;
  };
  latlng: number[];
}

const ScreenContainer = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const CountriesScreen = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [visitedActive, setVisitedActive] = useState<boolean>(false);
  const [wishlistActive, setWishlistActive] = useState<boolean>(false);

  const { promiseInProgress } = usePromiseTracker();

  const {
    addAllCountries,
    clearSelected,
    allCountries,
    selectedCountries,
    visitedCountries,
    wishlistCountries,
  } = useSavedCountries();
  const navigation = useNavigation();

  const fetchCountries = async () => {
    const local = await getAllCountries();
    if (
      !local ||
      Object.values(local).every((val) => val === 0 || val === null)
    ) {
      const result = await fetchAllCountries();
      const countries = result.map((country: CountryDataType) => {
        return {
          flag: country.flags.png,
          name: country.name.common,
          official: country.name.official,
          population: country.population,
          capital: country.capital,
          continents: country.continents,
          map: country.maps.googleMaps,
          latitude: country.latlng[0],
          longitude: country.latlng[1],
        };
      });
      const sortedCountries = countries.sort((a: CountryType, b: CountryType) =>
        a.name.localeCompare(b.name)
      );
      addAllCountries(sortedCountries);
      await storeAllCountries(sortedCountries);
    } else {
      addAllCountries(local);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      clearSelected();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    fetchCountries();
  }, []);

  const countriesList = (allCountries || [])
    // filters out the visited, if active
    .filter((country) => !visitedActive || !visitedCountries.includes(country))
    // filters out the wishlist, if active
    .filter(
      (country) => !wishlistActive || !wishlistCountries.includes(country)
    )
    // filters based on search term, if there is one
    .filter(
      (country) =>
        !searchTerm ||
        country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.official.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const noCountriesFound = !countriesList.length;

  return (
    <ScreenContainer>
      <Search searchHandler={setSearchTerm} />
      <Filter
        visitedActive={visitedActive}
        wishlistActive={wishlistActive}
        setVisitedActive={setVisitedActive}
        setWishlistActive={setWishlistActive}
      />
      {promiseInProgress ? (
        <Spinner />
      ) : (
        <View style={{ flex: 1, width: '100%' }}>
          {countriesList && !noCountriesFound ? (
            <CountriesList countriesList={countriesList} />
          ) : noCountriesFound ? (
            <EmptySearch />
          ) : (
            <ErrorScreen
              error="Unable to return list of all countries!"
              retryFunction={fetchCountries}
            />
          )}
        </View>
      )}
      {selectedCountries.length ? (
        <AddRemoveButtons screen="AllCountries" />
      ) : null}
    </ScreenContainer>
  );
};

export { CountriesScreen };
