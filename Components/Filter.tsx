import { Dispatch, SetStateAction } from 'react';
import { Pressable, Text, View } from 'react-native';

interface FilterProps {
  visitedActive: boolean;
  wishlistActive: boolean;
  setVisitedActive: Dispatch<SetStateAction<boolean>>;
  setWishlistActive: Dispatch<SetStateAction<boolean>>;
}

const Filter = ({
  visitedActive,
  wishlistActive,
  setVisitedActive,
  setWishlistActive,
}: FilterProps) => {
  const handleVisited = () => {
    setVisitedActive(!visitedActive);
  };
  const handleWishlist = () => {
    setWishlistActive(!wishlistActive);
  };
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: 'steelblue',
      }}
    >
      <Pressable
        style={[
          {
            flex: 1,
            borderRightWidth: 1,
          },
          visitedActive
            ? { backgroundColor: 'steelblue' }
            : { backgroundColor: 'skyblue' },
          visitedActive && wishlistActive
            ? { borderRightColor: 'white' }
            : { borderRightColor: 'steelblue' },
        ]}
        onPress={handleVisited}
      >
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text style={[visitedActive && { color: 'white' }]}>
            Filter Visited
          </Text>
        </View>
      </Pressable>
      <Pressable
        style={[
          {
            flex: 1,
            alignItems: 'center',
          },
          wishlistActive
            ? { backgroundColor: 'steelblue' }
            : { backgroundColor: 'skyblue' },
        ]}
        onPress={handleWishlist}
      >
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text style={[wishlistActive && { color: 'white' }]}>
            Filter Wishlist
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export { Filter };
