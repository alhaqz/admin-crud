'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MainTable from '@/components/table/MainTabel';
import AddUserForm from '@/components/table/AddUserForm';
import { useSelector } from 'react-redux';

function UserPage() {
  const isLogin = useSelector((state) => state.auth.user);
  const [users, setUsers] = useState([]);
  const [showAddUserForm, setShowAddUserForm] = useState(false);

  const userFields = ['id', 'username', 'email', 'password'];

  const addUserFields = [
    {
      name: 'username',
      label: 'Username',
      type: 'text',
      placeholder: 'Username',
    },
    { name: 'email', label: 'Email', type: 'text', placeholder: 'Email' },
    {
      name: 'password',
      label: 'Password',
      type: 'text',
      placeholder: 'Password',
    },
  ];

  const api = 'http://localhost:3001';

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${api}/api/users`);
      setUsers(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this user?'
    );

    if (!confirmDelete) {
      return; // User canceled the deletion
    }

    try {
      await axios.delete(`${api}/api/users/${id}`);
      console.log('User deleted successfully');
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const addUser = async (formData) => {
    const { username, email, password } = formData;
    const isUsernameUnique = users.every((user) => user.username !== username);

    if (!isUsernameUnique) {
      console.error('Username is already used');
      return;
    }

    // Check if the email contains the "@" symbol
    if (!email.includes('@')) {
      console.error('Email must contain "@" symbol');
      return;
    }
    try {
      const response = await axios.post(`${api}/api/users`, {
        username,
        email,
        password,
      });
      console.log('User added successfully:', response.data);
      // Clear input fields after adding user
      setUsername('');
      setEmail('');
      setPassword('');
      // Refresh the user list after adding
      fetchUsers();
      setShowAddUserForm(false);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return isLogin ? (
    <div className="flex items-center min-h-screen justify-center flex-col">
      <h1 className="text-xl my-10">User Table</h1>
      <MainTable
        title="User"
        fields={userFields}
        data={users}
        onDelete={deleteUser}
        onAdd={() => setShowAddUserForm(!showAddUserForm)}
        tableClassName="p-4 items-center text-center rounded-xl"
        onAddState={!showAddUserForm}
      />

      {showAddUserForm && (
        <div className="my-10">
          <AddUserForm
            title="Add New User"
            fields={addUserFields}
            onSubmit={addUser}
          />
        </div>
      )}
    </div>
  ) : (
    <div className="flex items-center min-h-screen justify-center flex-col">
      You need to login to access this pages
    </div>
  );
}

export default UserPage;
