import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Box, Button, Checkbox, Flex, Input, Label, Text } from 'theme-ui'
import { BiArrowBack } from 'react-icons/bi'
import styled from '@emotion/styled'

import theme from '../../../utils/theme-ui'
import { toggleProjectActivation } from '../../../services/project'
import Toast from '../../toast'
import ImageSection from './imageSection'
import { categoryList, maxSelectedCategory } from '../../../utils/constants'

const RichTextInput = React.lazy(() => import('../../richTextInput'))

const CustomInput = styled(Input)`
  color: ${theme.colors.secondary};
`

function ProjectEditionForm(props) {
  const {
    goBack,
    setCancelModal,
    updateProject,
    project,
    // client,
    mapLocation,
    setMapLocation,
    setProject
  } = props

  const [desc, setDesc] = useState('')
  const [isActive, setIsActive] = useState(null)

  const { register, handleSubmit, setValue } = useForm() // initialize the hook

  const handleInput = (name, value) => {
    const data = { ...project }
    data[name] = value
    setProject(data)
  }

  const handleCategories = (name, checked) => {
    const newValue = { ...project.categories, [name]: checked }
    const selectedCategories = Object.entries(newValue)?.filter(i => i[1] === true)
    const isMaxCategories = selectedCategories.length > maxSelectedCategory

    if (isMaxCategories) {
      Toast({
        content: `Please select no more than ${maxSelectedCategory} categories`,
        type: 'error'
      })
      return handleInput('categories', project.categories)
    }

    handleInput('categories', newValue)
  }

  useEffect(() => {
    setDesc(project?.description || '')
    setIsActive(project?.status?.id === '5')
  }, [project])

  // const connectBankAccount = async () => {
  //   try {
  //     const projectId = project?.id
  //     if (!projectId) return alert('no project here')
  //     const connectLink = await client.query({
  //       query: GET_LINK_BANK_CREATION,
  //       variables: {
  //         projectId: parseInt(projectId),
  //         returnUrl: `${window.location.origin}/account?projectId=${projectId}`,
  //         refreshUrl: `${window.location.origin}/account?projectId=${projectId}`
  //       }
  //     })
  //     if (connectLink?.data?.setProjectBankAccount) {
  //       window.location.href = connectLink.data.setProjectBankAccount
  //     } else {
  //       alert('error')
  //     }
  //   } catch (error) {
  //     console.log({ error })
  //   }
  // }

  const CustomLabel = ({ title, htmlFor, style, variant }) => {
    return (
      <Label
        sx={{
          my: 4,
          variant: variant || 'text.overline'
        }}
        style={style}
        htmlFor={htmlFor}
      >
        {title}
      </Label>
    )
  }
  const isSSR = typeof window === 'undefined'

  return (
    <>
      <Flex sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <Flex sx={{ alignItems: 'center' }}>
          <BiArrowBack color={theme.colors.secondary} style={{ marginRight: 2 }} />
          <Text onClick={goBack} sx={{ fontFamily: 'body', color: 'secondary', cursor: 'pointer' }}>
            My Projects
          </Text>
        </Flex>

        <form
          onSubmit={handleSubmit(() => {
            toggleProjectActivation(project?.id, isActive)
              .then(res => {
                if (res) {
                  setIsActive(!isActive)
                  Toast({
                    content: !isActive ? 'Project Activated' : 'Project Deactivated',
                    type: 'success'
                  })
                }
              })
              .catch(err =>
                Toast({
                  content: err?.message || JSON.stringify(err),
                  type: 'error'
                })
              )
          })}
        >
          <input
            type='hidden'
            name='projectId'
            // ref={register}
            {...register('projectId')}
            value={project.id}
          />
          {project?.status && (
            <Button
              aria-label='Next'
              sx={{
                my: '20px',
                width: '240px',
                height: '52px',
                borderRadius: '48px',
                cursor: 'pointer'
              }}
              type='submit'
            >
              {' '}
              <Text
                sx={{
                  fontFamily: 'body',
                  fontWeight: 'bold',
                  fontSize: 2,
                  letterSpacing: '4%',
                  textTransform: 'uppercase',
                  textAlign: 'center',
                  color: 'white'
                }}
              >
                {`${isActive ? 'Deactivate' : 'Activate'}`} project
              </Text>
            </Button>
          )}
        </form>
      </Flex>

      <form
        onSubmit={handleSubmit(data => {
          updateProject({ ...data, desc })
        })}
      >
        <>
          <ImageSection
            image={project?.image}
            register={register}
            setValue={(ref, val) => setValue(ref, val)}
          />
          <Flex sx={{ width: '70%', flexDirection: 'column' }}>
            <CustomLabel title='Project Name' htmlFor='editTitle' />
            <CustomInput
              name='editTitle'
              {...register('editTitle')}
              defaultValue={project?.title}
            />{' '}
            {/* <CustomLabel title='Project Admin' htmlFor='editAdmin' />
            <CustomInput name='editAdmin' ref={register} defaultValue={admin} /> */}
            <CustomLabel title='Project Description' htmlFor='editDescription' />
            {!isSSR && (
              <React.Suspense fallback={<div />}>
                <RichTextInput
                  projectId={project?.id}
                  style={{
                    width: '100%',
                    marginBottom: '20px',
                    height: '400px',
                    fontFamily: 'body',
                    padding: '1.125rem 1rem',
                    borderRadius: '12px',
                    resize: 'none',
                    '&::placeholder': {
                      variant: 'body',
                      color: 'bodyLight'
                    }
                  }}
                  value={desc}
                  placeholder='Write your update...'
                  onChange={newValue => {
                    try {
                      setValue('editDescription', newValue)
                      setDesc(newValue)
                    } catch (error) {
                      console.log({ error })
                    }
                  }}
                />
              </React.Suspense>
            )}
            <CustomLabel title='Category' htmlFor='editCategory' />
            <Box sx={{ height: '320px', overflow: 'scroll' }}>
              {project.categories &&
                categoryList.map(category => (
                  <Label
                    sx={{ mb: '10px', display: 'flex', alignItems: 'center' }}
                    key={`${category.name}-label`}
                  >
                    <Checkbox
                      key={`${category.name}-checkbox`}
                      id={category.name}
                      name={category.name}
                      checked={!!project.categories[category.name]}
                      onChange={e => handleCategories(category.name, e.target.checked)}
                    />
                    <Text sx={{ fontFamily: 'body' }}>{category.value}</Text>
                  </Label>
                ))}
            </Box>
            <CustomLabel title='Impact Location' htmlFor='editImpactLocation' />
            {mapLocation && (
              <Text sx={{ fontFamily: 'body', color: 'muted', fontSize: 8 }}>{mapLocation}</Text>
            )}
            <div id='locationField'>
              <Input
                id='autocomplete'
                placeholder='Search a Location'
                type='text'
                sx={{ fontFamily: 'body', width: '400px', mr: '35px', mt: 4 }}
                onChange={e => setMapLocation(e.target.value)}
              />
            </div>
            <Label
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
                mt: 4
              }}
            >
              <Checkbox
                checked={mapLocation === 'Global'}
                onChange={e => {
                  const checked = e.target.checked
                  checked ? setMapLocation('Global') : setMapLocation('')
                }}
              />
              <Text sx={{ fontFamily: 'body', fontSize: 2 }}>This project has a global impact</Text>
            </Label>
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
            {/* <CustomLabel title='Bank Account' htmlFor='addBankAccount' />
            <Text
              onClick={connectBankAccount}
              sx={{
                fontFamily: 'body',
                mt: '-5%',
                color: 'primary',
                cursor: 'pointer'
              }}
            >
              Connect your bank account
            </Text> */}
            <CustomLabel title='Donation Address' htmlFor='editWalletAddress' />
            <CustomInput
              name='editWalletAddress'
              {...register('editWalletAddress')}
              defaultValue={project?.walletAddress}
            />
            <CustomLabel
              variant='text.caption'
              style={{ margin: '5px 0 0 5px', color: theme.colors.bodyLight }}
              title='Receiving Ethereum supported wallet address or ENS domain.'
              htmlFor={null}
            />
          </Flex>
          <Button
            aria-label='Next'
            sx={{
              mt: '39px',
              width: '240px',
              height: '52px',
              borderRadius: '48px',
              cursor: 'pointer'
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
                color: 'white'
              }}
            >
              Save
            </Text>
          </Button>
          <Button
            type='button'
            aria-label='Cancel'
            onClick={() => setCancelModal(true)}
            sx={{
              fontSize: '3',
              fontFamily: 'body',
              color: 'secondary',
              background: 'unset',
              cursor: 'pointer'
            }}
          >
            Cancel
          </Button>
        </>
      </form>
    </>
  )
}

export default ProjectEditionForm
