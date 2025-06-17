import React, { useEffect, useState } from 'react';
import QuoteService from '@/services/QuoteService';

interface QuoteModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose }) => {
    const [quote, setQuote] = useState<{ text: string; author: string } | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setLoading(true);
            QuoteService.getRandomQuote().then((q) => {
                setQuote(q);
                setLoading(false);
            });
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="modalOverlay" onClick={onClose}>
            <div className="modalContent" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} style={{ float: 'right' }}>X</button>
                <h2>Motivational Quote</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : quote ? (
                    <>
                        <blockquote>"{quote.text}"</blockquote>
                        <p>- {quote.author}</p>
                    </>
                ) : null}
            </div>
            <style jsx>{`
        .modalOverlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .modalContent {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          min-width: 300px;
          max-width: 90vw;
        }
      `}</style>
        </div>
    );
};

export default QuoteModal;