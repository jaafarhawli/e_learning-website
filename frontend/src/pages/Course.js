import React from 'react';
import Panel from '../components/Panel';
import axios from '../api/axios';
import { useEffect, useState } from "react";
import {MdDeleteOutline} from 'react-icons/md';
import { useNavigate } from "react-router-dom";

const Course = () => {

    let navigate = useNavigate();

    const [Course, setCourse] = useState([]);
    const [CourseCourses, setCourseCourses] = useState([]);

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
      <div className='dashboard'>
        <h1>Name: {Course.name}</h1>
        <h2>Instructors:</h2>
        <ul>
        {CourseInstructors.map((user) => (
						<li key={Course._id}>
							<p>{user.name}</p>
						</li>
			))}
        </ul>
        <h2>Students:</h2>
        <ul>
        {CourseStudents.map((user) => (
						<li key={Course._id}>
							<p>{user.name}</p>
						</li>
			))}
        </ul>
        <button className='delete-button' onClick={() => deleteCourse(Course._id)}>
            <MdDeleteOutline className='delete-icon' />
        </button>
      </div>
    </div>
  );
}

export default Course;