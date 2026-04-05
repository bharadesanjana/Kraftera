import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const { login, signup, user } = useAuth();
  const navigate = useNavigate();

  if (user) {
    navigate('/account');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const success = isLogin ? await login(email, password) : await signup(name, email, username, password, phone, address);
      if (success) {
        navigate('/account');
      } else {
        setError('Invalid credentials');
      }
    } catch {
      setError('Something went wrong');
    }
  };

  return (
    <main className="container mx-auto px-4 py-16 md:py-24 flex justify-center">
      <div className="w-full max-w-sm">
        <h1 className="font-display text-2xl md:text-3xl text-center mb-8">
          {isLogin ? 'Sign In' : 'Create Account'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full border border-border bg-background px-4 py-3 text-sm font-body focus:outline-none focus:border-accent transition-colors"
              required
            />
          )}
          {!isLogin && (
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full border border-border bg-background px-4 py-3 text-sm font-body focus:outline-none focus:border-accent transition-colors"
              required
            />
          )}
          {!isLogin && (
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="w-full border border-border bg-background px-4 py-3 text-sm font-body focus:outline-none focus:border-accent transition-colors"
              required
            />
          )}
          {!isLogin && (
            <textarea
              placeholder="Shipping Address"
              value={address}
              onChange={e => setAddress(e.target.value)}
              className="w-full border border-border bg-background px-4 py-3 text-sm font-body focus:outline-none focus:border-accent transition-colors min-h-[80px] resize-none"
              required
            />
          )}
          <input
            type={isLogin ? "text" : "email"}
            placeholder={isLogin ? "Username" : "Email"}
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full border border-border bg-background px-4 py-3 text-sm font-body focus:outline-none focus:border-accent transition-colors"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full border border-border bg-background px-4 py-3 text-sm font-body focus:outline-none focus:border-accent transition-colors"
            required
          />
          {error && <p className="text-destructive text-sm font-body">{error}</p>}
          <button
            type="submit"
            className="w-full bg-foreground text-background py-3.5 text-sm font-body tracking-wider uppercase hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground font-body mt-6">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button onClick={() => setIsLogin(!isLogin)} className="text-foreground underline hover:text-accent transition-colors">
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </p>


      </div>
    </main>
  );
};

export default Auth;
