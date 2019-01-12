import styled, { css } from 'styled-components';
import elevation, { elevationTransition } from './utils/elevation';
import ripple from './utils/ripple';

const primary = css`
  color: ${props => props.theme.color.primary};
`;

const accent = css`
  color: ${props => props.theme.color.secondary};
`;

const raised = css`
  ${elevation(2)};
  &:active {
    ${elevation(8)};
  }
  ${props => props.accent && `
    color: white;
    background-color: ${props.theme.color.secondary};
    &:before {
      color: black;
    }
  `}
  ${props => props.primary && `
    color: white;
    background-color: ${props.theme.color.primary};
    &:before {
      color: black;
    }
  `}
  ${props => props.disabled && `
    ${elevation(0)};
    background-color: rgba(0, 0, 0, .12);
    pointer-events: none;
  `}
`;

const Button = styled.button.attrs({
  'data-smc': 'Button',
})`
  color: black;
  display: inline-block;
  position: relative;
  min-width: 88px;
  height: 36px;
  padding: 0 16px;
  border: none;
  border-radius: 4px;
  outline: none;
  background: transparent;
  font-size: 14px;
  font-weight: 500;
  line-height: 36px;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  vertical-align: middle;
  user-select: none;
  box-sizing: border-box;
  -webkit-appearance: none;
  ${elevationTransition}

  &:active {
    outline: none;
  }

  &:hover {
    cursor: pointer;
  }

  &::-moz-focus-inner {
    padding: 0;
    border: 0;
  }

  ${ripple()}

  ${props => props.accent && accent}
  ${props => props.primary && primary}
  ${props => props.raised && raised}
  ${props => props.compact && `padding: 0 8px;`}
  ${props => props.disabled && `
    color: rgba(0, 0, 0, .26);
    cursor: default;
    pointer-events: none;
  `}
  ${props => props.dense && `
    height: 32px;
    font-size: .8125rem;
    line-height: 32px;
  `}
`;

export default Button;
