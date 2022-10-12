import React from 'react';
import Panel from '../components/Panel';
import axios from '../api/axios';
import { useEffect, useState } from "react";

const Instructor = () => {

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

    useEffect(() => {
        showInstructor(id) 
    }, [])


  return (
    <div className='flex'>
      <Panel />
      <div className='dashboard'>
        <h1>Name: {instructor.name}</h1>
        <h2>Email: {instructor.email}</h2>
        <h2>Courses:</h2>
        <ul>
        {instructorCourses.map((user) => (
						<li key={instructor._id}>
							<p>{user.name}</p>
						</li>
			))}
        </ul>
        <button>Assign Course</button>
      </div>
    </div>
  );
}

export default Instructor;