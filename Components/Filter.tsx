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
      }}
    >
      <Pressable
        style={[
          {
            flex: 1,
            borderRightWidth: 1,
            borderRightColor: 'black',
          },
          visitedActive && { backgroundColor: 'green' },
        ]}
        onPress={handleVisited}
      >
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text>Filter Visited</Text>
        </View>
      </Pressable>
      <Pressable
        style={[
          {
            flex: 1,
            alignItems: 'center',
          },
          wishlistActive && { backgroundColor: 'green' },
        ]}
        onPress={handleWishlist}
      >
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text>Filter Wishlist</Text>
        </View>
      </Pressable>
    </View>
  );
};

export { Filter };
