import { Flex, Text, Link } from 'theme-ui'
import theme from '../utils/theme-ui'
import styled from '@emotion/styled'

const ProjectCategories = styled.div`
  width: 200px;
  position: absolute;
  padding: 5px 0;
  background: ${theme.colors.background};
  border: 1px solid ${theme.colors.background};
  box-sizing: border-box;
  box-shadow: 0px 5px 12px rgba(107, 117, 167, 0.3);
  border-radius: 6px;
  z-index: 205;
  display: grid;
  grid-template-rows: repeat(7, auto);
  grid-gap: 0px 1rem;
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

const ProjectNav = ({ categories }) => {
  console.log('lololala2', categories)
  return (
    <ProjectCategories>
      {categories ? (
        <Flex sx={{ flexDirection: 'column', maxWidth: '80%' }}>
          {categories.map((category, index) => {
            return (
              //   <a
              //     key={index}
              //     style={{ textDecoration: 'none', cursor: 'pointer' }}
              //     onClick={() => {}}
              //   >
              //     <Text
              //       sx={{
              //         mb: '8px',
              //         color:
              //           query?.view === i.route ||
              //           (!query?.view && i.route === 'account')
              //             ? 'primary'
              //             : 'secondary'
              //       }}
              //     >
              //       {formatTitle(i.name, projectsList, userDonations)}
              //     </Text>
              //   </a>
              <Text>{category?.value}</Text>
            )
          })}
        </Flex>
      ) : null}
    </ProjectCategories>
  )
}

export default ProjectNav
