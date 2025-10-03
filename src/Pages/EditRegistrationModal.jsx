import React, { useState } from 'react';
import { 
  Eye, Download, X, Loader2
} from 'lucide-react';

// Edit Registration Modal
const EditRegistrationModal = ({ 
  showEditRegistration, setShowEditRegistration, editingRegistration, setEditingRegistration,
  hasFiles, handleViewFile, handleDownloadFile, formatDate, deleteRegistration,
  setRegistrations, showNotification, API_BASE_URL
}) => {
  const [saving, setSaving] = useState(false);

  if (!showEditRegistration || !editingRegistration) return null;

  const handleSaveRegistration = async () => {
    try {
      setSaving(true);
      const registrationId = editingRegistration.id || editingRegistration._id;

      // Prepare update data
      const updateData = {
        firstName: editingRegistration.firstName,
        lastName: editingRegistration.lastName,
        email: editingRegistration.email,
        phone: editingRegistration.phone,
        courseName: editingRegistration.courseName || editingRegistration.course,
        status: editingRegistration.status
      };

      console.log('💾 Saving registration:', registrationId, updateData);

      // Call backend API to update
      const response = await fetch(`${API_BASE_URL}api/registration/${registrationId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `Update failed: HTTP ${response.status}`);
      }

      const result = await response.json();
      console.log('✅ Registration updated:', result);

      // Update local state with response data
      setRegistrations(prev => 
        prev.map(reg => 
          (reg.id || reg._id) === registrationId 
            ? { ...reg, ...result.data }
            : reg
        )
      );

      setShowEditRegistration(false);
      showNotification('Registration updated successfully', 'success');
    } catch (error) {
      console.error('❌ Save failed:', error);
      showNotification(`Failed to update: ${error.message}`, 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded-xl p-6 w-full max-w-2xl border border-white/10 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Edit Registration</h3>
          <button
            onClick={() => setShowEditRegistration(false)}
            className="text-white/70 hover:text-white"
            disabled={saving}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-white/70 text-sm mb-1">First Name</label>
            <input
              type="text"
              value={editingRegistration.firstName || ''}
              onChange={(e) => setEditingRegistration({...editingRegistration, firstName: e.target.value})}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              disabled={saving}
            />
          </div>
          
          <div>
            <label className="block text-white/70 text-sm mb-1">Last Name</label>
            <input
              type="text"
              value={editingRegistration.lastName || ''}
              onChange={(e) => setEditingRegistration({...editingRegistration, lastName: e.target.value})}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              disabled={saving}
            />
          </div>
          
          <div>
            <label className="block text-white/70 text-sm mb-1">Email</label>
            <input
              type="email"
              value={editingRegistration.email || ''}
              onChange={(e) => setEditingRegistration({...editingRegistration, email: e.target.value})}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              disabled={saving}
            />
          </div>
          
          <div>
            <label className="block text-white/70 text-sm mb-1">Phone</label>
            <input
              type="tel"
              value={editingRegistration.phone || ''}
              onChange={(e) => setEditingRegistration({...editingRegistration, phone: e.target.value})}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              disabled={saving}
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-white/70 text-sm mb-1">Course</label>
            <input
              type="text"
              value={editingRegistration.courseName || editingRegistration.course || ''}
              onChange={(e) => setEditingRegistration({...editingRegistration, courseName: e.target.value})}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              disabled={saving}
            />
          </div>
          
          <div>
            <label className="block text-white/70 text-sm mb-1">Status</label>
            <select
              value={editingRegistration.status || 'pending'}
              onChange={(e) => setEditingRegistration({...editingRegistration, status: e.target.value})}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              disabled={saving}
            >
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="under_review">Under Review</option>
            </select>
          </div>
          
          <div>
            <label className="block text-white/70 text-sm mb-1">Registration Date</label>
            <input
              type="text"
              value={formatDate(editingRegistration.createdAt || editingRegistration.registrationDate)}
              disabled
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white/70"
            />
          </div>
        </div>
        
        {/* Files Section */}
        {hasFiles(editingRegistration) && (
          <div className="mb-6">
            <h4 className="text-white font-medium mb-3">Uploaded Files</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(editingRegistration.aadharFile || editingRegistration.aadharCard) && (
                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Aadhar Card</p>
                      <p className="text-white/70 text-sm">Identity Document</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewFile(
                          editingRegistration.id || editingRegistration._id, 
                          'aadhar', 
                          'Aadhar Card'
                        )}
                        className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                        title="View File"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDownloadFile(
                          editingRegistration.id || editingRegistration._id, 
                          'aadhar', 
                          'Aadhar Card'
                        )}
                        className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                        title="Download File"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {(editingRegistration.signatureFile || editingRegistration.signature) && (
                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Signature</p>
                      <p className="text-white/70 text-sm">Digital Signature</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewFile(
                          editingRegistration.id || editingRegistration._id, 
                          'signature', 
                          'Signature'
                        )}
                        className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                        title="View File"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDownloadFile(
                          editingRegistration.id || editingRegistration._id, 
                          'signature', 
                          'Signature'
                        )}
                        className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                        title="Download File"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        
        <div className="flex justify-between">
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this registration?')) {
                deleteRegistration(editingRegistration.id || editingRegistration._id);
                setShowEditRegistration(false);
              }
            }}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50"
            disabled={saving}
          >
            Delete Registration
          </button>
          
          <div className="flex space-x-3">
            <button
              onClick={() => setShowEditRegistration(false)}
              className="px-4 py-2 text-white/70 hover:text-white transition-colors disabled:opacity-50"
              disabled={saving}
            >
              Cancel
            </button>
            <button
              onClick={handleSaveRegistration}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
              disabled={saving}
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRegistrationModal