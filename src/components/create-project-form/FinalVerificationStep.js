import React from 'react'
import { Text, Button, Flex, Image, Grid, Box } from 'theme-ui'
import dynamic from 'next/dynamic'
import { animated } from 'react-spring'
import ProjectImageGallery1 from '../../images/svg/create/projectImageGallery1.svg'
import ProjectImageGallery2 from '../../images/svg/create/projectImageGallery2.svg'
import ProjectImageGallery3 from '../../images/svg/create/projectImageGallery3.svg'
import ProjectImageGallery4 from '../../images/svg/create/projectImageGallery4.svg'

const RichTextViewer = dynamic(() => import('../richTextViewer'), {
  ssr: false
})

const FinalVerificationStep = ({
  formData,
  setStep,
  animationStyle,
  categoryList
}) => {
  const chosenCategories = []
  for (const category in formData.projectCategory) {
    if (
      !!formData.projectCategory[category] &&
      formData.projectCategory[category]?.length !== 0
    ) {
      chosenCategories.push(
        categoryList?.filter(categoryItem => categoryItem.name === category)[0]
          ?.value
      )
    }
  }
  // IF WE WANT TO REMOVE THE IMG TAG
  // const formattedDescription = formData?.projectDescription?.replace(
  //   /<img .*?>/g,
  //   ''
  // )

  const desc = formData?.projectDescription
  const labelStyle = {
    fontSize: 0,
    textTransform: 'uppercase',
    fontFamily: 'heading',
    fontWeight: 'bold',
    color: 'bodyLight',
    mt: '18px'
  }
  return (
    <animated.section style={{ ...animationStyle, marginTop: '35px' }}>
      <>
        <Flex>
          <Text sx={labelStyle}>Project Name</Text>
          <Button
            type='button'
            sx={{
              color: 'primary',
              border: 0,
              background: 'unset',
              fontSize: 1,
              p: 0,
              pl: 2,
              mt: '16px',
              cursor: 'pointer'
            }}
            onClick={() => setStep(0)}
          >
            Edit
          </Button>
        </Flex>
        <Text
          sx={{
            fontSize: 4,
            fontFamily: 'heading',
            color: 'secondary',
            mt: '9px'
          }}
        >
          {formData.projectName}
        </Text>
      </>
      <>
        <Flex>
          <Text sx={labelStyle}>Description</Text>
          <Button
            type='button'
            sx={{
              color: 'primary',
              border: 0,
              background: 'unset',
              fontSize: 1,
              p: 0,
              pl: 2,
              mt: '16px',
              cursor: 'pointer'
            }}
            onClick={() => setStep(1)}
          >
            Edit
          </Button>
        </Flex>
        {desc && (
          <Text
            sx={{
              fontSize: 3,
              fontFamily: 'body',
              color: 'secondary',
              mt: '9px',
              width: '500px',
              wordWrap: 'break-word'
            }}
          >
            <RichTextViewer content={desc} />
          </Text>
        )}
      </>
      <>
        <Flex>
          <Text sx={labelStyle}>Category</Text>
          <Button
            type='button'
            sx={{
              color: 'primary',
              border: 0,
              background: 'unset',
              fontSize: 1,
              p: 0,
              pl: 2,
              mt: '18px',
              cursor: 'pointer'
            }}
            onClick={() => setStep(2)}
          >
            Edit
          </Button>
        </Flex>
        <Flex
          sx={{
            maxWidth: '450px',
            flexWrap: 'wrap'
          }}
        >
          {chosenCategories
            ?.filter(i => !!i && i !== false)
            ?.map(category => {
              return (
                <Text
                  sx={{
                    color: 'white',
                    display: 'inline',
                    fontSize: 1,
                    fontFamily: 'body',
                    mt: '9px',
                    marginRight: '8px',
                    backgroundColor: 'primary',
                    borderRadius: '18px',
                    paddingY: 1,
                    paddingX: 2,
                    textAlign: 'center'
                  }}
                  key={category}
                >
                  {`${category}`}
                </Text>
              )
            })}
        </Flex>
      </>
      <>
        <Flex>
          <Text sx={labelStyle}>Impact Location</Text>
          <Button
            type='button'
            sx={{
              color: 'primary',
              border: 0,
              background: 'unset',
              fontSize: 1,
              p: 0,
              pl: 2,
              mt: '18px',
              cursor: 'pointer'
            }}
            onClick={() => setStep(3)}
          >
            Edit
          </Button>
        </Flex>
        <Text
          sx={{
            fontSize: 3,
            fontFamily: 'body',
            color: 'secondary',
            mt: '9px'
          }}
        >
          {formData.projectImpactLocation}
        </Text>
      </>
      <>
        <Flex>
          <Text
            sx={{
              fontSize: 0,
              textTransform: 'uppercase',
              fontFamily: 'heading',
              fontWeight: 'bold',
              color: 'bodyLight',
              mt: '18px'
            }}
          >
            ETH Address
          </Text>
          <Button
            type='button'
            sx={{
              color: 'primary',
              border: 0,
              background: 'unset',
              fontSize: 1,
              p: 0,
              pl: 2,
              mt: '16px',
              cursor: 'pointer'
            }}
            onClick={() => setStep(5)}
          >
            Edit
          </Button>
        </Flex>
        <Text
          sx={{
            fontSize: 4,
            fontFamily: 'heading',
            color: 'secondary',
            mt: '9px'
          }}
        >
          {formData.projectWalletAddress}
        </Text>
      </>
      <>
        <Flex sx={{ flexDirection: 'column' }}>
          <Flex>
            <Text sx={labelStyle}>Image</Text>
            <Button
              type='button'
              sx={{
                color: 'primary',
                border: 0,
                background: 'unset',
                fontSize: 1,
                p: 0,
                pl: 2,
                mt: '16px',
                cursor: 'pointer'
              }}
              onClick={() => setStep(4)}
            >
              Edit
            </Button>
          </Flex>

          {formData.projectImage?.startsWith('data:') ? (
            <Image
              src={formData.projectImage}
              sx={{
                objectFit: 'cover',
                maxHeight: '200px',
                maxWidth: '600px',
                mt: '20px'
              }}
            />
          ) : (
            <Box
              sx={{
                mt: '20px',
                '*': { borderRadius: 10, p: 1 }
              }}
            >
              {formData.projectImage === '1' && (
                <ProjectImageGallery1 style={{ width: '40%', height: '40%' }} />
              )}
              {formData.projectImage === '2' && (
                <ProjectImageGallery2 style={{ width: '40%', height: '40%' }} />
              )}
              {formData.projectImage === '3' && (
                <ProjectImageGallery3 style={{ width: '40%', height: '40%' }} />
              )}
              {formData.projectImage === '4' && (
                <ProjectImageGallery4 style={{ width: '40%', height: '40%' }} />
              )}
            </Box>
          )}
        </Flex>
        <br />
        <Button
          aria-label='Next'
          sx={{
            mt: '39px',
            width: '240px',
            height: '52px',
            borderRadius: '48px',
            cursor: 'pointer',
            marginBottom: '88px'
          }}
          type='submit'
        >
          <Text
            sx={{
              fontFamily: 'body',
              fontWeight: 'bold',
              fontSize: 2,
              letterSpacing: '4%',
              textTransform: 'uppercase',
              textAlign: 'center',
              color: 'background'
            }}
          >
            Start raising funds
          </Text>
        </Button>
      </>
    </animated.section>
  )
}

export default FinalVerificationStep
