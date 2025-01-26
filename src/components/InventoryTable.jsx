import React from 'react';
import { ArrowUpDown, Pencil, Trash2 } from 'lucide-react';

export function InventoryTable({ items, onEdit, onDelete, sortDirection, onSort }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Name</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Category</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 cursor-pointer group" onClick={onSort}>
              <div className="flex items-center gap-2">
                Quantity
                <ArrowUpDown className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
              </div>
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Price</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Description</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {items.map((item) => (
            <tr 
              key={item.id}
              className={`hover:bg-gray-50 transition-colors duration-200 ${
                item.quantity < 10 ? 'bg-red-50 animate-pulse' : ''
              }`}
            >
              <td className="px-6 py-4 text-sm text-gray-800">{item.name}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{item.category}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{item.quantity}</td>
              <td className="px-6 py-4 text-sm text-gray-600">${item.price.toFixed(2)}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{item.description}</td>
              <td className="px-6 py-4 text-sm space-x-2">
                <button
                  onClick={() => onEdit(item)}
                  className="text-blue-600 hover:text-blue-800 transition-colors duration-200 transform hover:scale-110"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="text-red-600 hover:text-red-800 transition-colors duration-200 transform hover:scale-110"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}