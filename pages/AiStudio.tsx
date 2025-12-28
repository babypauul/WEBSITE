import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI } from "@google/genai";
import { 
  Sparkles, 
  Image as ImageIcon, 
  Video, 
  Wand2, 
  Upload, 
  Download, 
  ArrowRight, 
  Loader2, 
  Search,
  ExternalLink,
  Cpu,
  Monitor
} from 'lucide-react';
import { Button } from '../components/Button.tsx';
import { Reveal } from '../components/Reveal.tsx';

type ToolMode = 'generate' | 'edit' | 'video' | 'research';

export const AiStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ToolMode>('generate');
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [resultVideo, setResultVideo] = useState<string | null>(null);
  const [researchOutput, setResearchOutput] = useState<{text: string, sources: any[]} | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageSize, setImageSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [aspectRatio, setAspectRatio] = useState<'1:1' | '16:9' | '9:16'>('1:1');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const getAiInstance = async () => {
    // Veo and 3-Pro-Image models require explicit key selection
    if (activeTab === 'generate' || activeTab === 'video') {
      const hasKey = await (window as any).aistudio.hasSelectedApiKey();
      if (!hasKey) {
        await (window as any).aistudio.openSelectKey();
      }
    }
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
  };

  const runGeneration = async () => {
    if (!prompt) return;
    setIsProcessing(true);
    setResultImage(null);
    try {
      const ai = await getAiInstance();
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: { parts: [{ text: prompt }] },
        config: {
          imageConfig: { aspectRatio, imageSize }
        },
      });

      const part = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
      if (part?.inlineData) {
        setResultImage(`data:image/png;base64,${part.inlineData.data}`);
      }
    } catch (error: any) {
      console.error(error);
      if (error.message?.includes("not found")) await (window as any).aistudio.openSelectKey();
    } finally {
      setIsProcessing(false);
    }
  };

  const runEditing = async () => {
    if (!prompt || !selectedImage) return;
    setIsProcessing(true);
    setResultImage(null);
    try {
      const ai = await getAiInstance();
      const base64Data = selectedImage.split(',')[1];
      const mimeType = selectedImage.split(';')[0].split(':')[1];

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            { inlineData: { data: base64Data, mimeType } },
            { text: prompt },
          ],
        },
      });

      const part = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
      if (part?.inlineData) {
        setResultImage(`data:image/png;base64,${part.inlineData.data}`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const runVideoGeneration = async () => {
    if (!selectedImage) return;
    setIsProcessing(true);
    setResultVideo(null);
    try {
      const ai = await getAiInstance();
      const base64Data = selectedImage.split(',')[1];
      const mimeType = selectedImage.split(';')[0].split(':')[1];

      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt || 'High-fidelity cinematic movement',
        image: {
          imageBytes: base64Data,
          mimeType,
        },
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: aspectRatio === '1:1' ? '16:9' : aspectRatio,
        }
      });

      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 8000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      setResultVideo(`${downloadLink}&key=${process.env.API_KEY}`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const runResearch = async () => {
    if (!prompt) return;
    setIsProcessing(true);
    setResearchOutput(null);
    try {
      const ai = await getAiInstance();
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }]
        },
      });

      setResearchOutput({
        text: response.text || '',
        sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const runDeepThinking = async () => {
    if (!prompt) return;
    setIsProcessing(true);
    setResearchOutput(null);
    try {
      const ai = await getAiInstance();
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: {
          thinkingConfig: { thinkingBudget: 32768 }
        },
      });

      setResearchOutput({
        text: response.text || '',
        sources: []
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-black pt-32 pb-20 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-[10%] right-[10%] w-96 h-96 bg-brand-red blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[20%] left-[5%] w-64 h-64 bg-white/10 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <header className="mb-16 text-center">
          <Reveal>
            <h2 className="text-brand-red font-bold uppercase tracking-[0.4em] text-[10px] mb-3">Industrial Lab</h2>
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase mb-6">AI STUDIO</h1>
            <p className="text-brand-gray text-lg max-w-2xl mx-auto font-light leading-relaxed">
              Proprietary neural workflows powered by <span className="text-white font-bold">Gemini 3</span>. Surgical creative tools for the next generation of sound.
            </p>
          </Reveal>
        </header>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {[
            { id: 'generate', label: 'Image Gen', icon: Sparkles },
            { id: 'edit', label: 'Surgical Edit', icon: Wand2 },
            { id: 'video', label: 'Animate (Veo)', icon: Video },
            { id: 'research', label: 'Research', icon: Search },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as ToolMode);
                setResultImage(null);
                setResultVideo(null);
                setResearchOutput(null);
                setPrompt('');
              }}
              className={`flex items-center gap-3 px-8 py-4 rounded-full font-black uppercase tracking-widest text-[10px] transition-all duration-500 border ${
                activeTab === tab.id 
                  ? 'bg-brand-red text-white border-brand-red shadow-[0_0_30px_#E1060044]' 
                  : 'bg-white/5 text-brand-gray border-white/10 hover:border-brand-red/30'
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-8">
            <Reveal width="100%">
              <div className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-red to-transparent opacity-30" />
                
                {(activeTab === 'edit' || activeTab === 'video') && (
                  <div className="mb-8">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-brand-gray mb-4">Base Asset</label>
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className={`relative aspect-video rounded-2xl border-2 border-dashed transition-all duration-500 flex flex-col items-center justify-center cursor-pointer overflow-hidden ${
                        selectedImage ? 'border-brand-red/50' : 'border-white/10 hover:border-brand-red/30'
                      }`}
                    >
                      {selectedImage ? (
                        <>
                          <img src={selectedImage} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                            <Upload className="text-white" size={32} />
                          </div>
                        </>
                      ) : (
                        <div className="text-center p-8">
                          <Upload className="text-brand-gray/40 mx-auto mb-4" size={40} />
                          <p className="text-[10px] text-brand-gray uppercase font-black tracking-widest">Select Image Reference</p>
                        </div>
                      )}
                    </div>
                    <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </div>
                )}

                <div className="mb-8">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-brand-gray mb-4">Neural Instructions</label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder={
                      activeTab === 'generate' ? "Cyberpunk landscape, red neon lights, 4k..." :
                      activeTab === 'edit' ? "Change background to industrial studio..." :
                      activeTab === 'video' ? "Make the character blink and look at camera..." : "Deep research on current music trends..."
                    }
                    className="w-full h-32 bg-white/[0.03] border border-white/5 rounded-2xl p-6 text-white text-sm focus:outline-none focus:border-brand-red transition-all resize-none"
                  />
                </div>

                {activeTab !== 'research' && (
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-brand-gray mb-3">Format</label>
                      <select 
                        value={aspectRatio}
                        onChange={(e) => setAspectRatio(e.target.value as any)}
                        className="w-full bg-[#111] border border-white/10 rounded-xl p-3 text-[10px] text-white uppercase font-black"
                      >
                        <option value="1:1">1:1 Square</option>
                        <option value="16:9">16:9 Cinema</option>
                        <option value="9:16">9:16 Mobile</option>
                      </select>
                    </div>
                    {activeTab === 'generate' && (
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-brand-gray mb-3">Density</label>
                        <select 
                          value={imageSize}
                          onChange={(e) => setImageSize(e.target.value as any)}
                          className="w-full bg-[#111] border border-white/10 rounded-xl p-3 text-[10px] text-white uppercase font-black"
                        >
                          <option value="1K">1K Performance</option>
                          <option value="2K">2K High Fidelity</option>
                          <option value="4K">4K Master</option>
                        </select>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex flex-col gap-3">
                  {activeTab === 'research' ? (
                    <div className="grid grid-cols-2 gap-3">
                      <Button 
                        variant="primary" 
                        onClick={runResearch} 
                        disabled={isProcessing || !prompt}
                        className="w-full h-14"
                      >
                        {isProcessing ? <Loader2 className="animate-spin" /> : <Search size={16} className="mr-2" />} Web Search
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={runDeepThinking} 
                        disabled={isProcessing || !prompt}
                        className="w-full h-14"
                      >
                        {isProcessing ? <Loader2 className="animate-spin" /> : <Cpu size={16} className="mr-2" />} Deep Think
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      variant="primary" 
                      onClick={activeTab === 'generate' ? runGeneration : activeTab === 'edit' ? runEditing : runVideoGeneration} 
                      disabled={isProcessing || !prompt || ((activeTab === 'edit' || activeTab === 'video') && !selectedImage)}
                      className="w-full h-14"
                    >
                      {isProcessing ? (
                        <div className="flex items-center gap-3">
                          <Loader2 className="animate-spin" />
                          <span>SYNTHESIZING...</span>
                        </div>
                      ) : (
                        <span className="flex items-center gap-2">PROCESS OUTPUT <ArrowRight size={16} /></span>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7 h-full min-h-[500px]">
            <Reveal width="100%" className="h-full">
              <div className="bg-[#0A0A0A] border border-white/5 rounded-3xl h-full min-h-[600px] flex flex-col relative overflow-hidden shadow-2xl">
                 <div className="p-6 border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Monitor className="text-brand-red" size={18} />
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Main Output View</span>
                    </div>
                 </div>

                 <div className="flex-grow p-8 flex items-center justify-center relative">
                    <AnimatePresence mode="wait">
                      {isProcessing ? (
                        <motion.div 
                          key="loading"
                          initial={{ opacity: 0 }} 
                          animate={{ opacity: 1 }} 
                          exit={{ opacity: 0 }}
                          className="text-center"
                        >
                          <div className="w-16 h-16 border-4 border-brand-red/20 border-t-brand-red rounded-full animate-spin mx-auto mb-6" />
                          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-red animate-pulse">Neural Compute Active</p>
                        </motion.div>
                      ) : resultImage ? (
                        <motion.div key="image" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative group">
                          <img src={resultImage} className="max-w-full rounded-2xl shadow-2xl border border-white/10" />
                          <div className="absolute top-4 right-4">
                            <a href={resultImage} download="killstreet_ai.png">
                                <Button variant="ghost" className="p-2 bg-black/50 backdrop-blur-md"><Download size={20} /></Button>
                            </a>
                          </div>
                        </motion.div>
                      ) : resultVideo ? (
                        <motion.div key="video" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                          <video src={resultVideo} controls autoPlay loop className="max-w-full rounded-2xl shadow-2xl border border-white/10" />
                        </motion.div>
                      ) : researchOutput ? (
                        <motion.div key="research" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full">
                           <div className="bg-white/[0.03] p-8 rounded-2xl border border-white/5 overflow-y-auto max-h-[550px]">
                              <div className="text-brand-gray whitespace-pre-wrap text-sm leading-relaxed mb-10">{researchOutput.text}</div>
                              {researchOutput.sources.length > 0 && (
                                <div className="border-t border-white/10 pt-8">
                                   <h4 className="text-[10px] font-black uppercase tracking-widest text-white mb-6">Verified Grounding Sources</h4>
                                   <div className="flex flex-wrap gap-3">
                                     {researchOutput.sources.map((chunk, i) => (
                                       chunk.web && (
                                         <a 
                                           key={i} 
                                           href={chunk.web.uri} 
                                           target="_blank" 
                                           rel="noreferrer"
                                           className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold text-brand-gray hover:text-white hover:border-brand-red transition-all"
                                         >
                                           <ExternalLink size={12} />
                                           {chunk.web.title || 'Source Link'}
                                         </a>
                                       )
                                     ))}
                                   </div>
                                </div>
                              )}
                           </div>
                        </motion.div>
                      ) : (
                        <div className="text-center opacity-10">
                           <Sparkles size={80} className="mx-auto mb-6" />
                           <p className="text-[10px] uppercase font-black tracking-widest">Awaiting Command</p>
                        </div>
                      )}
                    </AnimatePresence>
                 </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
};