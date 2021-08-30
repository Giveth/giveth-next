import React from 'react'
import { Text, Button, Flex } from 'theme-ui'
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa'

const EditButtonSection = ({ formData, setStep }) => {
  const EditBtn = ({ step, title, wasSet, sx = {} }) => {
    return (
      <Flex sx={sx}>
        <Button
          type='button'
          aria-label={`edit project ${title}`}
          sx={{
            color: 'primary',
            border: 0,
            background: 'unset',
            fontSize: 1,
            p: 0,
            cursor: 'pointer'
          }}
          onClick={() => setStep(step)}
        >
          <Text
            sx={{
              fontSize: 0,
              textTransform: 'uppercase',
              fontFamily: 'heading',
              color: 'bodyLight'
            }}
          >
            {title}
          </Text>
        </Button>

        <Text sx={{ ml: '10px' }}>
          {wasSet ? (
            <FaCheckCircle size='15px' color='green' />
          ) : (
            <FaExclamationCircle size='15px' color='lightGray' />
          )}
        </Text>
      </Flex>
    )
  }

  return (
    <Flex
      sx={{
        mt: '29px',
        // justifyContent: 'space-between',
        width: '65%'
      }}
      columns={[2, '3fr 1fr']}
    >
      <EditBtn step={0} title={'Project Name'} wasSet={formData.projectName} />
      {formData?.projectName && (
        <>
          <EditBtn
            step={1}
            title={'Admin'}
            wasSet={formData.projectAdmin}
            sx={{ ml: '7%' }}
          />
          <EditBtn
            step={2}
            title={'Description'}
            wasSet={formData.projectDescription}
            sx={{ ml: '7%' }}
          />
          <EditBtn
            step={3}
            title={'Category'}
            wasSet={formData.projectCategory}
            sx={{ ml: '7%' }}
          />
          <EditBtn
            step={4}
            title={'Impact'}
            wasSet={formData.projectImpactLocation}
            sx={{ ml: '7%' }}
          />
          <EditBtn
            step={6}
            title={'Eth Address'}
            wasSet={formData.projectWalletAddress}
            sx={{ ml: '7%' }}
          />
        </>
      )}
    </Flex>
  )
}

export default EditButtonSection
