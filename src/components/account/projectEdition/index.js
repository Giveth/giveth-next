import React, { useEffect, useState } from 'react'
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
import { categoryList, maxSelectedCategory } from '../../../utils/constants'
import Toast from '../../toast'
import { invalidProjectTitleToast, isProjectTitleValid } from '../../../lib/projectValidation'
import ProjectEditionForm from './projectEditionForm'

function ProjectEdition(props) {
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
      if (!isProjectTitleValid(data.editTitle || project?.title)) {
        return invalidProjectTitleToast()
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
      if (data?.editImage && project?.image !== data.editImage) {
        if (data.editImage.length > 2) {
          // Download image to send
          projectData.imageUpload = await getImageFile(data.editImage, project?.slug)
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
