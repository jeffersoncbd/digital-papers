import Link from 'next/link'

import Inbox from '../../assets/inbox.svg'
import Next from '../../assets/next.svg'
import Calendar from '../../assets/calendar.svg'
import Projects from '../../assets/projects.svg'
import Waiting from '../../assets/waiting.svg'
import Someday from '../../assets/someday.svg'
import References from '../../assets/references.svg'

import { Container, Content } from './styles'

const NavBar: React.FunctionComponent = () => {
  return (
    <Container>
      <Content>
        <h1>Digital Papers</h1>
        <div>
          <Link href="/inbox" passHref>
            <a>
              <Inbox height={40} width={40} />
            </a>
          </Link>
          <Link href="/next" passHref>
            <a>
              <Next height={40} width={40} />
            </a>
          </Link>
          <Link href="/calendar" passHref>
            <a>
              <Calendar height={40} width={40} />
            </a>
          </Link>
          <Link href="/projects" passHref>
            <a>
              <Projects height={40} width={40} />
            </a>
          </Link>
          <Link href="/waiting" passHref>
            <a>
              <Waiting height={40} width={40} />
            </a>
          </Link>
          <Link href="/someday" passHref>
            <a>
              <Someday height={40} width={40} />
            </a>
          </Link>
          <Link href="/references" passHref>
            <a>
              <References height={40} width={40} />
            </a>
          </Link>
        </div>
      </Content>
    </Container>
  )
}

export default NavBar
