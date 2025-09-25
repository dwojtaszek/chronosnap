import React, { useState, useCallback, useMemo } from 'react';
import { ImageInput } from './components/ImageInput';
import { GeneratedImage } from './components/GeneratedImage';
import { GalleryModal } from './components/GalleryModal';
import { LanguageSelector } from './components/LanguageSelector';
import { generateHistoricalPhoto } from './services/geminiService';
import { HISTORICAL_ERAS } from './constants';
import type { GenerationStatus, HistoricalImage, Continent, Era } from './types';
import { ArrowPathIcon, ExpandIcon } from './components/Icons';
import { useTranslations } from './context/LanguageContext';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [generationProgress, setGenerationProgress] = useState<Record<string, GenerationStatus>>({});
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isGalleryModalOpen, setGalleryModalOpen] = useState<boolean>(false);
  const { t } = useTranslations();

  const allEras = useMemo(() =>
    Object.entries(HISTORICAL_ERAS).flatMap(([continent, eras]) =>
      eras.map(era => ({ ...era, continent: continent as Continent }))
    ),
  []);

  const handleImageCapture = (imageDataUrl: string) => {
    setOriginalImage(imageDataUrl);
    setGenerationProgress({});
  };

  const handleGeneration = useCallback(async () => {
    if (!originalImage) return;

    setIsGenerating(true);
    
    const initialProgress = allEras.reduce((acc, era) => {
      acc[era.key] = { status: 'loading', image: null, era };
      return acc;
    }, {} as Record<string, GenerationStatus>);
    setGenerationProgress(initialProgress);

    const mimeTypeMatch = originalImage.match(/data:(image\/\w+);base64,/);
    if (!mimeTypeMatch) {
      const errorProgress = allEras.reduce((acc, era) => {
        acc[era.key] = { status: 'error', image: null, era, error: t('error.invalidFormat') };
        return acc;
      }, {} as Record<string, GenerationStatus>);
      setGenerationProgress(errorProgress);
      setIsGenerating(false);
      return;
    }
    const mimeType = mimeTypeMatch[1];
    const base64Data = originalImage.split(',')[1];
      
    for (const era of allEras) {
      try {
        const result = await generateHistoricalPhoto(base64Data, mimeType, era.englishName, era.key);
        setGenerationProgress(prev => ({
          ...prev,
          [era.key]: { ...prev[era.key], status: 'done', image: result }
        }));
      } catch (err) {
        console.error(err);
        setGenerationProgress(prev => ({
          ...prev,
          [era.key]: { ...prev[era.key], status: 'error', error: err instanceof Error ? err.message : t('error.unknown') }
        }));
      }
      // Add a random delay between requests to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 500));
    }
  }, [originalImage, allEras, t]);

  const handleRetry = useCallback(async (eraKey: string) => {
    if (!originalImage) return;

    const era = allEras.find(e => e.key === eraKey);
    if (!era) return;

    setGenerationProgress(prev => ({
        ...prev,
        [eraKey]: { status: 'loading', image: null, era }
    }));

    const mimeTypeMatch = originalImage.match(/data:(image\/\w+);base64,/);
     if (!mimeTypeMatch) {
      setGenerationProgress(prev => ({ ...prev, [eraKey]: { status: 'error', image: null, era, error: t('error.invalidFormat') }}));
      return;
    }
    const mimeType = mimeTypeMatch[1];
    const base64Data = originalImage.split(',')[1];
    
    try {
        const result = await generateHistoricalPhoto(base64Data, mimeType, era.englishName, era.key);
        setGenerationProgress(prev => ({
            ...prev,
            [era.key]: { ...prev[era.key], status: 'done', image: result }
        }));
    } catch (err) {
        console.error(err);
        setGenerationProgress(prev => ({
            ...prev,
            [era.key]: { ...prev[era.key], status: 'error', error: err instanceof Error ? err.message : t('error.unknown') }
        }));
    }
  }, [originalImage, allEras, t]);
  
  const resetApp = () => {
    setOriginalImage(null);
    setGenerationProgress({});
    setIsGenerating(false);
  };

  const isGenerationComplete = useMemo(() => {
    if (!isGenerating) return false;
    const values = Object.values(generationProgress);
    return values.length > 0 && values.every(p => p.status === 'done' || p.status === 'error');
  }, [generationProgress, isGenerating]);

  const successfullyGeneratedImages = useMemo(() => 
    Object.values(generationProgress)
      .filter((p): p is { status: 'done'; image: HistoricalImage; era: Era & { continent: Continent } } => p.status === 'done' && p.image != null)
      .map(p => p.image),
    [generationProgress]
  );

  return (
    <>
      <div className="min-h-screen w-full bg-black flex flex-col items-center p-4 sm:p-8">
        <header className="text-center py-4 w-full flex-shrink-0 flex justify-between items-center">
            <div className="w-24"></div> {/* Spacer */}
            <h1 className="text-3xl sm:text-4xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-500">
              {t('appTitle')}
            </h1>
            <div className="w-24 flex justify-end">
                <LanguageSelector />
            </div>
        </header>

        <main className="flex-1 w-full max-w-7xl mx-auto flex flex-col items-center justify-center">
            {!originalImage && <ImageInput onImageCapture={handleImageCapture} />}

            {originalImage && !isGenerating && !isGenerationComplete && (
              <div className="flex flex-col items-center w-full max-w-lg">
                <div className="relative group w-full mb-6">
                  <img src={originalImage} alt={t('alt.yourPhoto')} className="rounded-xl shadow-lg w-full" />
                </div>
                
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full">
                  <button
                    onClick={handleGeneration}
                    className="w-full px-6 py-3 bg-cyan-500 text-black font-bold rounded-lg hover:bg-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-500/50 transition-all transform hover:scale-105"
                  >
                    {t('button.generate')}
                  </button>
                  <button
                    onClick={resetApp}
                    className="w-full px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    {t('button.changePhoto')}
                  </button>
                </div>
              </div>
            )}
            
            {isGenerating && (
              <div className="w-full">
                 <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold">{t('journey.begins')}</h2>
                    {!isGenerationComplete && <p className="text-gray-400 text-sm animate-pulse">{t('journey.crafting')}</p>}
                  </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {Object.values(generationProgress).map((progress) => (
                    <GeneratedImage key={progress.era.key} progress={progress} onRetry={handleRetry} />
                  ))}
                </div>
              </div>
            )}

            {isGenerationComplete && (
               <div className="mt-8 text-center">
                <h2 className="text-2xl font-bold mb-4">{t('gallery.ready')}</h2>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full max-w-md">
                    <button
                        onClick={() => setGalleryModalOpen(true)}
                        disabled={successfullyGeneratedImages.length === 0}
                        className="w-full px-6 py-3 bg-cyan-500 text-black font-bold rounded-lg hover:bg-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-500/50 transition-all transform hover:scale-105 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center"
                    >
                        <ExpandIcon className="w-5 h-5 mr-2"/>
                        {t('button.viewGallery')}
                    </button>
                    <button
                        onClick={resetApp}
                        className="w-full px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center"
                    >
                        <ArrowPathIcon className="w-5 h-5 mr-2"/>
                        {t('button.startOver')}
                    </button>
                </div>
              </div>
            )}
        </main>
      </div>
      {isGalleryModalOpen && successfullyGeneratedImages.length > 0 && (
        <GalleryModal images={successfullyGeneratedImages} onClose={() => setGalleryModalOpen(false)} />
      )}
    </>
  );
};

export default App;