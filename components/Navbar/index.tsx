import Link from 'next/link'
import {
  MdMoveToInbox,
  MdFastForward,
  MdEvent,
  MdList,
  MdAccessTime
} from 'react-icons/md'

import { Container, Content } from './styles'

const NavBar: React.FunctionComponent = () => {
  return (
    <Container>
      <Content>
        <h1>Digital Papers</h1>
        <div>
          <Link href="/inbox">
            <MdMoveToInbox fill="white" size={30} />
          </Link>
          <Link href="/next">
            <MdFastForward fill="white" size={30} />
          </Link>
          <Link href="/calendar">
            <MdEvent fill="white" size={30} />
          </Link>
          <Link href="/projects">
            <MdList fill="white" size={30} />
          </Link>
          <Link href="/waiting">
            <MdAccessTime fill="white" size={30} />
          </Link>
        </div>
      </Content>
    </Container>
  )
}

export default NavBar
