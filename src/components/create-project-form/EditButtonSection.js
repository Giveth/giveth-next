import React from 'react'
import { Text, Button, Flex } from 'theme-ui'

const EditButtonSection = ({ formData, currentStep, setStep }) => {
  const EditBtn = ({ step, title, sx = {} }) => {
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
              color: currentStep === step ? 'primary' : 'bodyLight',
              fontWeight: currentStep === step ? 'bold' : null
            }}
          >
            {title}
          </Text>
        </Button>

        {/* <Text sx={{ ml: '10px' }}>
          {wasSet ? (
            <FaCheckCircle size='15px' color='green' />
          ) : (
            <FaExclamationCircle size='15px' color='lightGray' />
          )}
        </Text> */}
      </Flex>
    )
  }

  return (
    <Flex
      sx={{
        mt: '29px'
        // justifyContent: 'space-between',
      }}
      columns={[2, '3fr 1fr']}
    >
      <EditBtn step={0} title={'Project Name'} wasSet={formData.projectName} />
      {formData?.projectName && (
        <>
          <EditBtn
            step={1}
            title={'Description'}
            wasSet={formData.projectDescription}
            sx={{ ml: '7%' }}
          />
          <EditBtn
            step={2}
            title={'Category'}
            wasSet={formData.projectCategory}
            sx={{ ml: '7%' }}
          />
          <EditBtn
            step={3}
            title={'Impact'}
            wasSet={formData.projectImpactLocation}
            sx={{ ml: '7%' }}
          />
          <EditBtn
            step={4}
            title={'Image'}
            wasSet={formData.ProjectImageInput}
            sx={{ ml: '7%' }}
          />
          <EditBtn
            step={5}
            title={'ETH Address'}
            wasSet={formData.projectWalletAddress}
            sx={{ ml: '7%' }}
          />
        </>
      )}
    </Flex>
  )
}

export default EditButtonSection
