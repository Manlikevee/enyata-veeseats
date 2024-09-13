import React from 'react'

const Passwordstrength = ({password}) => {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasMinLength = password.length >= 8;
  return (
        <div className="passwordstrength">
        <div className="overview-text-subheader">Password must contain</div>
  
        <div className="passwordflex">
          <div className={`passwordicon ${hasUpperCase ? 'activeicon' : ''}`}>
          <span className="material-symbols-outlined">
check_circle
</span>
          </div>
          <div className={`helpertext ${hasUpperCase ? 'activeicon' : ''}`}>
            At least 1 uppercase
          </div>
        </div>
  
        <div className="passwordflex">
          <div className={`passwordicon ${hasNumber ? 'activeicon' : ''}`}>
          <span className="material-symbols-outlined">
check_circle
</span>
          </div>
          <div className={`helpertext ${hasNumber ? 'activeicon' : ''}`}>
            At least 1 number
          </div>
        </div>
  
        <div className="passwordflex">
          <div className={`passwordicon ${hasMinLength ? 'activeicon' : ''}`}>
          <span className="material-symbols-outlined">
check_circle
</span>
          </div>
          <div className={`helpertext ${hasMinLength ? 'activeicon' : ''}`}>
            At least 8 characters
          </div>
        </div>
      </div>
  )
}

export default Passwordstrength