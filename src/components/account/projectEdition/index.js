import React, { useContext, useEffect, useState } from 'react'
import Web3 from 'web3'
import { useApolloClient, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'

import {
  EDIT_PROJECT,
  FETCH_PROJECT_BY_SLUG,
  WALLET_ADDRESS_IS_VALID
} from '../../../apollo/gql/projects'
import LoadingModal from '../../loadingModal'
import ConfirmationModal from './confirmationModal'
import { getImageFile } from '../../../utils/index'
import Toast from '../../toast'
import { invalidProjectTitleToast, isProjectTitleValid } from '../../../lib/projectValidation'
import ProjectEditionForm from './projectEditionForm'
import { getAddressFromENS, isAddressENS } from '../../../lib/wallet'
import { Context as Web3Context } from '../../../contextProvider/Web3Provider'

function ProjectEdition(props) {
  const {
    state: { web3 }
  } = useContext(Web3Context)

  const client = useApolloClient()

  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [project, setProject] = useState(false)
  const [updateProjectOnServer, setUpdateProjectOnServer] = useState(false)
  const [showCancelModal, setCancelModal] = useState(false)
  const [mapLocation, setMapLocation] = useState('')

  const { data: fetchedProject, loadingProject } = useQuery(FETCH_PROJECT_BY_SLUG, {
    variables: { slug: props.project?.slug || props.project }
  })

  const router = useRouter()

  useEffect(() => {
    if (fetchedProject?.projectBySlug) {
      const _project = { ...fetchedProject.projectBySlug }
      const newCategories = {}
      _project.categories.forEach(i => (newCategories[i.name] = true))
      _project.categories = newCategories
      setProject(_project)
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
          const contentSize = encodeURI(project?.description).split(/%..|./).length - 1
          console.log({ contentSize })
          if (contentSize > 4000000) {
            Toast({
              content: `Content is too heavy, it shouldn't exceed 4Mb`,
              type: 'error'
            })
            return false
          }
          await client.mutate({
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
          setUpdateProjectOnServer(false)
          setLoading(false)
          Toast({
            content: error?.message || JSON.stringify(error),
            type: 'error'
          })
          console.log({ error })
        }
      }

      editProjectMutation().then()
    } else {
      setLoading(false)
    }
  }, [project])

  async function updateProject(data) {
    try {
      // Validate eth address if changed
      let ethAddress = data.editWalletAddress

      if (!ethAddress) {
        return Toast({
          content: 'Please enter a wallet address to receive donations',
          type: 'error'
        })
      }

      // Handle ENS address
      if (isAddressENS(ethAddress)) {
        ethAddress = await getAddressFromENS(data.editWalletAddress, web3)
      }

      await client.query({
        query: WALLET_ADDRESS_IS_VALID,
        variables: {
          address: ethAddress
        }
      })

      if (!isProjectTitleValid(data.editTitle || project.title)) {
        return invalidProjectTitleToast()
      }

      const categories = []
      Object.entries(project.categories)
        .filter(i => i[1] === true)
        .forEach(i => categories.push(i[0]))

      const projectData = {
        title: data.editTitle || project.title,
        description: data.desc || data.editDescription,
        admin: project.admin,
        impactLocation: mapLocation,
        categories,
        walletAddress: ethAddress ? Web3.utils.toChecksumAddress(ethAddress) : project.walletAddress
      }

      // Validate Image
      if (data?.editImage && project.image !== data.editImage) {
        if (data.editImage.length > 2) {
          // Download image to send
          projectData.imageUpload = await getImageFile(data.editImage, project.slug)
        } else {
          if (data.editImage.length === 1) {
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
        setProject={setProject}
      />
      <ConfirmationModal
        showModal={showModal}
        setShowModal={setShowModal}
        title='Success!'
        subtitle='Please allow a few minutes for your changes to be displayed.'
        confirmation={{
          do: () => window.location.replace(`/project/${fetchedProject?.projectBySlug?.slug}`),
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
          do: () => router.back(),
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
