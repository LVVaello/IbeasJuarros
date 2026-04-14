# Diagnóstico Territorial · Ibeas de Juarros · Agenda Urbana Española

Visor interactivo del diagnóstico territorial del municipio de **Ibeas de Juarros** (Burgos, Castilla y León), elaborado en el marco de la **Agenda Urbana Española**.

🌐 **Web publicada:** https://lvvaello.github.io/IbeasJuarros/

---

## Qué es este proyecto

Herramienta web institucional que permite:

- Consultar los **281 indicadores** del diagnóstico territorial organizados por los **10 Objetivos Estratégicos** de la Agenda Urbana Española
- Navegar por la **lectura diagnóstica**, conclusiones y retos para cada OE
- Acceder al **visor completo de datos** con filtros, búsqueda y exportación CSV
- Recoger **aportaciones externas** mediante Google Forms

---

## Estructura del repositorio

```
/
├── public/
│   ├── assets/
│   │   ├── escudo-ibeas.png          ← Añadir (ver placeholder-info.txt)
│   │   ├── logo-agenda-urbana.png    ← Añadir (ver placeholder-info.txt)
│   │   └── placeholder-info.txt     ← Instrucciones de assets
│   └── favicon.svg
│
├── src/
│   ├── components/
│   │   ├── Breadcrumb.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx + Header.css
│   │   ├── Layout.jsx
│   │   ├── OECard.jsx
│   │   └── OEIcon.jsx               ← Iconos SVG de los 10 OE
│   │
│   ├── data/                        ← CAPA DE DATOS (generada del Excel)
│   │   ├── config.json              ← Configuración: Google Form URL, assets
│   │   ├── indicadores.json         ← 281 indicadores completos
│   │   ├── municipio.json           ← Metadatos y resumen estadístico
│   │   ├── narrativa.json           ← Contenido narrativo editable
│   │   ├── oes.json                 ← Definición de los 10 OE
│   │   ├── por_oe.json              ← Indicadores agrupados por OE
│   │   ├── fuentes.json             ← Fuentes de datos
│   │   ├── resumen.json             ← Resumen estadístico
│   │   └── vacios.json              ← Indicadores sin dato disponible
│   │
│   ├── pages/
│   │   ├── Home.jsx                 ← Página de inicio
│   │   ├── DiagnosticoGlobal.jsx    ← Diagnóstico global
│   │   ├── OEList.jsx               ← Lista de 10 OE
│   │   ├── OEDetail.jsx             ← Detalle de cada OE
│   │   ├── Dataset.jsx              ← Visor completo de datos
│   │   └── Aportaciones.jsx         ← Formulario de aportaciones
│   │
│   ├── App.jsx                      ← Router principal
│   ├── main.jsx                     ← Entry point
│   └── index.css                    ← Estilos globales
│
├── scripts/
│   └── procesar_excel.py            ← Script de transformación Excel → JSON
│
├── .github/workflows/deploy.yml     ← CI/CD GitHub Actions
├── vite.config.js
├── package.json
├── TODO.md
└── README.md
```

---

## Lanzar en local

```bash
# 1. Instalar dependencias
npm install

# 2. Servidor de desarrollo
npm run dev
# → http://localhost:5173/IbeasJuarros/

# 3. Build de producción
npm run build

# 4. Previsualizar build
npm run preview
```

---

## Actualizar los datos desde el Excel

Cuando el archivo Excel fuente cambie, regenera la capa de datos con el script:

```bash
# Coloca el Excel en la raíz del proyecto con el nombre:
# matriz_ibeas_datos_exhaustiva_v4_todos_los_datos_OE.xlsx

# Ejecutar el script Python de procesamiento
python scripts/procesar_excel.py

# Los archivos JSON en src/data/ se actualizan automáticamente
# Luego hacer build y push normalmente
npm run build
```

El script genera:
- `src/data/indicadores.json` — todos los registros
- `src/data/por_oe.json` — agrupados por OE
- `src/data/municipio.json` — metadatos y resumen
- `src/data/vacios.json` — indicadores sin dato
- `src/data/fuentes.json` — lista de fuentes
- `src/data/resumen.json` — estadísticas del dataset

---

## Añadir los assets gráficos

Los logos se cargan desde `/public/assets/`. Si no existen, se ocultan automáticamente.

1. **Escudo del Ayuntamiento**: guardar como `public/assets/escudo-ibeas.png`
2. **Logo Agenda Urbana**: guardar como `public/assets/logo-agenda-urbana.png`

Ver instrucciones detalladas en `public/assets/placeholder-info.txt`.

---

## Incorporar la URL del Google Form

El formulario de aportaciones está configurado en `src/data/config.json`:

```json
{
  "google_form": {
    "url": "https://docs.google.com/forms/d/e/FORM_ID/viewform",
    "url_base_prefill": "https://docs.google.com/forms/d/e/FORM_ID/viewform?usp=pp_url",
    "field_oe": "PENDIENTE_ENTRY_ID_OE"
  }
}
```

### Activar el pre-relleno por OE (opcional pero recomendado)

Para que al entrar desde un OE el formulario lo indique automáticamente:

1. Abre el formulario en Google Forms
2. Haz click en el botón de 3 puntos → "Obtener enlace rellenado previamente"
3. Rellena el campo "Objetivo Estratégico" con cualquier valor y haz click en "Obtener enlace"
4. Copia el enlace generado. Tendrá una parte como `&entry.XXXXXXXXX=valor`
5. Extrae el ID: `entry.XXXXXXXXX`
6. Actualiza `config.json`:
   ```json
   "field_oe": "entry.XXXXXXXXX"
   ```

---

## Editar el contenido narrativo

Todo el texto del diagnóstico, conclusiones, retos y propuestas está en `src/data/narrativa.json`.
Es un archivo JSON estructurado que puedes editar directamente:

```json
{
  "global": {
    "presentacion": "Texto de presentación del municipio...",
    "diagnostico": { "titulo": "...", "texto": "...", "bloques": [...] },
    "conclusiones": [{ "id": "C-G-01", "titulo": "...", "texto": "..." }],
    "retos": [...],
    "propuestas": [...]
  },
  "oe": {
    "1": {
      "diagnostico": "Texto del diagnóstico del OE 1...",
      "conclusiones": [...],
      "retos": [...],
      "propuestas": [...]
    }
  }
}
```

Tras editar, hacer `npm run build` y push para publicar.

---

## Despliegue en GitHub Pages

El despliegue es automático mediante GitHub Actions al hacer push a `main` o a la rama de desarrollo.

### Configuración inicial (una sola vez)

1. En GitHub → Settings → Pages:
   - **Source**: Deploy from a branch
   - **Branch**: `gh-pages` / `/ (root)`
2. Hacer push. El workflow crea la rama `gh-pages` automáticamente.
3. La web estará en: `https://lvvaello.github.io/IbeasJuarros/`

### Despliegue manual

```bash
git add .
git commit -m "descripción del cambio"
git push origin claude/ibeas-urban-agenda-viewer-aggPk
# GitHub Actions construye y despliega automáticamente
```

---

## Tecnología

| Componente | Tecnología |
|---|---|
| Framework | Vite + React 18 |
| Routing | React Router DOM v6 (HashRouter) |
| Estilos | CSS puro con variables (sin framework) |
| Datos | JSON estático (generado desde Excel) |
| Despliegue | GitHub Pages via GitHub Actions |
| Fuente de datos | Atlas Digital de las Áreas Urbanas + INE + Catastro |

---

## Decisiones técnicas

- **HashRouter** para compatibilidad total con GitHub Pages sin configuración adicional de servidor
- **JSON estático** para los datos: sin backend, sin base de datos, máxima portabilidad
- **CSS puro** con variables CSS: sin dependencias de UI, fácil de mantener y personalizar
- **Narrativa separada** de los datos en `narrativa.json`: permite editar textos sin tocar el código
- **Exportación CSV** implementada en cliente (sin backend) con soporte de filtros
- **Google Forms embed** + enlace externo como fallback

---

## Mantenimiento

El proyecto está diseñado para crecer:
- Nuevos indicadores: actualizar el Excel y volver a ejecutar `procesar_excel.py`
- Nuevos textos narrativos: editar `narrativa.json`
- Nuevos OE o cambios de definición: editar `oes.json`
- Cambios visuales: editar `src/index.css` (variables CSS en `:root`)
