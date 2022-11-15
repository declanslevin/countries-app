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
        <View
          style={{
            flexDirection: 'row',
            height: 40,
            borderTopWidth: 1,
            borderTopColor: 'steelblue',
            borderBottomWidth: 1,
            borderBottomColor: 'steelblue',
          }}
        >
          <Pressable
            style={({ pressed }) => [
              {
                flex: 1,
                borderRightWidth: 1,
                borderRightColor: 'steelblue',
                backgroundColor: pressed ? 'steelblue' : 'skyblue',
                alignItems: 'center',
                justifyContent: 'center',
              },
            ]}
            onPress={handleAddToVisited}
          >
            {({ pressed }) => (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text style={[{ color: pressed ? 'white' : 'black' }]}>
                  Add {count} to Visited
                </Text>
              </View>
            )}
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: pressed ? 'steelblue' : 'skyblue',
              },
            ]}
            onPress={handleAddToWishlist}
          >
            {({ pressed }) => (
              <View>
                <Text style={[{ color: pressed ? 'white' : 'black' }]}>
                  Add {count} to Wishlist
                </Text>
              </View>
            )}
          </Pressable>
        </View>
      ) : (
        <View
          style={{
            height: 40,
            width: '100%',
            borderTopWidth: 1,
            borderTopColor: 'steelblue',
            borderBottomWidth: 1,
            borderBottomColor: 'steelblue',
          }}
        >
          <Pressable
            style={({ pressed }) => [
              {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: pressed ? 'steelblue' : 'skyblue',
              },
            ]}
            onPress={
              screen === 'Visited'
                ? handleRemoveFromVisited
                : handleRemoveFromWishlist
            }
          >
            {({ pressed }) => (
              <View
                style={{ flex: 1, alignItems: 'center', paddingVertical: 8 }}
              >
                <Text style={[{ color: pressed ? 'white' : 'black' }]}>
                  Remove {count} from {screen}
                </Text>
              </View>
            )}
          </Pressable>
        </View>
      )}
    </>
  );
};

export { AddRemoveButtons };
