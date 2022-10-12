import React from 'react';
import axios from '../api/axios';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


 const ShowCourses = () => {

    let navigate = useNavigate(); 
     
    const showCourse = (id) => { 
    localStorage.setItem('course', id);
    let path = `course`; 
    navigate(path);
    window.location.reload(false);
    }

    const [courses, setCourses] = useState([]);

    const showCourses = async () => {
		try {
			const data = await axios.get('/api/v1/view_courses', {
				headers: {
					Authorization: `bearer ${localStorage.token}`
				}
			});
			setCourses(data.data.data) ;
		} catch (error) {
			console.log(error);
		}
	};

    useEffect(() => {
        showCourses() 
    }, [])

	return (
		<div className="dashboard-elements">
			{courses.map((course) => (
					<div className="dashboard-components flex shadow" key={course._id} onClick={() => showCourse(course._id)}>
						<div className="course-name">
							<p>{course.name}</p>
						</div>
						<p>{course.email}</p>
					</div>
			))}
		</div>
	);
};

export default ShowCourses;