import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import AnimatedBackground from './AnimatedGridBackground';

const TradingRegistrationForm = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const name = params.get('courseName');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    aadharNumber: '',
    agreeTerms: false,
    agreeMarketing: false,
    courseName: '',
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      courseName: name || '',
    }));
  }, [name]);

  const [files, setFiles] = useState({
    aadharFile: null,
    signatureFile: null
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  // Refs for file inputs
  const aadharFileInputRef = useRef(null);
  const signatureFileInputRef = useRef(null);

  // Reset success states when user starts interacting with form
  const resetSuccessStates = () => {
    if (isSubmitted || submitMessage) {
      setIsSubmitted(false);
      setSubmitMessage('');
      setShowSuccessDialog(false);
    }
  };

  // Validation functions
  const validators = {
    validateAadhaar: function(aadhaarNumber) {
      const cleanNumber = aadhaarNumber.replace(/\D/g, '');
      
      console.log('🔍 Validating Aadhaar input:', aadhaarNumber);
      console.log('🔢 Clean digits:', cleanNumber);
      
      if (!/^\d{12}$/.test(cleanNumber)) {
        console.log('❌ Aadhaar validation failed: Not exactly 12 digits (length:', cleanNumber.length, ')');
        return false;
      }
      
      if (!/^[2-9]/.test(cleanNumber)) {
        console.log('❌ Aadhaar validation failed: First digit must be 2-9, got:', cleanNumber[0]);
        return false;
      }
      
      if (/^(\d)\1{11}$/.test(cleanNumber)) {
        console.log('❌ Aadhaar validation failed: All same digits');
        return false;
      }
      
      if (cleanNumber === '123456789012' || cleanNumber === '987654321098') {
        console.log('❌ Aadhaar validation failed: Sequential pattern');
        return false;
      }
      
      console.log('✅ Aadhaar validation passed for:', cleanNumber);
      return true;
    },

    validateAge: function(dateOfBirth) {
      const today = new Date();
      const birthDate = new Date(dateOfBirth);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      
      return age >= 18 && age <= 100;
    },

    validateName: function(name) {
      return /^[a-zA-Z\s]+$/.test(name);
    },

    validatePhone: function(phone) {
      return /^[6789]\d{9}$/.test(phone);
    },

    validatePincode: function(pincode) {
      return /^[1-9]\d{5}$/.test(pincode);
    }
  };

  const handleInputChange = (e) => {
    // Reset success states when user starts typing
    resetSuccessStates();

    const { name, value, type, checked } = e.target;
    let newValue = type === 'checkbox' ? checked : value;
    
    if (name === 'aadharNumber') {
      const digitsOnly = value.replace(/\D/g, '');
      const limitedDigits = digitsOnly.substring(0, 12);
      newValue = limitedDigits.replace(/(\d{4})(?=\d)/g, '$1 ');
      
      console.log('📝 Aadhar input formatting:', {
        original: value,
        digitsOnly: digitsOnly,
        formatted: newValue,
        length: limitedDigits.length
      });
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    console.log(`Field Changed: ${name} = `, newValue);
  };

  useEffect(() => {
    console.log('=== FORM DATA VALUES ===');
    console.log('Personal Info:', {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      dateOfBirth: formData.dateOfBirth
    });
    console.log('Address Info:', {
      address: formData.address,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode
    });
    console.log('Documents:', {
      aadharNumber: formData.aadharNumber,
      aadharFile: files.aadharFile?.name || 'Not uploaded',
      signatureFile: files.signatureFile?.name || 'Not uploaded',
    });
    console.log('Agreements:', {
      agreeTerms: formData.agreeTerms,
      agreeMarketing: formData.agreeMarketing
    });
    console.log('Course Info:', {
      courseName: formData.courseName,
    });
    console.log('========================');
  }, [formData, files]);

  const handleFileChange = (e) => {
    // Reset success states when user uploads new files
    resetSuccessStates();

    const { name, files: selectedFiles } = e.target;
    const file = selectedFiles[0];

    if (file) {
      // Clean filename - remove invalid characters
      const cleanedName = file.name.replace(/[^a-zA-Z0-9._\-\s]/g, '_');
      
      // Create new file with cleaned name
      const cleanedFile = new File([file], cleanedName, { type: file.type });
      
      // Rest of your validation logic...
      if (name === 'aadharFile') {
        if (cleanedFile.size > 5 * 1024 * 1024) {
          // ... size validation
        }
      }

      setFiles(prev => ({
        ...prev,
        [name]: cleanedFile
      }));

      // Clear any existing file errors
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: '' }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // First Name validation
    if (!formData?.firstName?.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    } else if (formData.firstName.length > 50) {
      newErrors.firstName = 'First name cannot exceed 50 characters';
    } else if (!validators.validateName(formData.firstName)) {
      newErrors.firstName = 'First name can only contain letters and spaces';
    }

    // Last Name validation
    if (!formData?.lastName?.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    } else if (formData.lastName.length > 50) {
      newErrors.lastName = 'Last name cannot exceed 50 characters';
    } else if (!validators.validateName(formData.lastName)) {
      newErrors.lastName = 'Last name can only contain letters and spaces';
    }

    // Email validation
    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    if (!formData?.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validators.validatePhone(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits starting with 6, 7, 8, or 9';
    }

    // Date of Birth validation
    if (!formData?.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    } else if (!validators.validateAge(formData.dateOfBirth)) {
      newErrors.dateOfBirth = 'You must be between 18 and 100 years old';
    }

    // Address validation
    if (!formData?.address?.trim()) {
      newErrors.address = 'Address is required';
    } else if (formData.address.length < 10) {
      newErrors.address = 'Address must be at least 10 characters';
    } else if (formData.address.length > 200) {
      newErrors.address = 'Address cannot exceed 200 characters';
    }

    // City validation
    if (!formData?.city?.trim()) {
      newErrors.city = 'City is required';
    } else if (formData.city.length < 2) {
      newErrors.city = 'City must be at least 2 characters';
    } else if (formData.city.length > 50) {
      newErrors.city = 'City cannot exceed 50 characters';
    } else if (!validators.validateName(formData.city)) {
      newErrors.city = 'City can only contain letters and spaces';
    }

    // State validation
    if (!formData?.state?.trim()) {
      newErrors.state = 'State is required';
    } else if (formData.state.length < 2) {
      newErrors.state = 'State must be at least 2 characters';
    } else if (formData.state.length > 50) {
      newErrors.state = 'State cannot exceed 50 characters';
    } else if (!validators.validateName(formData.state)) {
      newErrors.state = 'State can only contain letters and spaces';
    }

    // Pincode validation
    if (!formData?.pincode?.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!validators.validatePincode(formData.pincode)) {
      newErrors.pincode = 'Pincode must be 6 digits and cannot start with 0';
    }

    // Aadhaar validation
    if (!formData?.aadharNumber?.trim()) {
      newErrors.aadharNumber = 'Aadhaar number is required';
      console.log('❌ Aadhaar validation: Field is empty');
    } else {
      const aadhaarDigits = formData.aadharNumber.replace(/\s/g, '');
      console.log('🔍 Validating Aadhaar:', aadhaarDigits);
      
      if (!validators.validateAadhaar(aadhaarDigits)) {
        newErrors.aadharNumber = 'Please enter a valid 12-digit Aadhaar number';
        console.log('❌ Aadhaar validation failed for:', aadhaarDigits);
      } else {
        console.log('✅ Aadhaar validation passed for:', aadhaarDigits);
      }
    }

    // File validations
    if (!files?.aadharFile) {
      newErrors.aadharFile = 'Aadhaar file is required';
    } else {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
      if (!allowedTypes.includes(files.aadharFile.type)) {
        newErrors.aadharFile = 'Aadhaar file must be JPG, PNG, or PDF';
      } else if (files.aadharFile.size > 5242880) {
        newErrors.aadharFile = 'Aadhaar file size cannot exceed 5MB';
      }
    }

    if (!files?.signatureFile) {
      newErrors.signatureFile = 'Signature file is required';
    } else {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(files.signatureFile.type)) {
        newErrors.signatureFile = 'Signature file must be JPG or PNG';
      } else if (files.signatureFile.size > 2097152) {
        newErrors.signatureFile = 'Signature file size cannot exceed 2MB';
      }
    }

    // Terms validation
    if (!formData?.agreeTerms) {
      newErrors.agreeTerms = 'You must accept the terms and conditions';
    }

    // Set errors and return validation result
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('🚀 Starting form submission...');
    
    if (!validateForm()) {
      console.log('❌ Client-side validation failed');
      setSubmitMessage('❌ Please fix the validation errors below');
      setIsSubmitted(false); // Ensure success state is false
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    setSubmitMessage('');
    setIsSubmitted(false); // Reset success state before submission

    try {
      const formDataToSend = new FormData();
      
      // Add all form fields (excluding files which are handled separately)
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== undefined) {
          let value = formData[key];
          
          // Clean Aadhaar number for backend (remove spaces)
          if (key === 'aadharNumber') {
            value = formData[key].replace(/\s/g, '');
            console.log('🔧 Aadhaar number cleaned for backend:', value);
          }
          
          formDataToSend.append(key, value);
        }
      });

      // Add files with correct field names
      if (files.aadharFile) {
        formDataToSend.append('aadharFile', files.aadharFile);
        console.log('📄 Added aadhar file:', files.aadharFile.name);
      }

      if (files.signatureFile) {
        formDataToSend.append('signatureFile', files.signatureFile);
        console.log('✍️ Added signature file:', files.signatureFile.name);
      }

      // Log form data contents
      console.log('📋 Form data contents:');
      for (let [key, value] of formDataToSend.entries()) {
        if (value instanceof File) {
          console.log(`  ${key}: File(${value.name}, ${value.size} bytes)`);
        } else {
          console.log(`  ${key}: ${value}`);
        }
      }

      const API_BASE_URL = 'http://localhost:5000/';
      // const API_BASE_URL = 'https://tradingprofesser-server-deploy.onrender.com/'
      
      const response = await fetch(`${API_BASE_URL}api/registration/register`, {
        method: 'POST',
        body: formDataToSend,
        // Don't set Content-Type header - let browser set it with boundary
      });

      console.log('📡 Response status:', response.status);
      console.log('📡 Response ok:', response.ok);

      const result = await response.json();
      console.log('📡 Server response:', result);

      if (response.ok && result.success) {
        console.log('✅ Form submitted successfully!');
        
        // Show success message
        setSubmitMessage('✅ Registration completed successfully! We will contact you soon.');
        setIsSubmitted(true);
        setShowSuccessDialog(true);
        
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          dateOfBirth: '',
          address: '',
          city: '',
          state: '',
          pincode: '',
          aadharNumber: '',
          courseName: name || '',
          agreeTerms: false,
          agreeMarketing: false,
        });
        
        setFiles({
          aadharFile: null,
          signatureFile: null
        });
        
        // Reset file inputs
        if (aadharFileInputRef.current) {
          aadharFileInputRef.current.value = '';
        }
        if (signatureFileInputRef.current) {
          signatureFileInputRef.current.value = '';
        }
        
      } else {
        console.log('❌ Server returned error:', result);
        
        if (result.errors && Array.isArray(result.errors)) {
          // Handle validation errors
          const errorObj = {};
          result.errors.forEach(error => {
            // Map server errors to form fields
            if (error.includes('First name')) errorObj.firstName = error;
            else if (error.includes('Last name')) errorObj.lastName = error;
            else if (error.includes('Email')) errorObj.email = error;
            else if (error.includes('Phone')) errorObj.phone = error;
            else if (error.includes('Course name')) errorObj.courseName = error;
            else if (error.includes('Aadhar number')) errorObj.aadharNumber = error;
            else if (error.includes('Aadhar document')) errorObj.aadharFile = error;
            else if (error.includes('Signature')) errorObj.signatureFile = error;
            else if (error.includes('terms')) errorObj.agreeTerms = error;
            else errorObj.general = error;
          });
          
          setErrors(errorObj);
          console.log('📋 Server validation errors mapped:', errorObj);
        } else {
          // Handle duplicate registration errors and other server errors
          const message = result.message || 'Submission failed. Please try again.';
          
          // Check if it's a duplicate field error
          if (result.field) {
            // Map server field names to form field names for better UX
            const fieldMapping = {
              'email': 'email',
              'phone': 'phone', 
              'aadharNumber': 'aadharNumber'
            };
               
            const formField = fieldMapping[result.field];
            if (formField) {
              setErrors({ 
                [formField]: message,
                general: `Registration failed: ${message}` 
              });
            } else {
              setErrors({ general: message });
            }
          } else if (message.toLowerCase().includes('already registered') || 
                     message.toLowerCase().includes('duplicate') ||
                     message.toLowerCase().includes('already exists')) {
            // Generic duplicate error handling
            setErrors({ 
              general: `${message} Please verify your information or contact support if you need assistance.` 
            });
          } else {
            setErrors({ general: message });
          }
        }
        
        setSubmitMessage(`❌ ${result.message || 'Registration failed. Please try again.'}`);
        setIsSubmitted(false); // Ensure success state is false on error
      }

    } catch (error) {
      console.error('❌ Network/Request error:', error);
      setErrors({
        general: 'Network error. Please check your connection and try again.'
      });
      setSubmitMessage('❌ Network error. Please check your connection and try again.');
      setIsSubmitted(false); // Ensure success state is false on error
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatedBackground>
      <div className="relative z-10 min-h-screen py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-2">
              Trading Professor Course 
            </h1>
            <p className="text-blue-300 text-lg">Registration Form</p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
          </div>

          {/* Submit Message */}
          {submitMessage && (
            <div className={`mb-6 p-4 rounded-lg border ${
              submitMessage.includes('✅') 
                ? 'bg-green-900/20 border-green-500/30 text-green-400' 
                : 'bg-red-900/20 border-red-500/30 text-red-400'
            }`}>
              {submitMessage}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-gray-800/90 backdrop-blur-md rounded-2xl p-8 border border-blue-500/20">
            
            {/* General Error */}
            {errors.general && (
              <div className="mb-6 p-4 bg-red-900/20 rounded-lg border border-red-500/30">
                <p className="text-red-400">{errors.general}</p>
              </div>
            )}

            {/* Personal Information */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Personal Information
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-300 mb-2">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full bg-gray-700/50 border rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.firstName ? 'border-red-500' : 'border-gray-600'}`}
                    placeholder="Enter your first name"
                    maxLength={50}
                  />
                  {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full bg-gray-700/50 border rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.lastName ? 'border-red-500' : 'border-gray-600'}`}
                    placeholder="Enter your last name"
                    maxLength={50}
                  />
                  {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-300 mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full bg-gray-700/50 border rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.email ? 'border-red-500' : 'border-gray-600'}`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full bg-gray-700/50 border rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.phone ? 'border-red-500' : 'border-gray-600'}`}
                    placeholder="9876543210"
                    maxLength={10}
                  />
                  {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                  <p className="text-gray-400 text-xs mt-1">Must start with 6, 7, 8, or 9</p>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Date of Birth *</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className={`w-full bg-gray-700/50 border rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-600'}`}
                />
                {errors.dateOfBirth && <p className="text-red-400 text-sm mt-1">{errors.dateOfBirth}</p>}
                <p className="text-gray-400 text-xs mt-1">Must be between 18-100 years old</p>
              </div>
            </div>

            {/* Address Information */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Address Information
              </h3>

              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Address *</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={3}
                  className={`w-full bg-gray-700/50 border rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.address ? 'border-red-500' : 'border-gray-600'}`}
                  placeholder="Enter your complete address (minimum 10 characters)"
                  maxLength={200}
                />
                {errors.address && <p className="text-red-400 text-sm mt-1">{errors.address}</p>}
                <p className="text-gray-400 text-xs mt-1">10-200 characters</p>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={`w-full bg-gray-700/50 border rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.city ? 'border-red-500' : 'border-gray-600'}`}
                    placeholder="City"
                    maxLength={50}
                  />
                  {errors.city && <p className="text-red-400 text-sm mt-1">{errors.city}</p>}
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">State *</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className={`w-full bg-gray-700/50 border rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.state ? 'border-red-500' : 'border-gray-600'}`}
                    placeholder="State"
                    maxLength={50}
                  />
                  {errors.state && <p className="text-red-400 text-sm mt-1">{errors.state}</p>}
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Pincode *</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className={`w-full bg-gray-700/50 border rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.pincode ? 'border-red-500' : 'border-gray-600'}`}
                    placeholder="123456"
                    maxLength={6}
                  />
                  {errors.pincode && <p className="text-red-400 text-sm mt-1">{errors.pincode}</p>}
                  <p className="text-gray-400 text-xs mt-1">6 digits, cannot start with 0</p>
                </div>
              </div>
            </div>

            {/* Course Section */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Course Information
              </h3>
              <div>
                <label className="block text-gray-300 mb-2">Course Name *</label>              
                <input
                  type="text"
                  value={formData.courseName}
                  disabled
                  className="w-full bg-gray-600/50 border border-gray-500 rounded-lg px-4 py-3 text-gray-300 cursor-not-allowed"
                />
              </div>
            </div>

            {/* Document Upload Section */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Identity Documents (KYC)
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Aadhaar Card Section */}
                <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/50">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">ID</span>
                    </div>
                    <h4 className="text-lg font-semibold text-white">Aadhaar Card</h4>
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-300 mb-2">Aadhaar Number *</label>
                    <input
                      type="text"
                      name="aadharNumber"
                      value={formData.aadharNumber}
                      onChange={handleInputChange}
                      className={`w-full bg-gray-700/50 border rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.aadharNumber ? 'border-red-500' : 'border-gray-600'}`}
                      placeholder="1234 5678 9012"
                      maxLength={14}
                    />
                    {errors.aadharNumber && <p className="text-red-400 text-sm mt-1">{errors.aadharNumber}</p>}
                    <p className="text-gray-400 text-xs mt-1">12-digit valid Aadhaar number</p>
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-300 mb-2">Upload Aadhaar Card *</label>
                    <input
                      type="file"
                      name="aadharFile"
                      ref={aadharFileInputRef}
                      onChange={handleFileChange}
                      accept="image/*,application/pdf"
                      className={`w-full bg-gray-700/50 border rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.aadharFile ? 'border-red-500' : 'border-gray-600'}`}
                    />
                    {errors.aadharFile && <p className="text-red-400 text-sm mt-1">{errors.aadharFile}</p>}
                    {files.aadharFile && (
                      <p className="text-green-400 text-sm mt-1">✓ {files.aadharFile.name}</p>
                    )}
                    <p className="text-gray-400 text-xs mt-1">JPG, PNG, or PDF (max 5MB)</p>
                  </div>
                </div>

                {/* Signature Section */}
                <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/50">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">✎</span>
                    </div>
                    <h4 className="text-lg font-semibold text-white">Signature</h4>
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-300 mb-2">Upload Signature *</label>
                    <p className="text-gray-400 text-sm mb-3">Upload a scanned image of your signature</p>
                    <input
                      type="file"
                      name="signatureFile"
                      ref={signatureFileInputRef}
                      accept="image/*"
                      onChange={handleFileChange}
                      className={`w-full bg-gray-700/50 border rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.signatureFile ? 'border-red-500' : 'border-gray-600'}`}
                    />
                    {errors.signatureFile && <p className="text-red-400 text-sm mt-1">{errors.signatureFile}</p>}
                    {files.signatureFile && (
                      <p className="text-green-400 text-sm mt-1">✓ {files.signatureFile.name}</p>
                    )}
                    <p className="text-gray-400 text-xs mt-1">JPG or PNG only (max 2MB)</p>
                  </div>
                </div>
              </div>
            </div>
     
            {/* Terms and Conditions */}
            <div className="mb-8">
              <div className="space-y-4">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-300">
                    I agree to the <span className="text-blue-400 hover:underline">Terms and Conditions</span> and 
                    <span className="text-blue-400 hover:underline"> Privacy Policy</span>. I understand that this is a legally binding agreement. *
                  </span>
                </label>
                {errors.agreeTerms && <p className="text-red-400 text-sm">{errors.agreeTerms}</p>}

                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreeMarketing"
                    checked={formData.agreeMarketing}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-300">
                    I agree to receive marketing communications about future workshops and trading updates.
                  </span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  'Complete Registration'
                )}
              </button>
            </div>

            {/* Success Message */}
            {isSubmitted && (
              <div className="mt-8 p-4 bg-green-900/20 rounded-lg border border-green-500/30">
                <div className="text-green-200 text-center">
                  <div className="mb-2">
                    <svg className="w-12 h-12 text-green-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="font-semibold text-lg">✅ Registration Completed Successfully!</p>
                  <p className="text-green-300 mt-2">Thank you for registering! We will contact you soon with further details.</p>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </AnimatedBackground>
  );
};

export default TradingRegistrationForm;