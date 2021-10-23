import React, { useState } from 'react'
import { Label, Input, Text, Button } from 'theme-ui'

export const ProjectNameInput = ({ register, currentValue }) => {
  const [characterLength, setCharacterLength] = useState(currentValue ? currentValue.length : 0)

  return (
    <div>
      <Label
        sx={{
          fontSize: 9,
          fontFamily: 'heading'
        }}
        htmlFor='projectName'
      >
        What&apos;s the name of your project?
      </Label>
      <div style={{ position: 'relative' }}>
        <Input
          sx={{
            width: '70%',
            mt: '40px',
            fontFamily: 'body'
          }}
          type='text'
          id='projectName'
          name='projectName'
          {...register('projectName', { required: true })}
          defaultValue={currentValue}
          placeholder='Project Name'
          autoFocus
          maxLength={55}
          onChange={e => setCharacterLength(e.target.value.length)}
        />
        <Text
          sx={{
            position: 'absolute',
            transform: 'translate(0, 50%)',
            bottom: '50%',
            left: 'calc(70% - 60px)',
            fontFamily: 'body',
            color: 'muted'
          }}
        >
          {characterLength}/55
        </Text>
      </div>
      <Button
        aria-label='Next'
        sx={{
          mt: '200px',
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
    </div>
  )
}
