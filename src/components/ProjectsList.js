import {
  Box,
  Button,
  Grid,
  Flex,
  Spinner,
  jsx,
  Text,
  Input,
  Select
} from 'theme-ui'
import React, { useState } from 'react'
import ProjectCard from './projectCard'
import SearchIcon from '../images/svg/general/search-icon.svg'
import styled from '@emotion/styled'
import Link from 'next/link'
import DropdownInput from '../components/dropdownInput'
import theme from '../utils/theme-ui'
import InfiniteScroll from 'react-infinite-scroll-component'
import * as JsSearch from 'js-search'
import DropIcon from '../images/svg/general/dropdown-arrow.svg'

const ProjectSection = styled(Box)``

export const OrderByField = {
  Balance: 'Balance',
  CreationDate: 'CreationDate'
}

export const OrderByDirection = {
  ASC: 'ASC',
  DESC: 'DESC'
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
`
const DropItem = styled.div`
  padding: 1rem 0 1rem 1rem;
  :hover {
    background-color: ${theme.colors.lightestBlue};
  }
`
const IconDrop = styled(DropIcon)`
  position: absolute;
  right: 1rem;
  top: 0.563rem;
`
const SelectMenu = props => {
  const { caption, options = {}, onChange = () => {}, defaultValue } = props
  return (
    <div
      style={{
        flexGrow: 1,
        margin: '10px'
      }}
    >
      <Text
        pl={3}
        sx={{
          variant: 'text.default',
          color: 'secondary',
          fontSize: 3,
          fontWeight: 'medium',
          textDecoration: 'none',
          textTransform: 'uppercase'
        }}
      >
        {caption}
      </Text>
      <IconDrop />
      <Text
        sx={{
          variant: 'text.medium',
          fontWeight: 'bold',
          color: 'secondary'
        }}
      ></Text>
      <Select
        pl={3}
        sx={{
          variant: 'text.default',
          color: 'secondary',
          fontSize: 3,
          fontWeight: 'medium',
          textDecoration: 'none',
          width: '100%'
        }}
        defaultValue={defaultValue}
        onChange={e => onChange(e.target.value)}
        mb={3}
        name='sortBy'
        id='sortBy'
      >
        {Object.entries(options).map(([key, value]) => (
          <option
            sx={{
              variant: 'text.medium',
              fontWeight: 'bold',
              color: 'secondary'
            }}
          >
            {value}
          </option>
        ))}
      </Select>
    </div>
  )
}

const orderBySelectOptions = {}
orderBySelectOptions[OrderByField.Balance] = 'Amount Raised'
orderBySelectOptions[OrderByField.CreationDate] = 'Recent'

const ProjectsList = props => {
  const {
    projects,
    categories,
    totalCount,
    maxLimit,
    fromHomePage,
    selectOrderByField
  } = props

  const [search, setSearch] = useState()
  const [limit, setLimit] = useState(maxLimit)
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState()
  const [searchResults, setSearchResults] = useState(projects)
  const [category, setCategory] = useState(0)
  const [sortBy, setSortBy] = useState(0)
  const categoryList = Array.isArray(categories)
    ? ['All'].concat(categories.map(o => o.name))
    : ['All']
  const sortBys = [
    'Default',
    'Verified',
    'Traceable',
    'Amount Raised',
    'Hearts',
    'Recently Added',
    'Old Projects'
  ]

  React.useEffect(() => {
    rebuildIndex()
    checkCategory()
  }, [])

  function checkCategory () {
    const categoryFromQuery = props?.query?.category
    if (categoryFromQuery) {
      categoryList?.map((i, index) => {
        if (i === categoryFromQuery) {
          setCategory(index)
        }
      })
    }
  }

  function searchProjects (e) {
    const queryResult = search.search(e.target.value)
    setSearchQuery(e.target.value)
    setSearchResults(queryResult)
  }
  // handleSubmit = e => {
  //   e.preventDefault()
  // }
  function rebuildIndex () {
    const dataToSearch = new JsSearch.Search('id')
    /**
     *  defines a indexing strategy for the data
     * more about it in here https://github.com/bvaughn/js-search#configuring-the-index-strategy
     */
    dataToSearch.indexStrategy = new JsSearch.PrefixIndexStrategy()
    /**
     * defines the sanitizer for the search
     * to prevent some of the words from being excluded
     *
     */
    dataToSearch.sanitizer = new JsSearch.LowerCaseSanitizer()
    /**
     * defines the search index
     * read more in here https://github.com/bvaughn/js-search#configuring-the-search-index
     */
    //dataToSearch.searchIndex = new JsSearch.TfIdfSearchIndex('title')
    dataToSearch.addIndex('title') // sets the index attribute for the data
    dataToSearch.addIndex('description') // sets the index attribute for the data
    dataToSearch.addIndex('impactLocation') // sets the index attribute for the data
    dataToSearch.addDocuments(projects) // adds the data to be searched
    setSearch(dataToSearch)
    setIsLoading(false)
  }

  function filterCategory (searchedResults) {
    const categoryName = categoryList[category].toLowerCase()

    return searchedResults.filter(
      o => o?.categories?.filter(c => c.name === categoryName).length > 0
    )
  }

  const searchedResults = searchQuery === '' ? projects : searchResults
  const projectsFiltered =
    category === 0 ? searchedResults : filterCategory(searchedResults)

  function sum (items, prop) {
    return items.reduce(function (a, b) {
      return a + b[prop]
    }, 0)
  }
  //['Quality score', 'Amount raised', 'Hearts', 'New Projects', 'Old Projects']
  const sortFunctions = [
    function qualityScore (a, b) {
      return b.verified - a.verified || b.qualityScore - a.qualityScore
    },
    a => a,
    a => a,
    function amountRaised (a, b) {
      console.log({ b, a })
      return b.totalDonations - a.totalDonations
    },
    function hearts (a, b) {
      return b.reactions?.length - a.reactions?.length
    },
    function recentlyAdded (a, b) {
      return (
        new Date(b?.creationDate)?.valueOf() -
        new Date(a?.creationDate)?.valueOf()
      )
    },
    function earlyAdded (a, b) {
      return (
        new Date(a?.creationDate)?.valueOf() -
        new Date(b?.creationDate)?.valueOf()
      )
    }
  ]
  const filterFunctions = [
    a => a,
    function verified (a) {
      return !!a?.verified
    },
    function traceable (a) {
      // !!a?.fromTrace && console.log({ a })
      return !!a?.fromTrace || a?.IOTraceable
    },
    a => a,
    a => a,
    a => a,
    a => a
  ]

  const projectsFilteredSorted = projectsFiltered
    ?.slice()
    ?.sort(sortFunctions[sortBy])
    ?.filter(filterFunctions[sortBy])
    ?.slice(0, limit)

  const loadMore = () => {
    setLimit(limit + 10)
  }

  const hasMore = projectsFilteredSorted?.length >= limit

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
          {totalCount && (
            <Text
              sx={{
                variant: 'headings.h4',
                color: 'bodyLight'
              }}
            >{`(${totalCount})`}</Text>
          )}
        </Flex>
        <Link href='/create'>
          <CreateLink>Create a project</CreateLink>
        </Link>
      </Flex>
      <ProjectSection p={0} sx={{ variant: 'grayBox' }}>
        <div
          style={{
            alignItems: 'center',
            margin: '0 auto',
            maxWidth: '1440px',
            paddingTop: 40
          }}
        >
          {!fromHomePage ? (
            <Flex sx={{ flexDirection: ['column', null, 'row'] }}>
              <Flex
                sx={{
                  // width: '100%',
                  flex: [1, null, 0.6],
                  flexDirection: ['column', null, 'row'],
                  justifyContent: ['space-around', null, null]
                }}
              >
                <Flex
                  sx={{
                    // width: ['30%'],
                    flex: 0.4,
                    alignItems: 'center',
                    mt: [4, 0, 0]
                  }}
                >
                  <DropdownInput
                    upperLabel='CATEGORY'
                    options={categoryList}
                    current={category}
                    setCurrent={i => setCategory(i)}
                  />
                </Flex>
                {/* <Flex
            sx={{
              width: ['30%'],
              alignItems: 'center',
              mt: [4, 0, 0]
            }}
          >
            <DropdownInput
              options={locations}
              current={0}
              // setCurrent={i => setFilter(i)}
            />
          </Flex> */}
                <Flex
                  sx={{
                    // width: ['30%'],
                    flex: 0.4,
                    alignItems: 'center',
                    mt: [4, 0, 0]
                  }}
                >
                  <DropdownInput
                    upperLabel='SORT BY'
                    options={sortBys}
                    current={sortBy}
                    setCurrent={i => setSortBy(i)}
                  />
                </Flex>
                {/* <SelectMenu
            caption='sort by'
            options={orderBySelectOptions}
            onChange={selectOrderByField}
          /> */}
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
                  onChange={searchProjects}
                />
                <IconSearch />
              </Flex>
            </Flex>
          ) : null}
          <Flex
            sx={{
              width: '100%',
              flexDirection: ['column-reverse', 'row', 'row']
            }}
          >
            <div
              style={{
                width: '100%',
                margin: 0
              }}
            >
              <InfiniteScroll
                dataLength={projectsFilteredSorted?.length || 0} //This is important field to render the next data
                next={loadMore}
                hasMore={hasMore}
                loader={
                  !fromHomePage && (
                    <Flex sx={{ justifyContent: 'center', py: 2, mb: 2 }}>
                      <Spinner variant='spinner.medium' />
                    </Flex>
                  )
                }
                endMessage={
                  <Flex sx={{ flexDirection: 'column', alignItems: 'center' }}>
                    {!fromHomePage ? (
                      projectsFilteredSorted?.length <= limit ? (
                        <>
                          <Text
                            variant='headings.h5'
                            color='secondary'
                            sx={{ textAlign: 'center' }}
                          >
                            Woah you reached the end!
                          </Text>
                          <Button
                            type='button'
                            onClick={() => window?.scrollTo(0, 0)}
                            sx={{
                              variant: 'buttons.default',
                              backgroundColor: 'secondary',
                              my: 4
                            }}
                          >
                            Go to the top!
                          </Button>
                        </>
                      ) : (
                        <Text
                          variant='headings.h5'
                          color='secondary'
                          sx={{ textAlign: 'center', mb: 4 }}
                        >
                          Nothing here
                        </Text>
                      )
                    ) : null}
                  </Flex>
                }
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
                  {projectsFilteredSorted
                    ? projectsFilteredSorted
                        ?.slice(0, limit)
                        .map((project, index) => (
                          <ProjectCard
                            shadowed
                            id={project.id}
                            listingId={project.title + '-' + index}
                            key={project.title + '-' + index}
                            name={project.title}
                            slug={project.slug}
                            donateAddress={project.donateAddress}
                            image={
                              project.image || '/images/no-image-available.jpg'
                            }
                            raised={project.balance}
                            project={project}
                          />
                        ))
                    : null}
                </Grid>
              </InfiniteScroll>
              {fromHomePage && (
                <Flex
                  style={{
                    justifyContent: 'center',
                    marginTop: 20,
                    background: 'transparent'
                  }}
                >
                  <Link href='/projects'>
                    <Button
                      sx={{
                        variant: 'buttons.nofillGray',
                        color: 'bodyLight',
                        fontSize: 14,
                        mb: '3rem'
                      }}
                    >
                      Show more Projects
                    </Button>
                  </Link>
                </Flex>
              )}
            </div>
          </Flex>
        </div>
      </ProjectSection>
    </>
  )
}

export default ProjectsList
