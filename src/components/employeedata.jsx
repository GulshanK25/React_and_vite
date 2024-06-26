
import React, { useState, useEffect } from "react";
const Empdata = () => {
    const [employeeData, setEmployeeData] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [showLatestOnly, setShowLatestOnly] = useState(false); 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setEmployeeData(data);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 10000);
        return () => clearInterval(interval);
    }, []);

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const handleToggleShowLatest = () => {
        setShowLatestOnly(prevState => !prevState); 
    };

    const sortedData = employeeData.sort((a, b) => {
        if (sortConfig.key !== null) {
            const key = sortConfig.key;
            if (a[key] < b[key]) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
        }
        return 0;
    });

    const displayedData = showLatestOnly ? sortedData.slice(-5) : sortedData; 
    return (
        <div>
            <h2>Table Displayed</h2>
            <table>
                <thead>
                    <tr>
                        <th onClick={() => handleSort('employee_id')}>ID</th>
                        <th onClick={() => handleSort('employee_name')}>NAME</th>
                        <th onClick={() => handleSort('project_name')}>PROJECT NAME</th>
                        <th onClick={() => handleSort('start_date')}>START DATE</th>
                    </tr>
                </thead>
                <tbody>
                    {displayedData.map((emp) => (
                        <tr key={emp.employee_id}>
                            <td>{emp.employee_id}</td>
                            <td>{emp.employee_name}</td>
                            <td>{emp.project_name}</td>
                            <td>{emp.start_date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="button" onClick={handleToggleShowLatest}>
                {showLatestOnly ? "Show All" : "Show Latest 5"}
            </button>
        </div>
    );
};

export default Empdata;
