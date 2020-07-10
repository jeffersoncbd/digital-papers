import styled from 'styled-components'

import PerfectScrollbar from 'react-perfect-scrollbar'

export const Container = styled.div`
  width: 100%;
  max-width: 800px;
  height: 630px;
  margin: 20px auto 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 24px;
  display: flex;
  flex-direction: column;

  textarea {
    font-family: 'Roboto Mono', monospace;
    flex: 1;
    width: 100%;
    border: none;
    font-size: 1rem;
    line-height: 1.25rem;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.8);
    resize: none;
    outline: none;
  }
`

export const Scroll = styled(PerfectScrollbar)`
  padding-right: 15px;
`
export const InputTitle = styled.input`
  font-weight: 700;
  border: none;
  font-size: 1.6rem;
  outline: none;
  margin-bottom: 16px;
`

export const InputDueDate = styled.input`
  align-self: flex-end;
  text-align: right;
  border: none;
  font-size: 1rem;
  height: 1.5rem;
  margin-bottom: 16px;
  outline: none;
`

export const Actions = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
`
