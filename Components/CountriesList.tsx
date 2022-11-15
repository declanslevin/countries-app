import { Text } from 'react-native';
import { Country } from './Country';
import { CountryType } from '../types';
import styled from 'styled-components/native';

const StyledScrollView = styled.ScrollView`
  background-color: lightblue;
`;

interface CountriesListProp {
  countriesList: CountryType[];
}

const CountriesList = ({ countriesList }: CountriesListProp) => {
  return (
    <StyledScrollView>
      <>
        {countriesList ? (
          countriesList.map((country: CountryType) => (
            <Country country={country} key={`key-${country.name}`} />
          ))
        ) : (
          <Text>No countries found</Text>
        )}
      </>
    </StyledScrollView>
  );
};

export { CountriesList };
