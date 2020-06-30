import styled from 'styled-components'

export const Container = styled.ul`
  border: 1px solid #eee;
  margin-top: 10px;
  border-radius: 4px;
  li {
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    padding: 0 15px 15px;
    &:first-child {
      padding-top: 15px;
    }
    strong {
      flex: 1;
      font-weight: 500;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    span {
      margin-left: 20px;
    }
    &:hover {
      background: #eee;
    }
  }
  li + li {
    border-top: 1px solid #eee;
    padding-top: 15px;
  }
`
