import Link from 'next/link'

import { Container } from './styles'

interface Item {
  key: string | number
  primary: string
  secondary?: string
  href?: string
  as?: string
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
            <Link href={item.href} as={item.as} key={item.key}>
              <li>
                <strong>{item.primary}</strong>
                <span>{item.secondary}</span>
              </li>
            </Link>
          ))}
        </Container>
      )}
    </>
  )
}

export default ListComponent
