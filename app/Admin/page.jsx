"use client";

import React, { useState } from 'react';
import styles from './admin.module.css';
import ProtectedRoute from '@/components/routeprotected';
import Link from 'next/link';

export default function Admin() {
  // Sample chart and table data
  const chartData = [
    { month: 'Jan', value: 65 }, { month: 'Feb', value: 59 }, { month: 'Mar', value: 80 },
    { month: 'Apr', value: 55 }, { month: 'May', value: 40 }, { month: 'Jun', value: 70 },
    { month: 'Jul', value: 60 }, { month: 'Aug', value: 75 }, { month: 'Sep', value: 85 },
    { month: 'Oct', value: 50 }, { month: 'Nov', value: 45 }, { month: 'Dec', value: 90 },
  ];

  const tableData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Driver', status: 'active', date: '2025-05-01' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Customer', status: 'pending', date: '2025-05-02' },
    { id: 3, name: 'Robert Johnson', email: 'robert@example.com', role: 'Driver', status: 'inactive', date: '2025-05-03' },
    { id: 4, name: 'Emily Davis', email: 'emily@example.com', role: 'Customer', status: 'active', date: '2025-05-04' },
    { id: 5, name: 'Michael Wilson', email: 'michael@example.com', role: 'Driver', status: 'active', date: '2025-05-05' },
    { id: 6, name: 'Sarah Brown', email: 'sarah@example.com', role: 'Customer', status: 'pending', date: '2025-05-06' },
  ];

  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '' });
  };

  return (
    <ProtectedRoute allowedRoles={['Admin']}>
      <div className={styles.adminContainer}>
        {/* Header Section */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h1>Admin Dashboard</h1>
            <div className={styles.breadcrumbs}>Dashboard / Overview</div>
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

        {/* Analytics Section */}
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
                <div className={styles.bar} style={{ height: `${item.value}%` }}></div>
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

        {/* User Table Section */}
        <div className={styles.tableSection}>
          <h2>User Management</h2>
          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th>ID</th><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Date</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
                  <td>{row.id}</td>
                  <td>{row.name}</td>
                  <td>{row.email}</td>
                  <td>{row.role}</td>
                  <td><span className={`${styles.statusIndicator} ${styles[row.status]}`}>{row.status}</span></td>
                  <td>{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add User Form */}
        <div className={styles.formSection}>
          <h2>Add New User</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <div className={styles.inputGroup}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter name" className={styles.formInput} />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Enter email" className={styles.formInput} />
              </div>
            </div>
            <button type="submit" className={styles.submitButton}>Add User</button>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
}
