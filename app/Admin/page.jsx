"use client";

import React, { useState } from 'react';
import styles from './admin.module.css';
import Link from 'next/link';

export default function Admin() {
  // Sample data for the charts
  const chartData = [
    { month: 'Jan', value: 65 },
    { month: 'Feb', value: 59 },
    { month: 'Mar', value: 80 },
    { month: 'Apr', value: 55 },
    { month: 'May', value: 40 },
    { month: 'Jun', value: 70 },
    { month: 'Jul', value: 60 },
    { month: 'Aug', value: 75 },
    { month: 'Sep', value: 85 },
    { month: 'Oct', value: 50 },
    { month: 'Nov', value: 45 },
    { month: 'Dec', value: 90 },
  ];

  // Sample data for the table
  const tableData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Driver', status: 'active', date: '2025-05-01' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Customer', status: 'pending', date: '2025-05-02' },
    { id: 3, name: 'Robert Johnson', email: 'robert@example.com', role: 'Driver', status: 'inactive', date: '2025-05-03' },
    { id: 4, name: 'Emily Davis', email: 'emily@example.com', role: 'Customer', status: 'active', date: '2025-05-04' },
    { id: 5, name: 'Michael Wilson', email: 'michael@example.com', role: 'Driver', status: 'active', date: '2025-05-05' },
    { id: 6, name: 'Sarah Brown', email: 'sarah@example.com', role: 'Customer', status: 'pending', date: '2025-05-06' },
  ];

  // State for form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Reset form after submission
    setFormData({ name: '', email: '' });
  };

  return (
    <div className={styles.adminContainer}>
      {/* Header/Navigation Section */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1>Admin Dashboard</h1>
          <div className={styles.breadcrumbs}>
            Dashboard / Overview
          </div>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.filterContainer}>
            <select className={styles.filterSelect}>
              <option value="all">All Data</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
            <select className={styles.filterSelect}>
              <option value="all">All Users</option>
              <option value="drivers">Drivers</option>
              <option value="customers">Customers</option>
            </select>
          </div>
          <div className={styles.searchContainer}>
            <input type="text" placeholder="Search..." className={styles.searchInput} />
          </div>
        </div>
      </div>

      {/* Analytics/Charts Section */}
      <div className={styles.analyticsSection}>
        <div className={styles.sectionHeader}>
          <h2>Performance Analytics</h2>
          <div className={styles.notificationBadge}>
            <span className={styles.notificationCount}>3</span>
          </div>
        </div>
        
        <div className={styles.chartContainer}>
          {chartData.map((item, index) => (
            <div key={index} className={styles.chartBar}>
              <div 
                className={styles.bar} 
                style={{ height: `${item.value}%` }}
              ></div>
              <div className={styles.barLabel}>{item.month}</div>
            </div>
          ))}
        </div>
        
        <div className={styles.analyticsFooter}>
          <div className={styles.progressBar}>
            <div className={styles.progress} style={{ width: '75%' }}></div>
          </div>
          <button className={styles.viewDetailsButton}>View Details</button>
        </div>
      </div>

      {/* Data Table Section */}
      <div className={styles.tableSection}>
        <h2>User Management</h2>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index} className={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>{row.email}</td>
                <td>{row.role}</td>
                <td>
                  <span className={`${styles.statusIndicator} ${styles[row.status]}`}>
                    {row.status}
                  </span>
                </td>
                <td>{row.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Form Section */}
      <div className={styles.formSection}>
        <h2>Add New User</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <div className={styles.inputGroup}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter name"
                className={styles.formInput}
              />
            </div>
            
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email"
                className={styles.formInput}
              />
            </div>
          </div>
          
          <button type="submit" className={styles.submitButton}>
            Add User
          </button>
        </form>
      </div>
    </div>
  );
}
