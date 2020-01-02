import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import theme from 'src/theme';
import ImageUpload from './ImageUpload';
import useIsOwner from 'src/util/hooks/useIsOwner';
import log from 'src/util/log';

const IMAGE_WIDTH = Math.floor(theme.desktopContentWidth / 5 * 3);

const Container = styled.div`
  cursor: ${props => props.isOwner ? 'pointer' : 'default'};
  width: 100%;
  
  @media (min-width: ${theme.desktopContentWidth}px) {
    width: auto;
  }
`;

const ImagePlaceholder = styled.div`
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  cursor: default;
  
  @media (min-width: ${theme.desktopContentWidth}px) {
    width: ${IMAGE_WIDTH}px;
    height: ${IMAGE_WIDTH}px;
    padding-bottom: 0;
    overflow: hidden;
  }
`

const ImageContainer = styled(ImagePlaceholder)`
  padding-bottom: 0;
  height: auto;
  overflow: hidden;
`

const Img = styled.img`
  width: 100%;
  height: auto;
  
  @media (min-width: ${theme.desktopContentWidth}px) {
    width: auto;
    height: inherit;
  }
`;

const Image = (props) => {
  // IMAGE DISPLAY
  const { images } = props;
  const [src, setSrc] = useState();
  const hasImages = images && images.length !== 0;
  useEffect(() => {
    if (hasImages) {
      setSrc(images[0]);
    }
  }, [images])
  
  // IMAGE UPLOAD POPUP
  const [displayPopup, setDisplayPopup] = useState(false);
  const isOwner = useIsOwner();
  const handleClick = () => {
    if (isOwner) {
      setDisplayPopup(true)
    }
  }
  const handleClosePopup = () => {
    setDisplayPopup(false);
  }

  // TODO: CONDITIONALLY SET src
  return (
    <Container isOwner={isOwner} >
      <ImageUpload 
        display={displayPopup} 
        handleClosePopup={handleClosePopup} 
        images={images}
        itemId={props._id}
        version={props.version}
        setVersion={props.setVersion}
      />
      {hasImages
        ? (<ImageContainer onClick={handleClick}>
            <Img src={src} />
          </ImageContainer>)
        : <ImagePlaceholder />
      }
    </Container>
  );
};

export default Image;
