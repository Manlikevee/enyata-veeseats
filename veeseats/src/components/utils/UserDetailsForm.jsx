import React from 'react';

function UserDetailsForm({ userdetails, handleChange, handleSubmit, isLoading }) {


    const experienceLevels = [
        'Entry Level',
        'Junior',
        'Mid-Level',
        'Senior',
        'Lead',
        'Manager',
        'Director',
        'Executive'
      ];
      const handleToggleChange = (e) => {
        handleChange({
          target: {
            name: e.target.name,
            value: e.target.checked
          }
        });
      };

  return (
    <form onSubmit={handleSubmit}>
      <div className="miniforminput">
        <label htmlFor="first_name">First Name</label>
        <div className="miniforminputdata">
          <input
            type="text"
            name="first_name"
            value={userdetails[0].first_name}
            onChange={handleChange}
            placeholder="Enter First Name"
            required
          />
        </div>
      </div>

      <div className="miniforminput">
        <label htmlFor="last_name">Last Name</label>
        <div className="miniforminputdata">
          <input
            type="text"
            name="last_name"
            value={userdetails[0].last_name}
            onChange={handleChange}
            placeholder="Enter Last Name"
            required
          />
        </div>
      </div>

      <div className="miniforminput">
        <label htmlFor="work_type">Work Type</label>
        <div className="miniforminputdata">
          <input
            type="text"
            name="work_type"
            value={userdetails[0].work_type}
            onChange={handleChange}
            placeholder="Enter Work Type"
            required
          />
        </div>
      </div>



      <div className="miniforminput">
        <label htmlFor="experience_level">Experience Level</label>
        <div className="miniforminputdata">
        <select
            name="experience_level"
            value={userdetails[0].experience_level}
            onChange={handleChange}
            required
          >
            <option value="">Select Experience Level</option>
           
            {experienceLevels.map((level, index) => (
              <option key={index} value={level}>
                {level}
              </option>
            ))}

          </select>
        </div>
      </div>

      <div className="miniforminput">
        <label htmlFor="model_name">Model Name</label>
        <div className="miniforminputdata">
          <input
            type="text"
            name="model_name"
            value={userdetails[0].model_name}
            onChange={handleChange}
            placeholder="Enter Model Name"
            required
          />
        </div>
      </div>

      <div className="miniforminput">
        <label htmlFor="profile_summary">Profile Summary</label>
        <div className="miniforminputdata">
          <textarea
            name="profile_summary"
            value={userdetails[0].profile_summary}
            onChange={handleChange}
            cols="30"
            rows="5"
            placeholder="Enter Profile Summary"
            required
          />
        </div>
      </div>

<div className="miniforminput">

<div className="checkbox-item">
<label htmlFor="anonymous">Anonymous</label>
  <input
    type="checkbox"
    name="anonymous"
    checked={userdetails[0].anonymous}
    onChange={handleToggleChange}
  />
</div>
<label htmlFor="">
  <i>Tick to create the model anonymously, without linking it to your Veeseats account.</i>
</label>
</div>


   

      {isLoading ?        
   <button id="loadingBtn" className='mybtn' >

   <span className='loading-spinner'></span> 
    </button> :    <button type="submit">Submit</button> }
    </form>
  );
}

export default UserDetailsForm;
