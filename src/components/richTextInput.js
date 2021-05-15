import React, { useEffect, useState } from 'react'
import { client } from '../../src/apollo/client'
import ReactQuill, { Quill } from 'react-quill'
import Toast from '../components/toast'

import * as Emoji from 'quill-emoji'

import { UPLOAD_IMAGE } from '../../src/apollo/gql/projects'

import 'react-quill/dist/quill.snow.css'
import 'quill-emoji/dist/quill-emoji.css'
import QuillImageDropAndPaste from 'quill-image-drop-and-paste'
import ImageUploader from './richImageUploader/imageUploader'

window.Quill = Quill

const ImageResize = require('quill-image-resize-module').default

Quill.register('modules/imageUploader', ImageUploader)
Quill.register('modules/emoji', Emoji)
Quill.register('modules/ImageResize', ImageResize)
Quill.register('modules/imageDropAndPaste', QuillImageDropAndPaste)

const QuillVideo = Quill.import('formats/video')
const BlockEmbed = Quill.import('blots/block/embed')

const VIDEO_ATTRIBUTES = ['height', 'width']

// provides a custom div wrapper around the default Video blot
class Video extends BlockEmbed {
  static create(value) {
    const iframeNode = QuillVideo.create(value)
    const node = super.create()
    node.appendChild(iframeNode)
    return node
  }

  static formats(domNode) {
    const iframe = domNode.getElementsByTagName('iframe')[0]
    return VIDEO_ATTRIBUTES.reduce(function (formats, attribute) {
      if (iframe.hasAttribute(attribute)) {
        formats[attribute] = iframe.getAttribute(attribute)
      }
      return formats
    }, {})
  }

  static value(domNode) {
    return domNode.getElementsByTagName('iframe')[0].getAttribute('src')
  }

  format(name, value) {
    if (VIDEO_ATTRIBUTES.indexOf(name) > -1) {
      if (value) {
        this.domNode.setAttribute(name, value)
      } else {
        this.domNode.removeAttribute(name)
      }
    } else {
      super.format(name, value)
    }
  }
}

Video.blotName = 'video'
Video.className = 'ql-video-wrapper'
Video.tagName = 'DIV'

Quill.register(Video, true)

const modules = projectId => {
  return {
    toolbar: [
      [{ header: '1' }, { header: '2' }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' }
      ],
      ['link', 'image', 'video'],
      // ['emoji'],
      ['clean']
    ],
    'emoji-toolbar': true,
    'emoji-textarea': false,
    'emoji-shortname': true,
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false
    },
    imageDropAndPaste: {},
    ImageResize: {},
    imageUploader: {
      upload: async file => {
        try {
          Toast({
            content: 'Uploading image, please wait'
          })
          const { data: imageUploaded, error } = await client.mutate({
            mutation: UPLOAD_IMAGE,
            variables: {
              imageUpload: {
                image: file,
                projectId: projectId ? parseFloat(projectId) : null
              }
            }
          })
          let cachedImgs = JSON.parse(
            window?.localStorage.getItem('cached-uploaded-imgs')
          )
          const cachedImgsArray = !!cachedImgs ? cachedImgs : []
          cachedImgsArray.push(imageUploaded?.uploadImage?.projectImageId)
          // TODO: THIS NEEDS TO HAPPEN FOR UPDATE ONLY
          if (window.location.pathname.split('/')[1] === 'create') {
            window?.localStorage.setItem(
              'cached-uploaded-imgs',
              JSON.stringify(cachedImgsArray)
            )
          }

          return imageUploaded?.uploadImage?.url
        } catch (error) {
          console.log({ error })
          alert(JSON.stringify(error))
          return null
        }
      }
    }
  }
}

const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video'
]

function TextRichWithQuill(props) {
  const [content, setContent] = useState('')
  const [mod, setMod] = useState(null)

  const handleChange = html => {
    setContent(html)
    props?.onChange(html)
  }

  useEffect(() => {
    !!props?.defaultValue && setContent(props?.defaultValue)
    !mod && setMod(modules(props?.projectId))
  }, [])

  useEffect(() => {
    !!props?.value && setContent(props?.value)
  }, [props?.value])

  if (!mod) return null
  return (
    <ReactQuill
      modules={mod}
      formats={formats}
      theme='snow'
      ref={props?.ref}
      id={props?.id}
      name={props?.name}
      value={content}
      // defaultValue={props?.defaultValue}
      onChange={handleChange}
      style={props?.style}
    />
  )
}

export default TextRichWithQuill
