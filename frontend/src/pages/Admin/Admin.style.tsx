import styled from 'styled-components';
import { fontFamily, fontSize, fontWeight, getSpacing, lineHeight } from 'stylesheet';

export const AdminContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > :not(:last-child) {
    margin-bottom: ${getSpacing(4)};
  }
`;
AdminContainer.displayName = 'AdminContainer';

export const Logo = styled.img`
  width: ${getSpacing(32)};
`;
Logo.displayName = 'Logo';

export const Title = styled.h1`
  font-weight: ${fontWeight.bold};
  font-family: ${fontFamily.main};
  font-size: ${fontSize.large};
  line-height: ${lineHeight.medium};
`;
Title.displayName = 'Title';

export const GenerateUserContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  & > :not(:last-child) {
    margin-right: ${getSpacing(5)};
  }
`;

export const LinkToCopy = styled.span`
  overflow: hidden;
  white-space: nowrap;
  max-width: 500px;
  text-overflow: ellipsis;
`;

export const StyledCopyToClipboard = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
