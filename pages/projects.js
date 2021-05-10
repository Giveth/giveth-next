import React, { useState } from "react";
import Seo from "../src/components/seo";
import { client } from "../src/apollo/client";
import Layout from "../src/components/layout";

import ProjectsList, {
  OrderByDirection,
  OrderByField,
} from "../src/components/ProjectsList";

import { FETCH_ALL_PROJECTS } from "../src/apollo/gql/projects";

const Project = (props) => {
  const { projects, categories, totalCount, error } = props;
  const [limit, setLimit] = useState(12);
  const [orderByField, setOrderByField] = useState(OrderByField.Balance);
  console.log({ projects });
  return (
    <Layout>
      <Seo title="Projects" />
      {!error ? (
        <ProjectsList
          projects={projects}
          categories={categories}
          totalCount={totalCount}
          maxLimit={limit}
          selectOrderByField={(orderByField) => {
            setLimit(2);
            setOrderByField(orderByField);
          }}
        />
      ) : null}
    </Layout>
  );
};

export async function getServerSideProps(props) {
  // Fetch Project
  let projects = null;
  try {
    const { loading, error, data: fetchProject } = await client.query({
      query: FETCH_ALL_PROJECTS,
      fetchPolicy: "network-only",
    });
    projects = Array.from(fetchProject?.projects).filter(
      (i) => i?.status?.id === "5"
    );
  } catch (error) {
    console.log({ error });
  }
  return {
    props: {
      projects,
      categories: projects?.categories || null,
      totalCount: projects?.length || null,
      error: projects === null,
    },
  };
}

export default Project;
