import styled from 'styled-components'

export const Button = styled.button`
  background: #202020;
  border: none;
  color: #fff;
  text-transform: uppercase;
  height: 47px;
  padding: 0 20px;
  border-radius: 4px;
  transition: filter 0.2s;
  cursor: pointer;

  &:hover {
    filter: contrast(150%);
  }
`
