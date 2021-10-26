import React, { useState, useEffect, useContext, useMemo } from 'react'
import { Box, Heading, Flex, Button, Spinner, Progress, Text } from 'theme-ui'
import { useRouter } from 'next/router'
import { useApolloClient } from '@apollo/client'
import { useForm } from 'react-hook-form'
import { useTransition } from 'react-spring'

import { GET_PROJECT_BY_ADDRESS, WALLET_ADDRESS_IS_VALID } from '../../apollo/gql/projects'
import { getProjectWallet } from './utils'
import { useWallet } from '../../contextProvider/WalletProvider'
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
import { invalidProjectTitleToast, isProjectTitleValid } from '../../validation/projectValidation'

const CreateProjectForm = props => {
  const [loading, setLoading] = useState(true)
  const [inputIsLoading, setInputLoading] = useState(false)
  const [incompleteProfile, setIncompleteProfile] = useState(false)
  const [flashMessage, setFlashMessage] = useState('')
  const [formData, setFormData] = useState({})
  const [walletUsed, setWalletUsed] = useState(false)

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: useMemo(() => {
      return formData
    }, [formData])
  })
  const { isLoggedIn, user, validateToken, logout } = useWallet()
  const router = useRouter()
  const usePopup = useContext(PopupContext)
  const client = useApolloClient()

  const [currentStep, setCurrentStep] = useState(0)
  const nextStep = () => setCurrentStep(currentStep + 1)
  const goBack = () => setCurrentStep(currentStep - 1)

  useEffect(() => {
    doValidateToken()
    async function doValidateToken() {
      const isValid = await validateToken()
      // console.log(`isValid : ${JSON.stringify(isValid, null, 2)}`)

      setFlashMessage('Your session has expired')
      if (!isValid) {
        await logout()
        // usePopup?.triggerPopup('WelcomeLoggedOut')
        router.push({
          pathname: '/',
          query: { welcome: true }
        })
      }
    }
  }, [])

  const steps = [
    ({ animationStyle }) => (
      <ProjectNameInput
        animationStyle={animationStyle}
        currentValue={formData?.projectName}
        register={register}
      />
    ),
    ({ animationStyle }) => (
      <ProjectDescriptionInput
        animationStyle={animationStyle}
        currentValue={formData?.projectDescription}
        setValue={(ref, val) => setValue(ref, val)}
        register={register}
        goBack={goBack}
      />
    ),
    ({ animationStyle }) => (
      <ProjectCategoryInput
        animationStyle={animationStyle}
        categoryList={props.categoryList}
        currentValue={formData?.projectCategory}
        register={register}
        goBack={goBack}
      />
    ),
    ({ animationStyle }) => (
      <ProjectImpactLocationInput
        animationStyle={animationStyle}
        currentValue={formData?.projectImpactLocation}
        setValue={(ref, val) => setValue(ref, val)}
        register={register}
        goBack={goBack}
      />
    ),

    ({ animationStyle }) => (
      <ProjectImageInput
        animationStyle={animationStyle}
        currentValue={formData?.projectImage}
        register={register}
        setValue={(ref, val) => setValue(ref, val)}
        goBack={goBack}
      />
    ),
    ({ animationStyle }) => (
      <ProjectEthAddressInput
        animationStyle={animationStyle}
        currentValue={
          formData?.projectWalletAddress
            ? formData?.projectWalletAddress
            : typeof walletUsed !== 'boolean'
            ? walletUsed
            : null
        }
        walletUsed={
          typeof walletUsed !== 'boolean' && formData?.projectWalletAddress === walletUsed
        }
        register={register}
        goBack={goBack}
      />
    ),
    ({ animationStyle }) => (
      <FinalVerificationStep
        animationStyle={animationStyle}
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
          projectWalletAddress = user.addresses[0]
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
        content: error?.message,
        type: 'error'
      })
    }
  }

  const stepTransitions = useTransition(currentStep, {
    from: {
      opacity: 0,
      transform: 'translate3d(100%,0,0)',
      position: 'absolute'
    },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' }
  })

  const [showCloseModal, setShowCloseModal] = useState(false)
  useEffect(() => {
    const checkProjectWallet = async () => {
      if (!user) return null

      if (JSON.stringify(user) === JSON.stringify({})) return setLoading(false)
      const { data } = await client.query({
        query: GET_PROJECT_BY_ADDRESS,
        variables: {
          address: user.getWalletAddress()
        }
      })
      if (data?.projectByAddress) {
        setWalletUsed(true)
      } else {
        setWalletUsed(user.getWalletAddress())
      }
      setLoading(false)
    }
    if (!isLoggedIn) {
      router.push('/', { state: { welcome: true, flashMessage } })
    } else if (!user?.name || !user?.email || user.email === '') {
      usePopup?.triggerPopup('IncompleteProfile')
      setIncompleteProfile(true)
    } else {
      checkProjectWallet()
    }
  }, [user, isLoggedIn, client, formData])

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
                {currentStep !== steps.length - 1 ? (
                  <EditButtonSection
                    formData={formData}
                    setStep={setCurrentStep}
                    currentStep={currentStep}
                  />
                ) : null}
                {inputIsLoading ? (
                  <Flex sx={{ justifyContent: 'center', pt: 5 }}>
                    <Spinner variant='spinner.medium' />
                  </Flex>
                ) : (
                  stepTransitions((props, item, key) => {
                    const Step = steps[item]
                    return <Step key={key} animationStyle={props} />
                  })
                )}
                <ConfirmationModal
                  showModal={showCloseModal}
                  setShowModal={setShowCloseModal}
                  title='Are you sure?'
                  confirmation={{
                    do: () => router.push('/'),
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

export default CreateProjectForm

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
