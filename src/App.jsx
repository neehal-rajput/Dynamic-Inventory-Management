import React, { useState, useMemo } from 'react';
import { InventoryTable } from './components/InventoryTable';
import { ItemForm } from './components/ItemForm';
import { initialItems } from './data';
import { Plus, Package } from 'lucide-react';

function App() {
  const [items, setItems] = useState(initialItems);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortDirection, setSortDirection] = useState('desc');

  const categories = useMemo(() => {
    return Array.from(new Set(items.map(item => item.category)));
  }, [items]);

  const filteredAndSortedItems = useMemo(() => {
    return items
      .filter(item => !categoryFilter || item.category === categoryFilter)
      .sort((a, b) => {
        return sortDirection === 'asc' 
          ? a.quantity - b.quantity 
          : b.quantity - a.quantity;
      });
  }, [items, categoryFilter, sortDirection]);

  const handleAddItem = (newItem) => {
    const item = {
      ...newItem,
      id: Date.now().toString(),
    };
    setItems(prev => [...prev, item]);
  };

  const handleEditItem = (updatedItem) => {
    setItems(prev => prev.map(item => 
      item.id === updatedItem.id ? updatedItem : item
    ));
  };

  const handleDeleteItem = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setItems(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleSort = () => {
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2 animate-fade-in">
            <Package className="h-8 w-8 text-blue-600 animate-bounce" />
            <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-slide-in">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 hover:border-blue-400"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <button
              onClick={() => setIsFormOpen(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105"
            >
              <Plus className="h-5 w-5" />
              Add Item
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow transition-all duration-300 hover:shadow-lg">
          <InventoryTable
            items={filteredAndSortedItems}
            onEdit={(item) => {
              setEditingItem(item);
              setIsFormOpen(true);
            }}
            onDelete={handleDeleteItem}
            sortDirection={sortDirection}
            onSort={handleSort}
          />
        </div>

        {isFormOpen && (
          <ItemForm
            item={editingItem}
            onSubmit={(item) => {
              editingItem ? handleEditItem({ ...item, id: editingItem.id }) : handleAddItem(item);
              setEditingItem(null);
            }}
            onClose={() => {
              setIsFormOpen(false);
              setEditingItem(null);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default App;
