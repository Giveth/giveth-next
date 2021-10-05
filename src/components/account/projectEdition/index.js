import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {
  Flex,
  Box,
  Button,
  Checkbox,
  Label,
  Text,
  Input,
} from 'theme-ui'
import Web3 from 'web3'
import { BiArrowBack } from 'react-icons/bi'
import styled from '@emotion/styled'
import { useApolloClient, useQuery } from '@apollo/client'

import theme from '../../../utils/theme-ui/index'
import {
  GET_LINK_BANK_CREATION,
  EDIT_PROJECT,
  FETCH_PROJECT_BY_SLUG,
  WALLET_ADDRESS_IS_VALID
} from '../../../apollo/gql/projects'
import { toggleProjectActivation } from '../../../services/project'
import LoadingModal from '../../loadingModal'
import ConfirmationModal from './confirmationModal'
import { getImageFile } from '../../../utils/index'
import { categoryList } from '../../../utils/constants'
import ImageSection from './imageSection'
import Toast from '../../toast'
import { maxSelectedCategory } from '../../../utils/constants'
import {invalidProjectTitleToast, isProjectTitleValid} from '../../../validation/projectValidation';

// import dynamic from 'next/dynamic'
// import { getWallet } from '../../../wallets'

// const getWallet = dynamic(
//   () => import('../../../wallets').then(md => md.getWallet),
//   {
//     ssr: false
//   }
// )

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
    client,
    mapLocation,
    setMapLocation
  } = props

  const [categories, setCategories] = useState(null)
  const [desc, setDesc] = useState('')
  const [isActive, setIsActive] = useState(null)

  const { register, handleSubmit, setValue, errors } = useForm() // initialize the hook
  useEffect(() => {
    setCategories(project?.categories)
    setDesc(project?.description || '')
    setIsActive(project?.status?.id === '5')
  }, [project])

  const connectBankAccount = async () => {
    try {
      const projectId = project?.id
      if (!projectId) return alert('no project here')
      const connectLink = await client.query({
        query: GET_LINK_BANK_CREATION,
        variables: {
          projectId: parseInt(projectId),
          returnUrl: `${window.location.origin}/account?projectId=${projectId}`,
          refreshUrl: `${window.location.origin}/account?projectId=${projectId}`
        }
      })
      if (connectLink?.data?.setProjectBankAccount) {
        window.location.href = connectLink.data.setProjectBankAccount
      } else {
        alert('error')
      }
    } catch (error) {
      console.log({ error })
    }
  }

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
          <BiArrowBack
            color={theme.colors.secondary}
            style={{ marginRight: 2 }}
          />
          <Text
            onClick={goBack}
            sx={{ fontFamily: 'body', color: 'secondary', cursor: 'pointer' }}
          >
            My Projects
          </Text>
        </Flex>

        <form
          onSubmit={handleSubmit((data, e) => {
            const res = toggleProjectActivation(project?.id, isActive, msg =>
              Toast({ content: msg, type: 'success' })
            )
            if (res) {
              setIsActive(!isActive)
            }
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
        onSubmit={handleSubmit((data, e) => {
          console.log({ data, desc })
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
            <CustomLabel
              title='Project Description'
              htmlFor='editDescription'
            />

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
                      // console.log({ newValue })
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
              {categories &&
                categoryList.map(category => {
                  const categoryFound = categories?.find(
                    i => i.name === category.name
                  )
                  return (
                    <Label
                      sx={{ mb: '10px', display: 'flex', alignItems: 'center' }}
                      key={`${category.name}-label`}
                    >
                      <Checkbox
                        key={`${category.name}-checkbox`}
                        id={category.name}
                        name={category.name}
                        // ref={register}
                        {...register(category.name)}
                        onClick={() => {
                          categoryFound
                            ? setCategories(
                                // remove
                                categories?.filter(
                                  i => i.name !== category.name
                                )
                              )
                            : setCategories(
                                categories?.length > 0
                                  ? [
                                      // add
                                      ...categories,
                                      { name: category.name }
                                    ]
                                  : [{ name: category.name }]
                              )
                        }}
                        checked={categoryFound ? 1 : 0}
                      />
                      <Text sx={{ fontFamily: 'body' }}>{category.value}</Text>
                    </Label>
                  )
                })}
            </Box>
            <CustomLabel title='Impact Location' htmlFor='editImpactLocation' />
            {mapLocation && (
              <Text sx={{ fontFamily: 'body', color: 'muted', fontSize: 8 }}>
                {mapLocation}
              </Text>
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
                checked={ mapLocation === 'Global' }
                onChange={e => {
                  const checked = e.target.checked
                  checked
                    ? setMapLocation('Global')
                    : setMapLocation('')
                }}
              />
              <Text sx={{ fontFamily: 'body', fontSize: 2 }}>
                This project has a global impact
              </Text>
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

function ProjectEdition(props) {
  const [loading, setLoading] = useState(false)
  const client = useApolloClient()
  const [showModal, setShowModal] = useState(false)
  const [project, setProject] = useState(false)
  const [updateProjectOnServer, setUpdateProjectOnServer] = useState(false)
  const [showCancelModal, setCancelModal] = useState(false)
  const [mapLocation, setMapLocation] = useState(null)

  const { data: fetchedProject, loadingProject } = useQuery(
    FETCH_PROJECT_BY_SLUG,
    {
      variables: { slug: props?.project }
    }
  )

  useEffect(() => {
    if (fetchedProject?.projectBySlug) {
      setProject(fetchedProject.projectBySlug)
      setMapLocation(fetchedProject.projectBySlug.impactLocation)
    }
  }, [fetchedProject])

  useEffect(() => {
    window?.google && window.initMap(setMapLocation)
  }, [])

  useEffect(() => {
    if (project && updateProjectOnServer) {
      const projectId = fetchedProject?.projectBySlug?.id
      const editProjectMutation = async () => {
        setLoading(true)
        try {
          const contentSize =
            encodeURI(project?.description).split(/%..|./).length - 1
          console.log({ contentSize })
          if (contentSize > 4000000) {
            Toast({
              content: `Content is too heavy, it shouldn't exceed 4Mb`,
              type: 'error'
            })
            return false
          }
          const edit = await client.mutate({
            mutation: EDIT_PROJECT,
            variables: {
              newProjectData: project,
              projectId: parseFloat(projectId)
            }
          })
          setUpdateProjectOnServer(false)
          setLoading(false)
          setShowModal(true)
        } catch (error) {
          setLoading(false)
          Toast({
            content: error?.message || JSON.stringify(error),
            type: 'error'
          })
          console.log({ error })
        }
      }
      editProjectMutation()
    } else {
      setLoading(false)
    }
  }, [project])

  async function updateProject(data) {
    try {
      // Validate eth address if changed
      let ethAddress = data.editWalletAddress

      if (ethAddress) {
        const { data: addressValidation } = await client.query({
          query: WALLET_ADDRESS_IS_VALID,
          variables: {
            address: ethAddress
          }
        })

        if (!addressValidation?.walletAddressIsValid?.isValid) {
          const reason = addressValidation?.walletAddressIsValid?.reasons[0]
          setLoading(false)
          return Toast({ content: reason, type: 'error' })
        }
      }
      if (!isProjectTitleValid(data.editTitle)) {
        return invalidProjectTitleToast();
      }
      const projectCategories = []
      for (const category in categoryList) {
        const name = categoryList[category]?.name
        if (data[name]) {
          projectCategories.push(categoryList[category].name)
        }
      }

      if (projectCategories.length > maxSelectedCategory)
        return Toast({
          content: `Please select no more than ${maxSelectedCategory} categories`,
          type: 'error'
        })

      const projectData = {
        title: data.editTitle || project?.title,
        description: data.desc || data.editDescription,
        admin: project.admin,
        impactLocation: mapLocation,
        categories: projectCategories,
        walletAddress: ethAddress
          ? Web3.utils.toChecksumAddress(ethAddress)
          : project?.walletAddress
      }

      // Validate Image
      if (data?.editImage && project?.image !== data?.editImage) {
        if (data?.editImage?.length > 2) {
          // Download image to send
          const imageFile = await getImageFile(data.editImage, project?.slug)
          projectData.imageUpload = imageFile
        } else {
          if (data?.editImage.length === 1) {
            projectData.imageStatic = data.editImage
          }
        }
      }

      setUpdateProjectOnServer(true)
      setProject(projectData)
    } catch (error) {
      setLoading(false)
      console.log({ error })
      return Toast({
        content: error?.message || JSON.stringify(error),
        type: 'error'
      })
    }
  }

  return (
    <>
      <LoadingModal isOpen={loadingProject || loading} />
      <ProjectEditionForm
        {...props}
        setShowModal={setShowModal}
        setCancelModal={setCancelModal}
        project={project}
        updateProject={updateProject}
        client={client}
        mapLocation={mapLocation}
        setMapLocation={setMapLocation}
      />
      <ConfirmationModal
        showModal={showModal}
        setShowModal={setShowModal}
        title='Success!'
        subtitle='Please allow a few minutes for your changes to be displayed.'
        confirmation={{
          do: () =>
            window.location.replace(
              `/project/${fetchedProject?.projectBySlug?.slug}`
            ),
          title: 'View Project'
        }}
        secondary={{
          do: () => window.location.replace('/account'),
          title: 'My Account'
        }}
      />
      <ConfirmationModal
        showModal={showCancelModal}
        setShowModal={setCancelModal}
        title='Close without saving?'
        confirmation={{
          do: () => props?.goBack(),
          title: 'Yes'
        }}
        secondary={{
          do: () => setCancelModal(false),
          title: 'No'
        }}
      />
    </>
  )
}

export default ProjectEdition
