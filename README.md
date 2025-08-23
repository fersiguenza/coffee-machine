# ☕ Workshop: La Máquina de Café

## Sistema de Gestión de Capacidad y Recursos

Este proyecto proporciona un sistema completo de cartas imprimibles para el workshop "La máquina de café: Capacidad, límites, burn out, demandas no priorizadas y gestión de recursos".

### 🎯 Objetivo del Workshop

Demostrar cómo la capacidad de una máquina (o un equipo) puede ser limitada y cómo el exceso de demanda, el trabajo fuera de hora, las demandas no priorizadas y la gestión de recursos pueden afectar su rendimiento y llevar al burn out.

### 📋 Tipos de Cartas Incluidas

#### 1. **Cartas de Pedidos** 📋
- **Pedidos Simples**: 1-2 cafés (Prioridad baja)
- **Pedidos Medios**: 3-5 cafés (Prioridad media)
- **Pedidos Complejos**: 6-12 cafés (Prioridad alta)
- **Pedidos Urgentes**: Tiempo límite reducido con penalizaciones

#### 2. **Cartas de Limitaciones** ⚠️
- **Averías**: Menor y mayor con diferentes impactos
- **Escasez de Recursos**: Limitaciones en la producción
- **Burn Out**: Efectos del trabajo excesivo
- **Problemas de Calidad**: Riesgo de rechazo de pedidos
- **Eventos Externos**: Cortes de energía, etc.

#### 3. **Cartas de Tareas Menores** 🔧
- **Mantenimiento**: Limpieza, revisión, calibración
- **Administrativas**: Inventario, documentación
- **Capacitación**: Mejoras a largo plazo
- **Comunicación**: Coordinación del equipo

#### 4. **Cartas de Recursos** 📦
- **Reabastecimiento**: Granos de café (normal y express)
- **Soporte Técnico**: Reparación de averías
- **Equipos Adicionales**: Máquinas auxiliares
- **Personal**: Ayuda temporal
- **Descanso**: Recuperación del burn out

#### 5. **Cartas de Eventos** 🎲
- **Eventos Positivos**: Bonificaciones y oportunidades
- **Eventos Negativos**: Desafíos adicionales
- **Eventos Neutros**: Cambios en las condiciones

### 🖥️ Características del Sistema

#### Navegación Intuitiva
- Botones para alternar entre tipos de cartas
- Vista de "Todas las Cartas" para impresión completa
- Interfaz responsive para diferentes dispositivos

#### Funcionalidades de Impresión
- **CSS optimizado para impresión**: Diseño limpio y legible
- **Formato de 3 columnas**: Máximo aprovechamiento del papel
- **Page-break optimization**: Evita cortar cartas entre páginas
- **Contraste alto**: Excelente legibilidad en impresión

#### Herramientas para Facilitadores
- **Sets Personalizados**: Crea combinaciones específicas de cartas
- **Configuración Guardable**: Guarda y carga configuraciones del workshop
- **Atajos de Teclado**:
  - `Ctrl+P` (Cmd+P): Imprimir sección actual
  - `Ctrl+S` (Cmd+S): Guardar configuración
  - `Ctrl+L` (Cmd+L): Cargar configuración

### 📖 Cómo Usar

#### Para Facilitadores:

1. **Preparación**:
   - Abrir `index.html` en cualquier navegador web
   - Seleccionar las cartas necesarias para la sesión
   - Usar "Crear Set Personalizado" para configuraciones específicas

2. **Impresión**:
   - Seleccionar la sección de cartas deseada
   - Hacer clic en "Imprimir Sección Actual" o usar Ctrl+P
   - Configurar impresora para mejor calidad (color recomendado)

3. **Durante el Workshop**:
   - Distribuir cartas según la dinámica planificada
   - Usar las herramientas de utilidad para gestionar el tiempo
   - Aplicar eventos y limitaciones según el progreso

#### Para Equipos:

1. **Recibir cartas** de pedidos y limitaciones
2. **Planificar estrategia** considerando recursos disponibles
3. **Ejecutar pedidos** dentro de los límites de tiempo
4. **Gestionar recursos** proactivamente
5. **Adaptarse** a limitaciones y eventos

### 🎮 Mecánicas del Juego

#### Sistema de Puntos:
- **Pedidos Simples**: +1 punto
- **Pedidos Medios**: +2 puntos
- **Pedidos Complejos**: +3-4 puntos
- **Pedidos Urgentes**: +3-5 puntos (con penalizaciones por retraso)

#### Gestión de Recursos:
- **Granos de café**: Limitados, requieren reabastecimiento
- **Tiempo**: Cada acción consume tiempo
- **Calidad**: Mantenimiento afecta la calidad del producto

#### Condiciones de Burn Out:
- Se activa después de 6 pedidos consecutivos
- Reduce la eficiencia significativamente
- Requiere tiempo de descanso para recuperarse

### 🛠️ Configuración Técnica

#### Estructura de Archivos:
```
coffee-machine/
├── index.html          # Página principal con todas las cartas
├── styles.css          # Estilos CSS (pantalla e impresión)
├── script.js           # Funcionalidad interactiva
└── README.md           # Este archivo
```

#### Compatibilidad:
- **Navegadores**: Chrome, Firefox, Safari, Edge (versiones modernas)
- **Impresión**: Optimizado para papel tamaño carta (8.5" x 11")
- **Dispositivos**: Desktop, tablet, móvil (responsive)

### 📚 Extensiones y Personalizaciones

#### Agregar Nuevas Cartas:
1. Duplicar una carta existente en el HTML
2. Modificar el contenido (título, descripción, efectos)
3. Ajustar clases CSS para el estilo apropiado

#### Modificar Dificultad:
- **Fácil**: Más recursos, menos limitaciones
- **Medio**: Balance estándar
- **Difícil**: Recursos limitados, más eventos negativos

#### Crear Variaciones Temáticas:
- Cambiar de café a otros productos/servicios
- Adaptar terminología a diferentes industrias
- Modificar métricas según el contexto

### 🎯 Objetivos de Aprendizaje

#### Para Participantes:
1. **Gestión de Capacidad**: Entender límites y optimización
2. **Priorización**: Tomar decisiones bajo presión
3. **Planificación de Recursos**: Anticipar necesidades
4. **Trabajo en Equipo**: Coordinación efectiva
5. **Adaptabilidad**: Responder a cambios inesperados

#### Para Facilitadores:
1. **Observar Patrones**: Identificar comportamientos
2. **Generar Discusión**: Facilitar reflexión post-actividad
3. **Conectar con Realidad**: Vincular con situaciones laborales
4. **Evaluar Comprensión**: Medir el aprendizaje

### 📞 Soporte y Contribuciones

Este sistema está diseñado para ser flexible y adaptable. Se pueden realizar modificaciones según las necesidades específicas del workshop o la organización.

Para mejoras o adaptaciones específicas, considere:
- Agregar nuevos tipos de cartas
- Implementar sistemas de scoring más complejos
- Integrar temporizadores automáticos
- Crear variaciones para diferentes industrias

---

**¡Disfruta del workshop y que sea una experiencia de aprendizaje valiosa para todos los participantes!** ☕✨
