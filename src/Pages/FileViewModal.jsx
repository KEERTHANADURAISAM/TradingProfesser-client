import React from 'react';
import { X, Download } from 'lucide-react';

const FileViewModal = ({ showFileModal, selectedFile, setShowFileModal, setSelectedFile }) => {
  if (!showFileModal || !selectedFile) return null;

  const handleClose = () => {
    setShowFileModal(false);
    setSelectedFile(null);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded-xl w-full max-w-4xl max-h-[90vh] border border-white/10 overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h3 className="text-lg font-semibold text-white">{selectedFile.name}</h3>
          <button onClick={handleClose} className="text-white/70 hover:text-white transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-4 flex-1 overflow-auto bg-slate-900 flex items-center justify-center min-h-[500px]">
          <img 
            src={selectedFile.url} 
            alt={selectedFile.name} 
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" 
          />
        </div>
        
        <div className="p-4 border-t border-white/10 flex gap-3">
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
            onClick={handleClose} 
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileViewModal;