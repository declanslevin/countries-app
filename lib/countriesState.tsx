import React, { createContext, ReactNode, useContext, useState } from 'react';
import { CountryType } from '../types';
import {
  // removeFromVisitedCountries,
  storeVisitedCountries,
  storeWishlistCountries,
} from './localStorage';

interface CountriesContextInterface {
  addAllCountries: (countries: CountryType[]) => void;
  addToSelected: (country: CountryType) => void;
  addToVisited: (country?: CountryType) => void;
  addToWishlist: (country?: CountryType) => void;
  clearSelected: VoidFunction;
  getCountryFromAll: (countryName: string) => CountryType;
  removeFromSelected: (country: CountryType) => void;
  removeFromVisited: (country?: CountryType) => void;
  removeFromWishlist: (country?: CountryType) => void;
  allCountries: CountryType[];
  selectedCountries: CountryType[];
  visitedCountries: CountryType[];
  wishlistCountries: CountryType[];
}

interface SaveCountriesProps {
  children: ReactNode;
}

interface CountriesState {
  allCountries: CountryType[] | [];
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
    allCountries: [],
    selectedCountries: [],
    visitedCountries: [],
    wishlistCountries: [],
  };

  const [allCountries, setAllCountries] = useState<CountryType[]>(
    initialState.allCountries
  );

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

  const addAllCountries = (countries: CountryType[]) => {
    setAllCountries(countries);
  };

  const addToSelected = (country: CountryType) => {
    setSelectedCountries((current) => [...current, country]);
  };

  const addToVisited = async (country?: CountryType) => {
    if (country) {
      if (
        !visitedCountries.filter((visited) => visited.name === country.name)
          .length
      ) {
        setVisitedCountries((current) => [...current, country]);
        // TODO - add new country to store
      }
    } else {
      await selectedCountries
        .filter((country) => !visitedCountries.includes(country))
        .map((country) =>
          setVisitedCountries((current) => [...current, country])
        );
      clearSelected();
      await storeVisitedCountries(visitedCountries);
    }
  };

  const addToWishlist = async (country?: CountryType) => {
    if (country) {
      if (
        !wishlistCountries.filter((wishlist) => wishlist.name === country.name)
          .length
      ) {
        setWishlistCountries((current) => [...current, country]);
        // TODO - add new country to store
      }
    } else {
      await selectedCountries
        .filter((country) => !wishlistCountries.includes(country))
        .map((country) =>
          setWishlistCountries((current) => [...current, country])
        );
      clearSelected();
      await storeWishlistCountries(wishlistCountries);
    }
  };

  const getCountryFromAll = (countryName: string) => {
    return allCountries.filter((country) => country.name === countryName)[0];
  };

  const removeFromSelected = (country: CountryType) =>
    setSelectedCountries((current) =>
      current.filter(
        (exisitingCountry) => country.name !== exisitingCountry.name
      )
    );

  const removeFromVisited = async (country?: CountryType) => {
    if (country) {
      setVisitedCountries(
        visitedCountries.filter((visited) => visited !== country)
      );
      // TODO: remove country from store
    } else {
      await setVisitedCountries(
        visitedCountries.filter(
          (visited) => !selectedCountries.includes(visited)
        )
      );
      clearSelected();
      await storeVisitedCountries(visitedCountries);
    }
  };

  const removeFromWishlist = async (country?: CountryType) => {
    if (country) {
      setWishlistCountries(
        wishlistCountries.filter((wishlist) => wishlist !== country)
      );
      // TODO: remove country from store
    } else {
      await setWishlistCountries(
        wishlistCountries.filter(
          (wishlist) => !selectedCountries.includes(wishlist)
        )
      );
      clearSelected();
      await storeWishlistCountries(wishlistCountries);
    }
  };

  return (
    <CountriesStateProvider
      value={{
        addAllCountries,
        addToSelected,
        addToVisited,
        addToWishlist,
        clearSelected,
        getCountryFromAll,
        removeFromSelected,
        removeFromVisited,
        removeFromWishlist,
        allCountries,
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
