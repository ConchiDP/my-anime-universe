import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AnimeSearch } from '@/components/AnimeSearch';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

const Search = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [initialQuery, setInitialQuery] = useState('');

  useEffect(() => {
    const query = searchParams.get('q');
    const trending = searchParams.get('trending');
    if (query) {
      setInitialQuery(query);
    } else if (trending === 'true') {
      setInitialQuery('trending');
    }
  }, [searchParams]);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              {searchParams.get('trending') === 'true' ? 'Animes en Tendencia' : 'Buscar Anime'}
            </h1>
            <p className="text-muted-foreground">
              {searchParams.get('trending') === 'true' 
                ? 'Los animes más populares actualmente en emisión'
                : 'Descubre nuevos animes y agrégalos a tu lista personal'
              }
            </p>
          </div>
          
          <AnimeSearch 
            initialQuery={initialQuery} 
            isTrending={searchParams.get('trending') === 'true'} 
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Search;