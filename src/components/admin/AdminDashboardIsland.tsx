import { useEffect, useState } from 'react';
import SHA256 from 'crypto-js/sha256';
import { FileSignature, FileText, LogIn, LogOut } from 'lucide-react';

const STORED_HASH_KEY = 'salwah-secret-sauce';
const STORED_HASH_RESULT = '3369f3f3f0a1a95fa242f24c91f802a4a13e4d23b687653cd7fe16471e8aa7f6';
const SESSION_KEY = 'salwah_admin_authed';

export default function AdminDashboardIsland() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_KEY) === 'true') {
        setIsAuthenticated(true);
      }
    } catch {}
  }, []);

  const handleLogin = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputHash = SHA256(password + STORED_HASH_KEY).toString();
    if (inputHash === STORED_HASH_RESULT) {
      setIsAuthenticated(true);
      setError('');
      try {
        sessionStorage.setItem(SESSION_KEY, 'true');
      } catch {}
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch {}
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border border-salwah-gold/30 bg-[#12151e] p-8 space-y-6 shadow-2xl">
          <div className="text-center">
            <h1 className="font-serif text-3xl font-bold text-salwah-gold">Admin Access</h1>
            <p className="mt-2 text-sm text-gray-400">Enter your password to open internal tools.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full rounded-xl border border-salwah-gold/30 bg-black/60 px-4 py-3 text-white focus:border-salwah-gold focus:outline-none"
            />
            {error && <p className="text-xs text-red-400">{error}</p>}
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-salwah-gold py-3.5 text-base font-bold text-black hover:bg-salwah-gold-light transition cursor-pointer"
            >
              <LogIn className="h-5 w-5" /> Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-4xl font-bold text-white">
            Admin <span className="text-salwah-gold">Dashboard</span>
          </h1>
          <p className="text-gray-400 text-sm mt-1">Salwah Events Ltd — Internal Document Generators</p>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2 text-xs font-semibold text-gray-300 hover:border-salwah-gold hover:text-salwah-gold transition cursor-pointer"
        >
          <LogOut className="h-4 w-4" /> Lock Panel
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <a
          href="/admin/quotations"
          className="group luxury-card rounded-2xl p-8 flex flex-col gap-4"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-salwah-gold/30 bg-salwah-gold/10 text-salwah-gold group-hover:bg-salwah-gold group-hover:text-black transition">
            <FileSignature className="h-7 w-7" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-white">Quotation Generator</h2>
          <p className="text-sm text-gray-300">
            Create, auto-save, import/export JSON, and download branded Salwah PDF quotations.
          </p>
        </a>

        <a
          href="/admin/invoices"
          className="group luxury-card rounded-2xl p-8 flex flex-col gap-4"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-salwah-gold/30 bg-salwah-gold/10 text-salwah-gold group-hover:bg-salwah-gold group-hover:text-black transition">
            <FileText className="h-7 w-7" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-white">Invoice Generator</h2>
          <p className="text-sm text-gray-300">
            Create, manage deposits &amp; VAT, import/export JSON, and export branded PDF invoices.
          </p>
        </a>
      </div>
    </div>
  );
}
