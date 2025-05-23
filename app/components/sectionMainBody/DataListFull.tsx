import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, addItem, updateItem, removeItem, DataItem, Disaggregation } from '../../redux/store';

const dataItemInit: Partial<DataItem> = {      
  title: '',
  period: '',
  location: '',
  value: 0,
  status: 'draft',
  disaggregations: []
};

const DataListFull = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state: RootState) => state.data);
  const [editItem, setEditItem] = useState<DataItem | null>(null);
  const [formItem, setFormItem] = useState<Partial<DataItem>>({...dataItemInit});

  useEffect(() => { }, []);

  const handleDelete = (item: DataItem) => {
    if (window.confirm(`Are you sure you want to delete "${item.title}"?`)) {
      dispatch(removeItem(item));
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="p-4 border rounded-lg">
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <div className="mt-2 text-sm text-gray-600">
              <p>Period: {item.period}</p>
              <p>Location: {item.location}</p>
              <p>Value: {item.value}</p>
              <p>Status: {item.status}</p>
              <div className="mt-2">
                <p className="font-medium">Disaggregations:</p>
                <ul className="list-disc pl-5">
                  {item.disaggregations.map((d, index) => (
                    <li key={index}>
                      {d.name}: {d.value}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <button
              onClick={() => {
                setEditItem(item);
                setFormItem({...item});
              }}
              className="mt-2 text-blue-500 hover:text-blue-600 cursor-pointer"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(item)}
              className="ml-2 mt-2 text-red-500 hover:text-red-600 cursor-pointer"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
  );
};

export default DataListFull;
