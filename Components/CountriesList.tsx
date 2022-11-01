import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { fetchAllCountries } from '../lib/requests';
import { Country } from './Country';
import { CountryType } from '../types';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const StyledScrollView = styled.ScrollView`
  background-color: lightblue;
`;

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
}

const CountriesList = () => {
  const [allCountries, setAllCountries] = useState<CountryType[]>();

  const getAllCountries = async () => {
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
      };
    });
    const sortedCountries = countries.sort((a: CountryType, b: CountryType) =>
      a.name.localeCompare(b.name)
    );
    setAllCountries(sortedCountries);
  };

  // const getAllCountryNames = async () => {
  //   const result = await fetchAllCountries();
  //   const names = result.map((country) => country.name.common).sort();
  //   const flagSource=
  //   setAllCountries(names);
  // };

  useEffect(() => {
    getAllCountries();
    // getAllCountryNames();
  }, []);

  return (
    <View>
      <StyledScrollView>
        <>
          {allCountries ? (
            allCountries.map((country: CountryType) => (
              <Country
                key={`key-${country.name}`}
                name={country.name}
                flag={country.flag}
                official={country.official}
                population={country.population}
                capital={country.capital}
                continents={country.continents}
                map={country.map}
              />
            ))
          ) : (
            <Text>No countries found</Text>
          )}
        </>
      </StyledScrollView>
    </View>
  );
};

export { CountriesList };
