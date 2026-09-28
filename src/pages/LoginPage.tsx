import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Spinner } from '@heroui/react';
import { motion } from 'framer-motion';
import { RotateWordsMotion } from '../compos/RotateWordsMotion';

interface LoginPageProps {
    setIsAuthenticated: (value: boolean) => void;
}

function LoginPage({ setIsAuthenticated }: LoginPageProps) {
    const [loading, setLoading] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowButton(true);
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    const handleLogin = async () => {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsAuthenticated(true);
        navigate('/home');
    };

    return (
        <div className='flex items-center justify-center flex-col min-h-screen gap-8 px-4'>
            <RotateWordsMotion
                text="the"
                words={['Sweat 💦', 'Lift 🏋️', 'Power 💪', 'Burn 🔥', 'WOD']}
            />

            {showButton && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center gap-6 max-w-sm"
                >
                    <p className="text-gray-600 text-lg md:text-xl text-center">
                        Your workout for the day and much more!
                    </p>

                    <Button
                        size='sm'
                        isPending={loading}
                        onPress={handleLogin}
                        className="w-full bg-blue-600 text-white font-semibold py-3 text-base"
                    >
                        {({ isPending }) => (
                            <>
                                {isPending ? <Spinner color="current" size="sm" /> : null}
                                Login
                            </>
                        )}
                    </Button>
                </motion.div>
            )}
        </div>
    );
}

export default LoginPage;