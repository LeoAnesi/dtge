import styled from 'styled-components';
import { fontFamily, fontSize, fontWeight, getSpacing, lineHeight } from 'stylesheet';

export const HomeContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > :not(:last-child) {
    margin-bottom: ${getSpacing(4)};
  }
`;
HomeContainer.displayName = 'HomeContainer';

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

  & > :not(:last-child) {
    margin-right: ${getSpacing(5)};
  }
`;
PageHeader.displayName = 'PageHeader';
