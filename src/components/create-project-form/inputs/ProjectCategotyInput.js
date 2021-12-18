import React from 'react'
import { Checkbox, Label, Flex, Box, Text, Button } from 'theme-ui'
import { maxSelectedCategory } from '../../../utils/constants'
import Toast from '../../toast'

export const ProjectCategoryInput = ({ value, setValue, categoryList = [], goBack }) => {
  const handleChange = (name, e) => {
    const newValue = { ...value, [name]: e }
    const selectedCategories = Object.entries(newValue)?.filter(i => i[1] === true)
    const isMaxCategories = selectedCategories.length > maxSelectedCategory

    if (isMaxCategories) {
      Toast({
        content: `Please select no more than ${maxSelectedCategory} categories`,
        type: 'error'
      })
      return setValue(value)
    }

    setValue(newValue)
  }

  return (
    <div style={{ marginTop: '30px' }}>
      <Label
        sx={{
          fontSize: 8,
          fontFamily: 'heading'
        }}
        htmlFor='projectCategory'
      >
        Please select a category
      </Label>
      <Text
        sx={{
          fontSize: '3',
          fontFamily: 'heading',
          color: 'secondary',
          mt: '8px',
          lineHeight: '19px'
        }}
      >
        You can select multiple categories (maximum {maxSelectedCategory})
      </Text>
      <Box
        sx={{
          my: '50px'
          // height: '320px',
          // overflow: 'scroll'
        }}
      >
        {categoryList?.map(category => {
          if (category?.name === 'the-giving-block') return null
          return (
            <Label
              sx={{ mb: '10px', display: 'flex', alignItems: 'center' }}
              key={`${category.name}-label`}
            >
              <Checkbox
                key={`${category.name}-checkbox`}
                id={category.name}
                name={category.name}
                checked={!!(value && value[category.name])}
                onChange={e => handleChange(category.name, e.target.checked)}
              />
              <Text sx={{ fontFamily: 'body' }}>{category.value}</Text>
            </Label>
          )
        })}
      </Box>
      <Flex
        sx={{
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          flexDirection: 'row-reverse'
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
            cursor: 'pointer',
            mb: 5
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
