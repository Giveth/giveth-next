import React from 'react'
import ReactQuill from 'react-quill'

const RichTextViewer = ({ content }) => {
  return <ReactQuill value={content} readOnly theme='bubble' />
}

export default RichTextViewer
