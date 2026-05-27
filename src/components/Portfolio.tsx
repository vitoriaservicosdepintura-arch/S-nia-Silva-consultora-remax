import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X,
    MapPin,
    Maximize,
    Bed,
    Bath,
    Calendar,
    CheckCircle2,
    ChevronRight,
    ChevronLeft,
    ArrowUpRight,
    Calculator,
    Tag
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { Property } from '../data/initialContent';

export default function Portfolio() {
    const { content } = useAdmin();
    const { properties } = content;
    const [selectedProp, setSelectedProp] = useState<Property | null>(null);
    const [currentImgIdx, setCurrentImgIdx] = useState(0);

    const openModal = (prop: Property) => {
        setSelectedProp(prop);
        setCurrentImgIdx(0);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setSelectedProp(null);
        document.body.style.overflow = 'auto';
    };

    const nextImg = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedProp) {
            setCurrentImgIdx((prev) => (prev + 1) % selectedProp.images.length);
        }
    };

    const prevImg = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedProp) {
            setCurrentImgIdx((prev) => (prev - 1 + selectedProp.images.length) % selectedProp.images.length);
        }
    };

    return (
        <section id="investimentos" className="py-24 bg-slate-50 overflow-hidden">
            <div className="container mx-auto px-4 max-w-7xl">

                {/* Header */}
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-[#009FE3] font-bold tracking-widest uppercase text-sm"
                    >
                        InvestimentosImobiliários
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl lg:text-5xl font-display font-bold text-[#0A2540] mt-4"
                    >
                        O Teu Guia de <span className="text-gradient">Portfólio</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-500 mt-6 max-w-2xl mx-auto text-lg"
                    >
                        Oportunidades exclusivas selecionadas estrategicamente para habitação ou rendimento em Portugal.
                    </motion.p>
                </div>

                {/* Property Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {properties.map((prop, idx) => (
                        <motion.div
                            key={prop.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            onClick={() => openModal(prop)}
                            className="group cursor-pointer bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-slate-100"
                        >
                            {/* Image Container */}
                            <div className="relative h-72 overflow-hidden">
                                <img
                                    src={prop.images[0]}
                                    alt={prop.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                {/* Badges */}
                                <div className="absolute top-4 left-4 flex flex-col gap-2">
                                    {prop.oldPrice && (
                                        <span className="bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter flex items-center gap-1 shadow-lg">
                                            <Tag className="w-3 h-3" />
                                            Redução de Preço
                                        </span>
                                    )}
                                    <span className="bg-[#0A2540] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter">
                                        {prop.type === 'Venda' ? 'Ativo' : prop.type}
                                    </span>
                                </div>

                                <div className="absolute bottom-4 right-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                    <div className="bg-white/90 backdrop-blur p-3 rounded-full shadow-xl">
                                        <ArrowUpRight className="w-5 h-5 text-[#009FE3]" />
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <div className="flex items-center gap-1 text-[#009FE3] text-xs font-bold uppercase tracking-wider mb-2">
                                    <MapPin className="w-3.5 h-3.5" />
                                    {prop.location.split(',')[1] || prop.location.split(',')[0]}
                                </div>
                                <h3 className="text-xl font-bold text-[#0A2540] line-clamp-1 group-hover:text-[#009FE3] transition-colors">
                                    {prop.title}
                                </h3>

                                <div className="flex items-center gap-4 mt-4 text-slate-500 text-sm">
                                    <div className="flex items-center gap-1.5">
                                        <Maximize className="w-4 h-4 text-slate-400" />
                                        {prop.area}
                                    </div>
                                    {prop.rooms && (
                                        <div className="flex items-center gap-1.5">
                                            <Bed className="w-4 h-4 text-slate-400" />
                                            T{prop.rooms}
                                        </div>
                                    )}
                                </div>

                                <div className="mt-6 pt-6 border-t border-slate-50 flex items-center justify-between">
                                    <div>
                                        {prop.oldPrice && (
                                            <span className="block text-xs text-slate-400 line-through mb-1">
                                                {prop.oldPrice}
                                            </span>
                                        )}
                                        <span className="text-2xl font-display font-bold text-[#009FE3]">
                                            {prop.price}
                                        </span>
                                    </div>
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                        ID {prop.idRef.split('-')[1]}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Modal Detail View */}
                <AnimatePresence>
                    {selectedProp && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-10"
                        >
                            <div className="absolute inset-0 bg-[#0A2540]/90 backdrop-blur-md" onClick={closeModal} />

                            <motion.div
                                initial={{ scale: 0.9, y: 50, opacity: 0 }}
                                animate={{ scale: 1, y: 0, opacity: 1 }}
                                exit={{ scale: 0.9, y: 50, opacity: 0 }}
                                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                className="relative w-full max-w-7xl max-h-[90vh] bg-white rounded-[2.5rem] overflow-hidden flex flex-col lg:flex-row shadow-2xl"
                            >
                                {/* Close Button Mobile */}
                                <button
                                    onClick={closeModal}
                                    className="absolute top-4 right-4 z-50 lg:hidden bg-white/20 hover:bg-white/40 p-2 rounded-full text-white"
                                >
                                    <X />
                                </button>

                                {/* Left - Gallery */}
                                <div className="relative w-full lg:w-3/5 h-[350px] lg:h-auto bg-slate-900 group">
                                    <AnimatePresence mode="wait">
                                        <motion.img
                                            key={currentImgIdx}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.4 }}
                                            src={selectedProp.images[currentImgIdx]}
                                            className="w-full h-full object-cover"
                                        />
                                    </AnimatePresence>

                                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                                        {selectedProp.images.map((_, i) => (
                                            <div
                                                key={i}
                                                className={`h-1 rounded-full transition-all duration-300 ${i === currentImgIdx ? 'w-8 bg-white' : 'w-2 bg-white/40'}`}
                                            />
                                        ))}
                                    </div>

                                    {/* Navigation Arrows */}
                                    <button
                                        onClick={prevImg}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur transition-all opacity-0 group-hover:opacity-100"
                                    >
                                        <ChevronLeft />
                                    </button>
                                    <button
                                        onClick={nextImg}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur transition-all opacity-0 group-hover:opacity-100"
                                    >
                                        <ChevronRight />
                                    </button>

                                    <div className="absolute top-6 left-6 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                                        <span className="text-white text-xs font-bold uppercase tracking-widest">
                                            {currentImgIdx + 1} / {selectedProp.images.length} Fotos
                                        </span>
                                    </div>
                                </div>

                                {/* Right - Info */}
                                <div className="w-full lg:w-2/5 p-8 lg:p-12 overflow-y-auto">
                                    <div className="flex items-center justify-between mb-6">
                                        <span className="bg-[#EAF6FF] text-[#009FE3] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">
                                            Exclusivo RE/MAX
                                        </span>
                                        <button
                                            onClick={closeModal}
                                            className="hidden lg:flex bg-slate-100 hover:bg-slate-200 p-2 rounded-full text-slate-500 transition-all"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <h2 className="text-3xl font-display font-bold text-[#0A2540] leading-tight">
                                        {selectedProp.title}
                                    </h2>
                                    <div className="flex items-center gap-2 text-slate-500 mt-4 text-sm font-medium">
                                        <MapPin className="w-4 h-4 text-[#009FE3]" />
                                        {selectedProp.location}
                                    </div>

                                    <div className="flex items-center gap-4 mt-8 pb-8 border-b border-slate-100">
                                        <div className="bg-slate-50 px-5 py-3 rounded-2xl flex flex-col items-center justify-center">
                                            <Maximize className="w-5 h-5 text-slate-400 mb-1" />
                                            <span className="text-sm font-bold text-[#0A2540]">{selectedProp.area}</span>
                                        </div>
                                        {selectedProp.rooms && (
                                            <div className="bg-slate-50 px-5 py-3 rounded-2xl flex flex-col items-center justify-center">
                                                <Bed className="w-5 h-5 text-slate-400 mb-1" />
                                                <span className="text-sm font-bold text-[#0A2540]">T{selectedProp.rooms}</span>
                                            </div>
                                        )}
                                        {selectedProp.year && (
                                            <div className="bg-slate-50 px-5 py-3 rounded-2xl flex flex-col items-center justify-center">
                                                <Calendar className="w-5 h-5 text-slate-400 mb-1" />
                                                <span className="text-sm font-bold text-[#0A2540]">{selectedProp.year}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-8">
                                        <h4 className="text-xs font-black uppercase text-slate-400 tracking-widest mb-4">Sobre o Imóvel</h4>
                                        <p className="text-slate-600 leading-relaxed text-sm">
                                            {selectedProp.description}
                                        </p>
                                    </div>

                                    <div className="mt-8 grid grid-cols-2 gap-y-4 gap-x-6">
                                        {Object.entries(selectedProp.details).map(([k, v]) => (
                                            <div key={k}>
                                                <p className="text-[10px] text-slate-400 uppercase font-black tracking-tighter mb-1">{k}</p>
                                                <p className="text-xs font-bold text-slate-700">{v}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-12 flex flex-col gap-3">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs font-bold text-slate-400">Valor do Investimento</span>
                                            <span className="text-3xl font-display font-bold text-[#009FE3]">{selectedProp.price}</span>
                                        </div>
                                        <a
                                            href={`https://wa.me/351913536291?text=Olá Sónia, gostaria de saber mais sobre o imóvel ID ${selectedProp.idRef}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="w-full py-4 bg-[#009FE3] text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-blue-200 hover:bg-[#0057A8] transition-all"
                                        >
                                            Solicitar Documentação
                                            <ChevronRight className="w-4 h-4" />
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
