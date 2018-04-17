import React from "react"

const Member = ({ data }) => {
  return(
    <div>
      <p>{data.name}</p>
      <img src={data.profile_image_url}/>
    </div>
  )
}

export default Member