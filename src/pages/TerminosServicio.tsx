import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TerminosServicio = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Términos de Servicio</h1>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>1. Aceptación de los Términos</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Al acceder y utilizar AnimeTracker, aceptas cumplir con estos términos de servicio 
                y todas las leyes y regulaciones aplicables. Si no estás de acuerdo con estos términos, 
                no utilices nuestros servicios.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>2. Descripción del Servicio</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                AnimeTracker es una plataforma que permite a los usuarios crear listas personales 
                de anime, valorar series, conectar con otros usuarios y descubrir nuevo contenido anime.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>3. Registro y Cuenta de Usuario</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Para utilizar ciertos servicios, debes crear una cuenta proporcionando:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Una dirección de correo electrónico válida</li>
                <li>Un nombre de usuario único</li>
                <li>Una contraseña segura</li>
              </ul>
              <p>Eres responsable de mantener la confidencialidad de tu cuenta.</p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>4. Uso Aceptable</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Te comprometes a NO:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Utilizar el servicio para actividades ilegales</li>
                <li>Publicar contenido ofensivo, difamatorio o inapropiado</li>
                <li>Intentar acceder a cuentas de otros usuarios</li>
                <li>Interferir con el funcionamiento del servicio</li>
                <li>Crear cuentas falsas o múltiples</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>5. Contenido del Usuario</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Mantienes la propiedad del contenido que publicas (listas, valoraciones, comentarios). 
                Al publicar contenido, nos otorgas una licencia no exclusiva para mostrarlo en nuestra plataforma.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>6. Propiedad Intelectual</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Los datos de anime provienen de fuentes públicas como MyAnimeList API. 
                Respetamos los derechos de propiedad intelectual y esperamos que los usuarios hagan lo mismo.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>7. Limitación de Responsabilidad</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                AnimeTracker se proporciona "tal como está". No garantizamos que el servicio sea 
                ininterrumpido o libre de errores. No somos responsables de daños indirectos o consecuentes.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>8. Terminación</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Podemos suspender o terminar tu cuenta si violas estos términos. 
                Puedes cerrar tu cuenta en cualquier momento contactándonos.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>9. Ley Aplicable</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Estos términos se rigen por las leyes españolas. Cualquier disputa se resolverá 
                en los tribunales competentes de España.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>10. Contacto</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Para preguntas sobre estos términos, contacta: conchidiazprogramacion@gmail.com
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

export default TerminosServicio;