import * as React from 'react';
import Modal from '@mui/material/Modal';
import {BsPlusLg} from 'react-icons/bs'
import { useState } from 'react';
import axios from '../api/axios';

export default function AddCourseModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function submitCourse() {
    addCourse();
    setName('');
  }

  const [name, setName] = useState('');

  const handleNameChange = event => {
    setName(event.target.value);
  }

  const addCourse = async () => {
    const form = {
      admin_id: localStorage.id,
      name: name,
    }
		try {
			await axios.post('/api/v1/add_course', form, {
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
            <h1>Add Course</h1>
            <form className='add-admin-form flex column'>
              <label>
                <p>Name</p>
                <input type="text" onChange={handleNameChange}
                value={name} />
              </label>
              <div>
                <button type="button" className='button' onClick={submitCourse}>Submit</button>
              </div>
            </form>
          </div>
      </Modal>
    </div>
  );
}