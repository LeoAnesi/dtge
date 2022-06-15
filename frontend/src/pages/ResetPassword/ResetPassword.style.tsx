import styled from 'styled-components';
import { fontFamily, fontSize, fontWeight, getSpacing, lineHeight } from 'stylesheet';
import { Form } from 'formik';

export const Logo = styled.img`
  height: 62px;
  margin-bottom: ${getSpacing(6)};
`;

export const Title = styled.h1`
  font-weight: ${fontWeight.bold};
  font-family: ${fontFamily.main};
  font-size: ${fontSize.large};
  line-height: ${lineHeight.medium};
  margin-bottom: ${getSpacing(12)};
`;

export const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const RegisterForm = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 400px;

  & > :not(:last-child) {
    margin-bottom: ${getSpacing(3)};
  }
`;
