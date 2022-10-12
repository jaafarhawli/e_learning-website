import * as React from 'react';
import Modal from '@mui/material/Modal';
import {BsPlusLg} from 'react-icons/bs'
import { useState } from 'react';

export default function AddAdminModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function submitAdmin() {
    console.log('hi');
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
            <h1>Add admin</h1>
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
                <button type="button" className='button' onClick={submitAdmin}>Submit</button>
              </div>
            </form>
          </div>
      </Modal>
    </div>
  );
}


