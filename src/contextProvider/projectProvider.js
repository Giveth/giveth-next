import React from 'react'
import gql from 'graphql-tag'
import { client } from '../../src/apollo/client'
import useLocalStorage from './useLocalStorage'

const projectContext = React.createContext({})

const ProjectProvider = props => {
  // Use this hook to hydrate from local store. Not tested yet
  // const [value, setValue] = useLocalStorage('name', [])

  const [currentProjectView, setCurrentProjectView] = useLocalStorage(
    'currentProjectView',
    {
      project: '',
      donations: [],
      globalCategories: null
    }
  )

  const providerValue = React.useMemo(
    () => ({
      currentProjectView,
      setCurrentProjectView
    }),
    [currentProjectView]
  )

  React.useEffect(() => {
    const setCategories = async () => {
      try {
        const { data: categories } = await client.query({
          query: gql`
            query {
              categories {
                id
                name
                value
              }
            }
          `
        })
        setCurrentProjectView({
          ...currentProjectView,
          globalCategories: categories?.categories
        })
      } catch (error) {
        console.log({ error })
      }
    }
    if (!currentProjectView.globalCategories) {
      setCategories()
    }
  }, [])

  return (
    <projectContext.Provider value={providerValue}>
      {props.children}
    </projectContext.Provider>
  )
}

export const ProjectConsumer = projectContext.Consumer
export const ProjectContext = projectContext
export default ProjectProvider

// EXAMPLE ON CONSUMER
// const { value, value2 } = React.useContext(MyContext);
// const [stateValue, setStateValue] = value;
// const [stateValue2, setStateValue2] = value2;

// based on: https://stackoverflow.com/questions/57840535/passing-multiple-value-and-setter-pairs-to-context-provider-in-react
