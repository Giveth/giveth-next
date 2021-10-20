import React, { useState } from 'react'
import Link from 'next/link'
import ProjectCard from '../projectListing'
import ProjectEdition from './projectEdition/index'
import styled from '@emotion/styled'
import theme from '../../utils/theme-ui'
import { Flex, Grid, Text } from 'theme-ui'
import DarkClouds from '../../images/svg/general/decorators/dark-clouds.svg'

const MyProjects = props => {
  const { projects, edit } = props

  const [editProject, setEditProject] = useState(edit)

  const setProject = val => setEditProject(val)

  if (editProject) {
    return <ProjectEdition project={editProject} />
  }

  return (
    <>
      <Grid p={4} columns={[1, 2]} style={{ justifyItems: 'center' }}>
        {projects?.map((item, index) => {
          return (
            <ProjectCard
              project={item}
              withEditHover
              action={() => setProject(item)}
              name={item?.title}
              description={item?.description}
              image={item?.image}
              raised={111}
              categories={item?.categories}
              listingId={index}
              slug={item?.slug}
              key={index}
            />
          )
        })}
        <Link href='/create' passHref>
          <SpecialCard sx={{ cursor: 'pointer', textDecoration: 'none' }}>
            {' '}
            <DarkClouds style={{ position: 'absolute', top: '41px', right: '34px' }} />
            <Flex
              sx={{
                flexDirection: 'column',
                cursor: 'pointer',
                width: '60%',
                pb: 2,
                pt: 4,
                textAlign: 'center',
                alignSelf: 'center',
                textDecoration: 'none'
              }}
            >
              <Text
                sx={{
                  variant: 'text.default',
                  color: 'bodyLight'
                }}
              >
                Start raising funds
              </Text>
              <Text
                sx={{
                  variant: 'headings.h4',
                  color: 'background'
                }}
              >
                Create a Project
              </Text>
            </Flex>
            <RaisedHandImg src={'/images/decorator-raised-one-hand.png'} />
          </SpecialCard>
        </Link>
      </Grid>
    </>
  )
}

const SpecialCard = styled.a`
  display: flex;
  width: 100%;
  height: 240px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  background-color: ${theme.colors.secondary};
  border: 1px solid ${theme.colors.muted};
  box-sizing: border-box;
  border-radius: 12px;
  margin: 0.5rem 0;
`

const RaisedHandImg = styled.img`
  position: absolute;
  bottom: 0;
  left: 0;
  border-radius: 12px;

  @media (max-width: 800px) {
    display: none;
    align-items: flex-start;
  }
`

export default MyProjects
