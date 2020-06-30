import React from 'react'

import { Container } from './styles'

interface Item {
  key: string | number
  primary: string
  secondary?: string
  onClick?: () => void
}

interface List {
  items: Item[]
}

const ListComponent: React.FC<List> = ({ items }) => {
  return (
    <>
      {items.length === 0 || (
        <Container>
          {items.map((item) => (
            <li key={item.key} onClick={item.onClick}>
              <strong>{item.primary}</strong>
              <span>{item.secondary}</span>
            </li>
          ))}
        </Container>
      )}
    </>
  )
}

export default ListComponent
