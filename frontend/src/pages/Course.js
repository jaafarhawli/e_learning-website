import React from 'react';
import Panel from '../components/Panel';
import axios from '../api/axios';
import { useEffect, useState } from "react";
import {MdDeleteOutline} from 'react-icons/md';
import { useNavigate } from "react-router-dom";
import AssignInstructorModal from '../components/AssignInstructor';

const Course = () => {

    let navigate = useNavigate();

    const [Course, setCourse] = useState([]);
    const [CourseInstructors, setCourseInstructors] = useState([]);
    const [CourseStudents, setCourseStudents] = useState([]);

    let id = localStorage.course;

    const showCourse = async (id) => {
		try {
			const data = await axios.get(`/api/v1/view_course/${id}`, {
				headers: {
					Authorization: `bearer ${localStorage.token}`
				}
			});

			setCourse(data.data.data);
            setCourseInstructors(data.data.data.instructors);
            setCourseStudents(data.data.data.students);
		} catch (error) {
			console.log(error);
		}
	};

    const deleteCourse = async (id) => {
		const form = {
            id: id
        }
        try {
			await axios.post('/api/v1/remove_course', form, {
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
        showCourse(id) 
    }, [])


  return (
    <div className='flex'>
      <Panel />
      <div className='dashboard view-page'>
        <h1>Name: {Course.name}</h1>
        <h3>Instructors:</h3>
        <ul className='view-list'>
        {CourseInstructors.map((user) => (
						<li key={user._id} className='flex course-list'>
							<p>{user.name}</p>
                            <p>{user.email}</p>
						</li>
			))}
        </ul>
        <h3>Students:</h3>
        <ul className='view-list'>
        {CourseStudents.map((user) => (
						<li key={user._id} className='flex course-list'>
							<p>{user.name}</p>
                            <p>{user.email}</p>
						</li>
			))}
        </ul>
        <div className='flex course-buttons'>
            <AssignInstructorModal />
            <button className='button delete' onClick={() => deleteCourse(Course._id)}>
                <MdDeleteOutline className='delete-icon' />
            </button>
            
        </div>
      </div>
    </div>
  );
}

export default Course;