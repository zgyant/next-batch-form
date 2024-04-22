import { useState } from 'react';
import { FormData } from '../types';
import Select from './components/Select';
import axios from 'axios';

const BulkSubmitForm: React.FC = () => {
  // Get the current date in the format YYYY-MM-DD
  const currentDate = new Date().toISOString().split('T')[0];

  /**
   * default state
   */
  const [formData, setFormData] = useState<FormData>({
    model: '',
    licenseLevel: 0,
    quantity: '',
    formDate: currentDate,
    comment: '',
  });

  const [notification, setNotification] = useState({
    'success': true,
    'message': '',
  });

  /**
   * handler for input changes
   * @param e 
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  /**
   * handler for select changes
   * @param name 
   * @param value 
   */
  const handleSelectChange = (name: string, value: string | number) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  /**
   * Function that handles form submit
   * @param e 
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post('/api/submitForm', formData);

      console.log('Form submitted successfully');

      setNotification({
        success: true,
        message: 'Form submitted successfully'
      });

      setFormData({
        model: '',
        licenseLevel: 0,
        quantity: '0',
        formDate: currentDate,
        comment: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);

      setNotification({
        success: false,
        message: 'Error submitting form, please check console for more info'
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Select defaultValue='' handleChange={(e) => handleSelectChange('model', e)} label='Model' options={['Model 1', 'Model 2', 'Model 3']} required/>
        <input type="date" id="formDate" name="formDate" value={formData.formDate} min="2018-01-01" max="2030-12-31" onChange={handleChange} className='p-2 rounded-md' required/>
        <input type="number" id="quantity" name="quantity" value={formData.quantity} placeholder='Quantity' onChange={handleChange} className='p-2 rounded-md' required/>
        <Select defaultValue='' handleChange={(e) => handleSelectChange('licenseLevel', parseInt(e))} label='License Level' options={Array.from({ length: 10 }, (_, index) => index)} required/>
        <input type="text" id="comment" name="comment" value={formData.comment} placeholder='Comment (Not Required)' onChange={handleChange} className='p-2 rounded-md' />
        
        <button type="submit" className="bg-customGolden text-white px-4 py-2  rounded-md hover:bg-blue-600 mt-3">
          Submit
        </button>

        {notification.message && (
          <div className={notification.success ? 'bg-success p-2' : 'bg-error p-2'}>
            {notification.message}
          </div>
        )}

      </form>
    </>
  );
};

export default BulkSubmitForm;
