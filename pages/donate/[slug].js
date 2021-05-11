import { client } from "../../src/apollo/client";
import ErrorPage from "../../src/components/errorPage";
import DonationView from "../../src/components/donate";
import Layout from "../../src/components/layout";

import { FETCH_PROJECT_BY_SLUG } from "../../src/apollo/gql/projects";

const Donate = (props) => {
  return (
    <Layout asDialog>
      {props?.error ? (
        <ErrorPage json={props.error} />
      ) : (
        <DonationView {...props} />
      )}
    </Layout>
  );
};

export async function getServerSideProps(props) {
  const { query } = props;
  let project,
    errors = null;
  try {
    // Fetch Project
    const { loading, error, data: fetchProject } = await client.query({
      query: FETCH_PROJECT_BY_SLUG,
      variables: { slug: query?.slug },
      fetchPolicy: "network-only",
    });
    project = fetchProject?.projectBySlug;
    console.log({ error });
    if (error) errors = JSON.stringify(error);
  } catch (e) {
    console.log({ e });
    errors = JSON.stringify(e);
  }

  return {
    props: {
      project: project || null,
      error: errors,
    },
  };
}

export default Donate;
