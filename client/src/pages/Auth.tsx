import React, { useState } from 'react';
import { useLogin, useRegister, useUser } from '@/hooks/use-auth';
import { Button, Input, Label } from '@/components/PremiumUI';
import { motion } from 'framer-motion';
import { Globe2 } from 'lucide-react';
import { useLocation } from 'wouter';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const login = useLogin();
  const register = useRegister();
  const { data: user } = useUser();
  const [, setLocation] = useLocation();

  if (user) {
    setLocation('/dashboard');
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      login.mutate({ username, password });
    } else {
      register.mutate({ username, password });
    }
  };

  const isPending = login.isPending || register.isPending;
  const error = login.error || register.error;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] mix-blend-multiply pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 rounded-full blur-[120px] mix-blend-multiply pointer-events-none" />
      
      <div className="w-full max-w-5xl flex rounded-3xl overflow-hidden shadow-2xl shadow-primary/10 border border-border/50 bg-card relative z-10 m-4 min-h-[600px]">
        
        {/* Left Side: Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                <Globe2 className="w-6 h-6 text-white" aria-hidden="true" />
              </div>
              <h1 className="font-display font-bold text-3xl" data-testid="text-auth-title">Ubuntu Pools</h1>
            </div>
            
            <h2 className="text-3xl font-display font-bold mb-2">
              {isLogin ? 'Welcome back' : 'Join the Community'}
            </h2>
            <p className="text-muted-foreground mb-8" data-testid="text-auth-description">
              {isLogin ? 'Log in to manage your Stokvels and track your prosperity.' : 'Create an account to participate in trusted community savings.'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input 
                  id="username" 
                  type="text" 
                  required 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  placeholder="e.g. mandela123"
                  data-testid="input-username"
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="••••••••"
                  data-testid="input-password"
                />
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-destructive/10 text-destructive text-sm font-semibold border border-destructive/20" data-testid="text-auth-error">
                  {error.message}
                </div>
              )}

              <Button type="submit" className="w-full" size="lg" isLoading={isPending} data-testid="button-auth-submit">
                {isLogin ? 'Sign In' : 'Create Account'}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <button 
                type="button" 
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary font-semibold hover:underline decoration-2 underline-offset-4 transition-all"
                data-testid="button-toggle-auth"
              >
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
              </button>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Image */}
        <div className="hidden md:block w-1/2 relative bg-muted">
          {/* Auth hero image portraying South African community */}
          <img 
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=1200" 
            alt="Community" 
            className="absolute inset-0 w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 p-12 text-white">
            <h3 className="font-display text-4xl font-bold mb-4 leading-tight text-white">I am because<br/>we are.</h3>
            <p className="text-white/80 text-lg max-w-sm">Experience the power of collective wealth generation through decentralized Stokvels.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Auth;
