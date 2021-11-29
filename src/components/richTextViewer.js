import React, { useState, useEffect } from 'react'
import ReactQuill, { Quill } from 'react-quill'

window.Quill = Quill

const Link = Quill?.import('formats/link')

class linkType extends Link {
  static create(value) {
    let node = super.create(value)
    value = this.sanitize(value)
    node.target = '_blank'
    node.href = /^(?:f|ht)tps?\:\/\//.test(value) ? value : `//${value}`
    node.removeAttribute('rel')
    return node
  }
}

Quill.register(linkType)

function RichTextViewer(props) {
  const [content, setContent] = useState('')

  useEffect(() => {
    setContent(props?.content)
  }, [props])

  return (
    <div>
      <ReactQuill
        style={{ fontFamily: `Red Hat Text, sans serif` }}
        value={content}
        readOnly
        theme={'bubble'}
      />
    </div>
  )
}

export default RichTextViewer
