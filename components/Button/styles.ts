import styled from 'styled-components'

export const Button = styled.button`
  background: #202020;
  border: none;
  color: #fff;
  text-transform: uppercase;
  height: 40px;
  padding: 0 24px;
  border-radius: 4px;
  transition: filter 0.2s;
  cursor: pointer;
  outline: none;

  &:hover {
    filter: contrast(150%);
  }
`

export const ButtonForIcons = styled.button`
  background: rgba(0, 0, 0, 0);
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.2s;
  outline: none;
  padding: 5px;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`
