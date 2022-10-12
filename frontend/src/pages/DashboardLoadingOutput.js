import React from 'react';
import Loader from './Loader';

const DashboardLoadingOutput = ({ items, isLoading }) => {
    return isLoading ? (   //Checkif if is loading
    <Loader/>
    ) : (
        <div className="dashboard-elements">
            {items.map((item) => (
                <div className="dashboard-components flex shadow" key={item._id}>
                    <div className="admin-name">
                        <p>{item.name}</p>
                    </div>
                    <p>{item.email}</p>
                </div>
            ))}
        </div>
    )
}

export default DashboardLoadingOutput;
