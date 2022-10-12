import * as React from 'react';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import axios from '../api/axios';

export default function AssignInstructorModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function submitInstructor() {
    assignInstructor();
    setEmail('');

  }

  let id = localStorage.course;

  const [email, setEmail] = useState('');
  
  const handleEmailChange = event => {
    setEmail(event.target.value);
  }
  
  const assignInstructor = async () => {
    const form = {
      course_id : id ,
      instructor: email,
      
    }
		try {
			await axios.post('/api/v1/assign_instructor', form, {
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
      <button className='button assign'  onClick={handleOpen}>Assign Instrcutor</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
          <div className='add-admin-modal flex column'>
            <h1>Assign instructor</h1>
            <form className='add-admin-form flex column'>
              <label>
                <p>Email</p>
                <input type="email" onChange={handleEmailChange}
                value={email} />
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