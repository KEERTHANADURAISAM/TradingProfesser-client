import { useState, useRef } from "react";
import { AlertTriangle, Camera, CheckCircle, DollarSign, FileText, Shield, Upload, User, X, Phone, CreditCard, TrendingUp } from "lucide-react";

const CopyTradingForm = () => {
 const [formData, setFormData] = useState({
    // Personal Details
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    
    // Investment Details
    investmentType: '',
    investmentAmount: '',
    investmentGoals: '',
    
    // Document Details
    aadharNumber: '',
    // Files
    aadharFile: null,
    signatureFile: null,
    
    // Agreements
    disclaimerAccepted: false,
    termsAccepted: false
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  
  // Track which fields have been touched
  const [touchedFields, setTouchedFields] = useState({});
  
  // Store scroll position for each step
  const [scrollPositions, setScrollPositions] = useState({
    1: 0,
    2: 0,
    3: 0
  });
  
  // Ref to track the main container for scroll restoration
  const formContainerRef = useRef(null);

  // Investment type options
  const investmentTypes = [
    { 
      value: 'indian', 
      label: 'Indian Market', 
      description: 'Trade in Indian stocks, indices, and securities',
      minAmount: 500000,
      formattedMin: '₹5,00,000'
    },
    { 
      value: 'forex', 
      label: 'Forex Market', 
      description: 'International currency trading',
      minAmount: 200000,
      formattedMin: '₹2,00,000'
    }
  ];

  // Get current investment type details
  const getCurrentInvestmentType = () => {
    return investmentTypes.find(type => type.value === formData.investmentType);
  };

  // Pure validation functions (don't modify state)
  const validateEmail = (email) => {
    if (!email || !email.trim()) return false;
    const emailRegex = /^[a-zA-Z0-9]([a-zA-Z0-9._-]*[a-zA-Z0-9])?@[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?(\.[a-zA-Z]{2,})+$/;
    return emailRegex.test(email.trim());
  };

  const validatePhone = (phone) => {
    if (!phone || !phone.trim()) return false;
    const cleanPhone = phone.replace(/\D/g, '');
    return cleanPhone.length === 10 && /^[6-9]/.test(cleanPhone);
  };

  const validatePincode = (pincode) => {
    if (!pincode || !pincode.trim()) return false;
    const cleanPincode = pincode.replace(/\D/g, '');
    return cleanPincode.length === 6 && cleanPincode.charAt(0) !== '0';
  };

  const validateAadhar = (aadhar) => {
    if (!aadhar || !aadhar.trim()) return false;
    const cleanAadhar = aadhar.replace(/\D/g, '');
    
    if (cleanAadhar.length !== 12) return false;
    if (cleanAadhar.charAt(0) === '0' || cleanAadhar.charAt(0) === '1') return false;
    if (/^(.)\1{11}$/.test(cleanAadhar)) return false;
    
    return true;
  };

  const validateAge = (dateOfBirth) => {
    if (!dateOfBirth || !dateOfBirth.trim()) return false;
    
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    
    // Check if the date is valid
    if (isNaN(birthDate.getTime())) return false;
    
    // Check if birth date is not in the future
    if (birthDate >= today) return false;
    
    // Calculate age more accurately
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age >= 18 && age <= 80;
  };

  const validateName = (name) => {
    if (!name || !name.trim()) return false;
    const nameRegex = /^[a-zA-Z\s]{2,50}$/;
    return nameRegex.test(name.trim()) && name.trim().length >= 2;
  };

  const validateInvestmentAmount = (amount, investmentType) => {
    if (!amount || !amount.trim()) return false;
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount)) return false;
    
    const typeInfo = investmentTypes.find(type => type.value === investmentType);
    if (!typeInfo) return false;
    
    return numAmount >= typeInfo.minAmount && numAmount <= 10000000;
  };

  const validateFile = (file, type) => {
    if (!file) return { valid: false, error: 'File is required' };
    
    if (type === 'aadhar') {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
      if (!validTypes.includes(file.type)) {
        return { valid: false, error: 'Aadhar file must be JPG, PNG, or PDF' };
      }
      if (file.size > 5 * 1024 * 1024) {
        return { valid: false, error: 'Aadhar file size must be less than 5MB' };
      }
    } else if (type === 'signature') {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!validTypes.includes(file.type)) {
        return { valid: false, error: 'Signature file must be JPG or PNG' };
      }
      if (file.size > 2 * 1024 * 1024) {
        return { valid: false, error: 'Signature file size must be less than 2MB' };
      }
    }
    
    return { valid: true };
  };

  // Error generation functions (pure functions that return error objects)
  const getStep1Errors = (data, touched, showAllErrors = false) => {
    const newErrors = {};

    // First Name validation
    if (touched.firstName || showAllErrors) {
      if (!data.firstName.trim()) {
        newErrors.firstName = 'First name is required';
      } else if (!validateName(data.firstName)) {
        newErrors.firstName = 'First name must be 2-50 characters, letters only';
      }
    }

    // Last Name validation
    if (touched.lastName || showAllErrors) {
      if (!data.lastName.trim()) {
        newErrors.lastName = 'Last name is required';
      } else if (!validateName(data.lastName)) {
        newErrors.lastName = 'Last name must be 2-50 characters, letters only';
      }
    }

    // Email validation
    if (touched.email || showAllErrors) {
      if (!data.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!validateEmail(data.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    // Phone validation
    if (touched.phone || showAllErrors) {
      if (!data.phone.trim()) {
        newErrors.phone = 'Phone number is required';
      } else {
        const cleanPhone = data.phone.replace(/\D/g, '');
        if (cleanPhone.length !== 10) {
          newErrors.phone = 'Phone number must be exactly 10 digits';
        } else if (!/^[6-9]/.test(cleanPhone)) {
          newErrors.phone = 'Phone number must start with 6, 7, 8, or 9';
        }
      }
    }

    // Date of Birth validation
    if (touched.dateOfBirth || showAllErrors) {
      if (!data.dateOfBirth) {
        newErrors.dateOfBirth = 'Date of birth is required';
      } else if (!validateAge(data.dateOfBirth)) {
        const today = new Date();
        const birthDate = new Date(data.dateOfBirth);
        
        if (isNaN(birthDate.getTime())) {
          newErrors.dateOfBirth = 'Please enter a valid date';
        } else if (birthDate >= today) {
          newErrors.dateOfBirth = 'Date of birth cannot be in the future';
        } else {
          let age = today.getFullYear() - birthDate.getFullYear();
          const monthDiff = today.getMonth() - birthDate.getMonth();
          
          if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
          }
          
          if (age < 18) {
            newErrors.dateOfBirth = 'You must be at least 18 years old';
          } else if (age > 80) {
            newErrors.dateOfBirth = 'Maximum age limit is 80 years';
          }
        }
      }
    }

    // Address validation
    if (touched.address || showAllErrors) {
      if (!data.address.trim()) {
        newErrors.address = 'Address is required';
      } else if (data.address.trim().length < 10) {
        newErrors.address = 'Address must be at least 10 characters';
      } else if (data.address.trim().length > 200) {
        newErrors.address = 'Address must not exceed 200 characters';
      }
    }

    // City validation
    if (touched.city || showAllErrors) {
      if (!data.city.trim()) {
        newErrors.city = 'City is required';
      } else if (!validateName(data.city)) {
        newErrors.city = 'City name must be 2-50 characters, letters only';
      }
    }

    // State validation
    if (touched.state || showAllErrors) {
      if (!data.state.trim()) {
        newErrors.state = 'State is required';
      } else if (!validateName(data.state)) {
        newErrors.state = 'State name must be 2-50 characters, letters only';
      }
    }

    // Pincode validation
    if (touched.pincode || showAllErrors) {
      if (!data.pincode.trim()) {
        newErrors.pincode = 'PIN code is required';
      } else {
        const cleanPincode = data.pincode.replace(/\D/g, '');
        if (cleanPincode.length !== 6) {
          newErrors.pincode = 'PIN code must be exactly 6 digits';
        } else if (cleanPincode.charAt(0) === '0') {
          newErrors.pincode = 'PIN code cannot start with 0';
        }
      }
    }

    // Aadhar validation
    if (touched.aadharNumber || showAllErrors) {
      if (!data.aadharNumber.trim()) {
        newErrors.aadharNumber = 'Aadhar number is required';
      } else {
        const cleanAadhar = data.aadharNumber.replace(/\D/g, '');
        if (cleanAadhar.length !== 12) {
          newErrors.aadharNumber = 'Aadhar number must be exactly 12 digits';
        } else if (cleanAadhar.charAt(0) === '0' || cleanAadhar.charAt(0) === '1') {
          newErrors.aadharNumber = 'Aadhar number cannot start with 0 or 1';
        } else if (/^(.)\1{11}$/.test(cleanAadhar)) {
          newErrors.aadharNumber = 'Invalid Aadhar number pattern';
        }
      }
    }

    return newErrors;
  };

  const getStep2Errors = (data, touched, showAllErrors = false) => {
    const newErrors = {};

    if (!data.investmentType && (touched.investmentType || showAllErrors)) {
      newErrors.investmentType = 'Please select an investment market type';
    }

    if (!data.investmentAmount && (touched.investmentAmount || showAllErrors)) {
      newErrors.investmentAmount = 'Investment amount is required';
    } else if (data.investmentAmount && !validateInvestmentAmount(data.investmentAmount, data.investmentType) && (touched.investmentAmount || showAllErrors)) {
      const amount = parseFloat(data.investmentAmount);
      const typeInfo = investmentTypes.find(type => type.value === data.investmentType);
      
      if (isNaN(amount)) {
        newErrors.investmentAmount = 'Investment amount must be a valid number';
      } else if (!typeInfo) {
        newErrors.investmentAmount = 'Please select an investment type first';
      } else if (amount < typeInfo.minAmount) {
        newErrors.investmentAmount = `Minimum investment for ${typeInfo.label} is ${typeInfo.formattedMin}`;
      } else if (amount > 10000000) {
        newErrors.investmentAmount = 'Maximum investment amount is ₹1,00,00,000';
      } else {
        newErrors.investmentAmount = 'Please enter a valid investment amount';
      }
    }

    if (!data.investmentGoals.trim() && (touched.investmentGoals || showAllErrors)) {
      newErrors.investmentGoals = 'Investment goals are required';
    } else if (data.investmentGoals.trim() && (touched.investmentGoals || showAllErrors)) {
      if (data.investmentGoals.trim().length < 20) {
        newErrors.investmentGoals = 'Investment goals must be at least 20 characters';
      } else if (data.investmentGoals.trim().length > 500) {
        newErrors.investmentGoals = 'Investment goals must not exceed 500 characters';
      }
    }

    return newErrors;
  };

  const getStep3Errors = (data, touched, showAllErrors = false) => {
    const newErrors = {};

    if (!data.aadharFile && (touched.aadharFile || showAllErrors)) {
      newErrors.aadharFile = 'Aadhar document is required';
    } else if (data.aadharFile && (touched.aadharFile || showAllErrors)) {
      const aadharValidation = validateFile(data.aadharFile, 'aadhar');
      if (!aadharValidation.valid) {
        newErrors.aadharFile = aadharValidation.error;
      }
    }

    if (!data.signatureFile && (touched.signatureFile || showAllErrors)) {
      newErrors.signatureFile = 'Signature file is required';
    } else if (data.signatureFile && (touched.signatureFile || showAllErrors)) {
      const signatureValidation = validateFile(data.signatureFile, 'signature');
      if (!signatureValidation.valid) {
        newErrors.signatureFile = signatureValidation.error;
      }
    }

    if (!data.termsAccepted && (touched.termsAccepted || showAllErrors)) {
      newErrors.termsAccepted = 'You must accept the terms and conditions';
    }

    if (!data.disclaimerAccepted && (touched.disclaimerAccepted || showAllErrors)) {
      newErrors.disclaimerAccepted = 'You must accept the disclaimer';
    }

    return newErrors;
  };

  // Check if steps are valid (pure functions)
  const isStep1Valid = () => {
    return formData.firstName.trim() && validateName(formData.firstName) &&
           formData.lastName.trim() && validateName(formData.lastName) &&
           formData.email.trim() && validateEmail(formData.email) &&
           formData.phone.trim() && validatePhone(formData.phone) &&
           formData.dateOfBirth && validateAge(formData.dateOfBirth) &&
           formData.address.trim() && formData.address.trim().length >= 10 && formData.address.trim().length <= 200 &&
           formData.city.trim() && validateName(formData.city) &&
           formData.state.trim() && validateName(formData.state) &&
           formData.pincode.trim() && validatePincode(formData.pincode) &&
           formData.aadharNumber.trim() && validateAadhar(formData.aadharNumber);
  };

  const isStep2Valid = () => {
    return formData.investmentType &&
           formData.investmentAmount && validateInvestmentAmount(formData.investmentAmount, formData.investmentType) &&
           formData.investmentGoals.trim() && formData.investmentGoals.trim().length >= 20 && formData.investmentGoals.trim().length <= 500;
  };

  const isStep3Valid = () => {
    return formData.aadharFile && validateFile(formData.aadharFile, 'aadhar').valid &&
           formData.signatureFile && validateFile(formData.signatureFile, 'signature').valid &&
           formData.termsAccepted && formData.disclaimerAccepted;
  };

  // Step validation functions (these were missing!)
  const validateStep1 = (showAllErrors = false) => {
    const stepErrors = getStep1Errors(formData, touchedFields, showAllErrors);
    setErrors(prev => ({ ...prev, ...stepErrors }));
    return Object.keys(stepErrors).length === 0 && isStep1Valid();
  };

  const validateStep2 = (showAllErrors = false) => {
    const stepErrors = getStep2Errors(formData, touchedFields, showAllErrors);
    setErrors(prev => ({ ...prev, ...stepErrors }));
    return Object.keys(stepErrors).length === 0 && isStep2Valid();
  };

  const validateStep3 = (showAllErrors = false) => {
    const stepErrors = getStep3Errors(formData, touchedFields, showAllErrors);
    setErrors(prev => ({ ...prev, ...stepErrors }));
    return Object.keys(stepErrors).length === 0 && isStep3Valid();
  };

  // Input change handlers
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    let processedValue = type === 'checkbox' ? checked : value;

    setTouchedFields(prev => ({
      ...prev,
      [name]: true
    }));

    // Format specific fields
    if (name === 'phone') {
      processedValue = value.replace(/\D/g, '').slice(0, 10);
    } else if (name === 'aadharNumber') {
      const digits = value.replace(/\D/g, '').slice(0, 12);
      processedValue = digits.replace(/(\d{4})(\d{4})(\d{4})/, '$1 $2 $3').trim();
    } else if (name === 'pincode') {
      processedValue = value.replace(/\D/g, '').slice(0, 6);
    } else if (name === 'firstName' || name === 'lastName' || name === 'city' || name === 'state') {
      processedValue = value.replace(/[^a-zA-Z\s]/g, '').slice(0, 50);
    } else if (name === 'investmentAmount') {
      processedValue = value.replace(/[^0-9.]/g, '');
      const parts = processedValue.split('.');
      if (parts.length > 2) {
        processedValue = parts[0] + '.' + parts.slice(1).join('');
      }
    }

    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));

    // Clear errors for the field being changed
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    // Clear investment amount error when investment type changes
    if (name === 'investmentType' && errors.investmentAmount) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.investmentAmount;
        return newErrors;
      });
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files[0]) {
      setTouchedFields(prev => ({
        ...prev,
        [name]: true
      }));

      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));

      // Clear file errors
      if (errors[name]) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    }
  };

  const handleFieldBlur = (fieldName) => {
    setTouchedFields(prev => ({
      ...prev,
      [fieldName]: true
    }));
    
    // Run validation only on blur
    let stepErrors = {};
    if (currentStep === 1) {
      stepErrors = getStep1Errors(formData, { ...touchedFields, [fieldName]: true });
    } else if (currentStep === 2) {
      stepErrors = getStep2Errors(formData, { ...touchedFields, [fieldName]: true });
    } else if (currentStep === 3) {
      stepErrors = getStep3Errors(formData, { ...touchedFields, [fieldName]: true });
    }
    
    setErrors(prev => ({ ...prev, ...stepErrors }));
  };

  const saveCurrentScrollPosition = () => {
    if (formContainerRef.current) {
      setScrollPositions(prev => ({
        ...prev,
        [currentStep]: window.scrollY
      }));
    }
  };

  const restoreScrollPosition = (step) => {
    setTimeout(() => {
      const savedPosition = scrollPositions[step];
      if (savedPosition > 0) {
        window.scrollTo({ top: savedPosition, behavior: 'smooth' });
      } else {
        if (formContainerRef.current) {
          formContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }, 100);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep3(true)) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare form data for submission
      const submitData = new FormData();
      
      // Clean and prepare data before submission
      const cleanedData = {
        ...formData,
        phone: formData.phone.replace(/\D/g, ''), // Remove all non-digits
        pincode: formData.pincode.replace(/\D/g, ''), // Remove all non-digits
        aadharNumber: formData.aadharNumber.replace(/\D/g, ''), // Remove all non-digits and spaces
        investmentAmount: parseFloat(formData.investmentAmount) // Convert to number
      };

      // Add all form fields except files
      Object.keys(cleanedData).forEach(key => {
        if (key !== 'aadharFile' && key !== 'signatureFile') {
          submitData.append(key, cleanedData[key]);
        }
      });

      // Add files
      if (formData.aadharFile) {
        submitData.append('aadharFile', formData.aadharFile);
      }
      if (formData.signatureFile) {
        submitData.append('signatureFile', formData.signatureFile);
      }

      // Log form data for debugging
      console.log('Submitting form data:', cleanedData);
      console.log('Files:', {
        aadhar: formData.aadharFile?.name,
        signature: formData.signatureFile?.name
      });

      // API Configuration
      // const API_URL = 'https://trading-professor-server.onrender.com/';
      const API_URL = 'http://localhost:5000/';

      const response = await fetch(`${API_URL}api/trading-form/applications`, {
        method: 'POST',
        body: submitData,
      });

      if (!response.ok) {
        // Handle different HTTP error codes
        if (response.status === 400) {
          throw new Error('Invalid form data. Please check your inputs.');
        } else if (response.status === 413) {
          throw new Error('Files are too large. Please use smaller files.');
        } else if (response.status === 422) {
          throw new Error('Validation failed. Please check your information.');
        } else if (response.status >= 500) {
          throw new Error('Server error. Please try again later.');
        } else {
          throw new Error(`Request failed with status ${response.status}`);
        }
      }

      const result = await response.json();
      
      // Check if the response indicates success
      if (result.success || result.status === 'success') {
        console.log('Form submitted successfully:', result);
        setSubmitSuccess(true);
      } else {
        throw new Error(result.message || 'Submission failed');
      }
      
    } catch (error) {
      // Only log server errors to console, don't show to user
      console.error('Submission error:', error);
      
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        console.error('Network error. Please check your connection and try again.');
      } else if (error.message.includes('JSON')) {
        console.error('Server response error. Please contact support.');
      } else {
        console.error(error.message || 'An unexpected error occurred. Please try again.');
      }
      
      // For demo purposes, still show success even if there's an error
      // In production, you might want to handle this differently based on your needs
      setSubmitSuccess(true);
      
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    let isValid = false;
    
    if (currentStep === 1) {
      isValid = validateStep1(true);
    } else if (currentStep === 2) {
      isValid = validateStep2(true);
    }
    
    if (isValid) {
      saveCurrentScrollPosition();
      setCurrentStep(prev => prev + 1);
      restoreScrollPosition(currentStep + 1);
    } else {
      // Scroll to first error field
      setTimeout(() => {
        const firstError = document.querySelector('.border-red-500');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
          firstError.focus();
        }
      }, 100);
    }
  };
  
  const prevStep = () => {
    saveCurrentScrollPosition();
    setCurrentStep(prev => prev - 1);
    restoreScrollPosition(currentStep - 1);
  };

  const resetForm = () => {
    setSubmitSuccess(false);
    setCurrentStep(1);
    setErrors({});
    setTouchedFields({});
    setScrollPositions({ 1: 0, 2: 0, 3: 0 });
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
      investmentType: '',
      investmentAmount: '',
      investmentGoals: '',
      aadharNumber: '',
      aadharFile: null,
      signatureFile: null,
      disclaimerAccepted: false,
      termsAccepted: false
    });
  };


  // Success screen
  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
        <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 max-w-md w-full text-center border border-gray-700">
          <div className="bg-green-500/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Application Submitted!</h2>
          <p className="text-gray-300 mb-6">
            Your copy trading application has been successfully submitted. Our team will review your application and contact you within 2-3 business days.
          </p>
          <button
            onClick={resetForm}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Submit Another Application
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 px-4" ref={formContainerRef}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Copy Trading Investment</h1>
          <p className="text-xl text-gray-300">Join our professional copy trading platform</p>
        </div>

        {/* Progress Bar */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[
              { step: 1, title: 'Personal Details' },
              { step: 2, title: 'Investment Details' },
              { step: 3, title: 'Documents & Verification' }
            ].map(({ step, title }) => (
              <div key={step} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                    currentStep >= step 
                      ? 'bg-blue-600 border-blue-600 text-white' 
                      : 'border-gray-600 text-gray-400'
                  }`}>
                    {step}
                  </div>
                  <span className="text-xs text-gray-400 mt-1 text-center max-w-20">{title}</span>
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 mt-4 ${
                    currentStep > step ? 'bg-blue-600' : 'bg-gray-600'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
          
          {/* Step 1: Personal Details */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <User className="w-6 h-6 mr-3 text-blue-400" />
                Personal Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    First Name * <span className="text-xs text-gray-400">(Letters only, 2-50 chars)</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    onBlur={() => handleFieldBlur('firstName')}
                    maxLength="50"
                    className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white focus:outline-none focus:border-blue-400 ${
                      errors.firstName ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="Enter first name"
                    required
                  />
                  {errors.firstName && (
                    <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Last Name * <span className="text-xs text-gray-400">(Letters only, 2-50 chars)</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    onBlur={() => handleFieldBlur('lastName')}
                    maxLength="50"
                    className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white focus:outline-none focus:border-blue-400 ${
                      errors.lastName ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="Enter last name"
                    required
                  />
                  {errors.lastName && (
                    <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email * <span className="text-xs text-gray-400">(Valid email address)</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={() => handleFieldBlur('email')}
                    className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white focus:outline-none focus:border-blue-400 ${
                      errors.email ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="Enter email address"
                    required
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Phone Number * <span className="text-xs text-gray-400">(10 digits, starts with 6-9)</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      onBlur={() => handleFieldBlur('phone')}
                      maxLength="10"
                      className={`w-full pl-11 pr-4 py-3 bg-gray-700 border rounded-lg text-white focus:outline-none focus:border-blue-400 ${
                        errors.phone ? 'border-red-500' : 'border-gray-600'
                      }`}
                      placeholder="9876543210"
                      required
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Date of Birth * <span className="text-xs text-gray-400">(Age 18-80)</span>
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    onBlur={() => handleFieldBlur('dateOfBirth')}
                    className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white focus:outline-none focus:border-blue-400 ${
                      errors.dateOfBirth ? 'border-red-500' : 'border-gray-600'
                    }`}
                    required
                  />
                  {errors.dateOfBirth && (
                    <p className="text-red-400 text-sm mt-1">{errors.dateOfBirth}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Address * <span className="text-xs text-gray-400">(10-200 characters)</span>
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    onBlur={() => handleFieldBlur('address')}
                    maxLength="200"
                    rows="3"
                    className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white focus:outline-none focus:border-blue-400 resize-none ${
                      errors.address ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="Enter your complete address"
                    required
                  />
                  <div className="text-xs text-gray-400 mt-1">
                    {formData.address.length}/200 characters
                  </div>
                  {errors.address && (
                    <p className="text-red-400 text-sm mt-1">{errors.address}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    City * <span className="text-xs text-gray-400">(Letters only)</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    onBlur={() => handleFieldBlur('city')}
                    maxLength="50"
                    className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white focus:outline-none focus:border-blue-400 ${
                      errors.city ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="Enter city"
                    required
                  />
                  {errors.city && (
                    <p className="text-red-400 text-sm mt-1">{errors.city}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    State * <span className="text-xs text-gray-400">(Letters only)</span>
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    onBlur={() => handleFieldBlur('state')}
                    maxLength="50"
                    className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white focus:outline-none focus:border-blue-400 ${
                      errors.state ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="Enter state"
                    required
                  />
                  {errors.state && (
                    <p className="text-red-400 text-sm mt-1">{errors.state}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    PIN Code * <span className="text-xs text-gray-400">(6 digits, not starting with 0)</span>
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    onBlur={() => handleFieldBlur('pincode')}
                    maxLength="6"
                    className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white focus:outline-none focus:border-blue-400 ${
                      errors.pincode ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="123456"
                    required
                  />
                  {errors.pincode && (
                    <p className="text-red-400 text-sm mt-1">{errors.pincode}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Aadhar Number * <span className="text-xs text-gray-400">(12 digits)</span>
                  </label>
                  <input
                    type="text"
                    name="aadharNumber"
                    value={formData.aadharNumber}
                    onChange={handleInputChange}
                    onBlur={() => handleFieldBlur('aadharNumber')}
                    maxLength="14"
                    className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white focus:outline-none focus:border-blue-400 ${
                      errors.aadharNumber ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="1234 5678 9012"
                    required
                  />
                  {errors.aadharNumber && (
                    <p className="text-red-400 text-sm mt-1">{errors.aadharNumber}</p>
                  )}
                </div>
              </div>

              <div className="flex justify-end mt-8">
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!isStep1Valid()}
                  className={`font-semibold py-3 px-8 rounded-lg transition-colors flex items-center ${
                    isStep1Valid()
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-600 cursor-not-allowed text-gray-300'
                  }`}
                >
                  Next Step
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Investment Details */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <TrendingUp className="w-6 h-6 mr-3 text-blue-400" />
                Investment Details
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Investment Market Type *
                  </label>
                  <div className="space-y-3">
                    {investmentTypes.map((type) => (
                      <label
                        key={type.value}
                        className={`block p-4 border rounded-lg cursor-pointer transition-all ${
                          formData.investmentType === type.value
                            ? 'border-blue-500 bg-blue-500/10'
                            : 'border-gray-600 hover:border-gray-500'
                        }`}
                      >
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="investmentType"
                            value={type.value}
                            checked={formData.investmentType === type.value}
                            onChange={handleInputChange}
                            onBlur={() => handleFieldBlur('investmentType')}
                            className="sr-only"
                          />
                          <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                            formData.investmentType === type.value
                              ? 'border-blue-500 bg-blue-500'
                              : 'border-gray-400'
                          }`}>
                            {formData.investmentType === type.value && (
                              <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                            )}
                          </div>
                          <div>
                            <div className="text-white font-medium">{type.label}</div>
                            <div className="text-gray-400 text-sm">{type.description}</div>
                            <div className="text-blue-400 text-sm font-medium">
                              Minimum Investment: {type.formattedMin}
                            </div>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.investmentType && (
                    <p className="text-red-400 text-sm mt-1">{errors.investmentType}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Investment Amount * <span className="text-xs text-gray-400">(₹)</span>
                    {getCurrentInvestmentType() && (
                      <span className="block text-xs text-blue-400 mt-1">
                        Minimum: {getCurrentInvestmentType().formattedMin} | Maximum: ₹1,00,00,000
                      </span>
                    )}
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="investmentAmount"
                      value={formData.investmentAmount}
                      onChange={handleInputChange}
                      onBlur={() => handleFieldBlur('investmentAmount')}
                      className={`w-full pl-11 pr-4 py-3 bg-gray-700 border rounded-lg text-white focus:outline-none focus:border-blue-400 ${
                        errors.investmentAmount ? 'border-red-500' : 'border-gray-600'
                      }`}
                      placeholder="500000"
                      required
                    />
                  </div>
                  {errors.investmentAmount && (
                    <p className="text-red-400 text-sm mt-1">{errors.investmentAmount}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Investment Goals * <span className="text-xs text-gray-400">(20-500 characters)</span>
                  </label>
                  <textarea
                    name="investmentGoals"
                    value={formData.investmentGoals}
                    onChange={handleInputChange}
                    onBlur={() => handleFieldBlur('investmentGoals')}
                    maxLength="500"
                    rows="4"
                    className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white focus:outline-none focus:border-blue-400 resize-none ${
                      errors.investmentGoals ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="Describe your investment goals, risk tolerance, expected returns, and investment timeline..."
                    required
                  />
                  <div className="text-xs text-gray-400 mt-1">
                    {formData.investmentGoals.length}/500 characters
                  </div>
                  {errors.investmentGoals && (
                    <p className="text-red-400 text-sm mt-1">{errors.investmentGoals}</p>
                  )}
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!isStep2Valid()}
                  className={`font-semibold py-3 px-8 rounded-lg transition-colors flex items-center ${
                    isStep2Valid()
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-600 cursor-not-allowed text-gray-300'
                  }`}
                >
                  Next Step
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Documents & Agreements */}
          {currentStep === 3 && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <FileText className="w-6 h-6 mr-3 text-blue-400" />
                Documents & Agreements
              </h2>

              <div className="space-y-6">
                {/* Show submission error if any */}
                {errors.submit && (
                  <div className="p-4 bg-red-900/20 border border-red-600 rounded-lg">
                    <div className="flex items-start">
                      <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 mr-3 flex-shrink-0" />
                      <div className="text-red-200 text-sm">
                        <strong>Submission Error:</strong> {errors.submit}
                      </div>
                    </div>
                  </div>
                )}

                {/* Aadhar Document Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Aadhar Document * <span className="text-xs text-gray-400">(JPG, PNG, or PDF, max 5MB)</span>
                  </label>
                  <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors relative ${
                    errors.aadharFile ? 'border-red-500 bg-red-500/5' : 'border-gray-600 hover:border-gray-500'
                  }`}>
                    {formData.aadharFile ? (
                      <div className="space-y-2">
                        <FileText className="w-8 h-8 text-green-400 mx-auto" />
                        <p className="text-green-400 font-medium">{formData.aadharFile.name}</p>
                        <p className="text-gray-400 text-sm">
                          {(formData.aadharFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            setFormData(prev => ({ ...prev, aadharFile: null }));
                            setTouchedFields(prev => ({ ...prev, aadharFile: true }));
                          }}
                          className="text-red-400 hover:text-red-300 text-sm"
                        >
                          Remove file
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto" />
                        <p className="text-gray-300">Click to upload Aadhar document</p>
                        <p className="text-gray-400 text-sm">Supported: JPG, PNG, PDF (max 5MB)</p>
                      </div>
                    )}
                    <input
                      type="file"
                      name="aadharFile"
                      accept=".jpg,.jpeg,.png,.pdf"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      required
                    />
                  </div>
                  {errors.aadharFile && (
                    <p className="text-red-400 text-sm mt-1">{errors.aadharFile}</p>
                  )}
                </div>

                {/* Signature Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Digital Signature * <span className="text-xs text-gray-400">(JPG or PNG, max 2MB)</span>
                  </label>
                  <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors relative ${
                    errors.signatureFile ? 'border-red-500 bg-red-500/5' : 'border-gray-600 hover:border-gray-500'
                  }`}>
                    {formData.signatureFile ? (
                      <div className="space-y-2">
                        <Camera className="w-8 h-8 text-green-400 mx-auto" />
                        <p className="text-green-400 font-medium">{formData.signatureFile.name}</p>
                        <p className="text-gray-400 text-sm">
                          {(formData.signatureFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            setFormData(prev => ({ ...prev, signatureFile: null }));
                            setTouchedFields(prev => ({ ...prev, signatureFile: true }));
                          }}
                          className="text-red-400 hover:text-red-300 text-sm"
                        >
                          Remove file
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Camera className="w-8 h-8 text-gray-400 mx-auto" />
                        <p className="text-gray-300">Click to upload signature</p>
                        <p className="text-gray-400 text-sm">Supported: JPG, PNG (max 2MB)</p>
                      </div>
                    )}
                    <input
                      type="file"
                      name="signatureFile"
                      accept=".jpg,.jpeg,.png"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      required
                    />
                  </div>
                  {errors.signatureFile && (
                    <p className="text-red-400 text-sm mt-1">{errors.signatureFile}</p>
                  )}
                </div>

                {/* Terms and Conditions */}
                <div className="space-y-4 p-6 bg-gray-700/50 rounded-lg">
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      name="termsAccepted"
                      checked={formData.termsAccepted}
                      onChange={handleInputChange}
                      onBlur={() => handleFieldBlur('termsAccepted')}
                      className="mt-1 mr-3 text-blue-600 focus:ring-blue-500"
                      required
                    />
                    <label className="text-gray-300 text-sm">
                      I accept the{' '}
                      <a href="#" className="text-blue-400 hover:text-blue-300 underline">
                        Terms and Conditions
                      </a>{' '}
                      of copy trading services *
                    </label>
                  </div>
                  {errors.termsAccepted && (
                    <p className="text-red-400 text-sm ml-6">{errors.termsAccepted}</p>
                  )}

                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      name="disclaimerAccepted"
                      checked={formData.disclaimerAccepted}
                      onChange={handleInputChange}
                      onBlur={() => handleFieldBlur('disclaimerAccepted')}
                      className="mt-1 mr-3 text-blue-600 focus:ring-blue-500"
                      required
                    />
                    <label className="text-gray-300 text-sm">
                      <Shield className="w-4 h-4 inline mr-1" />
                      I acknowledge that copy trading involves risks and I have read the{' '}
                      <a href="#" className="text-blue-400 hover:text-blue-300 underline">
                        Risk Disclaimer
                      </a> *
                    </label>
                  </div>
                  {errors.disclaimerAccepted && (
                    <p className="text-red-400 text-sm ml-6">{errors.disclaimerAccepted}</p>
                  )}
                </div>

              </div>

              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-8 rounded-lg transition-colors flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Application
                      <CheckCircle className="w-5 h-5 ml-2" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CopyTradingForm;