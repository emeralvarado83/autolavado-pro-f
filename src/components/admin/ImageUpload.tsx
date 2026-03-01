import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Loader2, X } from 'lucide-react';
import { cn } from '../../lib/utils';
import toast from 'react-hot-toast';

// Cloudinary config — update these with your values
const CLOUDINARY_CLOUD_NAME = 'dxuhy3wiy';
const CLOUDINARY_UPLOAD_PRESET = 'autolavado_unsigned'; // Create an unsigned preset in Cloudinary dashboard

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  className?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange, className }) => {
  const [uploading, setUploading] = useState(false);

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
      formData.append('folder', 'autolavado-pro');

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: 'POST', body: formData }
      );

      if (!response.ok) throw new Error('Error al subir la imagen');

      const data = await response.json();
      onChange(data.secure_url);
      toast.success('Imagen cargada correctamente');
    } catch (error: any) {
      console.error('Error uploading image:', error);
      toast.error(error.message || 'Error al cargar la imagen');
    } finally {
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp']
    },
    maxFiles: 1,
    multiple: false
  });

  if (value) {
    return (
      <div className={cn("relative rounded-lg overflow-hidden border border-slate-200 group", className)}>
        <img src={value} alt="Uploaded" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button
            onClick={() => onChange('')}
            className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            type="button"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={cn(
        "border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors p-6 text-center",
        isDragActive ? "border-blue-500 bg-blue-50" : "border-slate-300 hover:border-blue-400 hover:bg-slate-50",
        className
      )}
    >
      <input {...getInputProps()} />
      {uploading ? (
        <Loader2 className="animate-spin text-blue-500" size={32} />
      ) : (
        <>
          <Upload className="text-slate-400 mb-2" size={32} />
          <p className="text-sm text-slate-500 font-medium">
            {isDragActive ? "Rilascia l'immagine qui" : "Clicca o trascina l'immagine"}
          </p>
        </>
      )}
    </div>
  );
};
