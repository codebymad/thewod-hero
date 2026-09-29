import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Spinner } from '@heroui/react';
import { motion } from 'framer-motion';
import { RotateWordsMotion } from '../compos/RotateWordsMotion';
import { IconLogin } from '@tabler/icons-react';

interface LoginPageProps { isAuthenticated: boolean; setIsAuthenticated: (value: boolean) => void; }

function LoginPage({
    isAuthenticated,
    setIsAuthenticated
}: LoginPageProps) {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => { if (isAuthenticated) { navigate('/home', { replace: true }); } }, [isAuthenticated, navigate]);

    const handleLogin = async () => {
        setLoading(true);
        //await new Promise(resolve => setTimeout(resolve, 1000));
        // Save temporary user 
        localStorage.setItem('user', JSON.stringify({ id: 'temp', name: 'Temporary User', }));
        setIsAuthenticated(true);
        navigate('/home');
    };

    return (
        <div className='flex items-center justify-center flex-col min-h-screen gap-8 px-4'>
            <RotateWordsMotion
                text="the"
                words={['Sweat 💦', 'Lift 🏋️', 'Power 💪', 'Burn 🔥', 'WOD']}
            />
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
                    size="lg"
                    isPending={loading}
                    onPress={handleLogin}
                    className="w-full bg-blue-600 text-white font-semibold py-3 text-base"
                >
                    {({ isPending }) => (
                        <>
                            {isPending ? (
                                <Spinner color="current" size="sm" />
                            ) : (
                                <IconLogin />
                            )}
                            <span>Login</span>
                        </>
                    )}
                </Button>
            </motion.div>
        </div>
    );
}

export default LoginPage;