import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, addItem, updateItem, removeItem, DataItem, Disaggregation } from '../../redux/store';
import DisaggregationForm from './DisaggregationForm';
import DataListFull from './DataListFull';

const dataItemInit: Partial<DataItem> = {      
  title: '',
  period: '',
  location: '',
  value: 0,
  status: 'draft',
  disaggregations: []
};

type DataEntryListProps = {
  showItemList?: boolean;
};

const DataEntryList = ( {showItemList = false}: DataEntryListProps ) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.data);
  const [editItem, setEditItem] = useState<DataItem | null>(null);
  const [formItem, setFormItem] = useState<Partial<DataItem>>({...dataItemInit});

  useEffect(() => { }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editItem) {
      dispatch( updateItem({...editItem, ...formItem}));
      setEditItem(null);
    } 
    else {
      dispatch(addItem({
        ...formItem,
        id: `data-${Date.now()}`,
        status: 'draft',
      } as DataItem));
    }

    setFormItem({...dataItemInit});
  };

  const handleAddDisaggregation = (disaggregation: Disaggregation) => {
    setFormItem({
      ...formItem,
      disaggregations: [ ...(formItem.disaggregations || []), disaggregation ]
    });
  };

  const handleRemoveDisaggregation = (index: number) => {
    const newDisaggregations = [...(formItem.disaggregations || [])];
    newDisaggregations.splice(index, 1);
    setFormItem({
      ...formItem,
      disaggregations: newDisaggregations
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="mb-1 p-2 border rounded-lg">
        <h2 className="text-xl font-bold mb-4">
          {editItem ? 'Edit Data Set' : 'Add New Data Set'}
        </h2>
        <div className="space-y-4">
          <input
            type="text"
            value={formItem.title || ''}
            onChange={e => setFormItem({ ...formItem, title: e.target.value })}
            placeholder="Title"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            value={formItem.period || ''}
            onChange={e => setFormItem({ ...formItem, period: e.target.value })}
            placeholder="Period (e.g., 2024-Q1)"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            value={formItem.location || ''}
            onChange={e => setFormItem({ ...formItem, location: e.target.value })}
            placeholder="Location ID"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="number"
            value={formItem.value || ''}
            onChange={e => setFormItem({ ...formItem, value: Number(e.target.value) })}
            placeholder="Value"
            className="w-full p-2 border rounded"
            required
          />

          {/* Disaggregations Section */}
          <DisaggregationForm
            disaggregations={formItem.disaggregations || []}
            onAdd={handleAddDisaggregation}
            onRemove={handleRemoveDisaggregation}
          />

          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {editItem ? 'Update' : 'Add'}
            </button>
            {editItem && (
              <button
                type="button"
                onClick={() => {
                  setEditItem(null);
                  setFormItem({...dataItemInit});
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>

      { showItemList && <DataListFull/> }
    </div>
  );
};

export default DataEntryList;
