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
        backgroundColor: '#022c22',
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

  return (
    <div className="flex flex-col items-center space-y-8 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        ref={ticketRef}
        className="relative w-full max-w-md bg-emerald-900 rounded-2xl overflow-hidden shadow-2xl border-2 border-gold-500/30"
      >
        {/* Ticket Header */}
        <div className="bg-emerald-950 p-6 border-b border-gold-500/20 text-center">
          <div className="flex justify-center mb-2">
            <Sparkles className="text-gold-500 w-6 h-6" />
          </div>
          <h2 className="text-2xl font-display gold-gradient font-bold tracking-widest">DASTAAN'26</h2>
          <p className="text-gold-300/60 text-xs uppercase tracking-[0.2em] mt-1">Official Invitation</p>
        </div>

        {/* Ticket Body */}
        <div className="p-8 space-y-6 relative">
          {/* Decorative background pattern */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="w-full h-full bg-[radial-gradient(circle_at_center,#d4af37_1px,transparent_1px)] bg-[length:20px_20px]" />
          </div>

          <div className="relative z-10">
            <p className="text-gold-300/60 text-[10px] uppercase tracking-widest mb-1">Guest Name</p>
            <p className="text-xl font-serif text-white tracking-wide">{userName}</p>
          </div>

          <div className="grid grid-cols-2 gap-6 relative z-10">
            <div>
              <p className="text-gold-300/60 text-[10px] uppercase tracking-widest mb-1">Seat</p>
              <p className="text-lg font-display text-gold-400">{seatNumber}</p>
            </div>
            <div>
              <p className="text-gold-300/60 text-[10px] uppercase tracking-widest mb-1">Date</p>
              <p className="text-lg font-display text-gold-400">07.04.26</p>
            </div>
          </div>

          <div className="pt-6 border-t border-gold-500/10 flex flex-col items-center relative z-10">
            <div className="bg-white p-3 rounded-lg mb-4">
              <QRCodeSVG 
                value={`DASTAAN26-${ticketId}`} 
                size={120}
                fgColor="#022c22"
              />
            </div>
            <p className="text-gold-300/40 text-[10px] font-mono tracking-tighter">ID: {ticketId}</p>
          </div>
        </div>

        {/* Ticket Footer */}
        <div className="bg-gold-500 p-4 text-emerald-950 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em]">Scan for AR Experience</p>
        </div>

        {/* Perforation Effect */}
        <div className="absolute top-1/2 -left-4 w-8 h-8 bg-emerald-950 rounded-full border-r border-gold-500/30 transform -translate-y-1/2" />
        <div className="absolute top-1/2 -right-4 w-8 h-8 bg-emerald-950 rounded-full border-l border-gold-500/30 transform -translate-y-1/2" />
      </motion.div>

      <div className="flex gap-4">
        <button
          onClick={() => setShowConfirm(true)}
          className="flex items-center space-x-2 px-6 py-3 bg-gold-500 text-emerald-950 rounded-full font-bold hover:bg-gold-400 transition-colors shadow-lg shadow-gold-500/20"
        >
          <Download className="w-4 h-4" />
          <span>Download PDF</span>
        </button>
        <button
          className="flex items-center space-x-2 px-6 py-3 border border-gold-500/50 text-gold-400 rounded-full font-bold hover:bg-gold-500/5 transition-colors"
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
              className="absolute inset-0 bg-emerald-950/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm bg-emerald-900 border border-gold-500/30 rounded-3xl p-8 shadow-2xl overflow-hidden"
            >
              {/* Decorative background */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/5 rounded-full blur-3xl -mr-16 -mt-16" />
              
              <div className="relative z-10 text-center">
                <div className="w-16 h-16 bg-gold-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <AlertCircle className="w-8 h-8 text-gold-500" />
                </div>
                
                <h3 className="text-2xl font-display text-gold-400 mb-4 tracking-tight">Confirm Download</h3>
                <p className="text-gray-300 text-sm mb-8 leading-relaxed">
                  Are you sure you want to download your official DASTAAN'26 invitation? 
                  This will generate a high-quality PDF for your records.
                </p>
                
                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="w-full py-3 bg-gold-500 text-emerald-950 font-bold rounded-full hover:bg-gold-400 transition-all shadow-lg shadow-gold-500/20 uppercase tracking-widest text-xs disabled:opacity-50"
                  >
                    {isDownloading ? 'Generating PDF...' : 'Yes, Download Now'}
                  </button>
                  <button
                    onClick={() => setShowConfirm(false)}
                    disabled={isDownloading}
                    className="w-full py-3 border border-gold-500/30 text-gold-300/70 font-bold rounded-full hover:bg-gold-500/5 transition-all uppercase tracking-widest text-xs disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>

              <button 
                onClick={() => setShowConfirm(false)}
                disabled={isDownloading}
                className="absolute top-4 right-4 text-gold-500/50 hover:text-gold-500 transition-colors"
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
