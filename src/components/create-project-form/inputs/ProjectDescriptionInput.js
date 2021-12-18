import React, { useEffect, useState } from 'react'
import { Label, Button, Text, Flex } from 'theme-ui'
import { DescriptionInstructionModal } from '../modals'

const RichTextInput = React.lazy(() => import('../../richTextInput'))

export const ProjectDescriptionInput = ({ register, currentValue, setValue, goBack }) => {
  const [showInstructions, setShowInstructions] = useState(false)

  useEffect(() => {
    register('projectDescription')
    setValue('projectDescription', currentValue)
  }, [])

  const isSSR = typeof window === 'undefined'

  return (
    <div style={{ marginTop: '30px' }}>
      <Label
        sx={{
          fontSize: 8,
          fontFamily: 'heading',
          lineHeight: '61px'
        }}
        htmlFor='projectDescription'
      >
        What is your project about?
      </Label>
      <Button
        type='button'
        aria-label='How to write a great project description'
        onClick={() => setShowInstructions(!showInstructions)}
        sx={{
          background: 'unset',
          cursor: 'pointer',
          p: 0
        }}
      >
        <Text
          sx={{
            fontSize: '2',
            fontFamily: 'heading',
            color: 'primary',
            mt: '8px',
            lineHeight: '19px'
          }}
        >
          How To Write A Great Project Description
        </Text>
      </Button>
      <Flex sx={{ width: '90%' }}>
        {!isSSR && (
          <React.Suspense fallback={<div />}>
            <RichTextInput
              style={{
                height: '250px',
                marginTop: '40px',
                fontFamily: 'body'
              }}
              defaultValue={currentValue || ''}
              rows={12}
              autoFocus
              onChange={newValue => {
                // console.log({ setValue, newValue, delta, source })
                setValue('projectDescription', newValue)
              }}
            />
          </React.Suspense>
        )}
      </Flex>
      <Flex
        sx={{
          zIndex: 100,
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          flexDirection: 'row-reverse',
          marginTop: '10px',
          marginBottom: '50px'
        }}
      >
        <Button
          aria-label='Next'
          sx={{
            mt: '100px',
            width: '180px',
            height: '52px',
            cursor: 'pointer',
            borderRadius: '48px'
          }}
          type='submit'
        >
          <Text
            sx={{
              color: 'background',
              fontFamily: 'body',
              fontWeight: 'bold',
              fontSize: 2,
              letterSpacing: '4%'
            }}
          >
            NEXT
          </Text>
        </Button>
        <Button
          aria-label='Back'
          variant='nofill'
          sx={{
            width: '180px',
            height: '52px',
            borderRadius: '48px',
            cursor: 'pointer'
          }}
          onClick={goBack}
        >
          <Text
            sx={{
              color: 'secondary',
              fontFamily: 'body',
              fontSize: 2,
              letterSpacing: '4%'
            }}
          >
            Back
          </Text>
        </Button>
      </Flex>
      {showInstructions && (
        <DescriptionInstructionModal
          showModal={showInstructions}
          setShowModal={setShowInstructions}
        />
      )}
    </div>
  )
}
