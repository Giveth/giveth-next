import React from 'react'
import axios from 'axios'
import useSWR from 'swr'
import { FiExternalLink } from 'react-icons/fi'
import { ProjectContext } from '../../contextProvider/projectProvider'
import Pagination from 'react-js-pagination'
import SearchIcon from '../../images/svg/general/search-icon.svg'
import styled from '@emotion/styled'
import theme from '../../utils/theme-ui'
import { Avatar, Badge, Input, Flex, Spinner, Text } from 'theme-ui'
import Jdenticon from 'react-jdenticon'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import { ETHERSCAN_PREFIXES, parseBalance } from '../../lib/util'
import { shortenAddress } from '../../lib/helpers'
// import DropdownInput from '../dropdownInput'
// import { GET_PROJECT_BY_ADDRESS } from '../../apollo/gql/projects'
// import { useApolloClient } from '@apollo/client'

dayjs.extend(localizedFormat)

const fetcher = url => axios.get(url).then(res => res.data)

const DonationsTable = ({ donations = [] }) => {
  const options = ['All Donations', 'Fiat', 'Crypto']
  const [currentDonations, setCurrentDonations] = React.useState([])
  const [donationsFromTrace, setDonationsFromTrace] = React.useState([])
  const [limit, setLimit] = React.useState(25)
  const [skip, setSkip] = React.useState(0)
  const [loading, setLoading] = React.useState(true)
  const [isSearching, setIsSearching] = React.useState(false)
  const { currentProjectView } = React.useContext(ProjectContext)
  // const client = useApolloClient()
  const filter = 0

  const fromTrace = currentProjectView?.project?.traceCampaignId

  const traceDonationsFetch = useSWR(
    `${process.env.NEXT_PUBLIC_FEATHERS}/donations?%24limit=${limit}&%24skip=${skip}&campaignId=${currentProjectView?.project?._id}`,
    fetcher
  )

  const traceDonations = fromTrace && traceDonationsFetch?.data

  React.useEffect(() => {
    if (!traceDonations) {
      return setLoading(true)
    } else {
      setLoading(false)
    }
    setDonationsFromTrace([...donationsFromTrace, ...traceDonations?.data])
    setCurrentDonations([...currentDonations, ...donationsFromTrace, ...traceDonations?.data])
  }, [JSON.stringify(traceDonations)])

  React.useEffect(() => {
    const setup = async () => {
      if (donations) {
        setCurrentDonations(donations)
      }
      setLoading(false)
    }

    setup()
  }, [donations])

  const [activeItem, setCurrentItem] = React.useState(1)

  const searching = search => {
    setIsSearching(true)

    const searchDonations = fromTrace ? [...donations, ...donationsFromTrace] : donations

    if (!search || search === '') {
      setIsSearching(false)
      setCurrentItem(1)
      return setCurrentDonations(searchDonations)
    }

    setCurrentItem(1)

    const some = searchDonations?.filter(donation => {
      const val =
        donation?.user?.name ||
        donation?.user?.firstName ||
        donation?.fromWalletAddress ||
        donation?.giverAddress
      return val?.toString().toLowerCase().indexOf(search.toString().toLowerCase()) === 0
    })
    setCurrentDonations(some)
  }

  const filterDonations = items => {
    switch (options[filter]) {
      case 'All Donations':
        return items
      case 'Fiat':
        return items?.filter(item => item?.currency === 'USD')
      case 'Crypto':
        return items?.filter(item => item?.currency === 'ETH')
      default:
        return items
    }
  }

  const filteredDonations = filterDonations(currentDonations)

  const TableToShow = () => {
    const paginationItems = filteredDonations

    // Data to be rendered using pagination.
    const itemsPerPage = 10

    // Logic for displaying current items
    const indexOfLastItem = activeItem * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage

    if (fromTrace && !isSearching) {
      if (indexOfLastItem >= limit) {
        setLimit(limit + 25)
        setSkip(skip + limit)
      }
    }
    const currentItems = paginationItems
      ?.sort((a, b) => new Date(b.createdAt)?.valueOf() - new Date(a.createdAt)?.valueOf())
      ?.slice(indexOfFirstItem, indexOfLastItem)

    const handlePageChange = pageNumber => {
      setCurrentItem(pageNumber)
    }

    // const filterTx = async () => {
    //   // ADAPT THIS
    //   try {
    //     const { data } = await client.query({
    //       query: GET_PROJECT_BY_ADDRESS,
    //       variables: {
    //         address: '0xDED8DAE93e585977BC09e1Fd857a97D997b71fCD'
    //       }
    //     })
    //   } catch (error) {
    //     console.log({ error })
    //   }
    // }

    // filterTx()
    return (
      <>
        <Table>
          <thead>
            <tr>
              {['Date', 'Donor', 'Currency', 'Amount', 'Transaction'].map((i, index) => {
                return (
                  <th scope='col' key={index}>
                    <Text
                      sx={{
                        variant: 'text.small',
                        fontWeight: 'bold',
                        color: 'secondary'
                      }}
                    >
                      {i}
                    </Text>
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {currentItems?.slice().map((i, key) => {
              if (!i) return null
              return (
                <tr key={key}>
                  <td data-label='Account' style={{ variant: 'text.small', color: 'secondary' }}>
                    <Text sx={{ variant: 'text.small', color: 'secondary' }}>
                      {i.createdAt ? dayjs(i.createdAt).format('ll') : 'null'}
                    </Text>
                  </td>
                  <DonorBox
                    data-label='Donor'
                    sx={{
                      variant: 'text.small',
                      color: 'secondary',
                      svg: { borderRadius: '50%' }
                    }}
                  >
                    {i.user?.avatar ? (
                      <Avatar src={i.user?.avatar} />
                    ) : (
                      <Jdenticon size='32' value={i.fromWalletAddress || i.giverAddress} />
                    )}
                    <Text
                      sx={{
                        variant: 'text.small',
                        color: 'secondary',
                        ml: 2
                      }}
                    >
                      {i.user === null || i?.anonymous
                        ? 'Anonymous'
                        : i.user?.name
                        ? i.user.name
                        : i.user?.firstName && i.user?.lastName
                        ? `${i.user.firstName} ${i.user.lastName}`
                        : i.user?.walletAddress || i.fromWalletAddress || i.giverAddress}
                    </Text>
                  </DonorBox>
                  <td data-label='Currency' style={{ variant: 'text.small', color: 'secondary' }}>
                    <Badge variant='green'>{i.currency || i.token?.symbol}</Badge>
                  </td>
                  <td data-label='Amount' style={{ variant: 'text.small', color: 'secondary' }}>
                    <Text
                      sx={{
                        variant: 'text.small',
                        // whiteSpace: 'pre-wrap',
                        color: 'secondary'
                      }}
                    >
                      {!!i.token?.symbol && i.amount
                        ? parseBalance(i.amount, 18)
                        : i.currency === 'ETH' && i.valueUsd
                        ? `${i.amount ? `${i.amount} ETH` : ''} \n ~ ${i.valueUsd?.toFixed(2)} USD`
                        : i.amount}
                    </Text>
                  </td>
                  <td
                    data-label='Transaction'
                    style={{ variant: 'text.small', color: 'secondary' }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'baseline'
                      }}
                    >
                      <Text
                        sx={{
                          variant: 'text.small',
                          color: 'secondary',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          width: '120px'
                        }}
                      >
                        {shortenAddress(i?.transactionId)}
                      </Text>
                      <FiExternalLink
                        size='18px'
                        style={{ cursor: 'pointer', marginLeft: 4 }}
                        onClick={() => {
                          const transactionLink =
                            i.transakTransactionLink ||
                            `${ETHERSCAN_PREFIXES[i.transactionNetworkId]}tx/${i?.transactionId}`
                          window.open(transactionLink)
                        }}
                      />
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
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
        {/* Removing this as we don't have fiat donations yet */}
        {/* <FilterInput sx={{ width: ['100%', null, '30%'], mt: [4, 0, 0] }}>
          <DropdownInput
            options={options}
            current={filter}
            setCurrent={i => setFilter(i)}
          />
        </FilterInput> */}
        <SearchInput sx={{ width: ['100%', null, '100%'], mb: [10, 10, 0] }}>
          <Input
            defaultValue=''
            placeholder='Search Donations'
            variant='forms.search'
            onChange={e => searching(e.target.value)}
          />
          <IconSearch />
        </SearchInput>
      </FilterBox>
      {(fromTrace && !traceDonationsFetch?.data) || loading ? (
        <Flex sx={{ justifyContent: 'center', pt: 5 }}>
          <Spinner variant='spinner.medium' />
        </Flex>
      ) : !filteredDonations || filteredDonations?.length === 0 ? (
        <Table>
          <Text sx={{ variant: 'text.large', color: 'secondary' }}>No donations yet :(</Text>
        </Table>
      ) : (
        <TableToShow />
      )}
    </>
  )
}

const Table = styled.table`
  border-collapse: collapse;
  margin: 4rem 0;
  padding: 0;
  width: 100%;

  thead {
    text-align: left;
  }

  caption {
    font-size: 1.5em;
    margin: 0.5em 0 0.75em;
  }

  tr {
    border-bottom: 1px solid #eaebee;
    padding: 0.35em;
  }
  th,
  td {
    padding: 0.625em;
  }

  th {
    padding: 1rem 0;
    font-size: 0.625rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
  td {
    padding: 1rem 0;
  }

  @media screen and (max-width: 800px) {
    border: 0;

    caption {
      font-size: 1.3em;
    }

    thead {
      border: none;
      clip: rect(0 0 0 0);
      height: 1px;
      margin: -1px;
      overflow: hidden;
      padding: 0;
      position: absolute;
      width: 1px;
    }

    tr {
      border-bottom: 5px solid #eaebee;
      display: block;
      margin: 1rem 0 4rem 0;
    }
    tr:last-child {
      margin: 1rem 0 0 0;
    }

    td {
      border-bottom: 1px solid #eaebee;
      display: block;
      font-size: 0.8em;
      text-align: right;
    }

    td::before {
      content: attr(aria-label);
      float: left;
      font-size: 0.8rem;
      font-weight: bold;
      text-transform: uppercase;
    }

    td:last-child {
      border-bottom: 0;
    }
  }
`
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

const DonorBox = styled.td`
  display: flex;
  flex-direction: row;
  align-items: center;
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

// const FilterInput = styled(Flex)`
//   align-items: center;
// `

export default DonationsTable
