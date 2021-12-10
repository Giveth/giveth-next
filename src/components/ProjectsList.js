import { Box, Grid, Flex, Spinner, Input } from 'theme-ui'
import React, { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import styled from '@emotion/styled'
import Debounced from 'lodash.debounce'
import Pagination from 'react-paginate'

import SearchIcon from '../images/svg/general/search-icon.svg'
import theme from '../utils/theme-ui'
import { client } from '../apollo/client'
import { FETCH_ALL_PROJECTS } from '../apollo/gql/projects'
import { gqlEnums } from '../utils/constants'
import Toast from './toast'

const ProjectCard = dynamic(() => import('./projectCard'))
const DropdownInput = dynamic(() => import('../components/dropdownInput'))

const allCategoryObj = { name: 'All' }

const sortByObj = [
  { name: 'Default', value: gqlEnums.QUALITYSCORE },
  { name: 'Amount Raised', value: gqlEnums.DONATIONS },
  { name: 'Hearts', value: gqlEnums.HEARTS },
  { name: 'Date Created - Descending', value: gqlEnums.CREATIONDATE },
  {
    name: 'Date Created - Ascending',
    value: gqlEnums.CREATIONDATE,
    direction: gqlEnums.ASC
  },
  { name: 'Verified', value: gqlEnums.VERIFIED },
  { name: 'Traceable', value: gqlEnums.TRACEABLE }
]

const ProjectsList = props => {
  const { projects, categories, totalCount: _totalCount, itemsPerPage, query } = props

  const [search, setSearch] = useState()
  const [category, setCategory] = useState(allCategoryObj)
  const [sortBy, setSortBy] = useState(sortByObj[0])
  const [filteredProjects, setFilteredProjects] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [totalCount, setTotalCount] = useState()

  const isFirstRender = useRef(true)
  const debouncedSearch = useRef()

  const pageCount = Math.ceil((totalCount || _totalCount) / itemsPerPage)

  useEffect(() => {
    categories?.unshift(allCategoryObj)
    debouncedSearch.current = Debounced(setSearch, 1000)
    checkCategory()
  }, [])

  useEffect(() => {
    if (!isFirstRender.current) {
      fetchProjects({
        categoryQuery: category.name,
        sortByQuery: sortBy,
        searchQuery: search,
        skip: itemsPerPage * currentPage
      })
    } else isFirstRender.current = false
  }, [category.name, sortBy.name, search, currentPage])

  const fetchProjects = queries => {
    const { searchQuery, categoryQuery, sortByQuery, skip } = queries
    const variables = {
      orderBy: { field: sortByQuery.value, direction: gqlEnums.DESC },
      limit: itemsPerPage,
      skip
    }

    if (sortByQuery.direction) variables.orderBy.direction = sortByQuery.direction
    if (categoryQuery && categoryQuery !== 'All') variables.category = categoryQuery
    if (searchQuery) variables.searchTerm = searchQuery

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
        if (data) setFilteredProjects(data)
        if (count) setTotalCount(count)
        setIsLoading(false)
      })
      .catch(err => {
        setIsLoading(false)
        Toast({
          content: err.message || JSON.stringify(err),
          type: 'error'
        })
      })
  }

  function checkCategory() {
    const categoryFromQuery = query?.category
    if (categoryFromQuery) {
      categories.some(i => i.name === categoryFromQuery && setCategory(i))
    }
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
        <Link href='/create' passHref>
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
                    setCurrentPage(0)
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
                    setCurrentPage(0)
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
                  setCurrentPage(0)
                  debouncedSearch.current(e.target.value)
                }}
              />
              <IconSearch />
            </Flex>
          </Flex>

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
              {isLoading ? (
                <Flex sx={{ justifyContent: 'center', py: 5 }}>
                  <Spinner variant='spinner.medium' />
                </Flex>
              ) : (
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
                  {(filteredProjects || projects.slice(0, itemsPerPage)).map((project, index) => (
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
              )}

              {pageCount > 1 && (
                <PaginationCard
                  breakLabel='...'
                  nextLabel='>'
                  onPageChange={e => setCurrentPage(e.selected)}
                  pageRangeDisplayed={5}
                  pageCount={pageCount}
                  previousLabel='<'
                  forcePage={currentPage}
                  renderOnZeroPageCount={null}
                />
              )}
            </div>
          </Flex>
        </div>
      </Box>
    </>
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

const IconSearch = styled(SearchIcon)`
  margin-left: -2.5rem;
  margin-top: 1rem;
`

const PaginationCard = styled(Pagination)`
  justify-content: center;
  list-style: none;
  display: flex;
  padding-left: 0;
  border-radius: 0.25rem;

  li a {
    position: relative;
    cursor: pointer;
    display: block;
    padding: 0.5rem 0.75rem;
    margin-left: 0;
    line-height: 1.25;
    color: #007bff;
    background-color: #fff;
    border: 1px solid #dee2e6;
  }

  li.selected > a {
    color: black;
    cursor: default;
  }

  li.disabled > a {
    cursor: not-allowed;
  }
`

export default ProjectsList
