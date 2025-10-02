'use client';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const DeliveryForm = () => {
  const [formData, setFormData] = useState({
    phone: '',
    cod: '',
    name: '',
    invoice: '',
    address: '',
    note: '',
    district: '',
    districtId: '',
    area: '',
    weight: '',
    exchange: false,
    partial: false,
  });

  const [districts, setDistricts] = useState([]);
  const [areas, setAreas] = useState([]);
  const [weights, setWeights] = useState([]);

  // fetch Districts
  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const res = await fetch(
          'https://admin.merchantfcservice.com/api/distList'
        );
        const data = await res.json();
        if (data.Status) {
          setDistricts(data.data);
        }
      } catch (error) {
        console.error('Error fetching districts:', error);
      }
    };
    fetchDistricts();
  }, []);

  // fetch Areas by District
  useEffect(() => {
    const fetchAreas = async () => {
      if (!formData.districtId) return;
      try {
        const res = await fetch(
          `https://admin.merchantfcservice.com/api/dist-area?id=${formData.districtId}`
        );
        const data = await res.json();
        if (data.Status) {
          setAreas(data.data);
        }
      } catch (error) {
        console.error('Error fetching areas:', error);
      }
    };
    fetchAreas();
  }, [formData.districtId]);

  // fetch Weights
  useEffect(() => {
    const fetchWeight = async () => {
      try {
        const res = await fetch(
          'https://admin.merchantfcservice.com/api/weights'
        );
        const data = await res.json();
        if (data.Status) {
          setWeights(data.data);
        }
      } catch (error) {
        console.error('Error fetching weights:', error);
      }
    };
    fetchWeight();
  }, []);

  // handle input changes
  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // handle district change separately
  const handleDistrictChange = e => {
    const selectedIndex = e.target.selectedIndex;
    const selectedOption = e.target.options[selectedIndex];
    const id = e.target.value;
    const name = selectedOption.text;

    setFormData(prev => ({
      ...prev,
      districtId: id,
      district: name,
      area: '',
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const finalData = {
        customer_name: formData.name || '',
        customer_email: '',
        customer_address: formData.address,
        customer_phone: formData.phone,
        pickup_date: '',
        pckup_time: '',
        remarks: formData.note,
        category: '',
        weight: formData.weight,
        collection: formData.cod || '',
        imp: 'Regular',
        area: formData.area,
        order_id: formData.invoice,
        is_exchange: formData.exchange ? 1 : 0,
        isPartial: formData.partial ? 1 : 0,
      };

      console.log('Sending Data:', finalData);
      const stored = localStorage.getItem('token');
      const token = stored ? JSON.parse(stored).token : null;

      const res = await fetch(
        'https://admin.merchantfcservice.com/api/orderstor',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(finalData),
        }
      );

      if (!res.ok) {
        toast.error(`Request failed: ${res.status}`);
      }
      if (res.status === 200) {
        toast.success('parcel loaded successfully');
        setFormData({
          phone: '',
          cod: '',
          name: '',
          invoice: '',
          address: '',
          note: '',
          district: '',
          districtId: '',
          area: '',
          weight: '',
          exchange: false,
          partial: false,
        });
      }
    } catch (error) {
      toast.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="md:p-6 space-y-4">
      {/* Phone & COD */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-md font-medium text-secondary mb-1">
            Phone#
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Type Phone Number"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-md font-medium text-secondary mb-1">
            COD Amount
          </label>
          <input
            type="number"
            name="cod"
            value={formData.cod}
            onChange={handleChange}
            placeholder="COD Amount"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none"
          />
        </div>
      </div>

      {/* Name & Invoice */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-md font-medium text-secondary mb-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Type Name"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-md font-medium text-secondary mb-1">
            Invoice
          </label>
          <input
            type="text"
            name="invoice"
            value={formData.invoice}
            onChange={handleChange}
            placeholder="Type Invoice"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none"
          />
        </div>
      </div>

      {/* Address & Note */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-md font-medium text-secondary mb-1">
            Address
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Type Address"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none"
          ></textarea>
        </div>
        <div>
          <label className="block text-md font-medium text-secondary mb-1">
            Note
          </label>
          <textarea
            name="note"
            value={formData.note}
            onChange={handleChange}
            placeholder="Type Note"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none"
          ></textarea>
        </div>
      </div>

      {/* District & Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-md font-medium text-secondary mb-1">
            District
          </label>
          <select
            name="district"
            value={formData.districtId}
            onChange={handleDistrictChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none"
          >
            <option value="">Select District</option>
            {districts.map(dist => (
              <option key={dist.id} value={dist.id}>
                {dist.name} ({dist.bn_name})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-md font-medium text-secondary mb-1">
            Area
          </label>
          <select
            name="area"
            value={formData.area}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none"
          >
            <option value="">Select Area</option>
            {areas.map(area => (
              <option key={area.id} value={area.area}>
                {area.area}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Weight & Options */}
      <div className="">
        <div>
          <label className="block text-md font-medium text-secondary mb-1">
            Weight
          </label>
          <select
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none"
          >
            <option value="">Select Weight</option>
            {weights.map(weight => (
              <option key={weight.id} value={weight.title}>
                {weight.title}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <div className="flex gap-4">
          <label className="flex items-center gap-2 mb-2">
            <input
              type="checkbox"
              name="exchange"
              checked={formData.exchange}
              onChange={handleChange}
            />
            Exchange
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="partial"
              checked={formData.partial}
              onChange={handleChange}
            />
            Partial
          </label>
        </div>
        <button
          type="submit"
          className="w-3xl mx-auto button-primary cursor-pointer text-white p-2.5 px-4 rounded-md hover:button-primary text-3xl"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default DeliveryForm;
