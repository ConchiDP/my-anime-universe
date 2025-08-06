import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PoliticaPrivacidad = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Política de Privacidad</h1>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Información General</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                En cumplimiento del Reglamento General de Protección de Datos (RGPD) y la Ley Orgánica 3/2018 
                de Protección de Datos Personales y garantía de los derechos digitales, informamos sobre el 
                tratamiento de datos personales en AnimeTracker.
              </p>
              <p><strong>Responsable:</strong> AnimeTracker</p>
              <p><strong>Contacto:</strong> conchidiazprogramacion@gmail.com</p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Datos que Recopilamos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="font-semibold">Datos de Registro:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Dirección de correo electrónico</li>
                <li>Nombre de usuario/pantalla</li>
                <li>Imagen de perfil (opcional)</li>
              </ul>
              
              <h3 className="font-semibold">Datos de Uso:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Listas de anime personales</li>
                <li>Valoraciones y puntuaciones</li>
                <li>Actividad en la plataforma</li>
                <li>Preferencias de usuario</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Finalidad del Tratamiento</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 space-y-2">
                <li>Proporcionar y mantener nuestros servicios</li>
                <li>Gestionar tu cuenta de usuario</li>
                <li>Facilitar la interacción social entre usuarios</li>
                <li>Mejorar nuestros servicios</li>
                <li>Cumplir con obligaciones legales</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Base Legal</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                El tratamiento de tus datos se basa en tu consentimiento expreso al registrarte 
                en nuestra plataforma y aceptar estos términos.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Tus Derechos</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Tienes derecho a:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Acceder a tus datos personales</li>
                <li>Rectificar datos inexactos</li>
                <li>Suprimir tus datos</li>
                <li>Limitar el tratamiento</li>
                <li>Portabilidad de datos</li>
                <li>Revocar el consentimiento</li>
              </ul>
              <p className="mt-4">
                Para ejercer estos derechos, contacta con nosotros en: conchidiazprogramacion@gmail.com
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Seguridad</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Implementamos medidas técnicas y organizativas apropiadas para proteger tus datos 
                personales contra el acceso no autorizado, la pérdida o la destrucción.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contacto</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Si tienes preguntas sobre esta política de privacidad, puedes contactarnos en: 
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

export default PoliticaPrivacidad;