import { Button, View, Text, Linking, Alert, Image } from 'react-native';
import styled from 'styled-components/native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import React, { useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

type CountryScreenRouteProp = RouteProp<RootStackParamList, 'Country'>;

type StyledFlagProps = {
  height: string;
  width: string;
};

const ScreenContainer = styled.View`
  flex: 1;
  background-color: lightblue;
  padding: 32px 12px;
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
  const { flag, official, population, capital, continents, map } = route.params;
  return (
    <ScreenContainer>
      <SafeAreaView style={{ flex: 1 }}>
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
          <OpenURLButton url={map} title="Google Maps" />
        </ButtonContainer>
      </SafeAreaView>
    </ScreenContainer>
  );
};

export { CountryScreen };
