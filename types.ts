interface CountryType {
  name: string;
  flag: string;
  official: string;
  population: number;
  capital: string;
  continents: string;
  map: string;
}

type RootStackParamList = {
  Countries: undefined;
  Country: {
    name: string;
    flag: string;
    official: string;
    population: number;
    capital: string;
    continents: string;
    map: string;
  };
};

export { CountryType, RootStackParamList };
