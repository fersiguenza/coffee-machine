<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Instrucciones para Copilot - Workshop Máquina de Café

Este proyecto es un sistema de cartas interactivo para un workshop de gestión de capacidad y recursos usando la metáfora de una máquina de café.

## Contexto del Proyecto

**Objetivo:** Demostrar conceptos de gestión de capacidad, burn out, priorización y gestión de recursos a través de un juego de cartas imprimibles.

**Componentes principales:**
- Sistema de cartas HTML/CSS para imprimir
- Diferentes tipos de cartas: Pedidos, Limitaciones, Tareas, Recursos, Eventos
- Herramientas para facilitadores del workshop
- Interface responsive y optimizada para impresión

## Pautas de Desarrollo

### Estructura de Cartas
- Cada carta debe tener: título, tipo/prioridad, contenido principal, efectos/beneficios, footer informativo
- Usar clases CSS consistentes para diferentes tipos de cartas
- Mantener el diseño print-friendly con colores y contrastes apropiados

### Estilo y Diseño
- Colores diferenciados por tipo de carta para fácil identificación
- Sistema de grid responsive que se adapta a 3 columnas en impresión
- Iconos y emojis para mejorar la experiencia visual
- Animaciones sutiles para la interfaz web (no para impresión)

### Funcionalidad
- Sistema de navegación por pestañas para diferentes tipos de cartas
- Funciones de impresión optimizadas
- Herramientas para crear sets personalizados de cartas
- Persistencia de configuraciones usando localStorage

### Consideraciones de UX
- Priorizar la claridad y legibilidad en impresión
- Mantener navegación intuitiva para facilitadores
- Proporcionar shortcuts de teclado para funciones comunes
- Feedback visual claro para acciones del usuario

### Extensibilidad
- Estructura modular para agregar nuevos tipos de cartas
- Configuraciones flexibles para diferentes niveles de dificultad
- Capacidad de personalización para diferentes contextos/industrias

Cuando hagas modificaciones, mantén la coherencia con estos principios y asegúrate de que las funciones de impresión permanezcan optimizadas.
