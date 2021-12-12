import { useMemo } from 'react'
import { ApolloClient, InMemoryCache, createHttpLink, gql } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import merge from 'deepmerge'
import isEqual from 'lodash.isequal'

import { getUser } from '../services/auth'
import { isSSR } from '../lib/helpers'

let apolloClient

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_APOLLO_SERVER
})

function createApolloClient() {
  let token
  const ssrMode = isSSR()

  const authLink = setContext((_, { headers }) => {
    const localUser = getUser()
    token = localUser.token
    const mutation = {
      Authorization: token ? `Bearer ${token}` : '',
      'wallet-address': localUser.walletAddress || ''
    }

    return {
      headers: {
        ...headers,
        ...mutation
      }
    }
  })

  return new ApolloClient({
    ssrMode,
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network'
      },
      query: {
        fetchPolicy: 'network-only',
        nextFetchPolicy: 'network-only'
      }
    },
    typeDefs: gql`
      enum OrderField {
        CreationDate
        Balance
        QualityScore
        Verified
        Hearts
        Donations
        RecentlyAdded
        OldProjects
      }

      enum OrderDirection {
        ASC
        DESC
      }

      type OrderBy {
        field: OrderField!
        direction: OrderDirection!
      }
    `,
    fetch
  })
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient()

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter(d => sourceArray.every(s => !isEqual(d, s)))
      ]
    })

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data)
  }
  // For SSG and SSR always create a new Apollo Client
  if (isSSR()) return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function addApolloState(client, pageProps) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract()
  }

  return pageProps
}

export function useApollo(pageProps) {
  const state = pageProps[APOLLO_STATE_PROP_NAME]
  return useMemo(() => initializeApollo(state), [state])
}

export const client = initializeApollo()
