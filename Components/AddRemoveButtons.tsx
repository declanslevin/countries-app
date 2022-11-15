import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useSavedCountries } from '../lib/countriesState';
import {
  storeVisitedCountries,
  storeWishlistCountries,
} from '../lib/localStorage';

interface AddRemoveButtonsProps {
  screen: 'AllCountries' | 'Visited' | 'Wishlist';
}

const AddRemoveButtons = ({ screen }: AddRemoveButtonsProps) => {
  const {
    addToVisited,
    addToWishlist,
    removeFromVisited,
    removeFromWishlist,
    selectedCountries,
    visitedCountries,
    wishlistCountries,
  } = useSavedCountries();
  const [count, setCount] = useState<number>(0);

  const handleAddToVisited = async () => {
    await addToVisited();
    await storeVisitedCountries(visitedCountries);
  };
  const handleAddToWishlist = async () => {
    await addToWishlist();
    await storeWishlistCountries(wishlistCountries);
  };

  const handleRemoveFromVisited = async () => {
    await removeFromVisited();
    await storeVisitedCountries(visitedCountries);
  };
  const handleRemoveFromWishlist = async () => {
    await removeFromWishlist();
    await storeWishlistCountries(wishlistCountries);
  };

  useEffect(() => {
    setCount(selectedCountries.length);
  }, [selectedCountries]);

  return (
    <>
      {(screen as string) === 'AllCountries' ? (
        <View style={{ flexDirection: 'row', paddingVertical: 8 }}>
          <Pressable
            style={{ flex: 1, borderRightWidth: 1, borderRightColor: 'black' }}
            onPress={handleAddToVisited}
          >
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text>Add {count} to Visited</Text>
            </View>
          </Pressable>
          <Pressable
            style={{ flex: 1, alignItems: 'center' }}
            onPress={handleAddToWishlist}
          >
            <View>
              <Text>Add {count} to Wishlist</Text>
            </View>
          </Pressable>
        </View>
      ) : (
        <Pressable
          style={{ flex: 1 }}
          onPress={
            screen === 'Visited'
              ? handleRemoveFromVisited
              : handleRemoveFromWishlist
          }
        >
          <View style={{ flex: 1, alignItems: 'center', paddingVertical: 8 }}>
            <Text>
              Remove {count} from {screen}
            </Text>
          </View>
        </Pressable>
      )}
    </>
  );
};

export { AddRemoveButtons };
