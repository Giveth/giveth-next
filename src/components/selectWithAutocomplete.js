import React from 'react'
import Select from 'react-select'
import { Image, Text, Flex } from 'theme-ui'
import styled from '@emotion/styled'
import theme from '../utils/theme-ui/index'

// TODO: FIX ICONS
import iconManifest from '../../public/assets/cryptocurrency-icons/manifest.json'
const ETHIcon = '/assets/cryptocurrency-icons/32/color/eth.png'

const StyledOption = styled.div`
  &:hover {
    div {
      color: ${theme.colors.background};
    }
    background-color: ${theme.colors.hover};
  }
`

const SelectWithAutocomplete = ({
  content,
  width,
  placeholder,
  onSelect,
  menuIsOpen,
  isTokenList
}) => {
  const options = content || []

  const CustomOption = ({ children, value, innerProps, isDisabled }) => {
    if (isDisabled) return null
    let toShow = children
    // Special render for tokens, showing extra info
    if (isTokenList) {
      const found = iconManifest.find(
        i => i.symbol === value.symbol?.toUpperCase()
      )
      toShow = (
        <Flex style={{ flexDirection: 'row', alignItems: 'center' }}>
          {found ? (
            <Image
              src={
                found
                  ? `/assets/cryptocurrency-icons/32/color/${
                      value?.symbol?.toLowerCase() || 'eth'
                    }.png`
                  : `/assets/tokens/${value?.symbol?.toUpperCase()}.png`
              }
              alt={value?.symbol}
              onError={ev => {
                ev.target.src = ETHIcon
                ev.target.onerror = null
              }}
              width='32px'
              height='32px'
            />
          ) : (
            <Image
              src={`/assets/cryptocurrency-icons/32/color/eth.png`}
              width='32px'
              height='32px'
            />
          )}

          <Text variant='text.default' color='secondary' sx={{ pl: 2 }}>
            {`${value?.symbol}`}
          </Text>
        </Flex>
      )
    }
    return (
      <StyledOption
        {...innerProps}
        style={{
          cursor: 'pointer',
          color: theme.colors.secondary,
          fontFamily: theme.fonts.body,
          padding: 20
        }}
      >
        {toShow}
      </StyledOption>
    )
  }

  return (
    <Select
      options={options}
      components={{ Option: CustomOption }}
      placeholder={placeholder || 'Select an option'}
      onChange={onSelect}
      menuIsOpen={menuIsOpen}
      styles={{
        placeholder: provided => ({
          ...provided,
          color: theme.colors.anotherGrey
        }),
        valueContainer: provided => ({
          ...provided,
          padding: 15,
          margin: 0,
          fontSize: '18px',
          fontFamily: theme.fonts.body,
          color: theme.colors.secondary
        }),
        menu: provided => ({
          ...provided,
          marginTop: '-5px'
        }),
        menuList: provided => ({
          ...provided,
          maxHeight: '300px'
        }),
        control: () => ({
          // none of react-select's styles are passed to <Control />
          display: 'flex',
          flexDirection: 'row',
          width: width
        }),
        singleValue: (provided, state) => {
          const opacity = state.isDisabled ? 0.5 : 1
          const transition = 'opacity 300ms'

          return { ...provided, opacity, transition }
        }
      }}
    />
  )
}

export default SelectWithAutocomplete
