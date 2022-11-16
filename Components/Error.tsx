import { Pressable, Text, View } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

interface ErrorScreenProps {
  error?: string;
  retryFunction?: () => Promise<void>;
}

const ErrorScreen = ({ error, retryFunction }: ErrorScreenProps) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightblue',
      }}
    >
      <View style={{ alignItems: 'center', padding: 24 }}>
        <MaterialCommunityIcons
          name="heart-broken"
          size={40}
          color="black"
          style={{ marginBottom: 24 }}
        />
        <Text style={{ textAlign: 'center' }}>Oops! Something went wrong!</Text>
        {error && (
          <Text style={{ textAlign: 'center', marginTop: 12 }}>{error}</Text>
        )}
        {retryFunction && (
          <View>
            <Pressable onPress={retryFunction}>
              <MaterialIcons
                name="loop"
                size={40}
                color="black"
                style={{ marginTop: 24 }}
              />
              <Text style={{ textAlign: 'center', marginTop: 12 }}>Retry?</Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
};

export { ErrorScreen };
