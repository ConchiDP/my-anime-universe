import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AvisoLegal = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Aviso Legal</h1>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Información General</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad 
                de la Información y de Comercio Electrónico, se informa de los siguientes datos:
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Titular del Sitio Web:</h3>
                  <p>AnimeTracker</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Contacto:</h3>
                  <p>conchidiazprogramacion@gmail.com</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Dominio:</h3>
                  <p>AnimeTracker</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Jurisdicción:</h3>
                  <p>España</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Objeto</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                El presente sitio web tiene por objeto facilitar al público en general el conocimiento 
                de las actividades que desarrolla AnimeTracker y los servicios que presta, 
                consistentes en una plataforma para el seguimiento y descubrimiento de anime.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Condiciones de Uso</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                El acceso y uso de este sitio web se somete a las presentes condiciones generales 
                de uso. El acceso al sitio web es gratuito salvo en lo relativo al coste de la 
                conexión a través de la red de telecomunicaciones suministrada por el proveedor 
                de acceso contratado por los usuarios.
              </p>
              
              <p>
                El uso de la web confiere la condición de usuario e implica la aceptación plena 
                de todas las cláusulas incluidas en este Aviso Legal.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Responsabilidad</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                AnimeTracker no se hace responsable de los daños y perjuicios de toda naturaleza 
                que puedan deberse a la falta de disponibilidad o de continuidad del funcionamiento 
                del sitio web, a la defraudación de la utilidad que los usuarios hubieren podido 
                atribuir al sitio web y a los servicios.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Propiedad Intelectual</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Los contenidos, diseños, estructura, selección, ordenación y presentación de 
                los elementos contenidos en este sitio web están protegidos por derechos de 
                propiedad intelectual e industrial.
              </p>
              
              <p className="mt-4">
                Los datos de anime mostrados provienen de fuentes públicas como la API de MyAnimeList 
                y se utilizan conforme a sus términos de uso.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Enlaces a Terceros</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                El sitio web puede contener enlaces a sitios web de terceros. AnimeTracker 
                no ejerce control alguno sobre estos sitios y no es responsable de sus contenidos.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Modificaciones</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                AnimeTracker se reserva el derecho a efectuar sin previo aviso las modificaciones 
                que considere oportunas en su web, pudiendo cambiar, suprimir o añadir tanto los 
                contenidos y servicios que se presten a través de la misma como la forma en la 
                que éstos aparezcan presentados o localizados.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Legislación Aplicable</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Las presentes condiciones generales de uso se rigen por la legislación española. 
                Para la resolución de todas las controversias o cuestiones relacionadas con el 
                presente sitio web o de las actividades en él desarrolladas, será de aplicación 
                la legislación española.
              </p>
              
              <p className="mt-4 text-sm text-muted-foreground">
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

export default AvisoLegal;