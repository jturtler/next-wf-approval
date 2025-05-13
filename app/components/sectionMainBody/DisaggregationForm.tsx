import { useState } from 'react';
import { Disaggregation } from '../../redux/store';

interface DisaggregationFormProps {
  disaggregations: Disaggregation[];
  onAdd: (disaggregation: Disaggregation) => void;
  onRemove: (index: number) => void;
}

const DisaggregationForm = ({ disaggregations, onAdd, onRemove }: DisaggregationFormProps) => {
  const [newDisaggregation, setNewDisaggregation] = useState<Partial<Disaggregation>>({ name: '', value: 0 });

  const handleAddDisaggregation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDisaggregation.name || newDisaggregation.value === undefined) return;

    onAdd({
      name: newDisaggregation.name,
      value: newDisaggregation.value
    });

    // Reset form
    setNewDisaggregation({ name: '', value: 0 });
  };

  return (
    <div className="border-t pt-4 mt-4">
      <h3 className="text-lg font-semibold mb-2">Disaggregations</h3>
      
      {/* Current Disaggregations List */}
      <div className="mb-4">
        {disaggregations?.map((d, index) => (
          <div key={index} className="flex items-center gap-2 mb-2">
            <span className="flex-1">{d.name}: {d.value}</span>
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="text-red-500 hover:text-red-600 cursor-pointer"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Add New Disaggregation Form */}
      <div className="flex gap-2 items-end">
        <div className="flex-1">
          <input
            type="text"
            value={newDisaggregation.name}
            onChange={e => setNewDisaggregation({
              ...newDisaggregation,
              name: e.target.value
            })}
            placeholder="Disaggregation Name"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex-1">
          <input
            type="number"
            value={newDisaggregation.value}
            onChange={e => setNewDisaggregation({
              ...newDisaggregation,
              value: Number(e.target.value)
            })}
            placeholder="Value"
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="button"
          onClick={handleAddDisaggregation}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 cursor-pointer"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default DisaggregationForm;