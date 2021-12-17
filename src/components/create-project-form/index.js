import React, { useState, useEffect, useContext, useMemo } from 'react'
import { Box, Flex, Spinner, Progress, Text } from 'theme-ui'
import { useApolloClient } from '@apollo/client'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

import {
  GET_PROJECT_BY_ADDRESS,
  WALLET_ADDRESS_IS_VALID,
  TITLE_IS_VALID
} from '../../apollo/gql/projects'
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
import { Context as Web3Context } from '../../contextProvider/Web3Provider'
import { compareAddresses, isUserRegistered } from '../../lib/helpers'
import { getAddressFromENS, isAddressENS } from '../../lib/wallet'

const Main = props => {
  const {
    state: { isSignedIn },
    actions: { loginModal, closeLoginModal }
  } = useContext(Web3Context)

  useEffect(() => {
    if (!isSignedIn) loginModal()
    else closeLoginModal()
  }, [isSignedIn])

  return isSignedIn ? <CreateProjectForm {...props} /> : null
}

const CreateProjectForm = props => {
  const {
    state: { account, user, web3 }
  } = useContext(Web3Context)

  const [loading, setLoading] = useState(true)
  const [inputIsLoading, setInputLoading] = useState(false)
  const [incompleteProfile, setIncompleteProfile] = useState(false)
  const [formData, setFormData] = useState({})
  const [currentStep, setCurrentStep] = useState(0)
  const [EthAddress, setEthAddress] = useState()
  const [showCloseModal, setShowCloseModal] = useState(false)

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: useMemo(() => {
      return formData
    }, [formData])
  })

  const router = useRouter()
  const usePopup = useContext(PopupContext)
  const client = useApolloClient()

  const nextStep = () => setCurrentStep(currentStep + 1)
  const goBack = () => setCurrentStep(currentStep - 1)
  const handleInput = (name, value) => {
    const data = { ...formData }
    data[name] = value
    setFormData(data)
  }

  const steps = [
    () => <ProjectNameInput currentValue={formData.projectName} register={register} />,
    () => (
      <ProjectDescriptionInput
        currentValue={formData.projectDescription}
        setValue={(ref, val) => setValue(ref, val)}
        register={register}
        goBack={goBack}
      />
    ),
    () => (
      <ProjectCategoryInput
        categoryList={props.categoryList}
        value={formData.projectCategory}
        setValue={e => handleInput('projectCategory', e)}
        goBack={goBack}
      />
    ),
    () => (
      <ProjectImpactLocationInput
        currentValue={formData.projectImpactLocation}
        setValue={(ref, val) => setValue(ref, val)}
        register={register}
        goBack={goBack}
      />
    ),

    () => (
      <ProjectImageInput
        currentValue={formData.projectImage}
        register={register}
        setValue={(ref, val) => setValue(ref, val)}
        goBack={goBack}
      />
    ),
    () => (
      <ProjectEthAddressInput value={EthAddress} onChange={setEthereumAddress} goBack={goBack} />
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
      if (isCategoryStep(submitCurrentStep)) {
        project = {
          ...formData
        }
      } else {
        project = {
          ...formData,
          ...data
        }
      }
      // check title
      await client.query({
        query: TITLE_IS_VALID,
        variables: {
          title: project?.projectName
        }
      })

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
        const didEnterWalletAddress = !!EthAddress
        if (!data?.projectName) {
          return Toast({
            content: 'Please set at least a title to your project',
            type: 'error'
          })
        }

        if (didEnterWalletAddress) {
          setInputLoading(true)
        } else {
          return Toast({
            content: 'Please enter a wallet address to receive donations',
            type: 'error'
          })
        }

        let address
        // Handle ENS address
        if (isAddressENS(EthAddress)) {
          address = await getAddressFromENS(EthAddress, web3)
          setEthAddress(address)
        } else {
          address = EthAddress
        }

        await client.query({
          query: WALLET_ADDRESS_IS_VALID,
          variables: {
            address
          }
        })

        project.projectWalletAddress = address
      }
      project.projectDescription = project?.projectDescription || ''

      window?.localStorage.setItem(
        'create-form',
        JSON.stringify({ ...project, projectImage: null })
      )

      if (isLastStep(submitCurrentStep, steps)) {
        props.onSubmit(project)
      }
      window?.scrollTo(0, 0)
      setInputLoading(false)
      setFormData(project)
      doNextStep()
    } catch (error) {
      console.log({ error })
      setInputLoading(false)
      window?.scrollTo(0, 0)
      Toast({
        content: error?.message || JSON.stringify(error),
        type: 'error'
      })
    }
  }

  const setEthereumAddress = addr => {
    if (addr?.length > 42) return null
    return setEthAddress(addr)
  }

  useEffect(() => {
    const checkProjectWallet = async () => {
      if (JSON.stringify(user) === JSON.stringify({})) return setLoading(false)
      const { data } = await client.query({
        query: GET_PROJECT_BY_ADDRESS,
        variables: {
          address: account
        }
      })

      const localForm = JSON.parse(window?.localStorage.getItem('create-form'))
      const localAddress = localForm?.projectWalletAddress

      localForm && setFormData(localForm)

      let addressIsUsed = false
      if (data?.projectByAddress) {
        // Address is used in another project
        addressIsUsed = true
      }

      if (addressIsUsed) {
        if (localAddress && !compareAddresses(localAddress, account)) {
          setEthAddress(localAddress)
        }
      } else {
        if (localAddress) setEthAddress(localAddress)
        else setEthAddress(account)
      }

      setLoading(false)
    }

    if (user) {
      if (!isUserRegistered(user)) {
        usePopup?.triggerPopup('IncompleteProfile')
        setIncompleteProfile(true)
      } else {
        checkProjectWallet().then()
      }
    }
  }, [user])

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

  const progressPercentage = Object.keys(formData).filter(v => v.startsWith('proj'))?.length
  const Step = steps[currentStep]

  return (
    <>
      <Progress style={{ position: 'fixed', top: 0 }} max={steps.length} value={progressPercentage}>
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
                  <Flex sx={{ minHeight: '700px' }}>
                    <Step />
                  </Flex>
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
