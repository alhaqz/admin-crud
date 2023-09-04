'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import MainTable from '@/components/table/MainTabel';
import AddUserForm from '@/components/table/AddUserForm';

function EmployeePage() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [employeeImage, setEmployeeImage] = useState(null);
  const [showAddEmployeeForm, setShowAddEmployeeForm] = useState(false);

  const addEmployeeFields = [
    { name: 'name', label: 'Name', type: 'text', placeholder: 'Name' },
    {
      name: 'position',
      label: 'Position',
      type: 'text',
      placeholder: 'Position',
    },
    { name: 'employeeImage', label: 'Image', type: 'file', accept: 'image/*' },
  ];

  const employeeFields = ['name', 'position', 'photos'];

  const api = 'http://localhost:3001';

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${api}/api/employees`);
      setEmployees(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const deleteEmployee = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this employee?'
    );

    if (!confirmDelete) {
      return;
    }
    try {
      await axios.delete(`${api}/api/employees/${id}`);
      console.log('Employee deleted successfully');
      fetchEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const addEmployee = async (formDatas) => {
    const { name, position, employeeImage } = formDatas;

    if (!name || !position) {
      console.error('Name and Position are required');
      return;
    }

    if (!employeeImage) {
      console.error('Please select an image');
      return;
    }

    const maxSizeInBytes = 300 * 1024; // 300KB
    if (employeeImage.size > maxSizeInBytes) {
      console.error('Image size exceeds the maximum limit of 300KB');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('position', position);
    formData.append('photo', employeeImage);

    try {
      const response = await axios.post(`${api}/api/employees`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Employee added successfully:', response.data);

      setName('');
      setPosition('');
      setEmployeeImage(null);

      fetchEmployees();
      setShowAddEmployeeForm(false);
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  return (
    <div className="flex items-center min-h-screen justify-center flex-col">
      <h1 className="text-xl">Employee Table</h1>

      <MainTable
        title="Employee"
        fields={employeeFields}
        data={employees}
        onDelete={deleteEmployee}
        onAdd={() => setShowAddEmployeeForm(!showAddEmployeeForm)}
        tableClassName="border-2 items-center text-center w-[90vw]"
        onAddState={!showAddEmployeeForm}
      />
      {showAddEmployeeForm && (
        <div className="my-10">
          <AddUserForm
            title="Add Employee"
            fields={addEmployeeFields}
            onSubmit={addEmployee}
          />
        </div>
      )}
    </div>
  );
}

export default EmployeePage;
