import React from 'react';
import { GeneratedImage } from './GeneratedImage';
import { XMarkIcon } from './Icons';
import type { HistoricalImage, Era, Continent } from '../types';
import { HISTORICAL_ERAS } from '../constants';
import { useTranslations } from '../context/LanguageContext';

interface GalleryModalProps {
  images: HistoricalImage[];
  onClose: () => void;
}

const allErasWithContinent = Object.entries(HISTORICAL_ERAS).flatMap(([continent, eras]) => 
  eras.map(era => ({ ...era, continent: continent as Continent }))
);

const findEra = (eraKey: string): (Era & { continent: Continent }) | undefined => {
    return allErasWithContinent.find(e => e.key === eraKey);
}

export const GalleryModal: React.FC<GalleryModalProps> = ({ images, onClose }) => {
  const { t } = useTranslations();
  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-8 animate-fade-in"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
      `}</style>
      <button 
        onClick={onClose} 
        className="absolute top-4 right-4 text-white hover:text-cyan-400 transition-colors z-50"
        aria-label={t('aria.closeGallery')}
      >
        <XMarkIcon className="w-8 h-8" />
      </button>
      
      <div 
        className="w-full h-full max-w-7xl bg-gray-900/50 border border-gray-700 rounded-2xl p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-500">
            {t('gallery.title')}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => {
            const era = findEra(image.eraKey);
            if (!era) return null;
            return (
                <GeneratedImage 
                    key={image.eraKey} 
                    progress={{ status: 'done', image, era }} 
                />
            );
          })}
        </div>
      </div>
    </div>
  );
};