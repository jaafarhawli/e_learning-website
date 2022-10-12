import React from 'react';
import axios from '../api/axios';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


 const ShowStudents = () => {

    let navigate = useNavigate(); 
     
    const showStudent = (id) => { 
    localStorage.setItem('student', id);
    let path = `student`; 
    navigate(path);
    window.location.reload(false);
    }

    const [users, setUsers] = useState([]);

    const showStudents = async () => {
		try {
			const data = await axios.get('/api/v1/view_students', {
				headers: {
					Authorization: `bearer ${localStorage.token}`
				}
			});
			setUsers(data.data.data) ;
		} catch (error) {
			console.log(error);
		}
	};

    useEffect(() => {
        showStudents() 
    }, [])

	return (
		<div className="dashboard-elements">
			{users.map((user) => (
					<div className="dashboard-components flex shadow" key={user._id} onClick={() => showStudent(user._id)}>
						<div className="admin-name">
							<p>{user.name}</p>
						</div>
						<p>{user.email}</p>
					</div>
			))}
		</div>
	);
};

export default ShowStudents;