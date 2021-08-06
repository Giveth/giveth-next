import React, { useState } from "react";
import Seo from "../src/components/seo";
import ErrorPage from "../src/components/errorPage";
import { client } from "../src/apollo/client";
import Layout from "../src/components/layout";

import ProjectsList, {
  OrderByDirection,
  OrderByField,
} from "../src/components/ProjectsList";

import { FETCH_ALL_PROJECTS, GET_CATEGORIES } from "../src/apollo/gql/projects";

const Project = (props) => {
  const { projects, traceProjects, categories, totalCount, errors } = props;
  const [limit, setLimit] = useState(12);
  const [orderByField, setOrderByField] = useState(OrderByField.Balance);
  return (
    <Layout>
      <Seo title="Projects" />
      {projects && !errors ? (
        <ProjectsList
          projects={[...projects, ...traceProjects]}
          // projects={[...traceProjects]}
          categories={categories}
          totalCount={totalCount}
          maxLimit={limit}
          selectOrderByField={(orderByField) => {
            setLimit(2);
            setOrderByField(orderByField);
          }}
        />
      ) : (
        <ErrorPage json={errors} />
      )}
    </Layout>
  );
};

export async function getServerSideProps(props) {
  // Fetch Project
  let projects,
    traceProjects,
    categories = null;
  let errors = null;
  try {
    const { loading, error, data: fetchProject } = await client.query({
      query: FETCH_ALL_PROJECTS,
      fetchPolicy: "network-only",
    });
    projects = Array.from(fetchProject?.projects).filter(
      (i) => i?.status?.id === "5"
    );

    const { data: categoriesData } = await client.query({
      query: GET_CATEGORIES,
      fetchPolicy: "network-only",
    });
    categories = categoriesData?.categories;

    if (!!process.env.NEXT_PUBLIC_FEATHERS) {
      // only fetch if there's a route
      // https://feathers.beta.giveth.io/campaigns?verified=true
      traceProjects = await fetch(
        `${process.env.NEXT_PUBLIC_FEATHERS}/campaigns?verified=true`
      ).then(function (response) {
        if (response.status >= 400) {
          errors = new Error("Bad response from server");
        }
        return response.json();
      });
    }

    errors = error;
  } catch (error) {
    errors = error;
  }

  return {
    props: {
      projects: projects || [],
      traceProjects:
        traceProjects?.data?.map((i) => ({ ...i, fromTrace: true })) || [],
      categories: categories || null,
      totalCount: projects?.length || null,
      errors: JSON.stringify(errors) || null,
    },
  };
}

export default Project;
