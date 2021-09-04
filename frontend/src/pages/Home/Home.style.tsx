import styled from 'styled-components';
import { fontFamily, fontSize, fontWeight, getSpacing, lineHeight } from 'stylesheet';

export const HomeContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${getSpacing(10)};
`;
HomeContainer.displayName = 'HomeContainer';

export const Logo = styled.img`
  width: ${getSpacing(32)};
  margin-bottom: ${getSpacing(4)};
`;
Logo.displayName = 'Logo';

export const Title = styled.h1`
  font-weight: ${fontWeight.bold};
  font-family: ${fontFamily.main};
  font-size: ${fontSize.large};
  line-height: ${lineHeight.medium};
`;
Title.displayName = 'Title';

export const PageHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: ${getSpacing(12)};

  & :not(:last-child) {
    margin-right: ${getSpacing(5)};
  }
`;
PageHeader.displayName = 'PageHeader';
