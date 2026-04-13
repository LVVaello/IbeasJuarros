# TODO · Ibeas de Juarros · Agenda Urbana

Tareas pendientes para completar el despliegue y el contenido.

---

## PRIORIDAD ALTA

### 1. Activar pre-relleno del Google Forms por OE

**Estado:** URL del formulario configurada. Falta el ID del campo OE.

**Pasos:**
1. Accede al formulario: https://docs.google.com/forms/d/e/1FAIpQLSfTs-vMGXy-LkDMaf2M2VK6S-Dlpi2nX31qi-op4mheKU9ZZA/viewform
2. Haz click en `⋮` (3 puntos) → **"Obtener enlace rellenado previamente"**
3. En el campo "Objetivo Estratégico" escribe cualquier texto y haz click en **"Obtener enlace"**
4. Copia el enlace y busca la parte `&entry.XXXXXXXXXX=valor`
5. Edita `src/data/config.json` → cambia `"field_oe": "PENDIENTE_ENTRY_ID_OE"` por `"field_oe": "entry.XXXXXXXXXX"`
6. Si hay un campo "Tipo de aportación", repite el proceso y actualiza `"field_tipo"`
7. Hacer commit y push

### 2. Añadir los assets gráficos

**Estado:** Los logos no existen en el repositorio. Se ocultan automáticamente mientras no estén.

**Pasos:**
1. **Escudo del Ayuntamiento de Ibeas de Juarros**
   - Guardar en: `public/assets/escudo-ibeas.png`
   - Tamaño mínimo: 200x200px, PNG con fondo transparente
   - Fuente: Ayuntamiento o extracción del membrete oficial

2. **Logo Agenda Urbana Española**
   - Guardar en: `public/assets/logo-agenda-urbana.png`
   - Tamaño mínimo: 300x300px, PNG con fondo transparente
   - Descarga oficial: https://www.mitma.gob.es/arquitectura-vivienda-y-suelo/urbanismo-y-politica-de-suelo/agenda-urbana-espanola
   - (Es el círculo amarillo con "AGENDA URBANA ESPAÑOLA")

3. Hacer commit y push: `git add public/assets/ && git commit -m "feat: añadir logos institucionales" && git push`

### 3. Configurar GitHub Pages en el repositorio

**Estado:** El workflow de GitHub Actions está listo. Falta activar GitHub Pages en la configuración del repo.

**Pasos:**
1. Ir a: https://github.com/LVVaello/IbeasJuarros/settings/pages
2. En **Source** → seleccionar **"Deploy from a branch"**
3. En **Branch** → seleccionar **`gh-pages`** / `/ (root)`
4. Guardar
5. El próximo push activará el despliegue automático
6. La web estará en: **https://lvvaello.github.io/IbeasJuarros/**

---

## PRIORIDAD MEDIA

### 4. Completar la narrativa de cada OE

**Estado:** La narrativa global está generada. Los OE individuales tienen diagnóstico base pero las conclusiones, retos y propuestas pueden ampliarse.

**Cómo:**
- Editar `src/data/narrativa.json`
- Bajo `"oe": { "1": { ... }, "2": { ... }, ... }`
- Cada OE tiene `diagnostico` (texto), `conclusiones`, `retos`, `propuestas` (listas)
- Para las propuestas: borrar el item con `"titulo": "[Pendiente...]"` y añadir propuestas reales

### 5. Añadir iconos OE oficiales (opcional)

**Estado:** Iconos SVG propios generados por código. Son representativos pero no son los iconos oficiales de la Agenda Urbana.

**Si se desea usar los iconos oficiales:**
- Guardar los 10 iconos en `public/assets/icons/oe1.svg` ... `oe10.svg`
- Editar `src/components/OEIcon.jsx` para cargar los SVG externos en vez de los generados

---

## PRIORIDAD BAJA

### 6. Enriquecer datos de OE 9 (Innovación digital)

**Estado:** La matriz actual no tiene indicadores para OE 9. Total: 0.

**Propuesta:** Recopilar indicadores específicos de:
- Cobertura banda ancha y fibra óptica
- Cobertura 4G/5G
- Sede electrónica y tramitación digital del ayuntamiento
- Equipamientos digitales públicos

Añadir al Excel y regenerar con `python scripts/procesar_excel.py`

### 7. Mejorar la narrativa global con participación

**Estado:** El apartado "Propuestas globales" está marcado como pendiente de elaboración participativa.

**Cuando se disponga de aportaciones del formulario:**
- Editar `src/data/narrativa.json` → sección `global.propuestas`
- Añadir propuestas reales con estructura:
  ```json
  {
    "id": "P-G-01",
    "titulo": "Título de la propuesta",
    "texto": "Descripción detallada...",
    "prioridad": "alta",
    "oe_relacionados": [6, 7]
  }
  ```

### 8. Añadir comparativa con otros municipios

**Estado:** Los datos incluyen `mediana_referencia`, `q1`, `q3`, `z_score` del dataset comparativo multicriterio.

**Mejora futura:** En OEDetail, añadir visualización de posición del municipio respecto a la mediana y cuartiles cuando estos datos estén disponibles.

---

## COMPLETADO ✅

- [x] Estructura del proyecto Vite + React
- [x] Capa de datos generada desde Excel (281 indicadores)
- [x] Narrativa base generada para todos los OE
- [x] Página de inicio con héroe, stats y grid de OE
- [x] Vista global del diagnóstico
- [x] Lista de todos los OE
- [x] Detalle por OE con tabs: Datos, Diagnóstico, Conclusiones, Retos, Propuestas
- [x] Visor de datos completo con filtros, búsqueda, paginación y exportación CSV
- [x] Página de aportaciones con embed de Google Forms
- [x] Pre-relleno del formulario por OE (falta ID del campo)
- [x] GitHub Actions para despliegue automático en GitHub Pages
- [x] Header con logos, navegación responsive y menú móvil
- [x] Footer con navegación y créditos
- [x] Breadcrumbs en todas las páginas interiores
- [x] Diseño institucional responsive
- [x] Iconos SVG para los 10 OE
- [x] README completo con instrucciones de mantenimiento
- [x] TODO.md con tareas pendientes priorizadas
