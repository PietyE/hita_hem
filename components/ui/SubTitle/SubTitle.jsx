import React from 'react'

const SubTitle = ({ content, wishLine = true, linePosition = 'left' }) => {
  const classNameLine = wishLine ? 'line' : ''
  return (
    <div className={`subtitle_container ${classNameLine} ${linePosition}`}>
      <span className="subtitle_content">{content}</span>
    </div>
  )
}

export default SubTitle
