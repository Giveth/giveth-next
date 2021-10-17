import { Flex, Text } from 'theme-ui'
import dynamic from 'next/dynamic'
const Seo = dynamic(() => import('../src/components/seo'))
const Layout = dynamic(() => import('../src/components/layout'))

const NotFoundPage = () => {
  return (
    <Layout>
      <Seo title='404: Not found' />
      <Flex sx={{ flexDirection: 'column', px: 40, my: 200 }}>
        <Text variant='headings.h4' sx={{ color: 'secondary', mb: 30 }}>
          NOT FOUND
        </Text>
        <Text>You just hit a route that doesn&#39;t exist... the sadness.</Text>
      </Flex>
    </Layout>
  )
}

export default NotFoundPage
