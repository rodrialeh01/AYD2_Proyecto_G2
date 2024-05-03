# Practica

# Manual Técnico

# 📱 Proyecto
```json
{
  "Curso": "Analisis y Diseño de Sistemas 2",
  "Sección": "B",
  "Periodo": "Primer Semestre 2024",
  "Actividad": "Proyecto"
}
```

## Grupo 2
| Carnet | Nombre |
| ------ | ------ |
| [`201900042`](https://github.com/rodrialeh01) | Rodrigo Alejandro Hernández De León | 
| [`201901604`](https://github.com/BelenContrerasOrozco) | Ana Belén Contreras Orozco |
| [`201901772`](https://github.com/DanielDubonDR) | Daniel Reginaldo Dubón Rodríguez |
| [`202004745`](https://github.com/Allenrovas) | Allen Giankarlo Román Vásquez |
| [`202010918`](https://github.com/AndreaCabrera01) | Andrea María Cabrera Rosito |
---

# Manual Técnico

## 📚 Contenido

1. [Introducción](#introducción)
2. [Objetivos](#objetivos)
3. [Funcionamiento UiPath](#funcionamiento-uipath)
  1. [Orquestador](#orquestador)
  2. [Página PNC](#página-pnc)
  3. [Página Villa Nueva](#página-villa-nueva)

## Introducción

Este manual técnico tiene como objetivo explicar el funcionamiento de los procesos automatizados realizados en UiPath, los cuales se encargan de extraer información de las páginas web de la PNC y de la Municipalidad de Villa Nueva.

## Objetivos

- Extraer información de las páginas web de la PNC y de la Municipalidad de Villa Nueva desde la busqueda de placas en la lectura de un archivo de excel.
- Almacenar la información extraída en una excel.

## Funcionamiento UiPath

### Orquestador

El orquestador es el encargado de guardar datos sensibles y datos dinámicos como:
- Rutas de archivos.
- Nombres de archivos.
- Usuarios y contraseñas.

### Página PNC

1. Abre google chrome con la [Página SAT de Multas](https://portal.sat.gob.gt/portal/multas/)

![Página SAT de Multas](
  ./img/img1.png)
2. Se un delay de 3 segundos para que cargue la página.
3. Del orquestador se agarra la variable de la carpeta donde se leerá el archivo de entrada y donde se guardará el archivo de salida.
4. Crea el archivo excel de salida.
5. Escribe los encabezados en el archivo de salida.

  | No. Placa | Lugar a Pagar | Valor total | Estado |
  | --------- | ------------- | ----------- | ------ |
6. Obtiene la variable del nombre del archivo de entrada.
7. Lee el archivo de entrada.
8. Lo guarda en una variable de tipo DataTable.
9. Lee cada columna del DataTable.
10. 


