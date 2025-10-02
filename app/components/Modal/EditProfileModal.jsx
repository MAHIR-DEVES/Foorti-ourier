'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditProfileModal = ({
  isOpen,
  onClose,
  currentName,
  currentEmail,
  setName,
  setEmail,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filePreviews, setFilePreviews] = useState({
    profile_photo: null,
    nid_front_side: null,
    nid_back_side: null,
    trade_license: null,
    tin_image: null,
  });

  const fileInputRefs = useRef({
    profile_photo: null,
    nid_front_side: null,
    nid_back_side: null,
    trade_license: null,
    tin_image: null,
  });

  if (!isOpen) return null;

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      // Check if file is an image
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = e => {
          setFilePreviews(prev => ({
            ...prev,
            [fieldName]: e.target.result,
          }));
        };
        reader.readAsDataURL(file);
      } else {
        // For non-image files, just show the file name
        setFilePreviews(prev => ({
          ...prev,
          [fieldName]: file.name,
        }));
      }
    }
  };

  const removeFile = fieldName => {
    setFilePreviews(prev => ({
      ...prev,
      [fieldName]: null,
    }));
    // Reset the file input
    if (fileInputRefs.current[fieldName]) {
      fileInputRefs.current[fieldName].value = '';
    }
  };

  const triggerFileInput = fieldName => {
    if (fileInputRefs.current[fieldName]) {
      fileInputRefs.current[fieldName].click();
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.target);

      const stored = localStorage.getItem('token');
      const token = stored ? JSON.parse(stored).token : null;

      const response = await axios.post(
        'https://admin.merchantfcservice.com/api/merchant-profile-updated',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response?.data?.status === 'success') {
        toast.success('Profile updated successfully!');
      }

      onClose();
    } catch (error) {
      console.error(
        'Error saving profile:',
        error.response?.data || error.message
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 backdrop-blur-md bg-black/60 flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Edit Profile</h2>
                <p className="text-blue-100 mt-1">
                  Update your personal information
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Personal Information Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Personal Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={currentName}
                    onChange={e => setName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="+88017 000-00000"
                  />
                </div>
              </div>
            </div>

            {/* Business Information Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center text-left">
                <svg
                  className="w-5 h-5 mr-2 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                Business Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                    Business Name
                  </label>
                  <input
                    type="text"
                    name="business_name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your business name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                    NID Number
                  </label>
                  <input
                    type="text"
                    name="nid_number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter NID number"
                  />
                </div>
              </div>
            </div>

            {/* Document Upload Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                  />
                </svg>
                Documents & Files
              </h3>

              <div className="grid gap-4">
                {[
                  {
                    label: 'Profile Photo',
                    name: 'profile_photo',
                    accept: 'image/*',
                    isImage: true,
                  },
                  {
                    label: 'NID Front Side',
                    name: 'nid_front_side',
                    accept: 'image/*',
                    isImage: true,
                  },
                  {
                    label: 'NID Back Side',
                    name: 'nid_back_side',
                    accept: 'image/*',
                    isImage: true,
                  },
                  {
                    label: 'Trade License',
                    name: 'trade_license',
                    accept: '.pdf,.doc,.docx,image/*',
                    isImage: false,
                  },
                  {
                    label: 'TIN Image',
                    name: 'tin_image',
                    accept: 'image/*',
                    isImage: true,
                  },
                ].map((doc, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                  >
                    <div className="flex items-center justify-between p-3">
                      <div>
                        <span className="block text-sm font-medium text-gray-700">
                          {doc.label}
                        </span>
                        <span className="text-xs text-gray-500">Max. 5MB</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => triggerFileInput(doc.name)}
                        className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
                      >
                        Choose File
                      </button>
                      <input
                        type="file"
                        name={doc.name}
                        accept={doc.accept}
                        ref={el => (fileInputRefs.current[doc.name] = el)}
                        onChange={e => handleFileChange(e, doc.name)}
                        className="hidden"
                      />
                    </div>

                    {/* File Preview */}
                    {filePreviews[doc.name] && (
                      <div className="p-3 border-t border-gray-200 bg-gray-50">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div className="flex items-center space-x-3 min-w-0">
                            {doc.isImage &&
                            typeof filePreviews[doc.name] === 'string' ? (
                              <>
                                <img
                                  src={filePreviews[doc.name]}
                                  alt={doc.label}
                                  className="w-12 h-12 object-cover rounded-lg"
                                />
                                <span className="text-sm text-gray-600 truncate max-w-[150px]">
                                  Image preview
                                </span>
                              </>
                            ) : (
                              <>
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                                  <svg
                                    className="w-6 h-6 text-blue-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                  </svg>
                                </div>
                                <span className="text-sm text-gray-600 truncate max-w-[200px]">
                                  {filePreviews[doc.name]}
                                </span>
                              </>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(doc.name)}
                            className="text-red-600 hover:text-red-800 p-1 rounded-full transition-colors"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium disabled:opacity-50 flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EditProfileModal;
