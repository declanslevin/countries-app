import { CountriesList } from '../Components/CountriesList';
import { Search } from '../Components/Search';
import styled from 'styled-components/native';
import { useEffect, useState } from 'react';
import { CountryType } from '../types';
import { Pressable, Text, View } from 'react-native';
import { useSavedCountries } from '../lib/countriesState';
import { useNavigation } from '@react-navigation/native';
import { AddRemoveButtons } from '../Components/AddRemoveButtons';
import { getVisitedCountries } from '../lib/localStorage';

const ScreenContainer = styled.View`
  flex: 1;
  background-color: 'white';
  align-items: center;
  justify-content: center;
`;

const VisitedScreen = () => {
  const [countriesList, setCountriesList] = useState<CountryType[]>();

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchCountries, setSearchCountries] = useState<CountryType[]>([]);

  const [noCountriesFound, setNoCountriesFound] = useState<boolean>(false);

  const { clearSelected, selectedCountries, visitedCountries } =
    useSavedCountries();
  const navigation = useNavigation();

  const fetchVisitedCountries = async () => {
    const local = await getVisitedCountries();
    if (Object.values(local).every((val) => val === 0 || val === null)) {
      setCountriesList(visitedCountries);
    } else {
      setCountriesList(local);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      clearSelected();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    fetchVisitedCountries();
  }, [visitedCountries]);

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
  }, [searchTerm, countriesList]);

  return (
    <ScreenContainer>
      {/* <SafeAreaView
        //  style={{ width: Dimensions.get('window').width }}
        style={{ flex: 1 }}
      > */}
      <Search
        searchHandler={setSearchTerm}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      />
      <View style={{ flex: 1, width: '100%' }}>
        {countriesList && !noCountriesFound ? (
          <CountriesList
            countriesList={
              !searchCountries.length ? countriesList : searchCountries
            }
          />
        ) : noCountriesFound ? (
          <Text>No countries found that match your search!</Text>
        ) : (
          <Text>Oops! Unable to return list of visited countries!</Text>
        )}
      </View>
      {selectedCountries.length ? <AddRemoveButtons screen="Visited" /> : null}
      {/* </SafeAreaView> */}
    </ScreenContainer>
  );
};

export { VisitedScreen };
