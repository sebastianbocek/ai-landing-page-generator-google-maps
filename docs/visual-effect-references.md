# Referencias visuales para efectos de landing pages

El generador usa estas páginas como referencias de tendencias y patrones. Los efectos del proyecto son implementaciones propias hechas para este renderer y su contenido verificado; no son descargas ni redistribuciones de código, imágenes o plantillas de esos autores.

## Pens aportados

- [Futuristic Tech Landing 2025 — Sajid Farid](https://codepen.io/Sajid-Farid/pen/MYKOYdE): capas tipo glass y atmósfera tech. Se usa como referencia para aplicar superficies translúcidas con moderación.
- [Interactive Animated Hero Section with Particle Effects & 3D Elements — Himanshu Santani](https://codepen.io/Himanshu-Santani-the-bold/pen/PwPzPdW): composición hero con formas atmosféricas y elementos orbitales. El generador usa órbitas CSS abstractas, no reutiliza sus assets.
- [CodeChillRepeat — pen OPbzbZo](https://codepen.io/codechillrepeat/pen/OPbzbZo)
- [Karthik Vasudev — pen qEaXMxG](https://codepen.io/karthikvasudev/pen/qEaXMxG)
- [Tommy Ho — pen compartido desde el editor](https://codepen.io/editor/tommyho/pen/01a1c1fb-bc39-759e-afd1-6253944dbe16)
- [Abdughafur Khujzoda — pen compartido desde el editor](https://codepen.io/editor/Abdughafur-Khujzoda/pen/01a195dc-4022-7ff3-b0fd-7d06e555939e)

Algunos enlaces de editor no exponen el contenido públicamente, y por eso se conservan como enlaces de referencia sin atribuirles un efecto específico. Los autores pueden cambiar o retirar sus pens.

## Búsquedas compartidas

- [Landing](https://codepen.io/search/pens?q=landing)
- [Landing page](https://codepen.io/search/pens?q=landing%20page)
- [Landingpage](https://codepen.io/search/pens?q=landingpage)
- [Glass landing page](https://codepen.io/search/pens?q=glass%20landing%20page)

Son búsquedas dinámicas, no colecciones con una lista finita de plantillas para descargar. Sus resultados y licencias varían. Antes de reutilizar un pen o asset concreto hay que revisar la licencia indicada por su autor y las condiciones de CodePen.

## Efectos propios del generador

La especificación JSON asistida por IA elige uno o dos efectos compatibles con la dirección artística, rubro, cantidad de fotos y material disponible. Cada regeneración recibe una clave de variación para que el modelo pueda diferenciar versiones sin perder coherencia:

- `glass_surfaces`: paneles translúcidos de apoyo; se limita a direcciones visuales que lo toleran.
- `ambient_orbits`: detalles orbitales CSS decorativos detrás/alrededor de la imagen, sin simular fotografías del negocio.
- `editorial_reveal`: énfasis tipográfico y revelados dentro del sistema de movimiento existente.
- `kinetic_gallery`: desplazamiento guiado de galería cuando existen al menos cuatro fotos; en pantallas táctiles conserva el scroll nativo.
- `photo_depth`: movimiento 3D del hero según el puntero y transición Flip al ampliar una fotografía.

El JSON estricto impide devolver nombres de efecto arbitrarios. En modo API el modelo elige los efectos y el renderer ejecuta esa lista; en modo local se seleccionan mediante reglas de contenido. `prefers-reduced-motion` desactiva animaciones decorativas; los estilos se integran al HTML de salida y no requieren cargar CodePen ni un CDN.
