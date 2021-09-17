import React from 'react'

const InfoWithTitle = ({
  title = '',
  info = '',
  classNameContainer = '',
  isLink = false,
  href,
}) => {
  const infoComponent = isLink ? (
    <a className="info link" href={href} target="_blank" rel="noreferrer">
      {info}
    </a>
  ) : (
    <span className="info">{info}</span>
  )
  return (
    <div className={`info_container ${classNameContainer}`}>
      <span className="title">{title}</span>
      {infoComponent}
    </div>
  )
}

export default InfoWithTitle
