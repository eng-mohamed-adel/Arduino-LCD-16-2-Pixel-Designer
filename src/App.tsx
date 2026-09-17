import React, { useMemo, useState } from 'react';
import Header from './components/Header';
import LcdPreview from './components/LcdPreview';
import PixelEditor from './components/PixelEditor';
import Controls from './components/Controls';
import AnimationsPanel from './components/AnimationsPanel';
import Configuration from './components/Configuration';
import CodePreview from './components/CodePreview';
import EducationalInfo from './components/EducationalInfo';
import WiringGuide from './components/WiringGuide';
import Footer from './components/Footer';
import { useLcdState } from './hooks/useLcdState';
import { generateArduinoCode } from './utils/arduinoCodeGenerator';
import { translations } from './i18n';

export default function App() {
  const {
    lcdData,
    selectedCharIndex,
    setSelectedCharIndex,
    connectionType,
    setConnectionType,
    i2cAddress,
    setI2cAddress,
    parallelPins,
    setParallelPins,
    projectName,
    setProjectName,
    animationType,
    setAnimationType,
    animationDelay,
    setAnimationDelay,
    updatePixel,
    commitDrawing,
    undo,
    redo,
    clearCharacter,
    fillCharacter,
    invertCharacter,
    clearScreen,
    setLcdDataBulk,
    canUndo,
    canRedo,
    saveState,
    loadState
  } = useLcdState();

  const [isPlaying, setIsPlaying] = useState(false);

  const t = translations.en;

  const generatedCode = useMemo(() => {
    return generateArduinoCode(lcdData, connectionType, i2cAddress, parallelPins, projectName, animationType, animationDelay);
  }, [lcdData, connectionType, i2cAddress, parallelPins, projectName, animationType, animationDelay]);

  return (
    <div className="min-h-screen bg-[#020617] font-sans selection:bg-blue-500/30 text-gray-200" dir="ltr">
      <Header t={t} />
      
      <main className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 space-y-12">
        
        {/* Step 1: LCD Canvas */}
        <section className="space-y-4">
          <div className="text-center space-y-2">
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight uppercase">{t.step1}</h2>
            <p className="text-blue-200/80 text-sm md:text-base max-w-2xl mx-auto">{t.clickChar}</p>
          </div>
          <LcdPreview 
            data={lcdData} 
            selectedIndex={selectedCharIndex} 
            onSelectChar={setSelectedCharIndex} 
            animationType={animationType}
            animationDelay={animationDelay}
            isPlaying={isPlaying}
            t={t}
          />
        </section>

        {/* Step 2: Editor & Controls */}
        <section className="max-w-4xl mx-auto border-t border-[#13459e]/20 pt-8">
          <h2 className="text-xl font-bold text-white mb-6 text-center uppercase">{t.step2}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="flex flex-col items-center">
              <div className="bg-[#030b19] px-4 py-2 rounded-t-lg border-t border-l border-r border-[#13459e]/30 shadow-sm z-10 w-auto inline-flex items-center gap-2 -mb-px">
                <span className="text-blue-300 font-semibold text-sm uppercase">{t.editingChar} {selectedCharIndex + 1}</span>
              </div>
              <PixelEditor 
                charData={lcdData[selectedCharIndex]} 
                charIndex={selectedCharIndex}
                updatePixel={updatePixel}
                commitDrawing={commitDrawing}
              />
            </div>
            <div className="pt-8">
              <Controls 
                charIndex={selectedCharIndex}
                canUndo={canUndo}
                canRedo={canRedo}
                onUndo={undo}
                onRedo={redo}
                onClearCharacter={clearCharacter}
                onFillCharacter={fillCharacter}
                onInvertCharacter={invertCharacter}
                onClearScreen={clearScreen}
                t={t}
              />
            </div>
          </div>
        </section>
        
        {/* Animations */}
        <section className="max-w-4xl mx-auto border-t border-[#13459e]/20 pt-8">
          <AnimationsPanel 
            animationType={animationType}
            setAnimationType={setAnimationType}
            animationDelay={animationDelay}
            setAnimationDelay={setAnimationDelay}
            isPlaying={isPlaying}
            onTogglePlay={() => setIsPlaying(!isPlaying)}
            t={t}
          />
        </section>
        
        {/* Step 3: Config & Wiring */}
        <section className="max-w-6xl mx-auto pt-8 border-t border-[#13459e]/20">
          <h2 className="text-xl font-bold text-white mb-6 text-center uppercase">{t.step3}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <Configuration 
              connectionType={connectionType}
              setConnectionType={setConnectionType}
              i2cAddress={i2cAddress}
              setI2cAddress={setI2cAddress}
              parallelPins={parallelPins}
              setParallelPins={setParallelPins}
              projectName={projectName}
              setProjectName={setProjectName}
              onSave={saveState}
              onLoad={loadState}
              t={t}
            />
            <WiringGuide 
              connectionType={connectionType}
              parallelPins={parallelPins}
              t={t}
            />
          </div>
        </section>

        {/* Info Box */}
        <section className="max-w-4xl mx-auto">
          <EducationalInfo t={t} />
        </section>

        {/* Step 4: Code Generation */}
        <section className="max-w-5xl mx-auto pb-12 pt-8 border-t border-[#13459e]/20">
          <h2 className="text-xl font-bold text-white mb-6 text-center uppercase">{t.step4}</h2>
          <div className="h-[500px]">
            <CodePreview 
              code={generatedCode} 
              projectName={projectName} 
              t={t}
            />
          </div>
        </section>

      </main>
      <Footer t={t} />
    </div>
  );
}
