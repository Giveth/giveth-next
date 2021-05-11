import { Flex, Text } from "theme-ui";
import Layout from "../src/components/layout";
import Seo from "../src/components/seo";

const NotFoundPage = () => {
  return (
    <Layout>
      <Seo title="404: Not found" />
      <Flex sx={{ flexDirection: "column", px: 40 }}>
        <Text variant="headings.h4" sx={{ color: "secondary" }}>
          NOT FOUND
        </Text>
        <Text>You just hit a route that doesn&#39;t exist... the sadness.</Text>
      </Flex>
    </Layout>
  );
};

export default NotFoundPage;
