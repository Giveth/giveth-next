import React from 'react'
import axios from 'axios'
import useSWR from 'swr'
import { ProjectContext } from '../../contextProvider/projectProvider'
import Pagination from 'react-js-pagination'
import ProjectCard from '../projectCard'
import SearchIcon from '../../images/svg/general/search-icon.svg'
import styled from '@emotion/styled'
import theme from '../../utils/theme-ui'
import { Box, Input, Flex, Spinner, Text } from 'theme-ui'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(localizedFormat)

const fetcher = url => axios.get(url).then(res => res.data)

const ProjectTraces = () => {
  const [currentTraces, setCurrentTraces] = React.useState([])
  const [limit, setLimit] = React.useState(50)
  const [skip, setSkip] = React.useState(0)
  const [isSearching, setIsSearching] = React.useState(false)
  const { currentProjectView } = React.useContext(ProjectContext)

  const tracesFetch = useSWR(
    `${process.env.NEXT_PUBLIC_FEATHERS}/traces?%24limit=${limit}&%24skip=${skip}&campaignId=${currentProjectView.project._id}`,
    fetcher
  )
  const tracesData = tracesFetch?.data

  const [activeItem, setCurrentItem] = React.useState(1)

  React.useEffect(() => {
    setCurrentTraces(tracesData?.data)
  }, [tracesFetch])

  const searching = search => {
    setIsSearching(true)

    const searchData = tracesData?.data

    if (!search || search === '') {
      setIsSearching(false)
      setCurrentItem(1)
      return setCurrentTraces(searchData)
    }

    setCurrentItem(1)

    const some = searchData?.filter(trace => {
      const val = trace?.title
      return (
        val
          ?.toString()
          .toLowerCase()
          .indexOf(search.toString().toLowerCase()) === 0
      )
    })
    setCurrentTraces(some)
  }

  const TableToShow = () => {
    const paginationItems = currentTraces || tracesData?.data

    // Data to be rendered using pagination.
    const itemsPerPage = 6

    // Logic for displaying current items
    const indexOfLastItem = activeItem * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage

    if (!isSearching) {
      if (indexOfLastItem >= limit) {
        setLimit(limit + 50)
        setSkip(skip + limit)
      }
    }
    // TODO: FIX THIS
    const currentItems = paginationItems
      // ?.sort(
      //   (a, b) =>
      //     new Date(b.createdAt)?.valueOf() - new Date(a.createdAt)?.valueOf()
      // )
      ?.slice(indexOfFirstItem, indexOfLastItem)

    const handlePageChange = pageNumber => {
      setCurrentItem(pageNumber)
    }

    return (
      <>
        <Flex
          sx={{
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            marginTop: 4
          }}
        >
          {currentItems?.slice().map(project => {
            if (!project) return null
            return (
              <Box sx={{ width: '30%', px: 0.5 }} key={project.slug}>
                <ProjectCard
                  disabled
                  image={project.image || '/images/no-image-available.jpg'}
                  project={{ ...project, fromTrace: true }}
                  description={project?.description}
                  isATrace={`https://trace.giveth.io/trace/${project?.slug}`}
                />
              </Box>
            )
          })}
        </Flex>
        <PagesStyle>
          <Pagination
            hideNavigation
            hideFirstLastPages
            activePage={activeItem}
            itemsCountPerPage={itemsPerPage}
            totalItemsCount={paginationItems.length}
            pageRangeDisplayed={3}
            onChange={handlePageChange}
            innerClass='inner-pagination'
            itemClass='item-page'
            activeClass='active-page'
          />
        </PagesStyle>
      </>
    )
  }
  return (
    <>
      <FilterBox
        sx={{
          pt: 4,
          flexDirection: ['column-reverse', 'column-reverse', 'row']
        }}
      >
        <SearchInput sx={{ width: ['100%', null, '100%'], mb: [10, 10, 0] }}>
          <Input
            defaultValue=''
            placeholder='Search Traces'
            variant='forms.search'
            onChange={e => searching(e.target.value)}
          />
          <IconSearch />
        </SearchInput>
      </FilterBox>
      {!tracesData ? (
        <Flex sx={{ justifyContent: 'center', pt: 5 }}>
          <Spinner variant='spinner.medium' />
        </Flex>
      ) : tracesData?.data?.length === 0 ? (
        <Text sx={{ variant: 'text.large', color: 'secondary' }}>
          No Traces
        </Text>
      ) : (
        <TableToShow />
      )}
    </>
  )
}

const PagesStyle = styled.div`
  .inner-pagination {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    list-style-type: none;
    font-family: ${theme.fonts.body};
    margin: 0 0 3rem 0;
    a {
      text-decoration: none;
    }
  }
  .item-page {
    padding: 0.4rem 1rem;
    margin: 0 0.3rem;
    a {
      color: ${theme.colors.secondary};
    }
  }
  .active-page {
    padding: 0.4rem 1rem;
    margin: 0 0.3rem;
    text-align: center;
    background-color: ${theme.colors.secondary};
    border-radius: 4px;
    a {
      color: white;
    }
  }
`

const IconSearch = styled(SearchIcon)`
  margin-left: -2.5rem;
`

const SearchInput = styled(Flex)`
  align-items: center;
`

const FilterBox = styled(Flex)`
  width: 100%;
  justify-content: space-between;
`

export default ProjectTraces
