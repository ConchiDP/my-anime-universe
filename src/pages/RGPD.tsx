import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const RGPD = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Información RGPD</h1>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Reglamento General de Protección de Datos</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                El Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo, de 27 de abril de 2016, 
                relativo a la protección de las personas físicas en lo que respecta al tratamiento de datos 
                personales y a la libre circulación de estos datos (RGPD) es aplicable desde el 25 de mayo de 2018.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Derechos del Usuario según el RGPD</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Derecho de Acceso (Art. 15)</h3>
                <p className="text-sm text-muted-foreground">
                  Tienes derecho a obtener confirmación de si estamos tratando tus datos personales 
                  y, en tal caso, acceder a dichos datos y a información sobre el tratamiento.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Derecho de Rectificación (Art. 16)</h3>
                <p className="text-sm text-muted-foreground">
                  Tienes derecho a obtener la rectificación de los datos personales inexactos 
                  que te conciernan.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Derecho de Supresión (Art. 17)</h3>
                <p className="text-sm text-muted-foreground">
                  Tienes derecho a obtener la supresión de los datos personales que te conciernan 
                  cuando concurra alguna de las circunstancias previstas en el RGPD.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Derecho a la Limitación del Tratamiento (Art. 18)</h3>
                <p className="text-sm text-muted-foreground">
                  Tienes derecho a obtener la limitación del tratamiento cuando se dé alguna 
                  de las circunstancias establecidas en el RGPD.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Derecho a la Portabilidad (Art. 20)</h3>
                <p className="text-sm text-muted-foreground">
                  Tienes derecho a recibir los datos personales que te incumban en un formato 
                  estructurado, de uso común y lectura mecánica.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Derecho de Oposición (Art. 21)</h3>
                <p className="text-sm text-muted-foreground">
                  Tienes derecho a oponerte en cualquier momento al tratamiento de los datos 
                  personales que te conciernan.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Cómo Ejercer tus Derechos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Para ejercer cualquiera de estos derechos, puedes contactarnos mediante:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Email: conchidiazprogramacion@gmail.com</li>
                <li>Indicando claramente qué derecho deseas ejercer</li>
                <li>Proporcionando información suficiente para identificarte</li>
              </ul>
              
              <p className="mt-4 text-sm text-muted-foreground">
                Tiempo de respuesta: Responderemos a tu solicitud sin dilación indebida 
                y, en todo caso, en el plazo de un mes a partir de la recepción de la solicitud.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Autoridad de Control</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Si consideras que tus derechos han sido vulnerados, puedes presentar una 
                reclamación ante la Agencia Española de Protección de Datos (AEPD):
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Web: www.aepd.es</li>
                <li>Teléfono: 901 100 099 / 912 663 517</li>
                <li>Dirección: C/ Jorge Juan, 6. 28001 – Madrid</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Medidas de Seguridad</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Implementamos las medidas técnicas y organizativas apropiadas para garantizar 
                un nivel de seguridad adecuado al riesgo del tratamiento, incluyendo:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Cifrado de datos personales</li>
                <li>Medidas para garantizar la confidencialidad</li>
                <li>Medidas para garantizar la integridad</li>
                <li>Medidas para garantizar la disponibilidad</li>
                <li>Procedimientos para probar, evaluar y valorar la eficacia</li>
              </ul>
              
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

export default RGPD;