import { useAuth } from "@/hooks/useAuth";
import { useUserAnimeList } from "@/hooks/useUserAnimeList";

export default function Profile() {
  const { user, loading } = useAuth();
  const { data: animeList, error, isLoading } = useUserAnimeList();

  if (loading) return <p>Cargando usuario...</p>;
  if (!user) return <p>No estás autenticado.</p>;

  if (isLoading) return <p>Cargando lista de animes...</p>;
  if (error) return <p>Error al cargar lista: {error.message}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Mi Perfil</h1>
      <p>Email: {user.email}</p>

      <h2 className="text-xl mt-6 mb-2">Mi lista de anime</h2>
      {animeList && animeList.length > 0 ? (
        <ul className="space-y-2">
          {animeList.map((entry) => (
            <li key={entry.id} className="border p-2 rounded flex items-center gap-4">
              <img
                src={entry.animes.image_url || "/placeholder.svg"}
                alt={entry.animes.title}
                className="w-16 h-20 object-cover rounded"
              />
              <div>
                <strong>{entry.animes.title}</strong> <br />
                Estado: <em>{entry.status}</em> <br />
                Puntuación: {entry.score ?? "Sin puntuar"}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tienes animes en tu lista aún.</p>
      )}
    </div>
  );
}
