import React from 'react'

const TopSection = ({ content = {} }) => {
  return (
    <>
      {content?.image && (
        <div className="top_section">
          <img alt="foto" src={content.image} className="backgroung_pic" />
          <h1 className="top_section_title">{content.title}</h1>
          <span className="top_section_description">{content.description}</span>
        </div>
      )}
    </>
  )
}

export default TopSection
