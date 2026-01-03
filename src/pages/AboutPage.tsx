import { User, Book, Sparkles } from 'lucide-react';
import Layout from '@/components/layout/Layout';

export default function AboutPage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Sobre el Autor
            </h1>
            <p className="text-muted-foreground text-lg">
              Conoce a Daniel Hernandez Rosales - Danihros
            </p>
          </div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-10 items-start">
              {/* Photo Placeholder */}
              <div className="aspect-[3/4] rounded-xl bg-card border border-border/50 flex items-center justify-center">
                <User className="w-24 h-24 text-muted-foreground/30" />
              </div>

              {/* Bio */}
              <div className="md:col-span-2 space-y-6">
                <h2 className="font-display text-3xl font-bold text-foreground">
                  Daniel Hernandez Rosales
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Soy un escritor independiente apasionado por crear mundos de fantasía 
                  que transportan a los lectores a lugares donde la magia es real y las 
                  aventuras nunca terminan. Desde pequeño, las historias han sido mi refugio 
                  y mi pasión.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Mi objetivo es escribir libros que no solo entretengan, sino que también 
                  inspiren y dejen una huella en el corazón de quienes los leen. Cada historia 
                  que creo es una invitación a explorar lo desconocido, a enfrentar desafíos 
                  y a descubrir la magia que existe en todos nosotros.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Cuando no estoy escribiendo, disfruto de la lectura, explorar nuevos lugares 
                  y pasar tiempo con mi familia. Creo firmemente en el poder de las historias 
                  para cambiar vidas y construir puentes entre personas de todo el mundo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Saga Section */}
      <section className="py-12 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/30">
                <Book className="w-6 h-6 text-primary" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground">
                La Saga: Los Cuentos Perdidos de Terra
              </h2>
            </div>

            <div className="bg-background rounded-xl border border-border/50 p-6 md:p-8">
              <p className="text-muted-foreground leading-relaxed mb-6">
                "Los Cuentos Perdidos de Terra" es mi saga principal, una serie épica de 
                fantasía ambientada en un mundo donde antiguos secretos esperan ser 
                descubiertos y donde el destino de civilizaciones enteras pende de un hilo.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                En Terra, un reino olvidado por el tiempo, los medallones mágicos guardan 
                poderes ancestrales y solo aquellos con el corazón puro pueden desbloquear 
                su verdadero potencial. Sigue a nuestros héroes mientras navegan por 
                traiciones, amistades inesperadas y batallas que definirán el futuro.
              </p>
              <div className="flex items-center gap-2 text-primary">
                <Sparkles className="w-5 h-5" />
                <span className="font-medium">Varios libros disponibles - ¡Más historias por venir!</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">
              Mi Misión
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              "Crear historias que trasciendan las páginas, que vivan en la imaginación 
              de los lectores y que demuestren que la magia existe en el acto mismo de 
              leer. Quiero que cada libro sea una puerta a un mundo donde todo es posible 
              y donde el lector pueda encontrar un pedazo de sí mismo."
            </p>
            <p className="text-primary font-display text-xl mt-6 italic">
              — Danihros
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
