import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { setUserPrefs } from '../store/user.actions.js'
const { useSelector } = ReactRedux 
const { useNavigate } = ReactRouterDOM

export function UserDetails() {


  const { useState } = React

  const loggedInUser = useSelector((storeState) => storeState.loggedInUser)
  const navigate = useNavigate()   

  const [prefs, setPrefs] = useState(loggedInUser.userPrefs || {})

  function handleChange({ target }) {
    const field = target.name
    const value = target.value

    setPrefs(prevPrefs => ({
      ...prevPrefs,
      [field]: value
    }))
  }

  function savePrefs(ev) {
    ev.preventDefault()
    setUserPrefs(prefs)  
    showSuccessMsg('Preferences saved successfully!')
    navigate('/todo') 
  }

  return (
    <form className="user-details" onSubmit={savePrefs}>
      <h1 className="main-header">User Details</h1>
      <h2 className="settings-header">Set preferences</h2>

      <label htmlFor="userName">User Name:</label>
      <input
        type="text"
        id="userName"
        name="userName"
        placeholder="Enter your user name"
        value={prefs.userName || ''}   
        onChange={handleChange}
      />

      <label htmlFor="txt-colour">Set text colour:</label>
      <input
        type="color"
        id="txt-colour"
        name="txt-colour"
        value={prefs['txt-colour'] || '#ffffff'}
        onChange={handleChange}
      />

      <label htmlFor="bgc-colour">Set background colour:</label>
      <input
        type="color"
        id="bgc-colour"
        name="bgc-colour"
        value={prefs['bgc-colour'] || '#000000'}
        onChange={handleChange}
      />

      <button className="save-btn">Save Settings</button>
    </form>
  )
}
