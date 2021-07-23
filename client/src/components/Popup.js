import React from 'react'

const Popup = ({ content, children }) => {
  return <Popup inverted content={content} trigger={children} />
}

export default Popup
