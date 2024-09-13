import React from 'react'

const page = () => {
  return (
    <AiLayout hidelinks>


<div className="chatbar">
            <div className="chatinput">
              <div className="buttonicon greyicon">
                <span className="material-symbols-outlined">upload_file</span>
              </div>
              <input
                type="text"
                placeholder="VeeAi. Prepare with personalized insights and guidance."
              />
              <div className="buttonicon">
                <span className="material-symbols-outlined">keyboard_arrow_up</span>
              </div>
            </div>
          </div>

        </AiLayout>
  )
}

export default page