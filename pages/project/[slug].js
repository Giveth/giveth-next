import { client } from "../../src/apollo/client"
import DonatorView from "../../src/components/project/donatorView"
import NotFoundPage from "../404"
import Layout from "../../src/components/layout"
import Seo from "../../src/components/seo"
import {
  GET_PROJECT_UPDATES,
  FETCH_PROJECT_BY_SLUG,
  GET_PROJECT_REACTIONS,
} from "../../src/apollo/gql/projects"
import { GET_USER } from "../../src/apollo/gql/auth"
import { PROJECT_DONATIONS } from "../../src/apollo/gql/donations"

const Project = (props) => {
  return props.error ? (
    <NotFoundPage />
  ) : (
    <Layout>
      <Seo
        title={
          props.project?.title
            ? `Check out ${props.project?.title}`
            : "Check out this project!"
        }
        image={props.project?.image}
      />
      <DonatorView {...props} />
    </Layout>
  )
}

export async function getServerSideProps(props) {
  const { query } = props
  const slug = decodeURI(query?.slug).replace(/\s/g, "")

  let errors,
    project,
    donations,
    updates,
    reactions,
    admin = null
  try {
    // Fetch Project
    const { data: fetchProject } = await client.query({
      query: FETCH_PROJECT_BY_SLUG,
      variables: { slug: slug },
      fetchPolicy: "no-cache",
    })
    project = fetchProject?.projectBySlug
    // Fetch Donations
    const { data: donationsToProject } = await client.query({
      query: PROJECT_DONATIONS,
      variables: {
        toWalletAddresses: [fetchProject?.projectBySlug?.walletAddress],
      },
      fetchPolicy: "no-cache",
    })
    donations = donationsToProject?.donationsToWallets

    // Fetch Updates
    const { data: updatesOfProject } = await client?.query({
      query: GET_PROJECT_UPDATES,
      variables: {
        projectId: parseInt(project?.id),
        take: 100,
        skip: 0,
      },
      fetchPolicy: "no-cache",
    })
    updates = updatesOfProject?.getProjectUpdates

    // Fetch Reactions
    const { data: reactionsFetch } = await client?.query({
      query: GET_PROJECT_REACTIONS,
      variables: {
        projectId: parseInt(project?.id),
      },
      fetchPolicy: "no-cache",
    })
    reactions = reactionsFetch?.getProjectReactions

    // Get project admin Info
    admin = /^\d+$/.test(project?.admin)
      ? await client?.query({
          query: GET_USER,
          variables: {
            userId: parseInt(project?.admin),
          },
        })
      : null
  } catch (e) {
    console.log({ e })
    errors = e
  }

  // Try to fetch from TRACE
  const traceProject = await fetch(
    `${process.env.NEXT_PUBLIC_FEATHERS}/campaigns?slug=${slug}`
  ).then(async function (response) {
    if (response.status >= 400) {
      errors = new Error("Bad response from server")
    }
    const res = await response.json()
    const traceProj = res?.data[0]
    if (!traceProj) return null
    if (project) {
      // It was initially IO project
      return { ...traceProj, ...project, IOTraceable: true }
    } else {
      // Only Traceable
      return { ...traceProj, status: { id: "5" }, fromTrace: true }
    }
  })

  if (traceProject) {
    errors = null
  }

  return {
    props: {
      project: traceProject || project || null,
      donations: donations || null,
      updates: updates || null,
      reactions: reactions || null,
      admin: admin?.data?.user || {},
      error: errors ? JSON.stringify(errors) : false,
    },
  }
}

export default Project
