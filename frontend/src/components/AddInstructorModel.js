import * as React from 'react';
import Modal from '@mui/material/Modal';
import {BsPlusLg} from 'react-icons/bs'
import { useState } from 'react';
import axios from '../api/axios';

export default function AddInstructorModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function submitInstructor() {
    addInstructor();
    setName('');
    setEmail('');
    setPassword('');
  }

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNameChange = event => {
    setName(event.target.value);
  }
  
  const handleEmailChange = event => {
    setEmail(event.target.value);
  }
  
  const handlePasswordChange = event => {
    setPassword(event.target.value);
  }

  const addInstructor = async () => {
    const form = {
      admin_id: localStorage.id,
      name: name,
      email: email,
      password: password 
    }
		try {
			await axios.post('/api/v1/add_instructor', form, {
				headers: {
					Authorization: `bearer ${localStorage.token}`
				}
			});
            handleClose();
            window.location.reload(false);
		} catch (error) {
			console.log(error);
		}
	};

  return (
    <div>
      <button className='add-button' onClick={handleOpen}>
        <BsPlusLg className='add-icon'/>
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
          <div className='add-admin-modal flex column'>
            <h1>Add instructor</h1>
            <form className='add-admin-form flex column'>
              <label>
                <p>Name</p>
                <input type="text" onChange={handleNameChange}
                value={name} />
              </label>
              <label>
                <p>Email</p>
                <input type="email" onChange={handleEmailChange}
                value={email} />
              </label>
              <label>
                <p>Password</p>
                <input type="password" onChange={handlePasswordChange}
                value={password} />
              </label>
              <div>
                <button type="button" className='button' onClick={submitInstructor}>Submit</button>
              </div>
            </form>
          </div>
      </Modal>
    </div>
  );
}