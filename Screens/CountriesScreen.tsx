import { CountriesList } from '../Components/CountriesList';
import styled from 'styled-components/native';

const ScreenContainer = styled.View`
  flex: 1;
  background-color: 'white';
  align-items: center;
  justify-content: center;
`;

const CountriesScreen = () => {
  return (
    <ScreenContainer>
      <CountriesList />
    </ScreenContainer>
  );
};

export { CountriesScreen };
