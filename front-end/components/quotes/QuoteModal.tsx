import React, { useEffect, useState } from 'react';
import QuoteService from '@/services/QuoteService';
import styles from '@/styles/Home.module.css';

interface QuoteModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose }) => {
    const [quote, setQuote] = useState<{ text: string; author: string } | null>(null);
    const [loading, setLoading] = useState(false);
    const [animate, setAnimate] = useState(false);

    const fetchQuote = async () => {
        setLoading(true);
        setAnimate(false);
        const q = await QuoteService.getRandomQuote();
        setQuote(q);
        setTimeout(() => setAnimate(true), 10); // trigger animation
        setLoading(false);
    };

    useEffect(() => {
        if (isOpen) {
            fetchQuote();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className={styles.motivationModalOverlay} onClick={onClose}>
            <div className={styles.motivationModalContent} onClick={e => e.stopPropagation()}>
                <button className={styles.motivationModalClose} onClick={onClose}>×</button>
                <h2 className={styles.motivationModalTitle}>Motivational Quote</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : quote ? (
                    <div
                        className={`${styles.quoteSlide} ${animate ? styles.slideIn : ''}`}
                        key={quote.text + quote.author}
                        onClick={fetchQuote}
                        style={{ cursor: 'pointer' }}
                        title="Klik voor een nieuwe quote"
                    >
                        <blockquote>"{quote.text}"</blockquote>
                        <p>- {quote.author}</p>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default QuoteModal;