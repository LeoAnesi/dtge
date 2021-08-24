import styled, { css } from 'styled-components';
import {
  borderRadius,
  colorUsage,
  fontFamily,
  fontWeight,
  getSpacing,
  lineHeight,
} from 'stylesheet';

interface ILink extends Record<string, unknown> {
  href?: string;
  to?: string;
  disabled?: boolean;
}

const Link = styled.a<ILink>`
  padding: ${getSpacing(2)} ${getSpacing(4)};

  font-weight: ${fontWeight.bold};
  font-family: ${fontFamily.main};
  font-size: inherit;
  line-height: ${lineHeight.medium};
  text-decoration: none;

  color: ${({ disabled = false }) =>
    disabled ? colorUsage.linkColorDisabled : colorUsage.linkColor};
  transition: color 0.3s ease-in-out;

  cursor: ${({ disabled = false }) => (disabled ? 'default' : 'pointer')};
  ${({ disabled = false }) =>
    disabled &&
    css`
      pointer-events: none;
    `}

  border: none;
  border-radius: ${borderRadius.medium};

  :hover {
    color: ${({ disabled = false }) =>
      disabled ? colorUsage.linkColorDisabled : colorUsage.linkColorHover};
  }
`;

export default Link;
