import React from 'react'

import { Container } from './styles'

const ContainerComponent: React.FunctionComponent = ({ children }) => (
  <Container>{children}</Container>
)

export default ContainerComponent
