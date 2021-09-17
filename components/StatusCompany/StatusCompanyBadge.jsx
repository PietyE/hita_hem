import React from 'react'

const StatusCompanyBadge = (props) => {
  const { status = '', classNameContainer } = props
  const _status = status.replace('_', ' ')
    return (
    <div className={`status ${status} ${classNameContainer}`}>
      <span className={`${status}`}>{_status.toLocaleUpperCase()}</span>
    </div>
  )
}

export default StatusCompanyBadge
