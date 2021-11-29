import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { Box, Button, Flex, Grid } from 'theme-ui'
import React from 'react'
import Link from 'next/link'
import styled from '@emotion/styled'
import theme from '../../utils/theme-ui'

const ProjectCard = dynamic(() => import('../projectCard'))

const HomeTopProjects = ({ projects }) => {
  const router = useRouter()
  return (
    <div>
      <Flex
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          mx: 50
        }}
      >
        <Box
          sx={{
            variant: 'headings.h1',
            fontWeight: '500',
            fontSize: ['8', '3.25rem', '3.25rem'],
            color: 'secondary'
          }}
        >
          Projects
        </Box>
        <Link href='/create' passHref>
          <CreateLink>Create a project</CreateLink>
        </Link>
      </Flex>

      <br />

      <Box p={0} sx={{ variant: 'grayBox' }}>
        <br />
        <Grid
          p={4}
          columns={[1, 2, 3]}
          style={{
            columnGap: '2.375em',
            justifyItems: 'center',
            marginTop: 20,
            marginBottom: 20
          }}
        >
          {projects?.map((project, index) => (
            <ProjectCard
              shadowed
              id={project.id}
              listingId={project.title + '-' + index}
              key={project.title + '-' + index}
              name={project.title}
              slug={project.slug}
              donateAddress={project.donateAddress}
              image={project.image || '/images/no-image-available.jpg'}
              raised={project.balance}
              project={project}
            />
          ))}
        </Grid>
        <div style={{ width: 'fit-content', margin: '0 auto' }}>
          <Button
            sx={{
              variant: 'buttons.nofillGray',
              color: 'bodyLight',
              fontSize: 14,
              mb: '3rem'
            }}
            onClick={() => router.push('/projects')}
          >
            Show More Projects
          </Button>
        </div>
      </Box>
    </div>
  )
}

const CreateLink = styled.a`
  cursor: pointer;
  text-align: right;
  text-decoration: none;
  font-family: 'Red Hat Display', sans-serif;
  text-transform: uppercase;
  font-weight: 700;
  color: ${theme.colors.primary};
  align-self: center;
  :hover {
    color: ${theme.colors.hover};
  }
`

export default HomeTopProjects
