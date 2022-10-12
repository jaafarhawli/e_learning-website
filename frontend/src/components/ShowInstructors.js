import React from 'react';
import axios from '../api/axios';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


 const ShowInstructors = () => {

    let navigate = useNavigate(); 
     
    const showInstructor = (id) => { 
    localStorage.setItem('instructor', id);
    let path = `instructor`; 
    navigate(path);
    window.location.reload(false);
    }

    const [users, setUsers] = useState([]);

    const showInstructors = async () => {
		try {
			const data = await axios.get('/api/v1/view_instructors', {
				headers: {
					Authorization: `bearer ${localStorage.token}`
				}
			});
			setUsers(data.data.data) ;
            return data.data.data;
		} catch (error) {
			console.log(error);
		}
	};

    useEffect(() => {
        showInstructors() 
    }, [])

	return (
		<div className="dashboard-elements">
			{users.map((user) => (
					<div className="dashboard-components flex shadow" key={user._id} onClick={() => showInstructor(user._id)}>
						<div className="admin-name">
							<p>{user.name}</p>
						</div>
						<p>{user.email}</p>
					</div>
			))}
		</div>
	);
};

export default ShowInstructors;