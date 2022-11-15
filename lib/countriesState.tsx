import React, { createContext, ReactNode, useContext, useState } from 'react';
import { CountryType } from '../types';
import { storeVisitedCountries, storeWishlistCountries } from './localStorage';

interface CountriesContextInterface {
  addToSelected: (country: CountryType) => void;
  addToVisited: VoidFunction;
  addToWishlist: VoidFunction;
  clearSelected: VoidFunction;
  removeFromSelected: (country: CountryType) => void;
  removeFromVisited: VoidFunction;
  removeFromWishlist: VoidFunction;
  selectedCountries: CountryType[];
  visitedCountries: CountryType[];
  wishlistCountries: CountryType[];
}

interface SaveCountriesProps {
  children: ReactNode;
}

interface CountriesState {
  selectedCountries: CountryType[] | [];
  visitedCountries: CountryType[] | [];
  wishlistCountries: CountryType[] | [];
}

const CountriesStateContext = createContext<CountriesContextInterface>(
  {} as CountriesContextInterface
);

const CountriesStateProvider = CountriesStateContext.Provider;

const SavedCountriesProvider = ({ children }: SaveCountriesProps) => {
  const initialState: CountriesState = {
    selectedCountries: [],
    visitedCountries: [],
    wishlistCountries: [],
  };

  const [selectedCountries, setSelectedCountries] = useState<CountryType[]>(
    initialState.selectedCountries
  );
  const [visitedCountries, setVisitedCountries] = useState<CountryType[]>(
    initialState.visitedCountries
  );
  const [wishlistCountries, setWishlistCountries] = useState<CountryType[]>(
    initialState.wishlistCountries
  );

  const clearSelected = () =>
    setSelectedCountries(initialState.selectedCountries);

  const addToSelected = (country: CountryType) => {
    setSelectedCountries((current) => [...current, country]);
  };

  const addToVisited = async () => {
    await selectedCountries
      .filter((country) => !visitedCountries.includes(country))
      .map((country) =>
        setVisitedCountries((current) => [...current, country])
      );
    clearSelected();
    await storeVisitedCountries(visitedCountries);
  };

  const addToWishlist = async () => {
    await selectedCountries
      .filter((country) => !wishlistCountries.includes(country))
      .map((country) =>
        setWishlistCountries((current) => [...current, country])
      );
    clearSelected();
    await storeWishlistCountries(wishlistCountries);
  };

  const removeFromSelected = (country: CountryType) =>
    setSelectedCountries((current) =>
      current.filter(
        (exisitingCountry) => country.name !== exisitingCountry.name
      )
    );

  const removeFromVisited = async () => {
    await setVisitedCountries(
      visitedCountries.filter((country) => !selectedCountries.includes(country))
    );
    clearSelected();
    await storeVisitedCountries(visitedCountries);
  };

  const removeFromWishlist = async () => {
    await setWishlistCountries(
      wishlistCountries.filter(
        (country) => !selectedCountries.includes(country)
      )
    );
    clearSelected();
    await storeWishlistCountries(wishlistCountries);
  };

  return (
    <CountriesStateProvider
      value={{
        addToSelected,
        addToVisited,
        addToWishlist,
        clearSelected,
        removeFromSelected,
        removeFromVisited,
        removeFromWishlist,
        selectedCountries,
        visitedCountries,
        wishlistCountries,
      }}
    >
      {children}
    </CountriesStateProvider>
  );
};

const useSavedCountries = () => {
  const all = useContext(CountriesStateContext);
  return all;
};

export { SavedCountriesProvider, useSavedCountries };
