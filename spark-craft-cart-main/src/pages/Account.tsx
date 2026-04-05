import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { User, Mail, LogOut, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const Account = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/auth');
    } else if (user.role === 'admin') {
      // Forcefully log out the admin from the customer side to prevent them from getting stuck here
      logout();
      navigate('/auth');
    }
  }, [user, navigate, logout]);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-16">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {/* Avatar circle */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center mb-4">
            <User size={36} className="text-accent" />
          </div>
          <h1 className="font-display text-2xl font-semibold tracking-wide">{user.name}</h1>
          <p className="text-sm text-muted-foreground font-body mt-1">My Account</p>
        </div>

        {/* Info card */}
        <div className="rounded-2xl border border-border bg-card p-6 space-y-4 shadow-sm">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <User size={16} className="shrink-0" />
            <span className="font-body">{user.name}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Mail size={16} className="shrink-0" />
            <span className="font-body">{user.email}</span>
          </div>
          {user.phone && (
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Phone size={16} className="shrink-0" />
              <span className="font-body">{user.phone}</span>
            </div>
          )}
          {user.address && (
            <div className="flex items-start gap-3 text-sm text-muted-foreground">
              <MapPin size={16} className="mt-0.5 shrink-0" />
              <span className="font-body">{user.address}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={() => navigate('/products')}
            className="w-full py-3 rounded-xl border border-border text-sm font-body tracking-wider uppercase hover:bg-accent/10 transition-colors"
          >
            Continue Shopping
          </button>
          <button
            onClick={handleLogout}
            className="w-full py-3 rounded-xl bg-foreground text-background text-sm font-body tracking-wider uppercase flex items-center justify-center gap-2 hover:opacity-80 transition-opacity"
          >
            <LogOut size={15} />
            Log Out
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Account;
