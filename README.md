# UncodingFit

PWA gratuita para calcular la proteína diaria recomendada y consultar la proteína de cada alimento. Sin cuentas, sin backend, sin enviar datos a ningún servidor (todo se calcula en el dispositivo).

Parte del ecosistema **Uncoding**.

## Qué hace
- **Calculadora de proteína**: según sexo, edad, altura, peso, nivel de actividad y objetivo (mantener / ganar músculo / perder grasa). Devuelve un **rango** diario en gramos y el reparto por comida.
- **Tabla de alimentos**: ~110 alimentos genéricos con proteína, kcal, hidratos y grasa por 100 g; buscable y ordenable, con filtro por categoría.

## Modelo de cálculo
Proteína diaria = peso (kg) × factor g/kg, donde el factor sale del cruce actividad × objetivo. Ajuste de suelo a 1,0 g/kg en mayores de 65 y aviso cuando el IMC es ≥ 30. Ver `uncodingfit_modelo.json`.

## Datos
Valores de referencia de dominio público (USDA FoodData Central) contrastados con BEDCA para alimentos españoles. Los ítems marcados `verificar` tienen alta variabilidad y conviene confirmarlos antes de publicar. Ver `uncodingfit_alimentos.json`.

## Estructura
```
index.html                    app completa (datos embebidos, funciona offline)
manifest.json                 PWA
sw.js                         service worker (cache offline)
icons/                        iconos PWA
uncodingfit_alimentos.json    tabla de alimentos (fuente canónica)
uncodingfit_modelo.json       modelo de cálculo
```

## Desplegar
Es un sitio estático. Cualquiera de estas vías sirve:
- **Vercel**: importar el repo → deploy (sin configuración, es estático).
- **GitHub Pages**: Settings → Pages → Deploy from branch → `main` / root.

## Aviso
Herramienta orientativa. No sustituye el consejo de un profesional sanitario o dietista.

## Roadmap
- v1.1: recetas altas en proteína (redactadas, no importadas).
- v2: modo calorías / metabolismo basal (por eso ya se recogen sexo y altura).

## Licencia
Código: MIT. Valores nutricionales: datos de dominio público / hechos; no constituyen reproducción de ninguna base de datos.
