import { useState } from 'react';
import { FormData } from '../types';
import Select from './components/Select';

const BulkSubmitForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    model: '',
    licenseLevel: 0,
    quantity: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Select defaultValue='' handleChange={()=>{}} label='' options={[]}/>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Submit
      </button>
    </form>
  );
};

export default BulkSubmitForm;
