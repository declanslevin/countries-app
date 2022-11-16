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
  const [allCountries, setAllCountries] = useState<CountryType[]>();
  const [countriesList, setCountriesList] = useState<CountryType[]>();

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchCountries, setSearchCountries] = useState<CountryType[]>([]);

  const [visitedActive, setVisitedActive] = useState<boolean>(false);
  const [wishlistActive, setWishlistActive] = useState<boolean>(false);

  const [noCountriesFound, setNoCountriesFound] = useState<boolean>(false);

  const { promiseInProgress } = usePromiseTracker();

  const {
    clearSelected,
    selectedCountries,
    visitedCountries,
    wishlistCountries,
  } = useSavedCountries();
  const navigation = useNavigation();

  const fetchCountries = async () => {
    const local = await getAllCountries();
    if (Object.values(local).every((val) => val === 0 || val === null)) {
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
      setAllCountries(sortedCountries);
      await storeAllCountries(sortedCountries);
    } else {
      setAllCountries(local);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      clearSelected();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    // fetchCountries();
  }, []);

  useEffect(() => {
    if (!countriesList) {
      setCountriesList(allCountries);
    }
  }, [allCountries]);

  useEffect(() => {
    if (!visitedActive && !wishlistActive) {
      setCountriesList(allCountries);
    } else if (visitedActive && !wishlistActive) {
      setCountriesList(
        allCountries?.filter((country) => !visitedCountries.includes(country))
      );
    } else if (!visitedActive && wishlistActive) {
      setCountriesList(
        allCountries?.filter((country) => !wishlistCountries.includes(country))
      );
    } else if (visitedActive && wishlistActive) {
      setCountriesList(
        allCountries?.filter(
          (country) =>
            !visitedCountries.includes(country) &&
            !wishlistCountries.includes(country)
        )
      );
    }
  }, [wishlistActive, visitedActive]);

  useEffect(() => {
    if (searchTerm && countriesList) {
      const search = countriesList.filter(
        (country) =>
          country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          country.official.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (search.length) {
        setSearchCountries(search);
        setNoCountriesFound(false);
      } else {
        setNoCountriesFound(true);
      }
    } else {
      setSearchCountries([]);
      setNoCountriesFound(false);
    }
  }, [searchTerm]);

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
            <CountriesList
              countriesList={
                !searchCountries.length ? countriesList : searchCountries
              }
            />
          ) : noCountriesFound ? (
            <EmptySearch />
          ) : (
            <ErrorScreen
              error="Oops! Unable to return list of all countries!"
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
