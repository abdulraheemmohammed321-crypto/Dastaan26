import { motion, AnimatePresence } from 'motion/react';
import { QRCodeSVG } from 'qrcode.react';
import { Download, Share2, Sparkles, X, AlertCircle } from 'lucide-react';
import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface TicketProps {
  userName: string;
  seatNumber: string;
  ticketId: string;
}

export default function Ticket({ userName, seatNumber, ticketId }: TicketProps) {
  const ticketRef = useRef<HTMLDivElement>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!ticketRef.current) return;
    setIsDownloading(true);
    
    try {
      const canvas = await html2canvas(ticketRef.current, {
        scale: 2,
        backgroundColor: '#000814',
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`DASTAAN26_Ticket_${userName.replace(/\s+/g, '_')}.pdf`);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsDownloading(false);
      setShowConfirm(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="flex flex-col items-center space-y-8 py-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        ref={ticketRef}
        className="relative w-full max-w-md mx-auto bg-navy-900 rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-2 border-silver-500/30"
      >
        {/* Holographic Overlay Effect */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(110deg,transparent_40%,rgba(255,255,255,0.05)_50%,transparent_60%)] bg-[length:200%_100%] animate-[shine_8s_linear_infinite]" />

        {/* Ticket Header */}
        <div className="bg-navy-950 p-8 border-b border-dashed border-silver-500/20 text-center relative">
          <motion.div variants={itemVariants} className="flex justify-center mb-3">
            <div className="p-2 bg-silver-500/10 rounded-full">
              <Sparkles className="text-silver-500 w-6 h-6" />
            </div>
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-3xl font-display silver-gradient font-bold tracking-[0.2em]">DASTAAN'26</motion.h2>
          <motion.p variants={itemVariants} className="text-silver-300/40 text-[10px] uppercase tracking-[0.4em] mt-2 font-bold">Official Invitation</motion.p>
          
          {/* Corner accents */}
          <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-silver-500/30" />
          <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-silver-500/30" />
        </div>

        {/* Ticket Body */}
        <div className="p-8 space-y-8 relative">
          {/* Decorative background pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
            <div className="w-full h-full bg-[radial-gradient(circle_at_center,#ffffff_1px,transparent_1px)] bg-[length:24px_24px]" />
          </div>

          <motion.div variants={itemVariants} className="relative z-10">
            <p className="text-silver-300/40 text-[10px] uppercase tracking-[0.3em] mb-2 font-bold">Guest Name</p>
            <p className="text-2xl font-serif text-white tracking-wide border-b border-silver-500/10 pb-2 inline-block min-w-[150px] italic">
              {userName}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-8 relative z-10">
            <motion.div variants={itemVariants}>
              <p className="text-silver-300/40 text-[10px] uppercase tracking-[0.3em] mb-2 font-bold">Seat</p>
              <p className="text-xl font-display text-silver-400 tracking-widest">{seatNumber}</p>
            </motion.div>
            <motion.div variants={itemVariants}>
              <p className="text-silver-300/40 text-[10px] uppercase tracking-[0.3em] mb-2 font-bold">Date</p>
              <p className="text-xl font-display text-silver-400 tracking-widest">07.04.26</p>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="pt-8 border-t border-dashed border-silver-500/20 flex flex-col items-center relative z-10">
            <div className="bg-white p-4 rounded-2xl mb-4 pulse-qr shadow-[0_0_30px_rgba(168,169,173,0.2)]">
              <QRCodeSVG 
                value={`DASTAAN26-${ticketId}`} 
                size={140}
                fgColor="#000814"
                level="H"
              />
            </div>
            <p className="text-silver-300/30 text-[10px] font-mono tracking-[0.2em] uppercase">Security ID: {ticketId}</p>
          </motion.div>
        </div>

        {/* Ticket Footer */}
        <div className="bg-silver-500 p-5 text-navy-950 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:250%_250%] animate-[shine_4s_linear_infinite]" />
          <p className="text-[10px] font-black uppercase tracking-[0.5em] relative z-10">Scan for AR Experience</p>
        </div>

        {/* Perforation Effect */}
        <div className="absolute top-[148px] -left-5 w-10 h-10 bg-navy-950 rounded-full border-2 border-silver-500/30 shadow-inner" />
        <div className="absolute top-[148px] -right-5 w-10 h-10 bg-navy-950 rounded-full border-2 border-silver-500/30 shadow-inner" />
      </motion.div>

      <div className="flex gap-4">
        <button
          onClick={() => setShowConfirm(true)}
          className="flex items-center space-x-2 px-6 py-3 bg-silver-500 text-navy-950 rounded-full font-bold hover:bg-silver-400 transition-colors shadow-lg shadow-silver-500/20"
        >
          <Download className="w-4 h-4" />
          <span>Download PDF</span>
        </button>
        <button
          className="flex items-center space-x-2 px-6 py-3 border border-silver-500/50 text-silver-400 rounded-full font-bold hover:bg-silver-500/5 transition-colors"
        >
          <Share2 className="w-4 h-4" />
          <span>Share</span>
        </button>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirm && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isDownloading && setShowConfirm(false)}
              className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm bg-navy-900 border border-silver-500/30 rounded-3xl p-8 shadow-2xl overflow-hidden"
            >
              {/* Decorative background */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-silver-500/5 rounded-full blur-3xl -mr-16 -mt-16" />
              
              <div className="relative z-10 text-center">
                <div className="w-16 h-16 bg-silver-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <AlertCircle className="w-8 h-8 text-silver-500" />
                </div>
                
                <h3 className="text-2xl font-display text-silver-400 mb-4 tracking-tight">Confirm Download</h3>
                <p className="text-gray-300 text-sm mb-8 leading-relaxed">
                  Are you sure you want to download your official DASTAAN'26 invitation? 
                  This will generate a high-quality PDF for your records.
                </p>
                
                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="w-full py-3 bg-silver-500 text-navy-950 font-bold rounded-full hover:bg-silver-400 transition-all shadow-lg shadow-silver-500/20 uppercase tracking-widest text-xs disabled:opacity-50"
                  >
                    {isDownloading ? 'Generating PDF...' : 'Yes, Download Now'}
                  </button>
                  <button
                    onClick={() => setShowConfirm(false)}
                    disabled={isDownloading}
                    className="w-full py-3 border border-silver-500/30 text-silver-300/70 font-bold rounded-full hover:bg-silver-500/5 transition-all uppercase tracking-widest text-xs disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>

              <button 
                onClick={() => setShowConfirm(false)}
                disabled={isDownloading}
                className="absolute top-4 right-4 text-silver-500/50 hover:text-silver-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
