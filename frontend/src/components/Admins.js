import React from 'react';
import axios from '../api/axios';
import { useEffect, useState } from "react";

const Admins = () => {

    const [users, setUsers] = useState([]);

	const showAdmins = async () => {
		try {
			const data = await axios.get('/api/v1/view_admins', {
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
        showAdmins() 
    }, [])

	return (
		<div className="dashboard-elements">
			{users.map((user) => (
					<div className="dashboard-components flex shadow" key={user._id}>
						<div className="admin-name">
							<p>{user.name}</p>
						</div>
						<p>{user.email}</p>
					</div>
			))}
		</div>
	);
};

export default Admins;
