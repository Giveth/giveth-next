import React from 'react'
import dynamic from 'next/dynamic'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

function RichTextViewer({ content }) {
  return (
    <div>
      <ReactQuill
        style={{ fontFamily: `Red Hat Text, sans serif` }}
        value={content}
        readOnly
        theme={'bubble'}
      />
    </div>
    // <div
    //   style={{ fontFamily: `Red Hat Text, sans serif` }}
    //   dangerouslySetInnerHTML={{ __html: content }}
    // ></div>
  )
}

export default RichTextViewer
