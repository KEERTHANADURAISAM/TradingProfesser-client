import React, { useState, useEffect } from 'react';
import { 
  AlertCircle,
} from 'lucide-react';
import TopNavbar from './TopNavbar';
import Sidebar from './Sidebar';
import EditCourseModal from './EditCourseModal';
import EditRegistrationModal from './EditRegistrationModal';
import FileViewModal from './FileViewModal';
import Notification from './Notification';
import OverviewTab from './OverviewTab';
import RegistrationsTab from './RegistrationsTab';
import CoursesTab from './CoursesTab';

// Main Admin Dashboard Component
const AdminDashboard = () => {
  // State Management
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [showEditRegistration, setShowEditRegistration] = useState(false);
  const [editingRegistration, setEditingRegistration] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [payments, setPayments] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [copyTradingApplications, setCopyTradingApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showFileModal, setShowFileModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [notification, setNotification] = useState(null);
  const [fileLoading, setFileLoading] = useState(false);

  // Pagination States
  const [registrationCurrentPage, setRegistrationCurrentPage] = useState(1);
  const [courseCurrentPage, setCourseCurrentPage] = useState(1);
  const [paymentCurrentPage, setPaymentCurrentPage] = useState(1);
  const [copyTradingCurrentPage, setCopyTradingCurrentPage] = useState(1);

  // API Base URL
  const API_BASE_URL = 'http://localhost:5000/';

  // Show notification
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Fetch registrations - FIXED
  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      console.log('Fetching from API:', `${API_BASE_URL}api/registration/all`);
      
      const response = await fetch(`${API_BASE_URL}api/registration/all`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      console.log('Raw API Response:', data);
      
      // Handle different possible response structures
      let registrationData = [];
      if (data.registrations && Array.isArray(data.registrations)) {
        registrationData = data.registrations;
      } else if (Array.isArray(data)) {
        registrationData = data;
      } else if (data.data && Array.isArray(data.data)) {
        registrationData = data.data;
      } else if (data.data && data.data.registrations && Array.isArray(data.data.registrations)) {
        registrationData = data.data.registrations;
      }
      
      console.log('Processed Registration Data:', registrationData);
      console.log('Total count from API:', registrationData.length);
      
      setRegistrations(registrationData);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch registrations:', err);
      setError(`Failed to load registrations: ${err.message}`);
      setRegistrations([]);
    } finally {
      setLoading(false);
    }
  };

  // Refresh data - FIXED
  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchRegistrations();
      showNotification('Data refreshed successfully');
    } catch (error) {
      console.error('Refresh failed:', error);
      showNotification('Failed to refresh data', 'error');
    } finally {
      setRefreshing(false);
    }
  };

  // Update registration status - FIXED API ENDPOINT
  const updateRegistrationStatus = async (registrationId, newStatus) => {
    try {
      // FIXED: Correct API endpoint with PUT method
      const response = await fetch(`${API_BASE_URL}api/registration/${registrationId}/status`, {
        method: 'PUT', // Changed from PATCH to PUT
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to update status');
      }

      setRegistrations(prev => 
        prev.map(reg => 
          (reg.id || reg._id) === registrationId 
            ? { ...reg, status: newStatus }
            : reg
        )
      );
      
      showNotification(`Status updated to ${newStatus}`);
    } catch (err) {
      console.error('Failed to update status:', err);
      showNotification(`Failed to update status: ${err.message}`, 'error');
    }
  };

  // Delete registration - CORRECT
  const deleteRegistration = async (registrationId) => {
    if (!window.confirm('Are you sure you want to delete this registration?')) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}api/registration/${registrationId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to delete registration');
      }

      setRegistrations(prev =>
        prev.filter(reg => (reg.id || reg._id) !== registrationId)
      );

      showNotification('Registration deleted successfully');
    } catch (err) {
      console.error('Failed to delete registration:', err);
      showNotification(`Failed to delete registration: ${err.message}`, 'error');
    }
  };

  // Download file function - ENHANCED ERROR HANDLING
  const handleDownloadFile = async (itemId, fileType, fileName) => {
    try {
      setFileLoading(true);
      
      const apiUrl = `${API_BASE_URL}api/registration/${itemId}/download/${fileType}`;
      
      console.log('📥 Download URL:', apiUrl);
      
      const downloadBtn = document.querySelector(`[data-download="${itemId}-${fileType}"]`);
      if (downloadBtn) {
        downloadBtn.disabled = true;
        downloadBtn.textContent = 'Downloading...';
      }
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/octet-stream, application/pdf, image/*',
        },
      });
      
      if (!response.ok) {
        let errorMessage = `Download failed: HTTP ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch {
          // If response is not JSON, use default message
        }
        throw new Error(errorMessage);
      }
      
      // Get filename from response headers or use fallback
      let downloadFileName = fileName;
      const contentDisposition = response.headers.get('content-disposition');
      
      if (contentDisposition) {
        const fileNameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
        if (fileNameMatch && fileNameMatch[1]) {
          downloadFileName = fileNameMatch[1].replace(/['"]/g, '');
        }
      }
      
      if (!downloadFileName) {
        const timestamp = new Date().toISOString().slice(0, 10);
        downloadFileName = `${fileType}_${itemId}_${timestamp}`;
      }
      
      const blob = await response.blob();
      
      if (blob.size === 0) {
        throw new Error('Downloaded file is empty');
      }
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = downloadFileName;
      a.style.display = 'none';
      
      document.body.appendChild(a);
      a.click();
      
      // Cleanup
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }, 100);
      
      console.log('✅ Download completed:', downloadFileName);
      showNotification(`File downloaded successfully: ${downloadFileName}`, 'success');
      
    } catch (error) {
      console.error('❌ Download failed:', error);
      showNotification(`Download failed: ${error.message}`, 'error');
    } finally {
      const downloadBtn = document.querySelector(`[data-download="${itemId}-${fileType}"]`);
      if (downloadBtn) {
        downloadBtn.disabled = false;
        downloadBtn.textContent = 'Download';
      }
      setFileLoading(false);
    }
  };

  // View file function - ENHANCED ERROR HANDLING
  const handleViewFile = async (itemId, fileType, fileName) => {
    try {
      setFileLoading(true);
      
      const fileUrl = `${API_BASE_URL}api/registration/${itemId}/view/${fileType}`;
      
      console.log('👁️ View URL:', fileUrl);
      
      // Test if file exists and is accessible
      const response = await fetch(fileUrl, {
        method: 'HEAD',
      });
      
      if (!response.ok) {
        let errorMessage = `File not found: HTTP ${response.status}`;
        try {
          const errorResponse = await fetch(fileUrl, { method: 'GET' });
          const errorData = await errorResponse.json();
          errorMessage = errorData.message || errorMessage;
        } catch {
          // If error response is not JSON, use default message
        }
        throw new Error(errorMessage);
      }
      
      // Set file URL for modal display
      setSelectedFile({ 
        url: fileUrl, 
        name: fileName || `${fileType}_${itemId}`,
        type: fileType 
      });
      setShowFileModal(true);
      
      console.log('✅ File view opened:', fileName);
      
    } catch (error) {
      console.error('❌ View failed:', error);
      showNotification(`Failed to view file: ${error.message}`, 'error');
    } finally {
      setFileLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchRegistrations();
  }, []);

  // Sample courses data
  const [courses, setCourses] = useState([
    { id: 1, title: 'Basic Trading Fundamentals', duration: '4 weeks', price: '₹5,999', students: 156, status: 'active', description: 'Learn the basics of stock market trading' },
    { id: 2, title: 'Advanced Trading Strategies', duration: '6 weeks', price: '₹8,999', students: 89, status: 'active', description: 'Master advanced trading techniques' },
    { id: 3, title: 'Options Trading Mastery', duration: '8 weeks', price: '₹12,999', students: 67, status: 'active', description: 'Complete guide to options trading' },
    { id: 4, title: 'Cryptocurrency Trading', duration: '5 weeks', price: '₹7,499', students: 123, status: 'draft', description: 'Digital currency trading strategies' },
  ]);

  // Stats calculation
  const stats = {
    totalStudents: registrations.length,
    activeCourses: courses.filter(c => c.status === 'active').length,
    totalRevenue: payments.reduce((sum, payment) => sum + (payment.amount || 0), 0),
    completionRate: '78%',
    copyTradingApplications: copyTradingApplications.length,
    activeCopyTraders: copyTradingApplications.filter(app => app.status === 'active').length
  };

  // Filter functions
  const filteredRegistrations = registrations.filter(reg => {
    if (!reg) return false;
    const searchFields = [
      reg.firstName, reg.lastName, reg.name, reg.email, 
      reg.phone, reg.courseName, reg.course
    ].filter(Boolean).join(' ').toLowerCase();
    
    const matchesSearch = searchFields.includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || reg.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const filteredCopyTradingApplications = copyTradingApplications.filter(app => {
    if (!app) return false;
    const searchFields = [
      app.firstName, app.lastName, app.name, app.email, 
      app.phone, app.investmentAmount, app.investmentGoals
    ].filter(Boolean).join(' ').toLowerCase();
    
    const matchesSearch = searchFields.includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || app.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const filteredPayments = payments.filter(payment => {
    if (!payment) return false;
    return (payment.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
           (payment.email?.toLowerCase() || '').includes(searchTerm.toLowerCase());
  });

  // Handler functions
  const handleEditCourse = (course) => {
    setEditingCourse(course);
    setShowEditModal(true);
  };

  const handleSaveCourse = (updatedCourse) => {
    setCourses(courses.map(c => c.id === updatedCourse.id ? updatedCourse : c));
    setShowEditModal(false);
    setEditingCourse(null);
    showNotification('Course updated successfully');
  };

  const handleEditRegistration = (registration) => {
    setEditingRegistration(registration);
    setShowEditRegistration(true);
  };

  // Utility functions
  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'under_review': return 'bg-blue-100 text-blue-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'suspended': return 'bg-orange-100 text-orange-800';
      case 'success': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'success':
      case 'completed':
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed':
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    try {
      return new Date(dateString).toLocaleDateString('en-IN');
    } catch {
      return 'Invalid Date';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount || 0);
  };

  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return 'Unknown';
    try {
      const age = Math.floor((Date.now() - new Date(dateOfBirth).getTime()) / (365.25 * 24 * 60 * 60 * 1000));
      return age;
    } catch {
      return 'Unknown';
    }
  };

  const getStudentName = (item) => {
    if (item.firstName && item.lastName) {
      return `${item.firstName} ${item.lastName}`;
    }
    return item.name || item.firstName || item.lastName || 'Unknown';
  };

  const getStudentInitials = (item) => {
    const name = getStudentName(item);
    return name.split(' ').map(n => n.charAt(0)).join('').substring(0, 2).toUpperCase();
  };

  // IMPROVED file detection functions
  const hasFiles = (item) => {
    return hasAadharFile(item) || hasSignatureFile(item);
  };

  const hasAadharFile = (item) => {
    // Check multiple possible structures for file existence
    return !!(
      item.files?.aadharFile?.originalName ||
      item.files?.aadharFile?.filename ||
      item.aadharFile?.originalName ||
      item.aadharFile?.filename ||
      item.aadharFile ||
      item.aadharCard
    );
  };

  const hasSignatureFile = (item) => {
    // Check multiple possible structures for file existence
    return !!(
      item.files?.signatureFile?.originalName ||
      item.files?.signatureFile?.filename ||
      item.signatureFile?.originalName ||
      item.signatureFile?.filename ||
      item.signatureFile ||
      item.signature
    );
  };

  // Get file name for display
  const getFileName = (item, fileType) => {
    if (fileType === 'aadhar') {
      return item.files?.aadharFile?.originalName ||
             item.aadharFile?.originalName ||
             item.aadharFile?.filename ||
             'Aadhaar Document';
    } else if (fileType === 'signature') {
      return item.files?.signatureFile?.originalName ||
             item.signatureFile?.originalName ||
             item.signatureFile?.filename ||
             'Signature Document';
    }
    return 'Document';
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setRegistrationCurrentPage(1);
    setCourseCurrentPage(1);
    setPaymentCurrentPage(1);
    setCopyTradingCurrentPage(1);
  };

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <OverviewTab 
            stats={stats}
            registrations={registrations}
            copyTradingApplications={copyTradingApplications}
            loading={loading}
            getStudentName={getStudentName}
            getStudentInitials={getStudentInitials}
            getStatusColor={getStatusColor}
            formatCurrency={formatCurrency}
          />
        );
      case 'registrations':
        return (
          <RegistrationsTab
            filteredRegistrations={filteredRegistrations}
            loading={loading}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            updateRegistrationStatus={updateRegistrationStatus}
            deleteRegistration={deleteRegistration}
            handleEditRegistration={handleEditRegistration}
            handleViewFile={handleViewFile}
            handleDownloadFile={handleDownloadFile}
            formatDate={formatDate}
            getStudentName={getStudentName}
            getStudentInitials={getStudentInitials}
            hasFiles={hasFiles}
            hasAadharFile={hasAadharFile}
            hasSignatureFile={hasSignatureFile}
            getFileName={getFileName}
            fileLoading={fileLoading}
            getStatusColor={getStatusColor}
            currentPage={registrationCurrentPage}
            setCurrentPage={setRegistrationCurrentPage}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        );
      case 'courses':
        return (
          <CoursesTab
            courses={courses}
            handleEditCourse={handleEditCourse}
            getStatusColor={getStatusColor}
            currentPage={courseCurrentPage}
            setCurrentPage={setCourseCurrentPage}
            itemsPerPage={itemsPerPage}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="relative z-10">
        {/* Top Navigation */}
        <TopNavbar 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          handleRefresh={handleRefresh}
          refreshing={refreshing}
        />

        {/* Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          stats={stats}
        />

        {/* Main Content */}
        <div className="lg:ml-64 pt-16 min-h-screen">
          <div className="p-6">
            {error && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-200">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  {error}
                </div>
              </div>
            )}
            
            {renderContent()}
          </div>
        </div>

        {/* Modals */}
        <EditCourseModal 
          showEditModal={showEditModal}
          setShowEditModal={setShowEditModal}
          editingCourse={editingCourse}
          setEditingCourse={setEditingCourse}
          handleSaveCourse={handleSaveCourse}
        />

        <EditRegistrationModal 
          showEditRegistration={showEditRegistration}
          setShowEditRegistration={setShowEditRegistration}
          editingRegistration={editingRegistration}
          setEditingRegistration={setEditingRegistration}
          hasFiles={hasFiles}
          handleViewFile={handleViewFile}
          handleDownloadFile={handleDownloadFile}
          getStudentName={getStudentName}
          formatDate={formatDate}
          deleteRegistration={deleteRegistration}
          setRegistrations={setRegistrations}
          showNotification={showNotification}
        />

        <FileViewModal 
          showFileModal={showFileModal}
          selectedFile={selectedFile}
          setShowFileModal={setShowFileModal}
          setSelectedFile={setSelectedFile}
        />

        {/* Notification */}
        <Notification notification={notification} />

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;