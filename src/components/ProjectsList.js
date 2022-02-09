import { Box, Grid, Flex, Input } from 'theme-ui'
import React, { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import styled from '@emotion/styled'
import Debounced from 'lodash.debounce'

import SearchIcon from '../images/svg/general/search-icon.svg'
import theme from '../utils/theme-ui'
import { client } from '../apollo/client'
import { FETCH_ALL_PROJECTS } from '../apollo/gql/projects'
import { gqlEnums } from '../utils/constants'
import Toast from './toast'
import { Pinky_500 } from './styled-components/Colors'
import { Button } from './styled-components/Button'
import Routes from '../lib/Routes'

const ProjectCard = dynamic(() => import('./projectCard'))
const DropdownInput = dynamic(() => import('../components/dropdownInput'))

const allCategoryObj = { name: 'All' }

const sortByObj = [
  { name: 'Default', value: gqlEnums.QUALITYSCORE },
  { name: 'Amount Raised', value: gqlEnums.DONATIONS },
  { name: 'Accepts GIV Token', value: gqlEnums.ACCEPTGIV },
  { name: 'Hearts', value: gqlEnums.HEARTS },
  { name: 'Newest', value: gqlEnums.CREATIONDATE },
  {
    name: 'Oldest',
    value: gqlEnums.CREATIONDATE,
    direction: gqlEnums.ASC
  },
  { name: 'Verified', value: gqlEnums.VERIFIED },
  { name: 'Traceable', value: gqlEnums.TRACEABLE }
]

const ProjectsList = props => {
  const { projects, categories, totalCount: _totalCount, query } = props

  const [search, setSearch] = useState()
  const [category, setCategory] = useState(allCategoryObj)
  const [sortBy, setSortBy] = useState(sortByObj[0])
  const [filteredProjects, setFilteredProjects] = useState(projects)
  const [isLoading, setIsLoading] = useState(false)
  const [totalCount, setTotalCount] = useState()

  const isFirstRender = useRef(true)
  const debouncedSearch = useRef()
  const pageNum = useRef(0)

  const itemsPerPage = projects.length
  const pageCount = Math.ceil((totalCount || _totalCount) / itemsPerPage)

  useEffect(() => {
    categories?.unshift(allCategoryObj)
    debouncedSearch.current = Debounced(setSearch, 1000)
    checkCategory()
  }, [])

  useEffect(() => {
    if (!isFirstRender.current) fetchProjects()
    else isFirstRender.current = false
  }, [category.name, sortBy.name, search])

  const fetchProjects = loadNum => {
    const variables = {
      orderBy:
        sortBy.value === gqlEnums.ACCEPTGIV
          ? { field: gqlEnums.QUALITYSCORE, direction: gqlEnums.DESC }
          : { field: sortBy.value, direction: gqlEnums.DESC },
      limit: itemsPerPage,
      skip: itemsPerPage * (loadNum || 0),
      filterBy:
        sortBy.value === gqlEnums.ACCEPTGIV
          ? { field: sortBy.value, value: true }
          : sortBy.value === gqlEnums.TRACEABLE
          ? { field: sortBy.value, value: true }
          : null
    }

    if (sortBy.direction) variables.orderBy.direction = sortBy.direction
    if (category.name && category.name !== 'All') variables.category = category.name
    if (search) variables.searchTerm = search

    setIsLoading(true)

    client
      .query({
        query: FETCH_ALL_PROJECTS,
        variables,
        fetchPolicy: 'no-cache'
      })
      .then(res => {
        const data = res.data?.projects?.projects
        const count = res.data?.projects?.totalCount
        if (loadNum >= 0) setFilteredProjects(filteredProjects.concat(data))
        else setFilteredProjects(data)
        setTotalCount(count)
        setIsLoading(false)
      })
      .catch(err => {
        setIsLoading(false)
        console.log({ err })
        Toast({
          content: err.message || JSON.stringify(err),
          type: 'error'
        })
      })
  }

  function checkCategory() {
    const categoryFromQuery = query?.category
    if (categoryFromQuery) {
      categories?.some(i => i.name === categoryFromQuery && setCategory(i))
    }
  }

  const loadMore = () => {
    if (isLoading) return
    fetchProjects(pageNum.current + 1)
    pageNum.current = pageNum.current + 1
  }

  return (
    <>
      <Flex
        sx={{
          p: ['0 1em', '0 5em', '0 5em'],
          justifyContent: 'space-between',
          margin: '1.5em 0'
        }}
      >
        <Flex
          sx={{
            flexDirection: 'row',
            alignItems: 'flex-end'
          }}
        >
          <Box
            sx={{
              variant: 'headings.h1',
              width: ['100%', null, null],
              fontWeight: '500',
              fontSize: ['8', '3.25rem', '3.25rem'],
              color: 'secondary'
            }}
          >
            Projects{' '}
          </Box>
        </Flex>
        <Link href={Routes.CreateProject} passHref>
          <CreateLink>Create a project</CreateLink>
        </Link>
      </Flex>

      <Box p={0} sx={{ variant: 'grayBox' }}>
        <div
          style={{
            alignItems: 'center',
            margin: '0 auto',
            maxWidth: '1440px',
            paddingTop: 40
          }}
        >
          <Flex sx={{ flexDirection: ['column', null, 'row'] }}>
            <Flex
              sx={{
                flex: [1, null, 0.6],
                flexDirection: ['column', null, 'row'],
                justifyContent: ['space-around', null, null]
              }}
            >
              <Flex
                sx={{
                  flex: 0.4,
                  alignItems: 'center',
                  mt: [4, 0, 0],
                  mx: 10
                }}
              >
                <DropdownInput
                  upperLabel='CATEGORY'
                  options={categories}
                  current={category}
                  setCurrent={e => {
                    pageNum.current = 0
                    setCategory(e)
                  }}
                />
              </Flex>

              <Flex
                sx={{
                  flex: 0.4,
                  alignItems: 'center',
                  mt: [4, 0, 0],
                  mx: 10
                }}
              >
                <DropdownInput
                  upperLabel='SORT BY'
                  options={sortByObj}
                  current={sortBy}
                  setCurrent={e => {
                    pageNum.current = 0
                    setSortBy(e)
                  }}
                />
              </Flex>
            </Flex>

            <Flex
              sx={{
                alignItems: 'center',
                flex: [1, 0.4, 0.4],
                width: '100%',
                padding: '0 3% 0 0',
                mt: [4, 0, 0],
                alignSelf: 'flex-end'
              }}
            >
              <Input
                placeholder='Search Projects'
                variant='forms.search'
                style={{
                  width: '100%',
                  margin: '20px 0 0 0'
                }}
                onChange={e => {
                  pageNum.current = 0
                  debouncedSearch.current(e.target.value)
                }}
              />
              <IconSearch />
            </Flex>
          </Flex>

          {isLoading && <Loader className='dot-flashing' />}

          <Flex
            sx={{
              width: '100%',
              flexDirection: ['column-reverse', 'row', 'row']
            }}
          >
            <div
              style={{
                width: '100%',
                margin: '0 0 50px 0'
              }}
            >
              <Grid
                p={4}
                columns={[1, 2, 3]}
                style={{
                  columnGap: '2.375em',
                  justifyItems: 'center',
                  marginTop: 20,
                  marginBottom: 60
                }}
              >
                {filteredProjects.map((project, index) => (
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

              {pageCount > 1 && pageCount > pageNum?.current && filteredProjects?.length > 0 ? (
                <>
                  <StyledButton onClick={loadMore} outline>
                    {isLoading ? <div className='dot-flashing' /> : 'LOAD MORE'}
                  </StyledButton>
                  <Link href={Routes.CreateProject}>
                    <a>
                      <StyledButton ghost>Create a Project</StyledButton>
                    </a>
                  </Link>
                </>
              ) : (
                <Box
                  sx={{
                    width: ['100%', null, null],
                    fontWeight: '500',
                    color: 'attention',
                    mx: [4, 5, 5],
                    mt: -5
                  }}
                >
                  {pageCount <= pageNum?.current ? (
                    <StyledButton onClick={() => window?.scrollTo(0, 0)} ghost>
                      {' '}
                      Back to the top{' '}
                    </StyledButton>
                  ) : (
                    filteredProjects?.length === 0 && (
                      <StyledButton ghost style={{ cursor: 'initial' }}>
                        Cannot find any projects that match your search
                      </StyledButton>
                    )
                  )}
                </Box>
              )}
            </div>
          </Flex>
        </div>
      </Box>
    </>
  )
}

const Loader = styled.div`
  margin: 30px auto 0 auto;
`

const StyledButton = styled(Button)`
  color: ${Pinky_500};
  margin: 16px auto;
`

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

const IconSearch = styled(SearchIcon)`
  margin-left: -2.5rem;
  margin-top: 1rem;
`

export default ProjectsList
