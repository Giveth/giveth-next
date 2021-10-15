import React, { useState, useEffect } from 'react'
import { Flex, Input, Label, Button, Checkbox, Text } from 'theme-ui'

export const ProjectImpactLocationInput = ({ register, currentValue, goBack, setValue }) => {
  const [location, setLocation] = useState(currentValue === 'Global' ? 'Global' : currentValue)

  const handleChange = value => {
    setValue('projectImpactLocation', value)
    setLocation(value)
  }

  useEffect(() => {
    typeof window !== 'undefined' && window.initMap(handleChange)
  }, [])

  return (
    <div style={{ marginTop: '30px' }}>
      <Label
        sx={{
          fontSize: 8,
          fontFamily: 'heading'
        }}
        htmlFor='projectLocation'
      >
        Where will your project have the most impact?
      </Label>
      <Text
        sx={{
          fontSize: 3,
          fontFamily: 'body',
          mt: '8px',
          lineHeight: '19px'
        }}
      >
        Donors will easier find the project based on the location you provide
      </Text>
      <Flex sx={{ mt: 4 }}>
        <div id='locationField'>
          <Input
            id='autocomplete'
            placeholder='Search a Location'
            type='text'
            disabled={location === 'Global'}
            sx={{ fontFamily: 'body', width: '400px', mr: '35px' }}
            onChange={e => handleChange(e.target.value)}
          />
        </div>
        <input
          id='projectImpactLocation'
          name='projectImpactLocation'
          type='hidden'
          value={location}
          {...register('projectImpactLocation')}
        />
        <Label
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row'
          }}
        >
          <Checkbox
            defaultChecked={location === 'Global'}
            onChange={e => handleChange(e.target.checked ? 'Global' : '')}
          />
          <Text sx={{ fontFamily: 'body', fontSize: 2 }}>This project has a global impact</Text>
        </Label>
      </Flex>

      {location && (
        <Text sx={{ fontFamily: 'body', color: 'muted', mt: 3, fontSize: 8 }}>{location}</Text>
      )}

      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
          width: '600px',
          backgroundColor: 'white',
          borderRadius: '2px',
          margin: '2rem 0 0 0'
        }}
      >
        <div id='map' style={{ height: '250px' }} />
      </div>
      <Flex
        sx={{
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          flexDirection: 'row-reverse',
          margin: '2rem 0'
        }}
      >
        <Button
          aria-label='Next'
          sx={{
            width: '180px',
            height: '52px',
            borderRadius: '48px',
            cursor: 'pointer'
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
    </div>
  )
}
