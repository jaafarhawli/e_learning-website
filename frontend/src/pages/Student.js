import React from 'react';
import Panel from '../components/Panel';
import axios from '../api/axios';
import { useEffect, useState } from "react";
import {MdDeleteOutline} from 'react-icons/md';
import { useNavigate } from "react-router-dom";

const Student = () => {

    let navigate = useNavigate();

    const [student, setStudent] = useState([]);
    const [studentCourses, setStudentCourses] = useState([]);

    let id = localStorage.student;

    const showStudent = async (id) => {
		try {
			const data = await axios.get(`/api/v1/view_student/${id}`, {
				headers: {
					Authorization: `bearer ${localStorage.token}`
				}
			});

			setStudent(data.data.data);
            setStudentCourses(data.data.data.courses);
		} catch (error) {
			console.log(error);
		}
	};

    const deleteStudent = async (id) => {
		const form = {
            id: id
        }
        try {
			await axios.post('/api/v1/remove_student', form, {
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
        showStudent(id) 
    }, [])


  return (
    <div className='flex'>
      <Panel />
      <div className='dashboard view-page'>
        <h1>Name: {student.name}</h1>
        <h2>Email: {student.email}</h2>
        <div className='view-container'>
            <h3>Courses:</h3>
            <ul className='view-list'>
            {studentCourses.map((user) => (
		    				<li key={student._id}>
		    					<p>{user.name}</p>
		    				</li>
		    	))}
            </ul>
        </div>
        <button className='delete-button' onClick={() => deleteStudent(student._id)}>
            <MdDeleteOutline className='delete-icon' />
        </button>
      </div>
    </div>
  );
}

export default Student;