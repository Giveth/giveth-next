import Layout from '../src/components/layout'
import { Flex, Text } from 'theme-ui'

function Error (props) {
  const { statusCode, err } = props
  console.log({ props })
  return (
    <Layout>
      <Flex
        sx={{
          flexDirection: 'column',
          mx: '5%',
          backgroundColor: 'background',
          p: 4
        }}
      >
        <Text variant='headings.h4' sx={{ mb: 4, color: 'secondary' }}>
          There was an error {statusCode ? ` - code: ${statusCode}` : ''}
        </Text>
        <Text variant='text.default' sx={{ mb: 4, color: 'secondary' }}>
          {err?.message}
        </Text>
      </Flex>
    </Layout>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode, err }
}

export default Error
