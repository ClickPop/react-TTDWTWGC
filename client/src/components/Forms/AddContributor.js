import React from 'react'

export const AddContributor = () => {
  return (
    <div>
      <form>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" id='nameInput' placeholder='Your name' required/>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="text" className="form-control" id='emailInput' placeholder='Your email'/>
        </div>
        <div className="form-group">
          <label htmlFor="bio">Bio</label>
          <textarea type="text" className="form-control" id='bioInput' placeholder='Tell us something about yourself'/>
        </div>
        <div className="form-group">
          <label htmlFor="website">Website</label>
          <input type="text" className="form-control" id='websiteInput' placeholder='Your website'/>
        </div>
        <div className="form-group">
          <label htmlFor="twitter">Twitter</label>
          <input type="text" className="form-control" id='twitterInput' placeholder='Your twitter'/>
          <small>No @ plz</small>
        </div>
        <div className="form-group">
          <label htmlFor="other">Other</label>
          <input type="text" className="form-control" id='otherInput' placeholder='Your other social media'/>
        </div>
        <div className="form-group">
          <label htmlFor="headshot">Headshot</label>
          <input type="file" className="form-control-file" id='headshotInput'/>
        </div>
        <button className='btn btn-primary' >Submit</button>
      </form>
    </div>
  )
}
