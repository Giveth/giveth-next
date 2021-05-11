import { client } from "../../src/apollo/client";
import DonatorView from "../../src/components/project/donatorView";
import ErrorPage from "../../src/components/errorPage";
import Layout from "../../src/components/layout";
import Seo from "../../src/components/seo";
import {
  GET_PROJECT_UPDATES,
  FETCH_PROJECT_BY_SLUG,
  GET_PROJECT_REACTIONS,
} from "../../src/apollo/gql/projects";
import { GET_USER } from "../../src/apollo/gql/auth";
import { PROJECT_DONATIONS } from "../../src/apollo/gql/donations";

const Project = (props) => {
  return (
    <Layout>
      <Seo
        title={
          props?.project?.title
            ? `Check out ${props?.project?.title}`
            : "Check out this project!"
        }
        image={props?.project?.image}
      />
      {props?.error ? (
        <ErrorPage json={props.error} />
      ) : (
        <DonatorView {...props} />
      )}
    </Layout>
  );
};

export async function getServerSideProps(props) {
  const { query } = props;

  let errors,
    project,
    donations,
    updates,
    reactions,
    admin = null;
  try {
    // Fetch Project
    const { data: fetchProject } = await client.query({
      query: FETCH_PROJECT_BY_SLUG,
      variables: { slug: query?.slug },
      fetchPolicy: "network-only",
    });
    project = fetchProject?.projectBySlug;
    // Fetch Donations
    const { data: donationsToProject } = await client.query({
      query: PROJECT_DONATIONS,
      variables: {
        toWalletAddresses: [fetchProject?.projectBySlug?.walletAddress],
      },
      fetchPolicy: "network-only",
    });
    donations = donationsToProject?.donationsToWallets;

    // Fetch Updates
    const { data: updatesOfProject } = await client?.query({
      query: GET_PROJECT_UPDATES,
      variables: {
        projectId: parseInt(project?.id),
        take: 100,
        skip: 0,
      },
    });
    updates = updatesOfProject?.getProjectUpdates;

    // Fetch Reactions
    const { data: reactionsFetch } = await client?.query({
      query: GET_PROJECT_REACTIONS,
      variables: {
        projectId: parseInt(project?.id),
      },
    });
    reactions = reactionsFetch?.getProjectReactions;

    // Get project admin Info
    admin = /^\d+$/.test(project?.admin)
      ? await client?.query({
          query: GET_USER,
          variables: {
            userId: parseInt(project?.admin),
          },
        })
      : null;
  } catch (e) {
    console.log({ e });
    errors = e;
  }

  return {
    props: {
      project: project || null,
      donations: donations || null,
      updates: updates || null,
      reactions: reactions || null,
      admin: admin?.data?.user || {},
      error: JSON.stringify(errors) || false,
    },
  };
}

export default Project;
