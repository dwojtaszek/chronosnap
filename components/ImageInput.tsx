import React from 'react';
import { UploadIcon } from './Icons';
import { useTranslations } from '../context/LanguageContext';

interface ImageInputProps {
  onImageCapture: (imageDataUrl: string) => void;
}

export const ImageInput: React.FC<ImageInputProps> = ({ onImageCapture }) => {
  const { t } = useTranslations();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onImageCapture(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full max-w-lg flex flex-col items-center text-center">
        <h2 className="text-2xl font-bold text-gray-100 mb-2">{t('input.title')}</h2>
        <p className="text-gray-400 mb-6">{t('input.subtitle')}</p>
        <label 
          htmlFor="file-upload" 
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-600/50 border-dashed rounded-xl cursor-pointer bg-gray-900/50 hover:bg-gray-800/50 transition-colors duration-300"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
            <UploadIcon className="w-10 h-10 mb-4 text-gray-500" />
            <p className="mb-2 text-gray-400">
              <span className="font-semibold text-cyan-400">{t('input.uploadCta')}</span> {t('input.dragAndDrop')}
            </p>
            <p className="text-xs text-gray-500">{t('input.fileTypes')}</p>
          </div>
          <input 
            id="file-upload" 
            type="file" 
            className="hidden" 
            accept="image/png, image/jpeg, image/webp" 
            onChange={handleFileChange} 
          />
        </label>
    </div>
  );
};