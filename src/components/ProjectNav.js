import { Flex, Text, Link } from 'theme-ui'
import theme from '../utils/theme-ui'
import styled from '@emotion/styled'

const ProjectCategories = styled.div`
  width: auto;
  position: absolute;
  padding-right: 10px;
  background: ${theme.colors.background};
  border: 1px solid ${theme.colors.background};
  box-sizing: border-box;
  box-shadow: 0px 5px 12px rgba(107, 117, 167, 0.3);
  border-radius: 6px;
  z-index: 300;
  display: flex;
  flex-direction: row;
`

const Nav = styled.div`
  width: 160px;
  .shadow {
    max-width: 140px;
    box-shadow: 0px 1px 0px #f5f5f5;
  }
  .shadow.first:last-child {
    box-shadow: none;
  }
  .boxheight {
    display: flex;
    align-self: center;
    padding-top: 11px;
    padding-bottom: 11px;
  }
  & :hover .balance {
    opacity: 1;
  }
`

const NavItem = styled(Text)`
  width: 120px;
  align-self: center;
  padding-left: 16px;
  cursor: pointer;
  align-content: center;
  color: ${theme.colors.secondary};
  :hover {
    color: ${theme.colors.primary};
  }
`

const ProjectNav = ({ categories }) => {
  const split = Math.floor(categories?.length / 2)
  return (
    <ProjectCategories>
      <Nav sx={{ flexDirection: 'column', pr: '8%' }}>
        {categories.slice(0, split + 1).map((category, index) => {
          return (
            <Link
              href={`/projects?categoryChoice=${index}`}
              sx={{ textDecoration: 'none', textDecorationLine: 'none' }}
              className='shadow boxheight first'
            >
              <NavItem
                sx={{
                  variant: 'text.medium'
                }}
              >
                {category?.value}
              </NavItem>
            </Link>
          )
        })}
      </Nav>
      <Nav sx={{ flexDirection: 'column', pr: '8%' }}>
        {categories
          .slice(split + 1, categories?.length)
          .map((category, index) => {
            return (
              <Link
                href={`/projects?categoryChoice=${split + index}`}
                sx={{ textDecoration: 'none', textDecorationLine: 'none' }}
                className='shadow boxheight'
              >
                <NavItem
                  sx={{
                    variant: 'text.medium'
                  }}
                >
                  {category?.value}
                </NavItem>
              </Link>
            )
          })}
      </Nav>
    </ProjectCategories>
  )
}

export default ProjectNav
