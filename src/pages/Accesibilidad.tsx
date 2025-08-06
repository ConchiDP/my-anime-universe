import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Accesibilidad = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Declaración de Accesibilidad</h1>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Compromiso con la Accesibilidad</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                AnimeTracker está comprometida con la accesibilidad digital y se esfuerza por 
                garantizar que nuestro sitio web sea accesible para todas las personas, 
                independientemente de sus capacidades o la tecnología que utilicen.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Estándares de Accesibilidad</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Nos esforzamos por cumplir con las Pautas de Accesibilidad para el Contenido Web 
                (WCAG) 2.1 en el nivel AA. Estas pautas explican cómo hacer que el contenido web 
                sea más accesible para personas con discapacidades.
              </p>
              
              <h3 className="font-semibold mb-2">Características de Accesibilidad Implementadas:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Navegación mediante teclado</li>
                <li>Texto alternativo para imágenes</li>
                <li>Contraste de color adecuado</li>
                <li>Estructura de encabezados lógica</li>
                <li>Etiquetas descriptivas para formularios</li>
                <li>Soporte para lectores de pantalla</li>
                <li>Opciones de tema claro/oscuro</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Tecnologías Utilizadas</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Este sitio web utiliza las siguientes tecnologías:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>HTML5 semántico</li>
                <li>CSS3 con diseño responsivo</li>
                <li>JavaScript (React)</li>
                <li>ARIA (Accessible Rich Internet Applications)</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Limitaciones Conocidas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                A pesar de nuestros esfuerzos, puede haber algunas limitaciones de accesibilidad. 
                Estamos trabajando continuamente para mejorar la accesibilidad de nuestro sitio.
              </p>
              
              <h3 className="font-semibold mb-2">Limitaciones actuales:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Algunas imágenes de anime externas pueden carecer de texto alternativo descriptivo</li>
                <li>Ciertos componentes dinámicos pueden requerir JavaScript habilitado</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Navegación Alternativa</CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold mb-2">Atajos de Teclado:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Tab: Navegar hacia adelante por los elementos interactivos</li>
                <li>Shift + Tab: Navegar hacia atrás por los elementos interactivos</li>
                <li>Enter/Espacio: Activar botones y enlaces</li>
                <li>Escape: Cerrar diálogos y menús</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Comentarios y Contacto</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Valoramos tus comentarios sobre la accesibilidad de AnimeTracker. 
                Si encuentras una barrera de accesibilidad en el sitio, o si tienes 
                sugerencias sobre cómo podemos mejorar, por favor contáctanos:
              </p>
              
              <ul className="list-disc pl-6 space-y-2">
                <li>Email: conchidiazprogramacion@gmail.com</li>
                <li>Asunto: Accesibilidad Web</li>
              </ul>
              
              <p className="mt-4 text-sm text-muted-foreground">
                Intentaremos responder a los comentarios sobre accesibilidad dentro de 5 días hábiles.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Evaluación y Pruebas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Esta declaración de accesibilidad se actualiza regularmente. 
                Realizamos evaluaciones periódicas de accesibilidad utilizando:
              </p>
              
              <ul className="list-disc pl-6 space-y-2">
                <li>Herramientas automáticas de evaluación de accesibilidad</li>
                <li>Pruebas manuales con lectores de pantalla</li>
                <li>Navegación mediante teclado</li>
                <li>Revisión de contraste de colores</li>
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

export default Accesibilidad;