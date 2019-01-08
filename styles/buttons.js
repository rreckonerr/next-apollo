import styled from 'styled-components';
import { hex2Rgba } from './utils';



export const TextButton = styled.button`
  background-color: transparent;
  color: ${({theme, secondary}) => secondary ? theme.color.secondaryDark : theme.color.fontOnLight};

  ${'' /* ripple waves effect */}
  background-position: center;
  transition: background 0.8s;

  min-width: 5em;
  padding: 0 0.5em;
  margin: 0 0.5em;
  height: 2em;
  font-size: ${props => props.small ? '0.85em' : '1em'};

  border: none;
  border-radius: 0.25rem;
  outline: none;

  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
  overflow: hidden;
  vertical-align: middle;

  &:hover {
    cursor: pointer;
    ${'' /* ripple waves effect */}
    background: ${({theme, secondary}) => hex2Rgba((secondary ? theme.color.secondary : theme.color.primary), 0.2)} radial-gradient(circle, transparent 1%, ${({theme, secondary}) => hex2Rgba((secondary ? theme.color.secondary : theme.color.primary), 0.5)} 1%) center/15000%;
  }

  &:active {
    ${'' /* ripple waves effect */}
    background-color: ${({theme, secondary}) => hex2Rgba((secondary ? theme.color.secondaryDark : theme.color.primaryDark), 0.2)};
    background-size: 100%;
    transition: background 0s;
  }
`



export const RaisedButton = styled(TextButton)`
    background-color: ${({theme, secondary}) => secondary ? theme.color.secondary : theme.color.primary};

    box-shadow: 0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);
    will-change: box-shadow;

    color: ${({theme, secondary}) => secondary ? theme.color.fontOnDark : theme.color.fontOnLight};

    &:hover {
      background-color: ${({theme, secondary}) => secondary ? theme.color.secondaryDark : theme.color.primaryDark}
    }

    &:active {
      box-shadow: 0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12);
    }
`
