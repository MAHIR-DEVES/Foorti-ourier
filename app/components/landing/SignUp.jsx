'use client';
import { useEffect, useState } from 'react';
import { FiUser, FiMail, FiLock, FiPhone } from 'react-icons/fi';
import { FaLocationDot } from 'react-icons/fa6';
import { PiMapPinSimpleAreaFill } from 'react-icons/pi';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import SignUpBtn from './SignUpBtn';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

const SignUp = () => {
  const router = useRouter();
  const tSignUp = useTranslations('signupPage');

  const [districts, setDistricts] = useState([]);
  const [areas, setAreas] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    business_name: '',
    address: '',
    email: '',
    mobile: '',
    area: '',
    district: '',
    password: '',
  });

  useEffect(() => {
    const fetchDistricts = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_MERCHANT_API_KEY}/distList`
      );
      const data = await res.json();
      if (data.Status) {
        setDistricts(data.data);
      }
    };
    fetchDistricts();
  }, []);

  useEffect(() => {
    const fetchAreas = async () => {
      if (formData.district) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_MERCHANT_API_KEY}/dist-area?id=${formData.district}`
        );
        const data = await res.json();
        if (data.Status) {
          setAreas(data.data);
        }
      }
    };
    fetchAreas();
  }, [formData.district]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        form.append(key, value);
      });

      // Static fields
      form.append('page_link', 'tgijh');
      form.append('website_link', 'hg');
      form.append('daily_volume', '3');
      form.append('category', 'courier');

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_MERCHANT_API_KEY}/register-merchant`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
          },
          body: form,
        }
      );

      const data = await res.json();
      console.log(data);

      if (data.message === 'Inactive account') {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `Thank You! Your Merchant Account Registration is successful. We will manually
Check and Activate your account within 24 hours.`,
          showConfirmButton: false,
          timer: 4500,
        });

        router.push('/');
      } else {
        toast.error(data.message);
      }

      // if (res.ok && data.success) {
      //   toast.success(' Registration successful: ');

      //   setFormData({
      //     name: '',
      //     business_name: '',
      //     address: '',
      //     email: '',
      //     mobile: '',
      //     area: '',
      //     district: '',
      //     password: '',
      //   });

      //   setAreas([]);
      // } else {
      //   const extractErrorMessages = obj => {
      //     if (!obj || typeof obj !== 'object') return 'Unknown error';
      //     const messages = Object.values(obj).flat();
      //     return messages.join(', ');
      //   };
      //   // const errorMessage = extractErrorMessages(data.message);

      //   console.log(data.message);
      //   console.log(errorMessage);

      //   // toast.error('' + (errorMessage || 'Unauthorized or invalid request'));
      //   toast.error('' + data.message);
      // }
    } catch (error) {
      toast.success(' Something went wrong: ' + error.message);
      // toast.success(' Something went wrong: ');
    }
  };

  return (
    <div className="pt-20 px-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="min-h-screen flex flex-col items-center justify-center py-6">
        <div className="w-full md:w-[40%]">
          <Image
            src="/img/signup.png"
            alt="logo"
            className="w-20 mb-3 mx-auto block"
            width={500}
            height={500}
          />

          <h2 className="text-gray-900 text-center text-3xl font-semibold">
            {tSignUp('title')}
          </h2>

          <div className="mt-12 space-y-6">
            <div className="relative flex items-center">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={tSignUp('nameLabelOne')}
                className="w-full border border-gray-300 px-4 py-3 rounded-md outline-[#00b795]"
              />
              <FiUser className="absolute right-4 text-gray-400" size={20} />
            </div>

            {/* Business Name */}
            <div className="relative flex items-center">
              <input
                type="text"
                name="business_name"
                value={formData.business_name}
                onChange={handleChange}
                placeholder={tSignUp('nameLabelTwo')}
                className="w-full border border-gray-300 px-4 py-3 rounded-md outline-[#00b795]"
              />
              <FiUser className="absolute right-4 text-gray-400" size={20} />
            </div>

            {/* Address */}
            <div className="relative flex items-center">
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder={tSignUp('locationLabel')}
                rows="3"
                className="w-full border border-gray-300 px-4 py-3 rounded-md outline-[#00b795]"
              />
              <FaLocationDot
                className="absolute right-4 text-gray-400"
                size={20}
              />
            </div>

            {/* Email */}
            <div className="relative flex items-center">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={tSignUp('emailLabel')}
                className="w-full border border-gray-300 px-4 py-3 rounded-md outline-[#00b795]"
              />
              <FiMail className="absolute right-4 text-gray-400" size={20} />
            </div>

            {/* Mobile */}
            <div className="relative flex items-center">
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder={tSignUp('phoneLabel')}
                className="w-full border border-gray-300 px-4 py-3 rounded-md outline-[#00b795]"
              />
              <FiPhone className="absolute right-4 text-gray-400" size={20} />
            </div>
            <div className="flex gap-5">
              {/* District Dropdown */}
              <div className="relative flex items-center w-full">
                <select
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-3 rounded-md outline-[#00b795]"
                >
                  <option value="">{tSignUp('area_label_two')}</option>
                  {districts.map(dist => (
                    <option key={dist.id} value={dist.id}>
                      {dist.name}
                    </option>
                  ))}
                </select>
                <PiMapPinSimpleAreaFill
                  className="absolute right-4 text-gray-400"
                  size={20}
                />
              </div>

              {/* Area Dropdown */}
              <div className="relative flex items-center w-full">
                <select
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-3 rounded-md outline-[#00b795]"
                >
                  <option value="">{tSignUp('area_label_one')}</option>
                  {areas.map(area => (
                    <option key={area.id} value={area.id}>
                      {area.area}
                    </option>
                  ))}
                </select>
                <PiMapPinSimpleAreaFill
                  className="absolute right-4 text-gray-400"
                  size={20}
                />
              </div>
            </div>
            {/* Password*/}
            <div className="relative flex items-center">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder={tSignUp('passwordLabel')}
                className="w-full border border-gray-300 px-4 py-3 rounded-md outline-[#00b795]"
              />
              <FiLock className="absolute right-4 text-gray-400" size={20} />
            </div>
            <div>
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full py-2 px-4 text-[15px] font-medium rounded-md text-white bg-[#00b795] hover:bg-[#009f81] focus:outline-none"
              >
                {tSignUp('signupButton')}
              </button>
              <p className="text-center mt-1 text-gray-800 text-md">
                {tSignUp('accountLabelOne')}
                <span className="font-semibold hover:text-[#00b795] cursor-pointer px-1">
                  {tSignUp('accountLabelTwo')}
                </span>
              </p>

              <div className="flex items-center mt-10 justify-center">
                <p className="text-gray-800 text-lg font-medium">
                  {tSignUp('existingAccount')}
                </p>
                <SignUpBtn />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
