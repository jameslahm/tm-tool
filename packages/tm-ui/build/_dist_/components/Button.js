//@ts-nocheck
import styled from '/web_modules/@emotion/styled.js';
import { css } from '/web_modules/@emotion/core.js';
import { colors } from '../assets/colors/index.js';
const Button = styled.button`
  background-color: ${colors.primary};
  color: ${colors.textOnPrimary};
  cursor: pointer;
  border: 1px solid #000;
  border-radius: 5px;
  &:hover {
    background: ${colors.actionOnHover};
  }
  &:active {
    background: ${colors.actionOnActive};
  }
  ${(props) => {
    switch (props.size) {
      case 'small':
        return css`
          padding: 0.5rem 0.6rem;
        `;
        break;

      case 'middle':
        return css`
          padding: 0.7rem 1rem;
          font-size: 1rem;
        `;

      case 'large':
        return css`
          padding: 1.5rem 1.6rem;
        `;

      default:
        return css`
          padding: 0.5rem 0.6rem;
        `;
        break;
    }
  }}
`;
const CircleButton = styled(Button)`
  border-radius: 50%;
  border: none;
  outline: none;
`;
export { Button, CircleButton };
