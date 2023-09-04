import React from 'react';

function MainTable({
  title,
  fields,
  data,
  onDelete,
  onAdd,
  tableClassName,
  onAddState,
}) {
  console.log('data', data);
  return (
    <div className="flex flex-col">
      <table className={tableClassName}>
        <thead className="border-2 bg-gray-400 text-white">
          <tr>
            {fields.map((field) => (
              <th key={field} className="border-2 p-2">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </th>
            ))}
            {onAdd && <th className="border-2">Actions</th>}
          </tr>
        </thead>
        <tbody className="text-center items-center border-2">
          {data.map((item, i) => (
            <tr
              key={item.id}
              className={`border-2 ${i % 2 === 0 ? 'bg-gray-100' : ''}`}
            >
              {fields.map((field) => (
                <td key={field} className="border-2 p-2">
                  {field === 'password'
                    ? `${item[field].slice(0, 10)}...`
                    : item[field]}
                </td>
              ))}
              {onAdd && (
                <td className="border-2 p-2">
                  <button
                    className="p-2 bg-red-400 rounded-xl text-white hover:bg-red-500"
                    onClick={() => onDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <button
        className={
          onAddState
            ? 'bg-green-400 text-white p-2 hover:bg-green-500'
            : 'bg-red-200 text-white p-2 hover:bg-red-300'
        }
        onClick={onAdd}
      >
        {onAddState ? 'Add' + ' ' + title : 'Cancel'}
      </button>
    </div>
  );
}

export default MainTable;
