import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { FileText, LogIn, FileSignature } from 'lucide-react';
import SHA256 from 'crypto-js/sha256';

const AdminDashboard = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white">
                Admin <span className="text-gold">Dashboard</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mt-4">
                Manage your tools and content from here.
            </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0.1 }}
            >
                <Link to="/admin/quotations" className="block p-8 rounded-xl bg-[#2A2E39] border border-gold/10 h-full hover-lift transition-all duration-300 group">
                    <div className="flex items-center justify-center w-16 h-16 bg-gold/10 rounded-lg mb-6 border border-gold/20 group-hover:bg-gold transition-colors duration-300">
                        <FileSignature className="w-8 h-8 text-gold group-hover:text-black" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-white mb-3">Quotation Generator</h3>
                    <p className="text-gray-300 font-sans">
                        Create, manage, and export professional quotations for your clients.
                    </p>
                </Link>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0.2 }}
            >
                <Link to="/admin/invoices" className="block p-8 rounded-xl bg-[#2A2E39] border border-gold/10 h-full hover-lift transition-all duration-300 group">
                    <div className="flex items-center justify-center w-16 h-16 bg-gold/10 rounded-lg mb-6 border border-gold/20 group-hover:bg-gold transition-colors duration-300">
                        <FileText className="w-8 h-8 text-gold group-hover:text-black" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-white mb-3">Invoice Generator</h3>
                    <p className="text-gray-300 font-sans">
                        Create, manage, and export professional invoices for your clients.
                    </p>
                </Link>
            </motion.div>
        </div>
    </div>
);

const LoginScreen = ({ onLogin }) => {
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(password);
    };
    
    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md p-8 space-y-8 bg-[#2A2E39] rounded-2xl shadow-lg border border-gold/20"
            >
                <div className="text-center">
                    <h1 className="text-3xl font-serif font-bold text-gold">Admin Access</h1>
                    <p className="mt-2 text-gray-400">Please enter the password to continue.</p>
                </div>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-black/50 border border-gold/30 rounded-lg text-white font-sans focus:outline-none focus:border-gold transition-colors"
                            placeholder="Password"
                        />
                    </div>
                    <div>
                        <Button
                            type="submit"
                            className="w-full bg-gold hover:bg-gold-dark text-black font-semibold py-3 text-lg"
                        >
                            <LogIn className="mr-2 h-5 w-5" />
                            Login
                        </Button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};


const Admin = () => {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const storedHashKey = 'salwah-secret-sauce';
  const storedHashResult = '3369f3f3f0a1a95fa242f24c91f802a4a13e4d23b687653cd7fe16471e8aa7f6';

  const handleLogin = (password) => {
    const inputHash = SHA256(password + storedHashKey).toString();
    if (inputHash === storedHashResult) {
      setIsAuthenticated(true);
      toast({
        title: 'Login Successful',
        description: 'Welcome to the admin panel.',
      });
    } else {
      toast({
        title: 'Login Failed',
        description: 'Incorrect password. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Panel | Salwah Events</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      {isAuthenticated ? <AdminDashboard /> : <LoginScreen onLogin={handleLogin} />}
    </>
  );
};

export default Admin;