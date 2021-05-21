import { Flex, Text, Link } from 'theme-ui'
import theme from '../utils/theme-ui'
import styled from '@emotion/styled'

const ProjectCategories = styled.div`
  width: 300px;
  position: absolute;
  padding-right: 10px;
  background: ${theme.colors.background};
  border: 1px solid ${theme.colors.background};
  box-sizing: border-box;
  box-shadow: 0px 5px 12px rgba(107, 117, 167, 0.3);
  border-radius: 6px;
  z-index: 205;
  display: grid;
  grid-template-rows: repeat(7, auto);
  grid-gap: 0px 2rem;
`

const Nav = styled.div`
  .shadow {
    box-shadow: 0px 1px 0px #f5f5f5;
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
      {categories ? (
        <Flex>
          <Nav sx={{ flexDirection: 'column', pr: '8%' }}>
            {categories.slice(0, split).map((category, index) => {
              return (
                <Link
                  href={`/projects?categoryChoice=${index}`}
                  sx={{ textDecoration: 'none', textDecorationLine: 'none' }}
                >
                  <NavItem
                    sx={{
                      variant: 'text.medium'
                    }}
                    className='shadow boxheight'
                  >
                    {category?.value}
                  </NavItem>
                </Link>
              )
            })}
          </Nav>
          <Nav sx={{ flexDirection: 'column', pr: '8%' }}>
            {categories
              .slice(split, categories?.length - 1)
              .map((category, index) => {
                return (
                  <Link
                    href={`/projects?categoryChoice=${split + index}`}
                    sx={{ textDecoration: 'none', textDecorationLine: 'none' }}
                  >
                    <NavItem
                      sx={{
                        variant: 'text.medium'
                      }}
                      className='shadow boxheight'
                    >
                      {category?.value}
                    </NavItem>
                  </Link>
                )
              })}
          </Nav>
        </Flex>
      ) : null}
    </ProjectCategories>
  )
}

export default ProjectNav
