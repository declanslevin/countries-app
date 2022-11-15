import { Button, Linking, Alert, Image, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import React, { useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView from 'react-native-maps';
import { ScrollView } from 'react-native-gesture-handler';
import Geocoder from 'react-native-geocoding';
import Constants from 'expo-constants';

type CountryScreenRouteProp = RouteProp<RootStackParamList, 'Country'>;

type StyledFlagProps = {
  height: string;
  width: string;
};

const ScreenContainer = styled.View`
  flex: 1;
  background-color: lightblue;
`;

const FlagContainer = styled.View`
  align-items: center;
  padding-bottom: 16px;
`;

const StyledFlag = styled.Image<StyledFlagProps>`
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  border: solid 1px black;
`;

const TextContainer = styled.View`
  padding: 8px 16px;
  flex-direction: row;
`;

const StyledText = styled.Text``;
const TextLabel = styled.Text`
  font-weight: 600;
`;

const ButtonContainer = styled.View`
  margin: 16px 16px 0;
`;

const Flag = ({ source, resize }: { source: string; resize: string }) => {
  const [imgDimensions, setImgDimensions] = useState({
    width: 320,
    height: 240,
  });
  Image.getSize(source, (width, height) => {
    const ratio = height / width;
    setImgDimensions(
      width > 320 ? { width: 320, height: 320 * ratio } : { width, height }
    );
  });
  return (
    <StyledFlag
      source={{ uri: source }}
      resizeMode={resize}
      width={`${imgDimensions.width}px`}
      height={`${imgDimensions.height}px`}
    />
  );
};

const OpenURLButton = ({ url, title }: { url: string; title: string }) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Unable to open this URL: ${url}`);
    }
  }, [url]);

  return <Button title={title} onPress={handlePress} />;
};

const CountryScreen = () => {
  const route: CountryScreenRouteProp = useRoute();
  const {
    flag,
    official,
    population,
    capital,
    continents,
    map,
    latitude,
    longitude,
  } = route.params;
  const [lat, setLat] = useState<number>(latitude);
  const [lng, setLng] = useState<number>(longitude);
  const [latDelta, setLatDelta] = useState<number>();
  const [lngDelta, setLngDelta] = useState<number>();

  const GOOGLE_MAPS_API_KEY = Constants.expoConfig?.extra?.googleMapsApiKey;
  Geocoder.init(GOOGLE_MAPS_API_KEY);
  Geocoder.from(route.params.name)
    .then((json) => {
      const location = json.results[0].geometry.location;
      const viewport = json.results[0].geometry.viewport;
      const bounds = json.results[0].geometry.bounds;
      console.log(bounds);
      setLat(location.lat);
      setLng(location.lng);
      setLatDelta(viewport.northeast.lat - viewport.southwest.lat);
      setLngDelta(viewport.northeast.lng - viewport.southwest.lng);
    })
    .catch((err) => console.warn(err));

  return (
    <ScreenContainer>
      <SafeAreaView edges={['bottom', 'left', 'right']} style={{ flex: 1 }}>
        <ScrollView style={{ marginBottom: 20 }}>
          <MapView
            style={{
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height / 3,
            }}
            region={{
              latitude: lat,
              longitude: lng,
              latitudeDelta: latDelta || 5,
              longitudeDelta: lngDelta || 5,
            }}
          />
          <FlagContainer>
            <Flag source={flag} resize="contain" />
          </FlagContainer>
          <TextContainer>
            <TextLabel>Official Name: </TextLabel>
            <StyledText style={{ flex: 1, flexWrap: 'wrap' }}>
              {official}
            </StyledText>
          </TextContainer>
          <TextContainer>
            <TextLabel>Population: </TextLabel>
            <StyledText>
              {population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </StyledText>
          </TextContainer>
          <TextContainer>
            <TextLabel>Capital City: </TextLabel>
            <StyledText>{capital}</StyledText>
          </TextContainer>
          <TextContainer>
            <TextLabel>Continent: </TextLabel>
            <StyledText>{continents}</StyledText>
          </TextContainer>
          <ButtonContainer>
            <OpenURLButton url={map} title="View on Google Maps" />
          </ButtonContainer>
        </ScrollView>
      </SafeAreaView>
    </ScreenContainer>
  );
};

export { CountryScreen };
