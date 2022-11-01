import { Image } from 'react-native';
import { ReactNode, useState } from 'react';
import styled from 'styled-components/native';

interface FlagProps {
  source: string;
  style: {};
  resize?: string;
  avatar?: boolean;
}

type StyledFlagProps = {
  height: string;
  width: string;
};

interface ContainerProps {
  avatar?: boolean;
  children: ReactNode;
}

const StyledFlagContainer = styled.View<StyledFlagProps>`
  width: 75px;
  height: 50px;
`;

const StyledFlag = styled.Image<StyledFlagProps>`
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  border: solid 1px black;
`;

const FlagContainer = ({ avatar, children }: ContainerProps) => {
  return (
    <>
      {avatar ? (
        <StyledFlagContainer>{children}</StyledFlagContainer>
      ) : (
        { children }
      )}
    </>
  );
};

const Flag = ({ source, resize, avatar, style }: FlagProps) => {
  const [imgDimensions, setImgDimensions] = useState(
    avatar
      ? { width: 75, height: 50 }
      : {
          width: 320,
          height: 240,
        }
  );
  Image.getSize(source, (width, height) => {
    if (avatar) {
      width > 75
        ? setImgDimensions({ width: 75, height: 75 * (height / width) })
        : setImgDimensions({ height: 50, width: 50 * (width / height) });
    } else {
      setImgDimensions(
        width > 320
          ? { width: 320, height: 320 * (height / width) }
          : { width, height }
      );
    }
  });
  return (
    <FlagContainer avatar={avatar}>
      <StyledFlag
        source={{ uri: source }}
        resizeMode={resize}
        width={`${imgDimensions.width}px`}
        height={`${imgDimensions.height}px`}
        style={style}
      />
    </FlagContainer>
  );
};

export { Flag };
