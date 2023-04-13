import { useEffect, useState } from 'react';
import Icons from '../Icons';

function BackToTop() {
    const [backToTop, setBackToTop] = useState(false);
    const toggleVisible = function () {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setBackToTop(true);
        } else if (scrolled <= 300) {
            setBackToTop(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisible);
        return () => {
            window.removeEventListener('scroll', toggleVisible);
        };
    }, []);

    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    return (
        backToTop && (
            <div
                style={{
                    position: 'fixed',
                    bottom: '50px',
                    right: '50px',
                    border: '1px solid #CB1C22',
                    borderRadius: '50%',
                    width: '50px',
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#CB1C22',
                    cursor: 'pointer'
                }}
                onClick={scrollUp}
            >
                <Icons.ChevronUp height="18" width="18" color="#FFFFFF" />
            </div>
        )
    );
}

export default BackToTop;
