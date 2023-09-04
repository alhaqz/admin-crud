import React, { useState } from 'react';

function AddUserForm({ title, fields, onSubmit }) {
  const [formData, setFormData] = useState({});

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    const updatedData = { ...formData };

    if (files) {
      updatedData[name] = files[0];
    } else {
      updatedData[name] = value;
    }

    setFormData(updatedData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('updateData', formData);
    onSubmit(formData);
    console.log('formDAta', formData);
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-center">{title}</h2>
      <form>
        <table className="border-2">
          <tbody className="border-2">
            {fields.map((field) => (
              <tr key={field.name}>
                <td className="border-2">{field.label}:</td>
                <td className="border-2">
                  {field.type === 'file' ? (
                    <input
                      type={field.type}
                      name={field.name}
                      accept={field.accept}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      value={formData[field.name] || ''}
                      onChange={handleInputChange}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex">
          <button
            className="bg-yellow-400 flex-1 text-white hover:bg-yellow-500"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddUserForm;
