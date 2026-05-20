import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdmin } from '../context/AdminContext';
import {
    X, Save, Plus, Trash2, Edit2, Image as ImageIcon,
    MessageSquare, Home, Briefcase, Sparkles, LogOut, Check, Star, Settings
} from 'lucide-react';
import { Property, QA } from '../data/initialContent';

export default function AdminDashboard() {
    const { isLoggedIn, logout, content, updateHero, updateOptions, updateServicesContent, updateValuesContent, updateProperties, updateKnowledgeBase, saveContent } = useAdmin();
    const [activeTab, setActiveTab] = useState<'hero' | 'options' | 'services' | 'values' | 'portfolio' | 'assistant'>('hero');

    // Modal states
    const [propModal, setPropModal] = useState<{ open: boolean, data: Property | null }>({ open: false, data: null });
    const [skillModal, setSkillModal] = useState<{ open: boolean, data: QA | null }>({ open: false, data: null });

    if (!isLoggedIn) return null;

    // --- Property Handlers ---
    const handleSaveProperty = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const imageFile = formData.get('imageFile') as File;
        const additionalFiles = formData.getAll('additionalFiles') as File[];

        let imageUrl = propModal.data?.images[0] || "/images/images anuncio/casa a venda 1/casa1.jpg";
        let additionalUrls = propModal.data?.images.slice(1) || [];

        // 1. Processar a imagem principal
        if (imageFile && imageFile.size > 0) {
            try {
                imageUrl = await new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result as string);
                    reader.onerror = reject;
                    reader.readAsDataURL(imageFile);
                });
            } catch (error) {
                console.error("Erro ao processar imagem:", error);
                alert("Erro a ler a imagem selecionada.");
                return;
            }
        }

        // 2. Processar as imagens adicionais
        const newAdditionalUrls: string[] = [];
        for (const file of additionalFiles) {
            if (file && file.size > 0) {
                try {
                    const b64 = await new Promise<string>((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onloadend = () => resolve(reader.result as string);
                        reader.onerror = reject;
                        reader.readAsDataURL(file);
                    });
                    newAdditionalUrls.push(b64);
                } catch (e) {
                    console.error("Erro ao processar foto extra:", e);
                }
            }
        }

        const finalImages = [imageUrl, ...(newAdditionalUrls.length > 0 ? newAdditionalUrls : additionalUrls)];

        const newProp: Property = {
            id: propModal.data?.id || `prop-${Date.now()}`,
            title: formData.get('title') as string,
            location: formData.get('location') as string,
            price: formData.get('price') as string,
            oldPrice: (formData.get('oldPrice') as string) || undefined,
            type: formData.get('type') as string,
            area: formData.get('area') as string,
            rooms: Number(formData.get('rooms')),
            idRef: formData.get('idRef') as string || `122031171-${Math.floor(Math.random() * 100)}`,
            description: formData.get('description') as string,
            details: propModal.data?.details || { "Área Útil": formData.get('area') as string },
            images: finalImages
        };

        if (propModal.data) {
            updateProperties(content.properties.map(p => p.id === propModal.data!.id ? newProp : p));
        } else {
            updateProperties([...content.properties, newProp]);
        }
        setPropModal({ open: false, data: null });
    };

    const handleDeleteProperty = (id: string) => {
        if (confirm('Tem a certeza que deseja eliminar este imóvel?')) {
            updateProperties(content.properties.filter(p => p.id !== id));
        }
    };

    // --- Assistant Skill Handlers ---
    const handleSaveSkill = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const triggers = (formData.get('triggers') as string).split(',').map(t => t.trim().toLowerCase());
        const newSkill: QA = {
            id: skillModal.data?.id || `skill-${Date.now()}`,
            triggers,
            answer: formData.get('answer') as string,
            quickReplies: (formData.get('quickReplies') as string).split(',').map(t => t.trim()).filter(t => t !== "")
        };

        if (skillModal.data) {
            updateKnowledgeBase(content.knowledgeBase.map(s => s.id === skillModal.data!.id ? newSkill : s));
        } else {
            updateKnowledgeBase([...content.knowledgeBase, newSkill]);
        }
        setSkillModal({ open: false, data: null });
    };

    const handleDeleteSkill = (id: string) => {
        if (confirm('Tem a certeza que deseja eliminar esta habilidade?')) {
            updateKnowledgeBase(content.knowledgeBase.filter(s => s.id !== id));
        }
    };

    return (
        <div className="fixed inset-0 z-[200] bg-slate-50 flex overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 bg-[#0A2540] text-white p-6 flex flex-col">
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-8 h-8 rounded-lg bg-[#009FE3] flex items-center justify-center">
                        <Edit2 className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-bold tracking-tight">Painel Admin</span>
                </div>

                <nav className="flex-1 space-y-2">
                    <button
                        onClick={() => setActiveTab('hero')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'hero' ? 'bg-[#009FE3] text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                    >
                        <Home className="w-4 h-4" />
                        Principal (Hero)
                    </button>
                    <button
                        onClick={() => setActiveTab('options')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'options' ? 'bg-[#009FE3] text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                    >
                        <Settings className="w-4 h-4" />
                        Opções e Logos
                    </button>
                    <button
                        onClick={() => setActiveTab('services')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'services' ? 'bg-[#009FE3] text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                    >
                        <Briefcase className="w-4 h-4" />
                        Serviços
                    </button>
                    <button
                        onClick={() => setActiveTab('values')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'values' ? 'bg-[#009FE3] text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                    >
                        <Star className="w-4 h-4" />
                        Valores
                    </button>
                    <button
                        onClick={() => setActiveTab('portfolio')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'portfolio' ? 'bg-[#009FE3] text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                    >
                        <Briefcase className="w-4 h-4" />
                        Portfólio
                    </button>
                    <button
                        onClick={() => setActiveTab('assistant')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'assistant' ? 'bg-[#009FE3] text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                    >
                        <MessageSquare className="w-4 h-4" />
                        Assistente Virtual
                    </button>
                </nav>

                <div className="pt-6 border-t border-white/10 space-y-3">
                    <button
                        onClick={saveContent}
                        className="w-full flex items-center justify-center gap-2 bg-[#009FE3] hover:bg-[#0057A8] text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-500/20"
                    >
                        <Save className="w-4 h-4" />
                        Guardar Tudo
                    </button>
                    <button
                        onClick={logout}
                        className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-red-500/10 text-slate-400 hover:text-red-500 py-3 rounded-xl transition-all"
                    >
                        <LogOut className="w-4 h-4" />
                        Sair
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto p-10 bg-white">
                <header className="mb-10 flex justify-between items-end">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 capitalize">Gestão de {activeTab === 'hero' ? 'Página Principal' : activeTab}</h1>
                        <p className="text-slate-500 mt-2">Altere textos, imagens e habilidades em tempo real.</p>
                    </div>
                </header>

                {activeTab === 'hero' && (
                    <div className="max-w-3xl space-y-8">
                        <section className="space-y-4">
                            <label className="block text-sm font-bold text-slate-700">Título Principal</label>
                            <input
                                type="text"
                                value={content.hero.title}
                                onChange={(e) => updateHero({ ...content.hero, title: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#009FE3] outline-none transition-all"
                            />
                        </section>
                        <section className="space-y-4">
                            <label className="block text-sm font-bold text-slate-700">Subtítulo</label>
                            <input
                                type="text"
                                value={content.hero.subtitle}
                                onChange={(e) => updateHero({ ...content.hero, subtitle: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#009FE3] outline-none transition-all"
                            />
                        </section>
                        <section className="space-y-4">
                            <label className="block text-sm font-bold text-slate-700">Descrição</label>
                            <textarea
                                rows={4}
                                value={content.hero.description}
                                onChange={(e) => updateHero({ ...content.hero, description: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#009FE3] outline-none transition-all resize-none"
                            />
                        </section>
                        <section className="space-y-4">
                            <label className="block text-sm font-bold text-slate-700">Imagem de Perfil (Portrait)</label>
                            <input
                                type="file"
                                accept="image/png, image/jpeg, image/svg+xml"
                                onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            updateHero({ ...content.hero, portraitUrl: reader.result as string });
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                }}
                                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#009FE3] file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-[#009FE3] file:text-white hover:file:bg-[#0057A8] file:cursor-pointer text-slate-500 text-sm cursor-pointer"
                            />
                            {content.hero.portraitUrl && <img src={content.hero.portraitUrl} className="h-24 mt-4 object-cover rounded-xl shadow-md" alt="Preview Portrait" />}
                        </section>
                    </div>
                )}

                {activeTab === 'options' && (
                    <div className="max-w-3xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <section className="space-y-4">
                            <label className="block text-sm font-bold text-slate-700">Logótipo Principal (Menu)</label>
                            <input
                                type="file"
                                accept="image/png, image/jpeg, image/svg+xml"
                                onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => updateOptions({ ...content.options, mainLogoUrl: reader.result as string });
                                        reader.readAsDataURL(file);
                                    }
                                }}
                                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#009FE3] file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-[#009FE3] file:text-white hover:file:bg-[#0057A8] text-slate-500 text-sm cursor-pointer"
                            />
                            {content.options?.mainLogoUrl && <img src={content.options.mainLogoUrl} className="h-16 mt-4 object-contain" alt="Logo Main" />}
                        </section>
                        <section className="space-y-4">
                            <label className="block text-sm font-bold text-slate-700">Logótipo Secundário (Rodapé/Balões)</label>
                            <input
                                type="file"
                                accept="image/png, image/jpeg, image/svg+xml"
                                onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => updateOptions({ ...content.options, secondaryLogoUrl: reader.result as string });
                                        reader.readAsDataURL(file);
                                    }
                                }}
                                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#009FE3] file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-[#009FE3] file:text-white hover:file:bg-[#0057A8] text-slate-500 text-sm cursor-pointer"
                            />
                            {content.options?.secondaryLogoUrl && <img src={content.options.secondaryLogoUrl} className="h-16 mt-4 object-contain" alt="Logo Secondary" />}
                        </section>
                    </div>
                )}

                {activeTab === 'services' && (
                    <div className="max-w-3xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <section className="space-y-4">
                            <label className="block text-sm font-bold text-slate-700">Imagens Exibidas na Secção "Serviços"</label>
                            <input
                                type="file"
                                accept="image/png, image/jpeg, image/svg+xml"
                                multiple
                                onChange={async (e) => {
                                    const files = Array.from(e.target.files || []);
                                    if (!files.length) return;
                                    const newUrls: string[] = [];
                                    for (const file of files) {
                                        try {
                                            const b64 = await new Promise<string>((resolve) => {
                                                const reader = new FileReader();
                                                reader.onloadend = () => resolve(reader.result as string);
                                                reader.readAsDataURL(file);
                                            });
                                            newUrls.push(b64);
                                        } catch (err) { }
                                    }
                                    updateServicesContent({ ...content.servicesContent, images: [...(content.servicesContent?.images || []), ...newUrls] });
                                }}
                                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#009FE3] file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-[#009FE3] file:text-white hover:file:bg-[#0057A8] text-slate-500 text-sm cursor-pointer"
                            />
                            <div className="grid grid-cols-3 gap-4 mt-4">
                                {content.servicesContent?.images?.map((img, i) => (
                                    <div key={i} className="relative group">
                                        <img src={img} className="w-full h-24 object-cover rounded-xl shadow-md" />
                                        <button onClick={() => updateServicesContent({ ...content.servicesContent, images: content.servicesContent.images.filter((_, idx) => idx !== i) })} className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md"><Trash2 className="w-4 h-4" /></button>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                )}

                {activeTab === 'values' && (
                    <div className="max-w-3xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <section className="space-y-4">
                            <label className="block text-sm font-bold text-slate-700">Imagens Exibidas na Secção "Valores & Propósito"</label>
                            <input
                                type="file"
                                accept="image/png, image/jpeg, image/svg+xml"
                                multiple
                                onChange={async (e) => {
                                    const files = Array.from(e.target.files || []);
                                    if (!files.length) return;
                                    const newUrls: string[] = [];
                                    for (const file of files) {
                                        try {
                                            const b64 = await new Promise<string>((resolve) => {
                                                const reader = new FileReader();
                                                reader.onloadend = () => resolve(reader.result as string);
                                                reader.readAsDataURL(file);
                                            });
                                            newUrls.push(b64);
                                        } catch (err) { }
                                    }
                                    updateValuesContent({ ...content.valuesContent, images: [...(content.valuesContent?.images || []), ...newUrls] });
                                }}
                                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#009FE3] file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-[#009FE3] file:text-white hover:file:bg-[#0057A8] text-slate-500 text-sm cursor-pointer"
                            />
                            <div className="grid grid-cols-3 gap-4 mt-4">
                                {content.valuesContent?.images?.map((img, i) => (
                                    <div key={i} className="relative group">
                                        <img src={img} className="w-full h-24 object-cover rounded-xl shadow-md" />
                                        <button onClick={() => updateValuesContent({ ...content.valuesContent, images: content.valuesContent.images.filter((_, idx) => idx !== i) })} className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md"><Trash2 className="w-4 h-4" /></button>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                )}

                {activeTab === 'portfolio' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-slate-800">Imóveis Ativos</h2>
                            <button
                                onClick={() => setPropModal({ open: true, data: null })}
                                className="flex items-center gap-2 px-5 py-2.5 bg-[#009FE3] hover:bg-[#0057A8] text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-500/20 transition-all"
                            >
                                <Plus className="w-4 h-4" /> Adicionar Imóvel
                            </button>
                        </div>

                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                            {content.properties.map((prop) => (
                                <div key={prop.id} className="group relative p-5 bg-slate-50 rounded-[2rem] flex gap-5 border border-transparent hover:border-[#009FE3]/20 hover:bg-white hover:shadow-2xl transition-all duration-300">
                                    <div className="relative w-32 h-32 shrink-0 rounded-2xl overflow-hidden shadow-md">
                                        <img src={prop.images[0]} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all" />
                                    </div>
                                    <div className="flex-1 min-w-0 py-1">
                                        <div className="flex items-center gap-2 text-[10px] font-black text-[#009FE3] uppercase tracking-tighter mb-1">
                                            <Sparkles className="w-3 h-3" />
                                            {prop.type}
                                        </div>
                                        <h4 className="font-bold text-slate-900 text-lg truncate mb-1">{prop.title}</h4>
                                        <p className="text-xs text-slate-500 flex items-center gap-1 font-medium italic">
                                            {prop.location}
                                        </p>
                                        <div className="mt-3 flex items-center justify-between">
                                            <p className="text-[#0057A8] font-bold text-xl">{prop.price}</p>
                                            <span className="text-[10px] font-bold text-slate-400 bg-slate-200/50 px-2 py-1 rounded">ID {prop.idRef.split('-')[1]}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <button
                                            onClick={() => setPropModal({ open: true, data: prop })}
                                            className="p-3 bg-white hover:bg-[#EAF6FF] rounded-2xl text-slate-400 hover:text-[#009FE3] shadow-sm transition-all"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteProperty(prop.id)}
                                            className="p-3 bg-white hover:bg-red-50 rounded-2xl text-slate-400 hover:text-red-500 shadow-sm transition-all"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'assistant' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-slate-800">Habilidades do Assistente</h2>
                            <button
                                onClick={() => setSkillModal({ open: true, data: null })}
                                className="flex items-center gap-2 px-5 py-2.5 bg-[#009FE3] hover:bg-[#0057A8] text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-500/20 transition-all font-display"
                            >
                                <Plus className="w-4 h-4" /> Nova Resposta
                            </button>
                        </div>

                        <div className="space-y-4">
                            {content.knowledgeBase.map((item) => (
                                <div key={item.id} className="group p-6 bg-white border border-slate-200 rounded-[2rem] hover:border-[#009FE3]/30 hover:shadow-xl transition-all duration-300 space-y-4 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#EAF6FF]/20 rounded-full translate-x-16 -translate-y-16 -z-0" />

                                    <div className="flex justify-between items-start relative z-10">
                                        <div className="flex flex-wrap gap-2 max-w-[80%]">
                                            {item.triggers.map(t => (
                                                <span key={t} className="px-3 py-1 bg-[#EAF6FF] text-[#009FE3] text-[10px] font-black rounded-lg uppercase tracking-tight border border-[#009FE3]/10">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setSkillModal({ open: true, data: item })}
                                                className="p-2.5 text-slate-400 hover:text-[#009FE3] hover:bg-[#EAF6FF] rounded-xl transition-all"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteSkill(item.id)}
                                                className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="relative z-10">
                                        <p className="text-sm text-slate-600 leading-relaxed italic border-l-4 border-slate-100 pl-5 py-1">
                                            "{item.answer.length > 200 ? item.answer.substring(0, 200) + '...' : item.answer}"
                                        </p>
                                        {item.quickReplies && item.quickReplies.length > 0 && (
                                            <div className="mt-4 flex flex-wrap gap-1.5 pl-5">
                                                {item.quickReplies.map(qr => (
                                                    <span key={qr} className="text-[9px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                                                        ↳ {qr}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>

            {/* --- Modals --- */}
            <AnimatePresence>
                {propModal.open && (
                    <div className="fixed inset-0 z-[300] bg-[#0A2540]/80 backdrop-blur-md flex items-center justify-center p-6">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-white rounded-[2.5rem] w-full max-w-2xl max-h-[90vh] overflow-y-auto p-10 scrollbar-hide"
                        >
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-2xl font-bold text-slate-900">{propModal.data ? 'Editar Imóvel' : 'Novo Imóvel'}</h3>
                                <button onClick={() => setPropModal({ open: false, data: null })} className="p-2 hover:bg-slate-100 rounded-full transition-all"><X /></button>
                            </div>
                            <form onSubmit={handleSaveProperty} className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase">Título</label>
                                        <input required name="title" defaultValue={propModal.data?.title} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-[#009FE3]" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase">Tipo (Venda/Arrendar)</label>
                                        <input required name="type" defaultValue={propModal.data?.type || 'Venda'} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-[#009FE3]" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Localização</label>
                                    <input required name="location" defaultValue={propModal.data?.location} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-[#009FE3]" />
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase">Preço</label>
                                        <input required name="price" defaultValue={propModal.data?.price} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-[#009FE3]" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase">Área (m²)</label>
                                        <input required name="area" defaultValue={propModal.data?.area} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-[#009FE3]" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase">Quartos (T1, T2...)</label>
                                        <input required name="rooms" type="number" defaultValue={propModal.data?.rooms || 0} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-[#009FE3]" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Descrição Curta</label>
                                    <textarea required name="description" defaultValue={propModal.data?.description} rows={3} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-[#009FE3] resize-none" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Imagem Principal (Upload)</label>
                                    <input type="file" name="imageFile" accept="image/png, image/jpeg, image/jpg" className="w-full px-4 py-2 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-[#009FE3] file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-[#009FE3] file:text-white hover:file:bg-[#0057A8] file:cursor-pointer file:transition-all text-slate-500 text-sm cursor-pointer" />
                                    {propModal.data?.images[0] && (
                                        <p className="text-xs text-slate-400 mt-1">✓ Imagem atual mantida se não selecionar uma nova.</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Fotos Adicionais (Galeria)</label>
                                    <input type="file" name="additionalFiles" multiple accept="image/png, image/jpeg, image/jpg" className="w-full px-4 py-2 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-[#009FE3] file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-[#EAF6FF] file:text-[#009FE3] hover:file:bg-blue-100 file:cursor-pointer file:transition-all text-slate-500 text-sm cursor-pointer" />
                                    {propModal.data?.images && propModal.data.images.length > 1 && (
                                        <p className="text-xs text-slate-400 mt-1">✓ O imóvel já tem {propModal.data.images.length - 1} foto(s) extra(s). Enviar novas irá substituir as antigas. Deixe em branco para mantê-las.</p>
                                    )}
                                </div>
                                <button type="submit" className="w-full py-4 bg-gradient-to-r from-[#009FE3] to-[#0057A8] text-white font-bold rounded-2xl shadow-xl shadow-blue-500/30 hover:scale-[1.01] transition-all">
                                    {propModal.data ? 'Atualizar Imóvel' : 'Criar Imóvel'}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}

                {skillModal.open && (
                    <div className="fixed inset-0 z-[300] bg-[#0A2540]/80 backdrop-blur-md flex items-center justify-center p-6">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-white rounded-[2.5rem] w-full max-w-xl p-10 shadow-2xl"
                        >
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-2xl font-bold text-slate-900">{skillModal.data ? 'Editar Habilidade' : 'Nova Habilidade'}</h3>
                                <button onClick={() => setSkillModal({ open: false, data: null })} className="p-2 hover:bg-slate-100 rounded-full transition-all"><X /></button>
                            </div>
                            <form onSubmit={handleSaveSkill} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Palavras-Gatilho (separadas por vírgula)</label>
                                    <input required name="triggers" defaultValue={skillModal.data?.triggers.join(', ')} placeholder="olá, ajuda, preço..." className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-[#009FE3]" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Resposta da Assistente</label>
                                    <textarea required name="answer" defaultValue={skillModal.data?.answer} rows={4} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-[#009FE3] resize-none" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Sugestões de Resposta (separadas por vírgula)</label>
                                    <input name="quickReplies" defaultValue={skillModal.data?.quickReplies?.join(', ')} placeholder="Comprar, Vender, Ver Preços..." className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-[#009FE3]" />
                                </div>
                                <button type="submit" className="w-full py-4 bg-gradient-to-r from-[#009FE3] to-[#0057A8] text-white font-bold rounded-2xl shadow-xl shadow-blue-500/30 hover:scale-[1.01] transition-all">
                                    {skillModal.data ? 'Atualizar Habilidade' : 'Criar Habilidade'}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

export function LoginOverlay() {
    const { login, isLoggedIn } = useAdmin();
    const [isOpen, setIsOpen] = useState(false);
    const [credentials, setCredentials] = useState({ email: '', pass: '' });
    const [error, setError] = useState(false);

    if (isLoggedIn) return null;

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (login(credentials.email, credentials.pass)) {
            setIsOpen(false);
            setError(false);
        } else {
            setError(true);
        }
    };

    return (
        <>
            {/* Very discrete footer link */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-4 left-4 text-[10px] text-slate-300 hover:text-[#009FE3] transition-colors z-50 uppercase tracking-widest font-bold"
            >
                Admin Panel
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[300] bg-[#0A2540]/80 backdrop-blur-md flex items-center justify-center p-6"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="w-full max-w-md bg-white rounded-[2rem] p-10 shadow-2xl relative"
                        >
                            <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600"><X /></button>

                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-[#EAF6FF] rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <Sparkles className="w-8 h-8 text-[#009FE3]" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900">Acesso Restrito</h3>
                                <p className="text-slate-500 mt-2">Introduza as suas credenciais para gerir o site.</p>
                            </div>

                            <form onSubmit={handleLogin} className="space-y-4">
                                <div>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        required
                                        className={`w-full px-5 py-4 rounded-xl border ${error ? 'border-red-500 bg-red-50' : 'border-slate-200'} outline-none focus:ring-2 focus:ring-[#009FE3] transition-all`}
                                        value={credentials.email}
                                        onChange={e => setCredentials({ ...credentials, email: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <input
                                        type="password"
                                        placeholder="Palavra-passe"
                                        required
                                        className={`w-full px-5 py-4 rounded-xl border ${error ? 'border-red-500 bg-red-50' : 'border-slate-200'} outline-none focus:ring-2 focus:ring-[#009FE3] transition-all`}
                                        value={credentials.pass}
                                        onChange={e => setCredentials({ ...credentials, pass: e.target.value })}
                                    />
                                </div>
                                {error && <p className="text-xs text-red-500 font-bold text-center">Credenciais inválidas. Tente novamente.</p>}
                                <button className="w-full py-4 bg-gradient-to-r from-[#009FE3] to-[#0057A8] text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all">
                                    Entrar no Painel
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
