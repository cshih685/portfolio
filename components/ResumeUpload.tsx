'use client';

import { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, X } from 'lucide-react';

interface ResumeUploadProps {
  onUploadSuccess: (data: any) => void;
  onClose: () => void;
}

const ResumeUpload = ({ onUploadSuccess, onClose }: ResumeUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.name.endsWith('.docx') || droppedFile.name.endsWith('.doc'))) {
      setFile(droppedFile);
    } else {
      setErrorMessage('Please upload a Word document (.doc or .docx)');
      setUploadStatus('error');
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setUploadStatus('idle');
      setErrorMessage('');
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setUploadStatus('idle');
    
    try {
      const formData = new FormData();
      formData.append('resume', file);

      const response = await fetch('/api/resume/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setUploadStatus('success');
        onUploadSuccess(result.data);
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setUploadStatus('error');
        setErrorMessage(result.error || 'Upload failed');
      }
    } catch (error) {
      setUploadStatus('error');
      setErrorMessage('Network error occurred');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-slate-800">Upload Resume</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive
              ? 'border-blue-500 bg-blue-50'
              : 'border-slate-300 hover:border-slate-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {file ? (
            <div className="space-y-4">
              <FileText size={48} className="mx-auto text-blue-600" />
              <div>
                <p className="font-medium text-slate-800">{file.name}</p>
                <p className="text-sm text-slate-600">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <Upload size={48} className="mx-auto text-slate-400" />
              <div>
                <p className="text-lg font-medium text-slate-800 mb-2">
                  Drop your resume here
                </p>
                <p className="text-slate-600 mb-4">
                  or click to browse files
                </p>
                <input
                  type="file"
                  accept=".doc,.docx"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="resume-upload"
                />
                <label
                  htmlFor="resume-upload"
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
                >
                  Choose File
                </label>
              </div>
            </div>
          )}
        </div>

        {uploadStatus === 'error' && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
            <AlertCircle size={16} className="text-red-600" />
            <p className="text-red-700 text-sm">{errorMessage}</p>
          </div>
        )}

        {uploadStatus === 'success' && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
            <CheckCircle size={16} className="text-green-600" />
            <p className="text-green-700 text-sm">Resume uploaded successfully!</p>
          </div>
        )}

        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={!file || uploading}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {uploading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                Uploading...
              </>
            ) : (
              'Upload Resume'
            )}
          </button>
        </div>

        <p className="text-xs text-slate-500 mt-4 text-center">
          Supported formats: .doc, .docx (Max size: 10MB)
        </p>
      </div>
    </div>
  );
};

export default ResumeUpload;