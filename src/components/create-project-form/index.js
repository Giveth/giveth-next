import React, { useState, useEffect, useContext, useMemo } from 'react'
import { Box, Heading, Flex, Button, Spinner, Progress, Text } from 'theme-ui'
import { useApolloClient } from '@apollo/client'
import { useForm } from 'react-hook-form'

import { GET_PROJECT_BY_ADDRESS, WALLET_ADDRESS_IS_VALID } from '../../apollo/gql/projects'
import { getProjectWallet } from './utils'
import { PopupContext } from '../../contextProvider/popupProvider'
import {
  ProjectNameInput,
  ProjectDescriptionInput,
  ProjectCategoryInput,
  ProjectImpactLocationInput,
  ProjectImageInput,
  ProjectEthAddressInput
} from './inputs'
import EditButtonSection from './EditButtonSection'
import FinalVerificationStep from './FinalVerificationStep'
import ConfirmationModal from '../confirmationModal'
import Toast from '../toast'
import { maxSelectedCategory } from '../../utils/constants'
import { invalidProjectTitleToast, isProjectTitleValid } from '../../lib/projectValidation'
import { Context as Web3Context } from '../../contextProvider/Web3Provider'

const Main = props => {
  const {
    state: { user },
    actions: { signModalContent }
  } = useContext(Web3Context)

  return user && user.token ? (
    <CreateProjectForm {...props} />
  ) : (
    <div style={{ margin: '150px 0', textAlign: 'center' }}>{signModalContent()}</div>
  )
}

const CreateProjectForm = props => {
  const [loading, setLoading] = useState(true)
  const [inputIsLoading, setInputLoading] = useState(false)
  const [incompleteProfile, setIncompleteProfile] = useState(false)
  const [formData, setFormData] = useState({})
  const [addressIsUsed, setAddressIsUsed] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: useMemo(() => {
      return formData
    }, [formData])
  })

  const {
    state: { account, user }
  } = useContext(Web3Context)

  const usePopup = useContext(PopupContext)
  const client = useApolloClient()

  const nextStep = () => setCurrentStep(currentStep + 1)
  const goBack = () => setCurrentStep(currentStep - 1)

  const EthAddress = formData?.projectWalletAddress
    ? formData.projectWalletAddress
    : !addressIsUsed
    ? account
    : null

  const useUserAddress = !(
    addressIsUsed ||
    (!addressIsUsed && formData.projectWalletAddress && formData.projectWalletAddress !== account)
  )

  const steps = [
    () => <ProjectNameInput currentValue={formData?.projectName} register={register} />,
    () => (
      <ProjectDescriptionInput
        currentValue={formData?.projectDescription}
        setValue={(ref, val) => setValue(ref, val)}
        register={register}
        goBack={goBack}
      />
    ),
    () => (
      <ProjectCategoryInput
        categoryList={props.categoryList}
        currentValue={formData?.projectCategory}
        register={register}
        goBack={goBack}
      />
    ),
    () => (
      <ProjectImpactLocationInput
        currentValue={formData?.projectImpactLocation}
        setValue={(ref, val) => setValue(ref, val)}
        register={register}
        goBack={goBack}
      />
    ),

    () => (
      <ProjectImageInput
        currentValue={formData?.projectImage}
        register={register}
        setValue={(ref, val) => setValue(ref, val)}
        goBack={goBack}
      />
    ),
    () => (
      <ProjectEthAddressInput
        currentValue={EthAddress}
        useUserAddress={useUserAddress}
        register={register}
        goBack={goBack}
      />
    ),
    () => (
      <FinalVerificationStep
        formData={formData}
        setStep={setCurrentStep}
        categoryList={props.categoryList}
      />
    )
  ]

  const onSubmit = (formData, submitCurrentStep, doNextStep) => async data => {
    let project = {}
    try {
      // console.log({ submitCurrentStep, data, formData })

      if (isCategoryStep(submitCurrentStep)) {
        const maxFiveCategories = Object.entries(data)?.filter(i => {
          return i[1] === true
        })

        if (maxFiveCategories.length > maxSelectedCategory) {
          return Toast({
            content: `Please select no more than ${maxSelectedCategory} categories`,
            type: 'error'
          })
        }

        project = {
          ...formData,
          projectCategory: {
            ...data,
            projectDescription: null
          }
        }
        // TODO: For some reason we are getting projectDescription inside the category
        // we need to figure out why
        delete project?.projectCategory['projectDescription']
      } else {
        project = {
          ...formData,
          ...data
        }
      }
      // check title
      if (!isProjectTitleValid(project?.projectName)) {
        return invalidProjectTitleToast()
      }
      console.log({ project })

      if (isDescriptionStep(submitCurrentStep)) {
        // check if file is too large
        const stringSize = encodeURI(data?.projectDescription).split(/%..|./).length - 1
        if (stringSize > 4000000) {
          // 4Mb tops max maybe?
          return Toast({
            content: 'Description too large',
            type: 'error'
          })
        }
      }

      if (isFinalConfirmationStep(submitCurrentStep, steps)) {
        const didEnterWalletAddress = !!data?.projectWalletAddress
        let projectWalletAddress
        if (!data?.projectName) {
          return Toast({
            content: 'Please set at least a title to your project',
            type: 'error'
          })
        }
        if (didEnterWalletAddress) {
          setInputLoading(true)
          projectWalletAddress = await getProjectWallet(data?.projectWalletAddress)
        } else {
          projectWalletAddress = account
        }

        const { data: addressValidation } = await client.query({
          query: WALLET_ADDRESS_IS_VALID,
          variables: {
            address: projectWalletAddress
          }
        })
        if (!addressValidation?.walletAddressIsValid?.isValid) {
          const reason = addressValidation?.walletAddressIsValid?.reasons[0]
          setInputLoading(false)
          if (reason === 'smart-contract') {
            return Toast({
              content: `Eth address ${projectWalletAddress} is a smart contract. We do not support smart contract wallets at this time because we use multiple blockchains, and there is a risk of your losing donations.`,
              type: 'error'
            })
          } else if (reason === 'address-used') {
            return Toast({
              content: `Eth address ${projectWalletAddress} is already being used for a project`,
              type: 'error'
            })
          } else {
            return Toast({
              content: 'Eth address not valid',
              type: 'error'
            })
          }
        }
        project.projectWalletAddress = projectWalletAddress
      }
      project.projectDescription = project?.projectDescription || ''

      window?.localStorage.setItem(
        'create-form',
        JSON.stringify({ ...project, projectImage: null })
      )
      if (isLastStep(submitCurrentStep, steps)) {
        props.onSubmit(project)
      }
      setInputLoading(false)
      setFormData(project)
      doNextStep()
    } catch (error) {
      console.log({ error })
      setInputLoading(false)
      Toast({
        content: error?.message || JSON.stringify(error),
        type: 'error'
      })
    }
  }

  const [showCloseModal, setShowCloseModal] = useState(false)
  useEffect(() => {
    const checkProjectWallet = async () => {
      if (JSON.stringify(user) === JSON.stringify({})) return setLoading(false)
      const { data } = await client.query({
        query: GET_PROJECT_BY_ADDRESS,
        variables: {
          address: account
        }
      })

      if (data?.projectByAddress) {
        setAddressIsUsed(true)
      } else {
        addressIsUsed && setAddressIsUsed(false)
      }
      setLoading(false)
    }

    if (user) {
      if (!user.name || !user.email || user.email === '') {
        usePopup?.triggerPopup('IncompleteProfile')
        setIncompleteProfile(true)
      } else {
        checkProjectWallet().then()
      }
    }
  }, [user, client, formData])

  useEffect(() => {
    // Checks localstorage to reset form
    const localCreateForm = window?.localStorage.getItem('create-form')
    localCreateForm && setFormData(JSON.parse(localCreateForm))
  }, [])

  if (incompleteProfile) {
    return null
  }

  if (loading) {
    return (
      <Flex sx={{ justifyContent: 'center', pt: 5 }}>
        <Spinner variant='spinner.medium' />
      </Flex>
    )
  }

  // // CHECKS USER
  // if (JSON.stringify(user) === JSON.stringify({})) {
  //   return (
  //     <Flex sx={{ flexDirection: 'column' }}>
  //       <Text sx={{ variant: 'headings.h2', color: 'secondary', mt: 6, mx: 6 }}>
  //         You are not logged in yet...
  //       </Text>
  //       <Text
  //         sx={{ variant: 'headings.h4', color: 'primary', mx: 6 }}
  //         style={{
  //           textDecoration: 'underline',
  //           cursor: 'pointer'
  //         }}
  //         onClick={() => window.location.replace('/')}
  //       >
  //         go to our homepage
  //       </Text>
  //     </Flex>
  //   )
  // }
  const progressPercentage = Object.keys(formData).filter(v => v.startsWith('proj'))?.length
  const Step = steps[currentStep]

  return (
    <>
      <Progress max={steps.length} value={progressPercentage}>
        <Text>Progress bar test text</Text>
      </Progress>
      <Box
        sx={{
          mx: ['20px', '140px', '140px'],
          mt: '50px',
          position: 'relative'
        }}
      >
        <>
          <Flex
            sx={{
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Heading as='h5'>CREATE A NEW PROJECT</Heading>
            <Button
              type='button'
              aria-label='Cancel'
              onClick={() => setShowCloseModal(!showCloseModal)}
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
          </Flex>
          {currentStep === steps.length ? (
            <p>Creating project, please wait</p>
          ) : (
            <form onSubmit={handleSubmit(onSubmit(formData, currentStep, nextStep))}>
              <>
                {currentStep !== steps.length - 1 && (
                  <EditButtonSection
                    formData={formData}
                    setStep={setCurrentStep}
                    currentStep={currentStep}
                  />
                )}
                {inputIsLoading ? (
                  <Flex sx={{ justifyContent: 'center', pt: 5 }}>
                    <Spinner variant='spinner.medium' />
                  </Flex>
                ) : (
                  <Step />
                )}
                <ConfirmationModal
                  showModal={showCloseModal}
                  setShowModal={setShowCloseModal}
                  title='Are you sure?'
                  confirmation={{
                    do: () => window.location.replace('/'),
                    title: 'Yes'
                  }}
                />
              </>
            </form>
          )}
        </>
      </Box>
    </>
  )
}

export default Main

function isDescriptionStep(currentStep) {
  return currentStep === 1
}

function isCategoryStep(currentStep) {
  return currentStep === 2
}

function isFinalConfirmationStep(currentStep, steps) {
  return currentStep === steps.length - 2
}

function isLastStep(currentStep, steps) {
  return currentStep === steps.length - 1
}
