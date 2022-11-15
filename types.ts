interface CountryType {
  name: string;
  flag: string;
  official: string;
  population: number;
  capital: string[];
  continents: string[];
  map: string;
  latitude: number;
  longitude: number;
}

type RootStackParamList = {
  Visited: undefined;
  Wishlist: undefined;
  Countries: undefined;
  Country: CountryType;
};

export { CountryType, RootStackParamList };
