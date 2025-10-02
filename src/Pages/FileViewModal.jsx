import React, { useState } from 'react';
import { X, Download, AlertCircle } from 'lucide-react';

const FileViewModal = ({ showFileModal, selectedFile, setShowFileModal, setSelectedFile }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  if (!showFileModal || !selectedFile) return null;

  const handleClose = () => {
    setShowFileModal(false);
    setSelectedFile(null);
    setImageError(false);
    setImageLoading(true);
  };

  const handleImageLoad = () => {
    console.log('✅ Image loaded successfully:', selectedFile.url);
    setImageLoading(false);
    setImageError(false);
  };

  const handleImageError = (e) => {
    console.error('❌ Image load failed:', selectedFile.url);
    console.error('Error details:', e);
    setImageLoading(false);
    setImageError(true);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded-xl w-full max-w-4xl max-h-[90vh] border border-white/10 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div>
            <h3 className="text-lg font-semibold text-white">{selectedFile.name}</h3>
            <p className="text-xs text-white/50 mt-1 font-mono truncate max-w-md">
              {selectedFile.url}
            </p>
          </div>
          <button 
            onClick={handleClose} 
            className="text-white/70 hover:text-white transition-colors flex-shrink-0"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        {/* Image Display Area */}
        <div className="p-4 flex-1 overflow-auto bg-slate-900 flex items-center justify-center min-h-[500px] relative">
          {/* Loading State */}
          {imageLoading && !imageError && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-white/70">Loading image...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {imageError && (
            <div className="text-center p-8">
              <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-white mb-2">Failed to load image</h4>
              <p className="text-white/70 mb-4">The image could not be loaded from the server.</p>
              <div className="bg-slate-800 p-4 rounded-lg mb-4 text-left">
                <p className="text-xs text-white/50 font-mono break-all">{selectedFile.url}</p>
              </div>
              <button
                onClick={() => {
                  setImageError(false);
                  setImageLoading(true);
                }}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
              >
                Retry
              </button>
            </div>
          )}

          {/* Image */}
          <img 
            src={selectedFile.url} 
            alt={selectedFile.name}
            onLoad={handleImageLoad}
            onError={handleImageError}
            className={`max-w-full max-h-full object-contain rounded-lg shadow-2xl transition-opacity duration-300 ${
              imageLoading ? 'opacity-0' : 'opacity-100'
            } ${imageError ? 'hidden' : ''}`}
            crossOrigin="anonymous"
          />
        </div>
        
        {/* Footer Actions */}
        <div className="p-4 border-t border-white/10 flex gap-3 flex-wrap">
          <a 
            href={selectedFile.url} 
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Open in New Tab
          </a>
          <button 
            onClick={() => {
              navigator.clipboard.writeText(selectedFile.url);
              alert('URL copied to clipboard!');
            }}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Copy URL
          </button>
          <button 
            onClick={handleClose} 
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors ml-auto"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileViewModal;