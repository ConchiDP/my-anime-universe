import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PoliticaCookies = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Política de Cookies</h1>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>¿Qué son las Cookies?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo 
                cuando visitas un sitio web. Nos ayudan a mejorar tu experiencia proporcionando 
                información sobre cómo utilizas nuestro sitio.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Tipos de Cookies que Utilizamos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Cookies Estrictamente Necesarias</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Estas cookies son esenciales para el funcionamiento del sitio web.
                </p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Cookies de autenticación para mantener tu sesión</li>
                  <li>Cookies de seguridad para proteger contra ataques</li>
                  <li>Cookies de funcionalidad básica del sitio</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Cookies de Preferencias</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Estas cookies recuerdan tus preferencias y configuraciones.
                </p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Tema de color (modo oscuro/claro)</li>
                  <li>Configuración de idioma</li>
                  <li>Preferencias de visualización</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Cookies de Funcionalidad</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Estas cookies mejoran la funcionalidad del sitio web.
                </p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Almacenamiento local de listas de anime</li>
                  <li>Caché de búsquedas recientes</li>
                  <li>Estado de la aplicación</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Duración de las Cookies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold">Cookies de Sesión</h3>
                <p className="text-sm text-muted-foreground">
                  Se eliminan cuando cierras el navegador. Se utilizan para mantener tu sesión activa.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold">Cookies Persistentes</h3>
                <p className="text-sm text-muted-foreground">
                  Permanecen en tu dispositivo durante un tiempo determinado (hasta 1 año) 
                  para recordar tus preferencias.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Gestión de Cookies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Puedes controlar y gestionar las cookies de varias maneras:
              </p>
              
              <div>
                <h3 className="font-semibold mb-2">Configuración del Navegador</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  La mayoría de navegadores te permiten:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Ver qué cookies están almacenadas</li>
                  <li>Eliminar cookies individualmente o todas</li>
                  <li>Bloquear cookies de sitios específicos</li>
                  <li>Configurar alertas cuando se instalen cookies</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Impacto de Deshabilitar Cookies</h3>
                <p className="text-sm text-muted-foreground">
                  Si deshabilitas las cookies, algunas funcionalidades del sitio pueden no 
                  funcionar correctamente, como mantener tu sesión iniciada o recordar 
                  tus preferencias.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Cookies de Terceros</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Actualmente no utilizamos cookies de terceros para análisis o publicidad. 
                Los datos de anime se obtienen directamente de APIs públicas sin instalación 
                de cookies adicionales.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Actualizaciones de esta Política</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Podemos actualizar esta política de cookies ocasionalmente. Te recomendamos 
                revisar esta página periódicamente para estar informado de cualquier cambio.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contacto</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Si tienes preguntas sobre nuestra política de cookies, puedes contactarnos en: 
                conchidiazprogramacion@gmail.com
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Última actualización: {new Date().toLocaleDateString('es-ES')}
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PoliticaCookies;