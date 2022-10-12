import React from 'react';
import Panel from '../components/Panel';
import axios from '../api/axios';
import { useEffect, useState } from "react";
import {MdDeleteOutline} from 'react-icons/md';
import { useNavigate } from "react-router-dom";

const Instructor = () => {

    let navigate = useNavigate();

    const [instructor, setInstructor] = useState([]);
    const [instructorCourses, setInstructorCourses] = useState([]);

    let id = localStorage.instructor;

    const showInstructor = async (id) => {
		try {
			const data = await axios.get(`/api/v1/view_instructor/${id}`, {
				headers: {
					Authorization: `bearer ${localStorage.token}`
				}
			});

			setInstructor(data.data.data);
            setInstructorCourses(data.data.data.courses);
		} catch (error) {
			console.log(error);
		}
	};

    const deleteInstructor = async (id) => {
		const form = {
            id: id
        }
        try {
			await axios.post('/api/v1/remove_instructor', form, {
				headers: {
					Authorization: `bearer ${localStorage.token}`
				}
			});
            navigate(-1);

		} catch (error) {
			console.log(error);
		}
	};

    useEffect(() => {
        showInstructor(id) 
    }, [])


  return (
    <div className='flex'>
      <Panel />
      <div className='dashboard view-page'>
        <h1>Name: {instructor.name}</h1>
        <h2>Email: {instructor.email}</h2>
        <div className='view-container'>
            <h3>Courses:</h3>
            <ul className='view-list'>
            {instructorCourses.map((user) => (
		    				<li key={instructor._id}>
		    					<p>{user.name}</p>
		    				</li>
		    	))}
            </ul>
        </div>
        <button className='delete-button' onClick={() => deleteInstructor(instructor._id)}>
            <MdDeleteOutline className='delete-icon' />
        </button>
      </div>
    </div>
  );
}

export default Instructor;