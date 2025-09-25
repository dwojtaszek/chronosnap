import React from 'react';
import type { GenerationStatus } from '../types';
import { Spinner } from './Spinner';
import { ExclamationTriangleIcon, DownloadIcon, ArrowPathIcon } from './Icons';
import { useTranslations } from '../context/LanguageContext';

interface GeneratedImageProps {
  progress: GenerationStatus;
  onRetry?: (eraKey: string) => void;
}

export const GeneratedImage: React.FC<GeneratedImageProps> = ({ progress, onRetry }) => {
  const { t } = useTranslations();
  const { status, image, error, era } = progress;

  const eraName = t(`eras.${era.key}.name`);
  const eraDescription = t(`eras.${era.key}.description`);

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent any parent onClick events
    if (!image) return;
    
    const link = document.createElement('a');
    link.href = image.src;
    const fileName = `chronosnap-${era.key}.png`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  if (status === 'loading' || status === 'pending') {
    return (
      <div className="group relative aspect-square rounded-xl shadow-lg bg-gray-800 border border-gray-700/50 flex flex-col items-center justify-center text-center p-2">
        <Spinner />
        <h3 className="text-sm font-bold text-white mt-3">{eraName}</h3>
        <p className="text-gray-400 text-xs mt-1">{t('status.generating')}</p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="group relative aspect-square rounded-xl shadow-lg bg-red-900/50 border border-red-700 flex flex-col items-center justify-center text-center p-2 transform transition-transform duration-300 hover:scale-105 hover:z-10" title={error}>
        <ExclamationTriangleIcon className="w-8 h-8 text-red-300" />
        <h3 className="text-sm font-bold text-white mt-2">{eraName}</h3>
        <p className="text-red-300 text-xs mt-1">{t('status.failed')}</p>
         {onRetry && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRetry(era.key);
              }}
              className="absolute bottom-2 right-2 p-1.5 bg-black/50 rounded-full text-white transition-all duration-300 hover:bg-red-700 focus:outline-none z-10"
              aria-label={t('aria.retry', { eraName })}
              title={t('button.retry')}
            >
              <ArrowPathIcon className="w-4 h-4" />
            </button>
          )}
      </div>
    );
  }
  
  if (status === 'done' && image) {
    return (
      <div className="group relative aspect-square rounded-xl shadow-lg bg-gray-800 border border-gray-700/50 transition-all duration-300 hover:shadow-cyan-500/20 hover:border-cyan-500/50 hover:z-20">
        {/* Thumbnail Image */}
        <img 
          src={image.src} 
          alt={t('alt.eraImage', { eraName })} 
          className="w-full h-full object-cover rounded-xl" 
        />
        
        {/* Text Overlay for Thumbnail */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-3 flex flex-col justify-end rounded-xl pointer-events-none">
          <h3 className="text-md font-bold text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">{eraName}</h3>
          <p className="text-gray-300 text-xs mt-1 opacity-0 h-0 group-hover:opacity-100 group-hover:h-auto transition-all duration-300 delay-100 overflow-hidden">
            {eraDescription}
          </p>
        </div>

        {/* Large floating preview that appears on hover */}
        <div 
          className="
            absolute top-1/2 left-1/2
            w-[250%] h-[250%] 
            -translate-x-1/2 -translate-y-1/2
            opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100
            transition-all duration-300 ease-in-out
            delay-150 group-hover:delay-0
            z-30
          "
        >
          <img 
            src={image.src} 
            alt={t('alt.eraImage', { eraName })} 
            className="w-full h-full object-cover rounded-xl shadow-2xl shadow-black/70 border-2 border-cyan-400" 
          />
           <button
            onClick={handleDownload}
            className="absolute top-4 right-4 p-3 bg-black/60 rounded-full text-white transition-all duration-300 hover:bg-cyan-500 hover:scale-110 focus:outline-none z-40"
            aria-label={t('aria.download', { eraName })}
            title={t('button.download')}
          >
            <DownloadIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    );
  }

  return null;
};