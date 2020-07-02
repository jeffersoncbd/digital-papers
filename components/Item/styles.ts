import styled from 'styled-components'

import PerfectScrollbar from 'react-perfect-scrollbar'

export const Container = styled.div`
  width: 100%;
  max-width: 800px;
  height: 630px;
  margin: 20px auto 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  textarea {
    flex: 1;
    width: 100%;
    border: none;
    font-family: 'Roboto';
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.7);
    resize: none;
  }
`

export const Scroll = styled(PerfectScrollbar)`
  padding-right: 15px;
`

export const Title = styled.div`
  font-weight: 700;
  border: none;
  font-size: 2rem;
  cursor: default;
`

export const DueDate = styled.div`
  align-self: flex-end;
  text-align: right;
  border: none;
  margin-bottom: 15px;
  cursor: default;
`

export const SupportingText = styled.div`
  flex: 1;
  width: 100%;
  border: none;
  font-family: 'Roboto';
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.7);
  resize: none;
  cursor: default;
`

export const InputTitle = styled.input`
  font-weight: 700;
  border: none;
  font-size: 2rem;
`

export const InputDueDate = styled.input`
  align-self: flex-end;
  text-align: right;
  border: none;
  margin-bottom: 15px;
`

export const Actions = styled.div`
  margin: 15px -10px -5px;
  display: flex;
  justify-content: space-between;
  div {
    display: flex;
  }
`