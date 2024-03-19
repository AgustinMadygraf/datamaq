
# SYSTEM

## Contexto del Proyecto
Este prompt está diseñado para ser utilizado en conjunto con la estructura de directorios y archivos de un proyecto de software, enfocándose en el desarrollo y diseño UX/UI. Será aplicado por modelos de lenguaje de gran escala como ChatGPT, Google Bard, BlackBox, etc., para proporcionar análisis y recomendaciones de mejora.

## Objetivo
El objetivo es analizar un proyecto de software para identificar áreas específicas donde aplicar mejores prácticas de programación, diseño UX/UI, y técnicas de machine learning para optimización y automatización. Tendrás que prestar atención al archivo REAMDE.md

# USER

### Pasos para la Mejora del Proyecto
1. **Análisis Automatizado del Proyecto:**
   - Realizar una revisión  de la estructura de directorios y archivos, y contenido del proyecto utilizando pruebas automáticas y análisis de rendimiento.

2. **Identificación de Áreas de Mejora con Machine Learning:**
   - Utilizar algoritmos de machine learning para identificar patrones de errores comunes, optimización de rendimiento y áreas clave para mejoras.

3. **Sugerencias Específicas y Refactorización:**
   - Proporcionar recomendaciones detalladas y automatizadas para las mejoras identificadas, incluyendo sugerencias de refactorización y optimización.

4. **Plan de Acción Detallado con Retroalimentación:**
   - Desarrollar un plan de acción con pasos específicos, incluyendo herramientas y prácticas recomendadas.
   - Implementar un sistema de retroalimentación para ajustar continuamente el proceso de mejora basándose en el uso y rendimiento.

5. **Implementación y Evaluación Continua:**
   - Indicar archivos o componentes específicos para mejoras.
   - Evaluar el impacto de las mejoras y realizar ajustes basándose en retroalimentación continua.

### Consideraciones para la Mejora
- **Desarrollo de Software:**
   - Examinar estructura de archivos, logging, código duplicado, ciberseguridad, nomenclatura y prácticas de codificación.
   - Incorporar pruebas automáticas y análisis de rendimiento.

- **Diseño UX/UI:**
   - Enfocarse en accesibilidad, estética, funcionalidad y experiencia del usuario.

- **Tecnologías Utilizadas:**
   - El proyecto utiliza Python, PHP, HTML, MySQL, JavaScript y CSS. Las recomendaciones serán compatibles con estas tecnologías.

- **Automatización y Machine Learning:**
   - Implementar pruebas automáticas y algoritmos de machine learning para detectar y sugerir mejoras.
   - Utilizar retroalimentación para ajustes continuos y aprendizaje colectivo.

- **Documentación y Conocimiento Compartido:**
   - Mantener una documentación detallada de todos los cambios y mejoras para facilitar el aprendizaje y la mejora continua.



## Estructura de Carpetas y Archivos
```bash
DigiRail/
    index.php
    installer.py
    PanelControlModbus.php
    README.md
    requirements.txt
    AMIS/
    css/
        bootstrap.min.css
        estilo.css
        header.css
        index.css
    database/
        novus.sql
        registros_modbus_1.sql
        registros_modbus_2.sql
        registros_modbus_3.sql
        registros_modbus_4.sql
        registros_modbus_5.sql
    DOCS/
        contribution_guide.md
        example.md
        faq.md
        license.md
        quickguide.md
        troubleshooting.md
        manual_digirail_connect_v10x_m_es/
            manual_digirail_connect_v10x_m_es.md
    includes/
        botonera.php
        chart_viewer.php
        conn.php
        dashboard.php
        database_connection.php
        db_functions.php
        fetch_data.php
        header.php
        info_display.php
        receiveAndUpdateDB.php
        SendData.php
        SendData_python.php
    SCR/
        clean_intervalproduction_data.py.py
        config.json
        controller.py
        DataTransfer.py
        db_initializer.py
        db_operations.py
        main.py
        utils.py
        config/
            db_config.py
            __pycache__/
        logs/
            config_logger.py
            __pycache__/
        __pycache__/
    test/
        test_Main.py
```


## Contenido de Archivos Seleccionados

### C:\AppServ\www\DigiRail\index.php
```plaintext
<\!-- index.php -->
<\!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Control y Registro de la Producción</title>
    <link rel="stylesheet" type="text/css" href="CSS/index.css">
    <link rel="stylesheet" type="text/css" href="CSS/header.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
    <link rel="icon" href="/imagenes/favicon.ico" type="image/x-icon">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/series-label.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
    <script src="https://www.gstatic.com/charts/loader.js"></script>
    <style>
        /\* Estilos para la tabla \*/
        table {
        border-collapse: collapse; /\* Combina los bordes de las celdas \*/
        width: 100%;
        }

        /\* Estilo para todas las celdas \*/
        table, th, td {
        border: 2px solid black; /\* Define el grosor y el color del borde \*/
        }

        /\* Estilo para las celdas de encabezado \(th\) \*/
        th {
        background-color: #f2f2f2; /\* Color de fondo para las celdas de encabezado \*/
        }
    </style>
</head>
<body>

    <br>
    <br>
    <?php 
        require "includes/dashboard.php";
        require "includes/header.php";
        require "includes/info\_display.php";
        require "includes/chart\_viewer.php"; 
        ?>     
</body>
</html>

```

### C:\AppServ\www\DigiRail\installer.py
```plaintext
#installer.py
import subprocess
import os
import sys
from SCR.logs.config\_logger import configurar\_logging
import winshell
from win32com.client import Dispatch

# Configuración del logger
logger = configurar\_logging\(\)

def crear\_acceso\_directo\(ruta\_archivo\_bat, directorio\_script\):
    escritorio = winshell.desktop\(\)
    ruta\_acceso\_directo = os.path.join\(escritorio, "DigiRail.lnk"\)
    ruta\_icono = os.path.join\(directorio\_script, "SCR","config", "logo.ico"\)

    if not os.path.isfile\(ruta\_icono\):
        logger.error\(f"El archivo de icono '{ruta\_icono}' no existe."\)
        return False

    try:
        shell = Dispatch\('WScript.Shell'\)
        acceso\_directo = shell.CreateShortCut\(ruta\_acceso\_directo\)
        acceso\_directo.Targetpath = ruta\_archivo\_bat
        acceso\_directo.WorkingDirectory = directorio\_script
        acceso\_directo.IconLocation = ruta\_icono  
        acceso\_directo.save\(\)
        logger.info\(f"Acceso directo {'actualizado' if os.path.isfile\(ruta\_acceso\_directo\) else 'creado'} exitosamente."\)
        return True
    except Exception as e:
        logger.error\(f"Error al crear/actualizar el acceso directo: {e}", exc\_info=True\)
        return False

def main\(\):
    directorio\_script = os.path.dirname\(os.path.abspath\(\_\_file\_\_\)\)
    limpieza\_pantalla\(\)
    print\("directorio\_script: ",directorio\_script,"\n"\)
    logger.info\("Iniciando instalador"\)

    #instalar\_dependencias\(directorio\_script\)
    ruta\_archivo\_bat = os.path.join\(directorio\_script, 'DigiRail.bat'\)
    if not os.path.isfile\(ruta\_archivo\_bat\):
        logger.info\(f"Creando archivo 'DigiRail.bat'"\)
        crear\_archivo\_bat\(directorio\_script, sys.executable\)
    
    crear\_acceso\_directo\(ruta\_archivo\_bat, directorio\_script\)

def instalar\_dependencias\(directorio\_script\):
    ruta\_requirements = os.path.join\(directorio\_script, 'requirements.txt'\)
    if os.path.isfile\(ruta\_requirements\):
        with open\(ruta\_requirements\) as file:
            for package in \[line.strip\(\) for line in file if line.strip\(\) and not line.startswith\('#'\)\]:
                try:
                    subprocess.run\(\[sys.executable, "-m", "pip", "install",

 package\], capture\_output=True, text=True, check=True\)
                    logger.info\(f"Instalado o actualizado: {package}"\)
                except subprocess.CalledProcessError as e:
                    logger.error\(f"Error al instalar la dependencia {package}: {e.output}"\)
        logger.info\("Verificación y actualización de dependencias completada."\)
    else:
        logger.warning\("Archivo 'requirements.txt' no encontrado. No se instalaron dependencias adicionales."\)

def crear\_archivo\_bat\(directorio\_script, python\_executable\):
    ruta\_main\_py = os.path.join\(directorio\_script, 'SCR', 'main.py'\)
    ruta\_archivo\_bat = os.path.join\(directorio\_script, 'DigiRail.bat'\)

    contenido\_bat = \(
        "@echo off\n"
        "setlocal\n"
        "\n"
        "set \"SCRIPT\_DIR=%~dp0\"\n"
        "\n"
        "cd /d \"%SCRIPT\_DIR%\"\n"
        "\"{}\" \"{}\"\n".format\(python\_executable, ruta\_main\_py\) +
        "pause\n"
        "endlocal\n"
    \)

    with open\(ruta\_archivo\_bat, 'w'\) as archivo\_bat:
        archivo\_bat.write\(contenido\_bat\)
    logger.info\("Archivo 'DigiRail.bat' creado exitosamente."\)

def limpieza\_pantalla\(\):
    try:
        os.system\('cls' if os.name == 'nt' else 'clear'\)
        logger.info\("Pantalla limpiada."\)
    except Exception as e:
        logger.error\(f"Error al limpiar la pantalla: {e}"\)

if \_\_name\_\_ == "\_\_main\_\_":
    main\(\)

```

### C:\AppServ\www\DigiRail\PanelControlModbus.php
```plaintext
<\!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Estado del Equipo</title>
    <\!-- Bootstrap CSS -->
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body { padding: 20px; }
        .table { margin-top: 20px; }
    </style>
</head>
<body>
    <?php
        require "includes/header.php";
    ?>
    <div class="container">
        <h1 class="text-center">Estado del Equipo - Registros Modbus</h1>

        <table class="table table-striped">
            <thead class="thead-dark">
                <tr>
                    <th>Direccion Modbus</th>
                    <th>Registro</th>
                    <th>Descripcion</th>
                    <th>Valor</th>                    
                </tr>
            </thead>
            <tbody>
                <\!-- Los datos se cargarán aquí a través de AJAX -->
            </tbody>
        </table>
    </div>

    <\!-- Bootstrap JS y dependencias -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
    
    <script>
        $\(document\).ready\(function\(\){
            function actualizarDatos\(\) {
                $.ajax\({
                    url: 'includes/fetch\_data.php', // Asegúrate de que esta ruta es correcta
                    type: 'GET',
                    dataType: 'json',
                    success: function\(data\) {
                        var filas = '';
                        $.each\(data, function\(key, registro\) {
                            filas += '<tr>' +
                                        '<td>' + registro.direccion\_modbus + '</td>' +
                                        '<td>' + registro.registro + '</td>' +
                                        '<td>' + registro.descripcion + '</td>' +
                                        '<td>' + registro.valor + '</td>' +
                                     '</tr>';
                        }\);
                        $\('tbody'\).html\(filas\);
                    }
                }\);
            }

            // Actualizar los datos cada 0.5 segundos
            setInterval\(actualizarDatos, 500\);
            actualizarDatos\(\); // Cargar inicialmente los datos
        }\);
    </script>
</body>
</html>

```

### C:\AppServ\www\DigiRail\README.md
```plaintext
# DigiRail: Monitoreo y Control de Producción Digitalizado

\_El futuro del monitoreo y control de la producción industrial está aquí. Descubre DigiRail, donde la precisión se encuentra con la innovación.\_

\!\[DigiRail Logo\]\(https://github.com/AgustinMadygraf/DigiRail/blob/main/SCR/config/logo.ico\)

## 🚀 Introducción

Esta guía no oficial de DigiRail te acerca a una solución integral diseñada para transformar cómo las industrias monitorean y controlan sus líneas de producción. A través de la recopilación de datos en tiempo real y una interfaz intuitiva, DigiRail ofrece una visión sin precedentes sobre la eficiencia y la productividad operativa.

### Problema que Soluciona

DigiRail aborda la necesidad crítica de obtener visibilidad en tiempo real y control preciso sobre los procesos de producción, esenciales para la optimización de recursos y la mejora continua.

## 📋 Características Principales

- \*\*Monitoreo en Tiempo Real\*\*: Visualización al segundo de los parámetros críticos de producción.
- \*\*Análisis Avanzado\*\*: Generación de insights profundos a través de análisis y reportes personalizados.
- \*\*Alertas Configurables\*\*: Notificaciones instantáneas ante anomalías para una acción rápida.
- \*\*Integración Fácil\*\*: Compatibilidad con una amplia gama de dispositivos y plataformas Modbus para una integración sin esfuerzos.

## 🛠 Instalación

\`\`\`bash
git clone https://github.com/AgustinMadygraf/DigiRail.git
cd DigiRail
pip install -r requirements.txt
python main.py
\`\`\`

## 📚 Guía de Uso

Explora cómo comenzar con DigiRail y descubre todas sus funcionalidades en nuestra \[Guía de Uso\]\(https://github.com/AgustinMadygraf/DigiRail/blob/main/DOCS/quickguide.md\).

## 💡 Ejemplos de Uso

Descubre cómo DigiRail puede optimizar diferentes procesos industriales a través de nuestros \[Ejemplos de Uso\]\(https://github.com/AgustinMadygraf/DigiRail/blob/main/DOCS/example.md\).

## 🤝 Cómo Contribuir

Si estás interesado en contribuir para hacer de DigiRail una herramienta aún más poderosa, consulta nuestra guía sobre \[Cómo Contribuir\]\(https://github.com/AgustinMadygraf/DigiRail/blob/main/DOCS/contribution\_guide.md\).

## ❓ Preguntas Generales

Para respuestas rápidas a preguntas frecuentes, visita nuestro \[FAQ\]\(https://github.com/AgustinMadygraf/DigiRail/blob/main/DOCS/faq.md\).

## 🛠 Solución de Problemas

Si te encuentras con problemas, consulta nuestro documento de \[Solución de Problemas\]\(https://github.com/AgustinMadygraf/DigiRail/blob/main/DOCS/troubleshooting.md\) para obtener ayuda rápida.

## 📞 Contacto

Si necesitas más información o asistencia:
- \*\*Email\*\*: agustin.mtto.madygraf@gmail.com
- \*\*GitHub\*\*: \[AgustinMadygraf\]\(https://github.com/AgustinMadygraf\)

## 📄 Licencia

Este proyecto se distribuye bajo la Licencia MIT. Consulta el archivo \[\`LICENSE\`\]\(https://github.com/AgustinMadygraf/DigiRail/blob/main/DOCS/license.md\) para más detalles.
```

### C:\AppServ\www\DigiRail\requirements.txt
```plaintext
aiofiles==23.2.1
altgraph==0.17.4
annotated-types==0.6.0
anyio==4.1.0
certifi==2023.11.17
charset-normalizer==3.3.2
chatterbot-corpus==1.2.0
click==7.1.2
click-didyoumean==0.3.0
colorama==0.4.6
DateTime==5.4
distro==1.8.0
e==1.4.5
filelock==3.13.1
fsspec==2023.12.2
gpt4all==2.0.2
h11==0.14.0
httpcore==1.0.2
httpx==0.25.2
huggingface-hub==0.20.2
idna==3.6
importlib==1.0.4
importlib-metadata==7.0.1
openai==1.3.8
p==1.4.0
packaging==23.2
pefile==2023.2.7
pydantic==2.5.2
pydantic\_core==2.14.5
pyinstaller==6.3.0
pyinstaller-hooks-contrib==2023.12
pyperclip==1.8.2
python-dotenv==1.0.0
python-telegram-bot==20.7
pytz==2023.3.post1
pywin32==306
pywin32-ctypes==0.2.2
PyYAML==3.13
requests==2.31.0
setuptools==69.0.2
sniffio==1.3.0
telegram==0.0.1
tqdm==4.66.1
typing\_extensions==4.9.0
urllib3==2.1.0
wheel==0.41.3
winshell==0.6
zipp==3.17.0
zope.interface==6.1

```

### C:\AppServ\www\DigiRail\css\estilo.css
```plaintext
body {
  font-family: verdana;
  resize: none;
}
.hoja{      box-sizing: border-box;
            border-radius: 25px;
            height: 100%;
            z-index: -1;                      }
.info{      z-index: 2;
            position: relative;               }
.dataspace{ margin: 0;
            width: 100%;                      }

.graf{      margin: 0 auto;
            width: 95%;
            height: 95%;                     }
.fire{      height: 50%;
            width: 120%;
            left: -25px;
            background-size: contain;
            background-repeat: repeat-x;
            background-position: bottom;
            position: fixed;
            bottom: 0;
            z-index: 1;                     }
.cabecera { background-color: rgba\(240,240,240,.5\);
            margin-bottom: 0.3em;
            /\* z-index: 2; \*/
            position: relative;             }
.c1 {       text-align: center;
            font-family: verdana;
            padding-top: 5px;               }
p2{         font-size:28pt;
            margin: 0;
            display: block;                 }
p1 {        font-size:34pt;
            padding-bottom: 5px;
            display: block;                 }
.botonera { width: 101%;
            margin: 0;
            background-color: white;
            display:                        }
.periodo, .botonI, .botonD, .spacer, .fin{
            display: inline-block;
            height:55px;
            margin: 0;                      }
.periodo {  width:18%;                      }
.botonI {   width:20%;                      }
.botonD {   width:15%;                      }
.fin {      width:5%;                       }
.spacer{    width:1%;                       }
.presione, .presado{    font-size: 14pt;
                        width: 100%;
                        height: inherit;    }
.presado{   color: #339;                    }
.test{      text-align: center;
            position: fixed;
            right: 17px;
            bottom: 0;
            height: 70px;
            width: 70px;
            z-index: 3;
            background-image: url\('pixil-frame-0.png'\);
            background-size: cover;         }
.test input{
            width: 100%;
            height:100%;
            margin: 0;
            border: 0;
            background-color: #0000;        }



    /\*----------------------------energia----------\*/

    #fondo {
      border-radius: 20px 20px 0 0;
      width: 100%;
      height: 100%;
      background-image:linear-gradient\(90deg, #77B 0%, #AAF 10%, #55A 90%\);
    }
    #cabecera {
      text-align:center;
      color: #EEE;
      width: 100%;
      height: 100px;
      border-radius: 20px 20px 0 0;
      background: #AAA8;
      margin: 0;
      padding: 0;
    }
    #espacio1 {
      height: 20px;
    }
    h1, #cabecera p {
      margin: 0;
      padding: 0;
    }
    #recuadro {
      font-size: 14pt;
      font-weight: bold;
      width: 380px;
      /\* height: 160px; \*/
      margin: 50px auto 0 auto;
      padding: 10px 50px;
      background: #8888;
      background-image:linear-gradient\(90deg, #8888 10%, #AAA8 90%, #5558 100%\);
    }
    #fechas {
      width: 100%;
      margin: 0;
    }
    #boton {
      font-weight: bold;
    }
    #energ, #costoUnitario, #costo, td p {
      font-weight: normal;
      font-size: 18pt;
      margin-right: 10px;
    }
    #costou td p {
      font-size: 0.8em;
      color: #444;
    }
    #inp1, #inp2 {
      text-align: center;
    }
/\*--------------------------------------------------------------------\*/


table               {   width: 100%;
  border-collapse: collapse;  }
table th, table td  {   padding: 10px;
  text-align: left;
  border: 1px solid #ddd;     }
table th            {   background-color: #f5f5f5;  }
/\* Estilos específicos para la tabla \*/
table tr:hover      {   background-color: #f9f9f9;  }
table td a          {   color: #3366cc;
  text-decoration: none;        }
table td a:hover    {   text-decoration: underline;   }



.MyButton {
     background:none\!important;
     color:inherit;
     border:none;
     padding:0\!important;
     font: inherit;
     /\*border is optional\*/
     border-bottom:1px solid #444;
     cursor: pointer;
}



/\*----------------------------------------------\*/
.w3-table,.w3-table-all{

      margin: auto;
  border-collapse:collapse;
  border-spacing:0;
  display:table}



.w3-bordered tr,.w3-table-all tr{border-bottom:1px solid #ddd}

.w3-striped tbody tr:nth-child\(even\){background-color:#f1f1f1}

.w3-table-all tr:nth-child\(odd\){background-color:#fff}

.w3-table-all tr:nth-child\(even\){background-color:#f1f1f1}

.w3-hoverable tbody tr:hover,
.w3-ul.w3-hoverable li:hover{background-color:#ccc}

.w3-centered tr th,
.w3-centered tr td{text-align:center}

.w3-table td,
.w3-table th,
.w3-table-all td,
.w3-table-all th{display:table-cell;text-align:left;vertical-align:top}

\*/

.w3-table-all table {border-spacing: 0;}

.w3-table-all tbody,.w3-table-all  thead tr { display: block; }

.w3-table-all tbody {
  width:75%;
    height: 475px;
    overflow-y: auto;
    overflow-x: hidden;
}

.w3-table-all tbody td,.w3-table-all  thead th {
    width: 140px;
}

.w3-table-all thead th:last-child {
    width: 140px; /\* 140px + 16px scrollbar width \*/
}




/\*----------------------------------------\*/


.image img {

   max-width:75%;
   border: 1px solid #000000;
   display:block;
   margin:auto;

}





/\*---------------------SIDENAV---------------\*/


.sidenav ul{
  list-style-type: none;
  margin: 0px;
  padding: 0;
  width: 250px;
  background-color: #f1f1f1;
  position: fixed;
  height: 100%;
  overflow: auto;
}

.sidenav ul li a {
  display: block;
  color: #000;
  padding: 1px 8px;
  text-decoration: none;
}



.sidenav ul li a.active {
  background-color: #4CAF50;
  color: white;
}

.sidenav ul li a:hover:not\(.active\) {
  background-color: #555;
  color: white;
}




@media screen and \(max-width: 750px\) {


  .sidenav ul {

    width: 95%;
    height: auto;
    position: absolute;

  }
  .sidenav  li a {
    float: none;
    padding: 15px;
    text-align: center;  }
  }

```

### C:\AppServ\www\DigiRail\css\header.css
```plaintext
/\*-----------------------CONTENT--------------\*/

div.content {
  margin-left: 250px;
  padding: 1px 16px;

}

@media screen and \(max-width: 750px\) {

  div.content {margin-left: 0;
              padding: 220px 16px;}
            }


@media screen and \(max-width: 690px\) { div.content {padding: 1px 8px;}        }
@media screen and \(max-width: 680px\) { div.content {padding: 1px 6px;}        }
@media screen and \(max-width: 670px\) { div.content {padding: 1px 4px;}        }
@media screen and \(max-width: 660px\) { div.content {padding: 1px 2px;}        }
@media screen and \(max-width: 650px\) {div.content {padding: 1px 1px;}        }


/\*---------------------------TOPNAV--------------------------\*/

 .topnav ul {
           list-style-type: none;
           margin: 0;
           padding: 0;
           overflow: hidden;
           background-color: #333;
           position: fixed;
           top: 0;
           width: 100%;                     }

.topnav li {  float: left;
              font-size: 16px;
                   }

.topnav li a {
  display: block;
  color: white;
  text-align: center;
  padding: 12px 8px;
  text-decoration: none;
}

.topnav li a:hover:not\(.active\) {
  background-color: #111;
}

.topnav .active {
  background-color: #4CAF50;
}


@media screen and \(max-width: 1275px\) { .topnav li {font-size: 15px;         }
@media screen and \(max-width: 1200px\) { .topnav li {font-size: 14px;         }
@media screen and \(max-width: 1150px\) { .topnav li {font-size: 13px;         }
@media screen and \(max-width: 1100px\) { .topnav li {font-size: 12px;         }
@media screen and \(max-width: 1075px\) { .topnav li {font-size: 11px;         }
@media screen and \(max-width: 1010px\) { .topnav li {font-size: 10px;         }
@media screen and \(max-width: 995px\) { .topnav li {font-size: 9px;         }




.alert-danger{color:#721c24;background-color:#f8d7da;border-color:#f5c6cb}
.alert-danger hr{border-top-color:#f1b0b7}
.alert-danger .alert-link{color:#491217}

```

### C:\AppServ\www\DigiRail\css\index.css
```plaintext
body {
  font-family: verdana;
  resize: none;
}
.hoja{      box-sizing: border-box;
            border-radius: 25px;
            height: 100%;
            z-index: -1;                      }
.info{      z-index: 2;
            position: relative;               }
.dataspace{ margin: 0;
            width: 100%;                      }

.graf{      margin: 0 auto;
            width: 95%;                       }
.fire{      height: 50%;
            width: 120%;
            left: -25px;
            background-size: contain;
            background-repeat: repeat-x;
            background-position: bottom;
            position: fixed;
            bottom: 0;
            z-index: 1;                     }
.cabecera { background-color: rgba\(240,240,240,.5\);
            margin-bottom: 0.3em;
            /\* z-index: 2; \*/
            position: relative;             }
.c1 {       text-align: center;
            font-family: verdana;
            padding-top: 5px;               }
p2{         font-size:28pt;
            margin: 0;
            display: block;                 }
p1 {        font-size:34pt;
            padding-bottom: 5px;
            display: block;                 }
.botonera { width: 100%;
            margin: 0;
            background-color: white;
                    }
.periodo, .botonI, .botonD, .spacer, .fin{
            display: inline-block;
            height:55px;
            margin: 0;                      }
.periodo {  width:18%;                      }
.botonI {   width:20%;                      }
.botonD {   width:15%;                      }
.fin {      width:5%;                       }
.spacer{    width:1%;                       }
.presione, .presado{    font-size: 14pt;
                        width: 100%;
                        height: inherit;    }
.presado{   color: #339;                    }
.test{      text-align: center;
            position: fixed;
            right: 17px;
            bottom: 0;
            height: 70px;
            width: 70px;
            z-index: 3;
            background-image: url\('pixil-frame-0.png'\);
            background-size: cover;         }
.test input{
            width: 100%;
            height:100%;
            margin: 0;
            border: 0;
            background-color: #0000;        }
/\*---------------------------TOPNAV--------------------------\*/

 .topnav ul {
           list-style-type: none;
           margin: 0;
           padding: 0;
           overflow: hidden;
           background-color: #333;
           position: fixed;
           top: 0;
           width: 100%;                     }

.topnav li { float: left;                    }

.topnav li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

.topnav li a:hover:not\(.active\) {
  background-color: #111;
}

.topnav .active {
  background-color: #4CAF50;
}

/\*-----------------------CONTENT--------------\*/

div.content {
  margin-left: 250px;
  padding: 1px 32px;

}

    /\*----------------------------energia----------\*/

    #fondo {
      border-radius: 20px 20px 0 0;
      width: 100%;
      height: 100%;
      background-image:linear-gradient\(90deg, #77B 0%, #AAF 10%, #55A 90%\);
    }
    #cabecera {
      text-align:center;
      color: #EEE;
      width: 100%;
      height: 100px;
      border-radius: 20px 20px 0 0;
      background: #AAA8;
      margin: 0;
      padding: 0;
    }
    #espacio1 {
      height: 20px;
    }
    h1, #cabecera p {
      margin: 0;
      padding: 0;
    }
    #recuadro {
      font-size: 14pt;
      font-weight: bold;
      width: 380px;
      /\* height: 160px; \*/
      margin: 50px auto 0 auto;
      padding: 10px 50px;
      background: #8888;
      background-image:linear-gradient\(90deg, #8888 10%, #AAA8 90%, #5558 100%\);
    }
    #fechas {
      width: 100%;
      margin: 0;
    }
    #boton {
      font-weight: bold;
    }
    #energ, #costoUnitario, #costo, td p {
      font-weight: normal;
      font-size: 18pt;
      margin-right: 10px;
    }
    #costou td p {
      font-size: 0.8em;
      color: #444;
    }
    #inp1, #inp2 {
      text-align: center;
    }
/\*--------------------------------------------------------------------\*/




.MyButton {
     background:none\!important;
     color:inherit;
     border:none;
     padding:0\!important;
     font: inherit;
     /\*border is optional\*/
     border-bottom:1px solid #444;
     cursor: pointer;
}



/\*----------------------------------------------\*/
.w3-table,.w3-table-all{

      margin: auto;
  border-collapse:collapse;
  border-spacing:0;
  display:table}



.w3-bordered tr,.w3-table-all tr{border-bottom:1px solid #ddd}

.w3-striped tbody tr:nth-child\(even\){background-color:#f1f1f1}

.w3-table-all tr:nth-child\(odd\){background-color:#fff}

.w3-table-all tr:nth-child\(even\){background-color:#f1f1f1}

.w3-hoverable tbody tr:hover,
.w3-ul.w3-hoverable li:hover{background-color:#ccc}

.w3-centered tr th,
.w3-centered tr td{text-align:center}

.w3-table td,
.w3-table th,
.w3-table-all td,
.w3-table-all th{display:table-cell;text-align:left;vertical-align:top}

\*/

.w3-table-all table {border-spacing: 0;}

.w3-table-all tbody,.w3-table-all  thead tr { display: block; }

.w3-table-all tbody {
  width:75%;
    
    overflow-y: auto;
    overflow-x: hidden;
}

.w3-table-all tbody td,.w3-table-all  thead th {
    width: 140px;
}

.w3-table-all thead th:last-child {
    width: 140px; /\* 140px + 16px scrollbar width \*/
}




/\*----------------------------------------\*/


.image img {

   max-width:75%;
   border: 1px solid #000000;
   display:block;
   margin:auto;

}





/\*---------------------SIDENAV---------------\*/


.sidenav ul{
  list-style-type: none;
  margin: 0px;
  padding: 0;
  width: 250px;
  background-color: #f1f1f1;
  position: fixed;
  height: 100%;
  overflow: auto;
}

.sidenav ul li a {
  display: block;
  color: #000;
  padding: 1px 8px;
  text-decoration: none;
}



.sidenav ul li a.active {
  background-color: #4CAF50;
  color: white;
}

.sidenav ul li a:hover:not\(.active\) {
  background-color: #555;
  color: white;
}
@media screen and \(max-width: 875px\) { .topnav li {font-size: 15px; } }
@media screen and \(max-width: 825px\) { .topnav li {font-size: 14px; } }
@media screen and \(max-width: 805px\) { .topnav li {font-size: 13px; } }
@media screen and \(max-width: 775px\) { .topnav li {font-size: 12px; } }
@media screen and \(max-width: 750px\) {
  div.content {margin-left: 0;}
  .topnav li {font-size: 16px;}
  .topnav li a {padding: 14px 16px; }
}
@media screen and \(max-width: 600px\) { 
  .topnav li {font-size: 14px;}
  .topnav li a {padding: 12px 14px;}
  div.content {padding: 1px 8px;}
}
@media screen and \(max-width: 510px\) { 
  .topnav li {font-size: 12px;}
  div.content {padding: 1px 6px;}
}
@media screen and \(max-width: 480px\) { 
  .topnav li {font-size: 11px;}
  .topnav li a {padding: 10px 12px;}
  div.content {padding: 1px 4px;}
}
@media screen and \(max-width: 435px\) { 
  /\*.topnav li {font-size: 10px;}\*/
  .topnav li a {padding: 8px 10px;}
  div.content {padding: 1px 2px;}
}
@media screen and \(max-width: 410px\) { 
  /\*.topnav li {font-size: 9px;}\*/
  .topnav li a {padding: 6px 8px;}
  div.content {padding: 1px 1px;}
}

```

### C:\AppServ\www\DigiRail\database\registros_modbus_2.sql
```plaintext
INSERT INTO \`registros\_modbus\` \(\`ID\`, \`direccion\_modbus\`, \`registro\`, \`descripcion\`, \`rw\`, \`acceso\`, \`valor\`\) VALUES
\(77, 77, 'HR\_INPUT8\_STATE', 'Estado de la entrada D8.', 'R', 'bit / 16 bits', NULL\);
```

### C:\AppServ\www\DigiRail\database\registros_modbus_3.sql
```plaintext
INSERT INTO \`registros\_modbus\` \(\`ID\`, \`direccion\_modbus\`, \`registro\`, \`descripcion\`, \`rw\`, \`acceso\`, \`valor\`\) VALUES
\(124, 507, 'HR\_DO8\_VALUE', 'Registro de manipulación del estado de la salida K8.', 'R/W', '16 bits', NULL\);
```

### C:\AppServ\www\DigiRail\database\registros_modbus_4.sql
```plaintext
INSERT INTO \`registros\_modbus\` \(\`ID\`, \`direccion\_modbus\`, \`registro\`, \`descripcion\`, \`rw\`, \`acceso\`, \`valor\`\) VALUES
\(177, 2385, 'HR\_AI2\_FORCED\_HI', 'Valor al forzar la entrada A2 \(32 bits\).', 'R/W', '16 bits', NULL\);
```

### C:\AppServ\www\DigiRail\DOCS\contribution_guide.md
```plaintext
# Guía de Contribución para DigiRail

¡Gracias por tu interés en contribuir a la comunidad DigiRail\! Este proyecto es el resultado de colaboraciones de personas como tú, que comparten un interés en mejorar y expandir las capacidades de DigiRail para diversos entornos industriales. Aquí encontrarás cómo puedes contribuir.

## ¿Cómo Puedes Contribuir?

### Reportando Errores

Si encuentras errores o problemas mientras utilizas DigiRail, puedes ayudar reportándolos. Proporciona una descripción detallada del problema, incluyendo los pasos para reproducirlo y cualquier detalle que consideres relevante.

### Sugerencias de Mejoras

¿Tienes ideas sobre cómo mejorar DigiRail? Nos encantaría escuchar tus sugerencias. Ya sea una nueva característica, mejoras en la documentación o en la usabilidad, tu feedback es valioso.

### Documentación

La documentación es clave para entender y aprovechar al máximo DigiRail. Si puedes clarificar, expandir o traducir nuestra documentación, tu contribución será muy apreciada.

### Compartiendo Casos de Uso

Compartir cómo utilizas DigiRail en tus proyectos puede inspirar y ayudar a otros. Nos gustaría incluir ejemplos variados y detallados de uso en nuestra documentación.

## Proceso de Contribución

1. \*\*Fork y Clona\*\*: Realiza un fork del repositorio y clona tu fork a tu máquina local.
2. \*\*Crea una Rama\*\*: Para nuevas contribuciones, es recomendable crear una rama.
3. \*\*Realiza tus Cambios\*\*: Añade, edita o elimina archivos según sea necesario.
4. \*\*Commit tus Cambios\*\*: Usa mensajes de commit claros y descriptivos.
5. \*\*Push a tu Fork\*\*: Sube tus cambios a tu fork en GitHub.
6. \*\*Abre un Pull Request\*\*: Dirige tu pull request al repositorio original. Proporciona una descripción clara de tus cambios y el motivo detrás de ellos.

## Código de Conducta

Valoramos la participación de cada miembro de la comunidad y queremos asegurar una experiencia positiva para todos. Esperamos que todos los contribuyentes:

- Muestren empatía y respeto hacia los demás.
- Eviten comentarios despectivos, discriminatorios o dañinos.
- Colaboren de manera constructiva.
- Sean abiertos y acogedores con las contribuciones de los demás.

## Preguntas o Necesitas Ayuda?

Si tienes preguntas o necesitas ayuda con el proceso de contribución, no dudes en contactarnos. Aunque no somos representantes oficiales de DigiRail, haremos lo posible por asistirte.

Tu participación enriquece la comunidad DigiRail y ayuda a impulsar el proyecto hacia adelante. ¡Esperamos tus contribuciones\!
```

### C:\AppServ\www\DigiRail\DOCS\example.md
```plaintext
# Ejemplos de Uso de DigiRail para Monitoreo y Mejora de OEE

Exploramos cómo utilizar DigiRail, una herramienta poderosa para la adquisición automática de datos relevantes en entornos industriales. Este documento no oficial muestra el potencial de DigiRail para monitorear vueltas de revolución, así como parámetros críticos como presión y temperatura, contribuyendo así a mejorar las métricas de OEE en tus operaciones.

## Monitoreo de Vueltas de Revolución \(Modo Contador\)

DigiRail se puede configurar para capturar datos de vueltas de revolución a través de sus entradas digitales en modo contador, ofreciendo un seguimiento preciso de la actividad de la maquinaria.

### Configuración

1. Conecta tu sensor de revoluciones a la entrada digital en DigiRail destinada para el modo contador.
2. Utiliza el software de configuración para ajustar la entrada digital al modo "Contador".
3. Define los parámetros de acuerdo a las especificaciones de tu sensor y las necesidades específicas de tu proceso.

### Ejemplo de Aplicación

Considera el monitoreo de un motor esencial en tu línea de producción. Al emplear DigiRail para contar las vueltas, podrás:

- Identificar variaciones en la velocidad que señalen necesidad de mantenimiento preventivo.
- Estimar el tiempo total de operación al comparar los datos de revolución a lo largo del tiempo.

\!\[Ejemplo de Monitoreo\]\(https://github.com/AgustinMadygraf/DigiRail/blob/main/SCR/config/img1.jpg\)

## Medición de Presión y Temperatura

DigiRail también permite el monitoreo de parámetros ambientales como la presión y temperatura, esenciales para el mantenimiento preventivo y la eficiencia operativa.

### Configuración

1. Enlaza los sensores de presión y temperatura a las entradas analógicas adecuadas en DigiRail.
2. En el software de configuración, asigna cada canal al tipo de señal correspondiente \(ej., 4-20 mA para presión, PT100 para temperatura\).

### Ejemplo de Aplicación

El seguimiento de la presión y temperatura en un sistema hidráulico te permite:

- Evitar fallas por sobrecalentamiento o presión de operación inadecuada.
- Ajustar las operaciones en tiempo real para optimizar la eficiencia energética.

## Cálculo de OEE

El OEE, o Eficiencia Global del Equipo, es un indicador compuesto por la disponibilidad, rendimiento y calidad. Con DigiRail, es posible:

- \*\*Calcular la Disponibilidad\*\*: Comparando el tiempo de operación \(obtenido de las vueltas de revolución\) con el tiempo planificado de producción.
- \*\*Evaluar el Rendimiento\*\*: Midiendo la cantidad real de producción frente a la cantidad teórica, considerando las paradas y ralentizaciones.
- \*\*Medir la Calidad\*\*: Comparando la producción sin defectos con la producción total.

DigiRail simplifica la recopilación de los datos necesarios para estas métricas, permitiendo tomar decisiones informadas para la mejora continua de la producción.

Para más información sobre configuraciones específicas y ejemplos avanzados, te animamos a revisar el \[manual completo de DigiRail\]\(https://cdn.novusautomation.com/downloads/manual\_digirail\_connect\_v10x\_m\_es.pdf\).
```

### C:\AppServ\www\DigiRail\DOCS\faq.md
```plaintext
# Preguntas Frecuentes \(FAQ\) sobre DigiRail

Este compendio de Preguntas Frecuentes \(FAQ\) busca proporcionar claridad y asistencia a aquellos que, como yo, están explorando las capacidades de DigiRail para sus aplicaciones industriales. Aquí encontrarás respuestas basadas en mi experiencia y la información disponible públicamente sobre la instalación, configuración y uso de DigiRail.

## Instalación y Configuración

### ¿Cómo instalo DigiRail?

La instalación de DigiRail comienza con la preparación de tu entorno y el dispositivo. Te sugiero seguir los pasos que he detallado en la \[Guía Rápida de Inicio\]\(https://github.com/AgustinMadygraf/DigiRail/blob/main/DOCS/quickguide.md\), diseñada para guiarte a través de este proceso desde una perspectiva no oficial.

### ¿Necesito software especial para configurar DigiRail?

Efectivamente, se requiere un software específico para la configuración de DigiRail. Este software se puede obtener directamente desde el sitio web de Novus, y he proporcionado instrucciones básicas y consejos en base a mi experiencia con el dispositivo en nuestra guía y documentos.

## Uso

### ¿Cómo accedo a los datos recopilados por DigiRail?

Los datos que DigiRail recopila son accesibles mediante el software proporcionado por Novus o a través de cualquier sistema compatible con Modbus RTU. En mis documentos comparto algunas formas en las que he logrado integrar y aprovechar estos datos en diferentes sistemas.

### ¿Puedo utilizar DigiRail con cualquier sistema de control?

DigiRail es notablemente flexible gracias a su compatibilidad con Modbus RTU. En mi experiencia, se integra bien con varios sistemas de control que admiten este protocolo, aunque siempre recomiendo revisar la documentación técnica específica para asegurar la compatibilidad.

## Solución de Problemas

### Mi DigiRail no se conecta, ¿qué puedo hacer?

Enfrentar problemas de conexión puede ser frustrante. He compilado una lista de verificaciones y pasos en nuestra \[sección de Solución de Problemas\]\(https://github.com/AgustinMadygraf/DigiRail/blob/main/DOCS/troubleshooting.md\) basada en problemas comunes que he encontrado y cómo los he resuelto.

### ¿Dónde puedo encontrar actualizaciones de firmware para DigiRail?

Novus regularmente publica actualizaciones de firmware en su sitio web. Aunque no estoy afiliado directamente con ellos, recomiendo mantener tu dispositivo actualizado siguiendo las instrucciones disponibles públicamente para aprovechar mejoras y correcciones.

## Soporte

### ¿Qué hago si necesito soporte adicional?

Mi compilación de recursos y guías busca ser lo más completa posible, pero si necesitas ayuda más allá de lo que puedo ofrecer, el equipo de soporte de Novus es tu mejor recurso. Proporciono enlaces directos a su formulario de contacto para que puedas obtener asistencia especializada.

Espero que este documento te ayude a resolver algunas de tus dudas sobre DigiRail. Recuerda, la exploración y el aprendizaje continuo son clave para aprovechar al máximo las capacidades de estas herramientas en tus proyectos.
```

### C:\AppServ\www\DigiRail\DOCS\license.md
```plaintext
# Licencia MIT

Derechos de autor \(c\) \[2024\] \[Agustin\]

Se concede permiso, de forma gratuita, a cualquier persona que obtenga una copia de este software y de los archivos de documentación asociados \(denominados como el "Software"\), a tratar el Software sin restricción, incluyendo sin limitación los derechos a usar, copiar, modificar, fusionar, publicar, distribuir, sublicenciar y/o vender copias del Software, y a permitir a las personas a las cuales se les proporcione el Software hacer lo mismo, sujeto a las siguientes condiciones:

La notificación de derechos de autor anterior y este aviso de permiso deberán ser incluidos en todas las copias o porciones sustanciales del Software.

EL SOFTWARE SE ENTREGA "COMO ESTÁ", SIN GARANTÍA DE NINGÚN TIPO, EXPRESA O IMPLÍCITA, INCLUYENDO PERO NO LIMITÁNDOSE A LAS GARANTÍAS DE COMERCIALIZACIÓN, APTITUD PARA UN PROPÓSITO PARTICULAR Y NO INFRACCIÓN. EN NINGÚN CASO LOS AUTORES O LOS TITULARES DE LOS DERECHOS DE AUTOR SERÁN RESPONSABLES POR CUALQUIER RECLAMO, DAÑO U OTRA RESPONSABILIDAD, YA SEA EN UNA ACCIÓN DE CONTRATO, TORTURA O CUALQUIER OTRO MOTIVO, DERIVADO DE, FUERA DE O EN CONEXIÓN CON EL SOFTWARE O EL USO U OTROS TRATOS EN EL SOFTWARE.

```

### C:\AppServ\www\DigiRail\DOCS\quickguide.md
```plaintext
# Guía Rápida de Inicio para DigiRail

Bienvenido a esta guía no oficial para comenzar con DigiRail, una solución avanzada para el monitoreo y control de procesos industriales. Este documento te guiará a través de los pasos básicos para configurar y comenzar a usar DigiRail de manera efectiva.

## Paso 1: Preparativos

Antes de sumergirte en el mundo de DigiRail, asegúrate de contar con:

- Un dispositivo DigiRail.
- Acceso a internet para descargar software y acceder a documentación adicional.
- Los cables necesarios para tu conexión, ya sea USB o RS485, dependiendo del modelo de tu DigiRail.

## Paso 2: Instalación de Software

1. Visita el sitio web oficial de Novus \(o la página de donde adquiriste tu DigiRail\) para descargar el software de configuración más reciente.
2. Instala el software en tu computadora, siguiendo las instrucciones provistas durante el proceso de instalación.

## Paso 3: Conexión del Dispositivo

- \*\*Conexión USB:\*\* Conecta el DigiRail a tu PC utilizando el cable USB provisto.
- \*\*Conexión RS485:\*\* Si prefieres una conexión RS485, asegúrate de seguir el diagrama de cableado recomendado para tu configuración específica.

## Paso 4: Configuración Inicial

1. Inicia el software de configuración de DigiRail.
2. Elige el puerto correspondiente a tu DigiRail \(USB o el número de COM para conexiones RS485\).
3. Ajusta los parámetros básicos como la dirección Modbus y la tasa de baudios.
4. Aplica y guarda tu configuración en el dispositivo.

## Paso 5: Verificación y Pruebas

1. A través del software, realiza una lectura de prueba para confirmar que las señales de entrada y salida funcionan como se espera.
2. Comprueba que los valores recibidos sean consistentes con tu configuración y las condiciones de operación.

## Solución de Problemas

Para cualquier inconveniente durante la instalación o configuración, te recomendamos visitar la \[sección de solución de problemas\]\(https://github.com/AgustinMadygraf/DigiRail/blob/main/DOCS/troubleshooting.md\) donde encontrarás consejos útiles y soluciones.

## Información Adicional

Consulta el \[manual del usuario\]\(https://cdn.novusautomation.com/downloads/manual\_digirail\_connect\_v10x\_m\_es.pdf\) para una guía más detallada sobre las funcionalidades avanzadas y configuraciones de DigiRail.

## Soporte

Si requieres asistencia más allá de esta guía, te animamos a contactar al soporte técnico oficial de Novus o a través del \[formulario de contacto\]\(https://www.novusautomation.com/es/soporte\) disponible en su sitio web.

Esta guía ha sido creada por un usuario entusiasta de DigiRail con el propósito de facilitar la puesta en marcha de tu dispositivo. ¡Esperamos que te sea de gran ayuda\!

```

### C:\AppServ\www\DigiRail\DOCS\troubleshooting.md
```plaintext
# Solución de Problemas para DigiRail

Este documento proporciona soluciones a los problemas comunes que podrías enfrentar al utilizar DigiRail. Está diseñado para ayudarte a resolver rápidamente cualquier inconveniente y optimizar tu experiencia con el sistema.

## Problemas Comunes

### El Dispositivo No Se Conecta

- \*\*Verifica la Conexión\*\*: Asegúrate de que el cable USB o RS485 esté correctamente conectado tanto al DigiRail como a tu computadora o red.
- \*\*Revisa la Alimentación\*\*: Confirma que el DigiRail esté recibiendo la alimentación adecuada.

### Error en la Lectura de Datos

- \*\*Configuración del Software\*\*: Comprueba que el software de configuración esté correctamente ajustado al puerto COM adecuado y con los parámetros de configuración correctos.
- \*\*Reinicio del Dispositivo\*\*: Intenta reiniciar el DigiRail desconectando y reconectando la alimentación.

### Problemas de Comunicación Modbus

- \*\*Dirección Modbus\*\*: Verifica que la dirección Modbus configurada en el dispositivo sea la esperada por el software o el sistema de control.
- \*\*Parámetros de Comunicación\*\*: Asegúrate de que los parámetros de comunicación Modbus \(como la velocidad en baudios, paridad y bits de parada\) sean coherentes entre el DigiRail y el sistema maestro.

## Actualización del Firmware

Si experimentas problemas que crees que podrían solucionarse con una actualización del firmware:

1. Visita el sitio web de Novus para descargar la última versión del firmware.
2. Utiliza el software de configuración para cargar el nuevo firmware al dispositivo.

## Mejora del Rendimiento y la Estabilidad

- \*\*Cables de Calidad\*\*: Utiliza cables de alta calidad para conexiones USB o RS485, para reducir la posibilidad de interferencias.
- \*\*Distancia de Conexión\*\*: Recuerda que la distancia máxima recomendada para conexiones RS485 no debe superar los 1200 metros para mantener una comunicación estable.

## Preguntas Frecuentes \(FAQ\)

Para preguntas adicionales que no se abordan aquí, consulta nuestro documento de \[Preguntas Frecuentes \(FAQ\)\]\(https://github.com/AgustinMadygraf/DigiRail/blob/main/DOCS/faq.md\) donde proporcionamos respuestas a una amplia gama de consultas sobre el uso de DigiRail.

Si después de seguir estos pasos aún encuentras problemas, no dudes en contactarnos para obtener soporte adicional.
```

### C:\AppServ\www\DigiRail\includes\botonera.php
```plaintext
<\!-- botonera.php -->
<div class="botonera">
    
    <form action="<?= $\_SERVER\["PHP\_SELF"\] . '?periodo=' . $periodo . '&conta=' . \($conta - 1000\*$ls\_periodos\[$periodo\]\) ?>" method="post" class="botonI">
        <input type="submit" value="<?= $periodo . '\_anterior' ?>" class="presione">
    </form>

    <div class='spacer'></div>

    <form action="<?= $\_SERVER\["PHP\_SELF"\] . '?periodo=mes&conta=' . $conta ?>" method="post" class="periodo">
        <input type="submit" value="mes" class="<?= $ref\_class\[$class\[0\]\] ?>">
    </form>

    

    <form action="<?= $\_SERVER\["PHP\_SELF"\] . '?periodo=semana&conta=' . $conta ?>" method="post" class="periodo">
        <input type="submit" value="semana" class="<?= $ref\_class\[$class\[1\]\] ?>">
    </form>

    <form action="<?= $\_SERVER\["PHP\_SELF"\] . '?periodo=turno&conta=' . $conta ?>" method="post" class="periodo">
        <input type="submit" value="turno" class="<?= $ref\_class\[$class\[2\]\] ?>">
    </form>

    <div class='spacer'></div>

    <form action="<?= $\_SERVER\["PHP\_SELF"\] . '?periodo=' . $periodo . '&conta=' . \($conta + 1000\*$ls\_periodos\[$periodo\]\) ?>" method="post" class="botonD">
        <input type="submit" value="<?= $periodo . '\_siguiente' ?>" class="presione">
    </form>

    <form action="<?= $\_SERVER\["PHP\_SELF"\] . '?periodo=' . $periodo ?>" method="post" class="fin">
        <input type="submit" value='>|' class="presione">
    </form>
</div>

```

### C:\AppServ\www\DigiRail\includes\chart_viewer.php
```plaintext
<\!-- chart\_viewer.php -->
<script type='text/javascript'>
    var doubleClicker = {
        clickedOnce: false,
        timer: null,
        timeBetweenClicks: 400
    };

    var resetDoubleClick = function \(\) {
        clearTimeout\(doubleClicker.timer\);
        doubleClicker.timer = null;
        doubleClicker.clickedOnce = false;
    };

    var zoomIn = function \(event\) {
        var tiempo = Highcharts.numberFormat\(event.xAxis\[0\].value + <?= $ls\_periodos\[$menos\_periodo\[$periodo\]\] / 2 ?>\);
        window.open\("<?=$\_SERVER\["PHP\_SELF"\].'?medidor='.$medidor.'&periodo='.$menos\_periodo\[$periodo\].'&conta='?>" + tiempo, "\_self"\);
    };

    var ondbclick = function \(event\) {
        if \(doubleClicker.clickedOnce === true && doubleClicker.timer\) {
            resetDoubleClick\(\);
            zoomIn\(event\);
        } else {
            doubleClicker.clickedOnce = true;
            doubleClicker.timer = setTimeout\(function \(\) {
                resetDoubleClick\(\);
            }, doubleClicker.timeBetweenClicks\);
        }
    };

    $\(function \(\) {
        Highcharts.setOptions\({
            global: {
                useUTC: false
            },
            lang: {
                thousandsSep: "",
                months: \[
                    'Enero', 'Febrero', 'Marzo', 'Abril',
                    'Mayo', 'Junio', 'Julio', 'Agosto',
                    'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
                \],
                weekdays: \[
                    'Domingo', 'Lunes', 'Martes', 'Miércoles',
                    'Jueves', 'Viernes', 'Sábado'
                \]
            }
        }\);

        var chart;
        $\('#container'\).highcharts\({
            chart: {
                type: 'spline',
                animation: false,
                marginRight: 10,
                events: {
                    load: function \(\) {

                    },
                    click: function \(event\) {
                        ondbclick\(event\);
                    }
                }
            },
            title: {
                text: \(function \(\) {
                    return Highcharts.dateFormat\("%A, %d %B %Y - %H:%M:%S", <?= $conta; ?>\);
                }\)\(\),
                events: {
                    load: function \(\) {

                    },
                    click: function \(event\) {
                        ondbclick\(event\);
                    }
                }
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 1
            },
            yAxis: {    
                //type: 'logarithmic', // Establece el eje vertical como logarítmico
                title: {
                    text: '\[Producción\]'
                },
                plotLines: \[{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }\]
            },
            tooltip: {
                formatter: function \(\) {
                    return '<b>' + this.series.name + '</b><br/>' +
                        Highcharts.dateFormat\("%A, %d %B %Y - %H:%M:%S", this.x\) + '<br/>' +
                        Highcharts.numberFormat\(this.y, 1\) + '  Unidades por minuto';
                }
            },
            legend: {
                enabled: true
            },
            exporting: {
                enabled: true
            },
            series: \[
                {
                    name: 'Sensor inductivo',
                    animation: false,
                    data: \(function \(\) {
                        var data = \[\];
                        <?php for \($i = 1; $i < count\($rawdata\); $i++\) { ?>
                            data.push\(\[<?= 1000\*$rawdata\[$i\]\["unixtime"\] ?>, <?= $rawdata\[$i\]\["HR\_COUNTER1"\]/5 ?>\]\);
                        <?php } ?>
                        return data;
                    }\)\(\)
                },
                {
                    name: 'Sensor optico',
                    animation: false,
                    data: \(function \(\) {
                        var data = \[\];
                        <?php for \($i = 1; $i < count\($rawdata\); $i++\) { ?>
                            data.push\(\[<?= 1000\*$rawdata\[$i\]\["unixtime"\] ?>, <?= $rawdata\[$i\]\["HR\_COUNTER2"\]/5 ?>\]\);
                        <?php } ?>
                        return data;
                    }\)\(\)
                },                
                {
                    name: 'marcha',
                    animation: false,
                    data: \(function \(\) {
                        var data = \[\];
                        <?php for \($i = 1; $i < count\($rawdata\); $i++\) { ?>
                            data.push\(\[<?= 1000\*$rawdata\[$i\]\["unixtime"\] ?>, 20\]\);
                        <?php } ?>
                        return data;
                    }\)\(\)
                }
            \]
        }\);
    }\);
</script>

```

### C:\AppServ\www\DigiRail\includes\conn.php
```plaintext
<\!-- conn.php -->

<?php

      $server = "localhost";
      $usuario = "root";
      $pass = "12345678";

?>

```

### C:\AppServ\www\DigiRail\includes\dashboard.php
```plaintext
<\!-- dashboard.php -->
<?php
require 'db\_functions.php';
date\_default\_timezone\_set\('America/Argentina/Buenos\_Aires'\);
setlocale\(LC\_TIME, "spanish"\);
$segundos = 60; // Refrescar cada 60 segundos


// Variable que registra qué período de tiempo mostrar por defecto
$periodo = 'semana';
$ls\_periodos = \['mes' => 2419200, 'semana' => 604800, 'turno' => 28800\];
$ls\_class = \['mes' => \[1, 0, 0\], 'semana' => \[0, 1, 0\], 'turno' => \[0, 0, 1\]\];
$ref\_class = \['presione', 'presado'\];
$menos\_periodo = \['mes' => 'semana', 'semana' => 'turno', 'turno' => 'turno'\];

// Comprobar si se cambió el período a través de GET
if \($\_GET && array\_key\_exists\("periodo", $\_GET\)\) {
    if \(array\_key\_exists\($\_GET\["periodo"\], $ls\_periodos\)\) {
        $periodo = $\_GET\["periodo"\];
    }
}
$class = $ls\_class\[$periodo\];

function sql\_query\($campo\) {
    return "SELECT \`unixtime\`, \`$campo\` FROM \`intervalproduction\`  ORDER BY \`unixtime\` DESC LIMIT 1";
}

$res = getArraySQL\(sql\_query\("HR\_COUNTER1"\)\);
$vel\_ult = $res\[0\]\['HR\_COUNTER1'\] ;
$unixtime = $res\[0\]\['unixtime'\] ;




// Si la variable 'test' aparece en $\_GET, el refresco se hace cada segundo en vez de cada 20 segundos.
header\("Refresh:" . $segundos\);

// Valores para la ubicación del degradado de advertencia
$d = array\(\);
for \($i = 0; $i < 4; $i++\) {
    $d\[$i\] = 350 - $pot - 10 \* $i;
}

$date = date\(DATE\_RFC2822\);
$newDate = date\("D, d M Y" . \(" 00:00:00"\) . " O"\);

$valorInicial = $unixtime \* 1000;
$conta = $valorInicial;
if \($\_GET && array\_key\_exists\("conta", $\_GET\)\) {
    $conta = $\_GET\["conta"\];
    if \($conta > $valorInicial\) {
        $conta = $valorInicial;
    }
}

$tiempo1 = \($conta/1000\) - $ls\_periodos\[$periodo\] - 80\*60;
$tiempo2 = $conta/1000 ;
$sql = "SELECT \`unixtime\`, \`HR\_COUNTER1\`, \`HR\_COUNTER2\`  from \`intervalproduction\` WHERE  unixtime > " . $tiempo1 . " AND unixtime <= " . $tiempo2 . " ORDER BY \`unixtime\` ASC ;";
$rawdata = getArraySQL\($sql\);



?>

```

### C:\AppServ\www\DigiRail\includes\database_connection.php
```plaintext
<?php
//includes/database\_connection.php
$host = 'localhost'; 
$username = 'root'; 
$password = '12345678'; 
$dbname = 'novus';

$conn = new mysqli\($host, $username, $password, $dbname\);

```

### C:\AppServ\www\DigiRail\includes\db_functions.php
```plaintext
<?php
// db\_functions.php

// Conectar a la base de datos
function conectarBD\(\) {
    require 'conn.php';
    $BD = "novus";
    $conexion = mysqli\_connect\($server, $usuario, $pass, $BD\);
    if \(\!$conexion\) {
        die\('Error en la conexión de la base de datos: ' . mysqli\_connect\_error\(\)\);
    }
    return $conexion;
}

// Desconectar la conexión a la base de datos
function desconectarBD\($conexion\) {
    if \(\!mysqli\_close\($conexion\)\) {
        die\('Error al desconectar la base de datos'\);
    }
}

// Obtener un array multidimensional con el resultado de la consulta
function getArraySQL\($sql\) {
    $conexion = conectarBD\(\);
    if \(\!$result = mysqli\_query\($conexion, $sql\)\) {
        die\('Error en la consulta SQL: ' . mysqli\_error\($conexion\)\);
    }

    $rawdata = array\(\);
    while \($row = mysqli\_fetch\_array\($result\)\) {
        $rawdata\[\] = $row;
    }

    desconectarBD\($conexion\);
    return $rawdata;
}
?>

```

### C:\AppServ\www\DigiRail\includes\fetch_data.php
```plaintext
<?php
// fetch\_data.php

require "database\_connection.php";

// Verificar conexión
if \($conn->connect\_error\) {
    die\("Conexión fallida: " . $conn->connect\_error\);
}

$sql = "SELECT \* FROM registros\_modbus WHERE \`valor\` IS NOT NULL";
$result = $conn->query\($sql\);
$datos = array\(\);

while\($row = $result->fetch\_assoc\(\)\) {
    $datos\[\] = $row;
}

echo json\_encode\($datos\);

$conn->close\(\);

```

### C:\AppServ\www\DigiRail\includes\header.php
```plaintext
<?php 
//header.php

echo '<\!DOCTYPE html><html><head> <meta charset="UTF-8"> <link rel="stylesheet" type="text/css" href="CSS/index.css"> <link rel="stylesheet" type="text/css" href="CSS/header.css"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"> <link rel="icon" href="/imagenes/favicon.ico" type="image/x-icon"> </head><body>';
echo "<header> <br><br><br> <div class='topnav'> <ul>";

// Identificar la página actual
$paginaActual = basename\($\_SERVER\['PHP\_SELF'\]\);

// Clase para el enlace activo
$claseActiva = "class='active'";

echo "<li><a href='index.php' ".\($paginaActual == 'index.php' ? $claseActiva : ""\).">DigiRail</a></li>";
echo "<li><a href='PanelControlModbus.php' ".\($paginaActual == 'PanelControlModbus.php' ? $claseActiva : ""\).">Estado del Equipo</a></li>";
echo "<li><a href='/Bolsas/index.php' ".\($paginaActual == 'Bolsas/index.php' ? $claseActiva : ""\).">Costos Bolsas</a></li>";
echo "<li><a href='/horas/index.php' ".\($paginaActual == '/horas/index.php' ? $claseActiva : ""\).">Horas</a></li>";
echo "<li><a href='/DigiRail/index.php' ".\($paginaActual == '/DigiRail/index.php' ? $claseActiva : ""\).">DigiRail</a></li>";
echo "<li><a href='/phpMyAdmin/' target='\_blank'>PHP MyAdmin</a></li>";

echo "</ul></div></header>";

```

### C:\AppServ\www\DigiRail\includes\info_display.php
```plaintext
<\!-- power\_info\_display.php -->
<div id="zero" class="hoja" style= <?php echo '"background: linear-gradient\(195deg, rgb\(107,170,34\) '.$d\[3\].'%, rgb\(255,164,1\) '.$d\[2\].'%, rgb\(234,53,34\) '.$d\[1\].'%, rgb\(100,10,5\) '.$d\[0\].'%\);"';//'"background-color:green"'; ?> >
  <div class="info">
    <div class="cabecera">
      <div class="c1">
        <p1>
          <?php $vel\_ult = $vel\_ult/5;
                echo "Velocidad <br>".round\($vel\_ult,1\)." unidades por minuto";
          ?>
           </p1>
      </div>
    </div>
        <div id="container" class="graf"></div>
    <?php require "botonera.php"; ?>
  </div>
  <br>
  <br>
  <br>
</div>
```

### C:\AppServ\www\DigiRail\includes\receiveAndUpdateDB.php
```plaintext
<\!--includes/receiveAndUpdateDB.php-->
<?php

require 'db\_functions.php';

// Recuperar datos de la URL
$unixtime = isset\($\_GET\['unixtime'\]\) ? $\_GET\['unixtime'\] : null;
$HR\_COUNTER1 = isset\($\_GET\['HR\_COUNTER1'\]\) ? $\_GET\['HR\_COUNTER1'\] : null;
$HR\_COUNTER2 = isset\($\_GET\['HR\_COUNTER2'\]\) ? $\_GET\['HR\_COUNTER2'\] : null;

// Validar los datos recibidos
if \($unixtime === null || $HR\_COUNTER1 === null || $HR\_COUNTER2 === null\) {
    die\("Datos incompletos o incorrectos."\);
}

// Utiliza conectarBD\(\) de db\_functions.php
$conexion = conectarBD\(\);

// Preparar la consulta SQL para verificar si el registro ya existe
$consultaExistente = "SELECT COUNT\(\*\) FROM intervalproduction WHERE unixtime = ?";
$stmt = $conexion->prepare\($consultaExistente\);
$stmt->bind\_param\("i", $unixtime\);
$stmt->execute\(\);
$resultado = $stmt->get\_result\(\);
$fila = $resultado->fetch\_array\(\);
$existe = $fila\[0\] > 0;

// Si el registro no existe, insertarlo en la base de datos
if \(\!$existe\) {
    $insertarSQL = "INSERT INTO intervalproduction \(unixtime, HR\_COUNTER1, HR\_COUNTER2\) VALUES \(?, ?, ?\)";
    $stmt = $conexion->prepare\($insertarSQL\);
    $stmt->bind\_param\("iii", $unixtime, $HR\_COUNTER1, $HR\_COUNTER2\);

    if \($stmt->execute\(\)\) {
        echo "Registro insertado con éxito.";
    } else {
        echo "Error al insertar el registro: " . $stmt->error;
    }
} else {
    echo "El registro ya existe.";
}

// Utiliza desconectarBD\(\) de db\_functions.php para cerrar la conexión
desconectarBD\($conexion\);
?>

```

### C:\AppServ\www\DigiRail\includes\SendData.php
```plaintext
<?php
// Refrescar la página cada 15 segundos
header\("Refresh: 60"\);

require 'SendData\_python.php'; 

?>
```

### C:\AppServ\www\DigiRail\includes\SendData_python.php
```plaintext
<\!--includes/SendData\_python.php-->
<?php
require 'db\_functions.php'; 
// Obtener el último registro de la base de datos local
function obtenerUltimoRegistro\(\) {
    $sql = "SELECT unixtime, HR\_COUNTER1, HR\_COUNTER2 FROM intervalproduction ORDER BY unixtime DESC LIMIT 1";
    return getArraySQL\($sql\);
}

// Enviar datos a la base de datos remota
function enviarDatosRemotos\($unixtime, $HR\_COUNTER1, $HR\_COUNTER2\) {
    $url = "http://10.176.61.55/DigiRail/includes/receiveAndUpdateDB.php?unixtime=$unixtime&HR\_COUNTER1=$HR\_COUNTER1&HR\_COUNTER2=$HR\_COUNTER2";
    
    // Mostrar los datos y la URL en pantalla
    echo "Unixtime: <br>$unixtime<br><br>";
    echo "HR\_COUNTER1: <br>$HR\_COUNTER1<br><br>";
    echo "HR\_COUNTER2: <br>$HR\_COUNTER2<br><br>";
    echo "URL: <br>$url<br><br>";

    $ch = curl\_init\(\);
    curl\_setopt\($ch, CURLOPT\_URL, $url\);
    curl\_setopt\($ch, CURLOPT\_RETURNTRANSFER, true\);
    $response = curl\_exec\($ch\);
    curl\_close\($ch\);

    return $response;
}

// Procesar y enviar el último registro
$ultimoRegistro = obtenerUltimoRegistro\(\);
if \($ultimoRegistro\) {
    $registro = $ultimoRegistro\[0\]; // Obtener el primer \(y único\) elemento
    $response = enviarDatosRemotos\($registro\['unixtime'\], $registro\['HR\_COUNTER1'\], $registro\['HR\_COUNTER2'\]\);

    if \($response \!== false\) {
        echo "<br>Respuesta del servidor remoto: $response<br>";
    } else {
        echo "Error al enviar datos.<br>";
    }
} else {
    echo "No se encontraron registros para enviar.<br>";
}

?>

```

### C:\AppServ\www\DigiRail\SCR\clean_intervalproduction_data.py.py
```plaintext
import pymysql
import logging

# Configuración del logging
logging.basicConfig\(level=logging.INFO, format='%\(asctime\)s - %\(levelname\)s - %\(message\)s'\)

# Configuración de la conexión a la base de datos
config = {
    'host': 'localhost',
    'user': 'root',
    'password': '12345678',
    'db': 'novus',
    'charset': 'utf8mb4',
    'cursorclass': pymysql.cursors.DictCursor
}



def calcular\_diferenciales\(registro\_actual, registro\_anterior\):
    """
    Calcula los diferenciales de \`HR\_COUNTER1\` y \`HR\_COUNTER2\`.
    Muestra cómo se obtuvieron los valores calculados, utilizando las marcas de tiempo
    'datetime' para una mejor claridad.
    """
    diff\_hr\_counter1 = registro\_actual\['HR\_COUNTER1\_LO'\] - registro\_anterior\['HR\_COUNTER1\_LO'\]
    diff\_hr\_counter2 = registro\_actual\['HR\_COUNTER2\_LO'\] - registro\_anterior\['HR\_COUNTER2\_LO'\]

    # Convertir unixtime a datetime para visualización
    datetime\_actual = registro\_actual\['datetime'\].strftime\('%Y-%m-%d %H:%M:%S'\)
    datetime\_anterior = registro\_anterior\['datetime'\].strftime\('%Y-%m-%d %H:%M:%S'\)

    # Mostrar cómo se calculó el valor
    print\(f"\n\nPara datetime {datetime\_actual} \(unixtime {registro\_actual\['unixtime'\]}\):"\)
    print\(f"  - HR\_COUNTER1 calculado como diferencia de {registro\_actual\['HR\_COUNTER1\_LO'\]} \({datetime\_actual}\) - {registro\_anterior\['HR\_COUNTER1\_LO'\]} \({datetime\_anterior}\) = {diff\_hr\_counter1}"\)
    print\(f"  - HR\_COUNTER2 calculado como diferencia de {registro\_actual\['HR\_COUNTER2\_LO'\]} \({datetime\_actual}\) - {registro\_anterior\['HR\_COUNTER2\_LO'\]} \({datetime\_anterior}\) = {diff\_hr\_counter2}"\)

    return diff\_hr\_counter1, diff\_hr\_counter2


def insertar\_registro\_intervalproduction\(cursor, unixtime, diff\_hr\_counter1, diff\_hr\_counter2, guardar\_ceros=False\):
    """
    Inserta un registro en \`intervalproduction\` con los diferenciales calculados o con valores cero,
    dependiendo de la elección del usuario.
    """
    # Decidir qué valores insertar basado en la elección del usuario
    valores\_a\_insertar = \(unixtime, 0, 0\) if guardar\_ceros else \(unixtime, diff\_hr\_counter1, diff\_hr\_counter2\)
    
    sql\_insert = """
        INSERT INTO intervalproduction \(unixtime, HR\_COUNTER1, HR\_COUNTER2\)
        VALUES \(%s, %s, %s\)
    """
    cursor.execute\(sql\_insert, valores\_a\_insertar\)
    if guardar\_ceros:
        logging.info\(f"Registro con valores cero insertado con éxito para unixtime {unixtime}."\)
    else:
        logging.info\(f"Registro restituido con éxito para unixtime {unixtime} con diferenciales HR\_COUNTER1 = {diff\_hr\_counter1} y HR\_COUNTER2 = {diff\_hr\_counter2}."\)

def obtener\_registros\_productionlog\(cursor\):
    """
    Obtiene todos los registros de \`productionlog\` ordenados por \`unixtime\` de mayor a menor.
    """
    logging.info\("Obteniendo registros de \`productionlog\` en orden descendente."\)
    cursor.execute\("SELECT \* FROM productionlog ORDER BY unixtime DESC"\)  # Orden descendente
    return cursor.fetchall\(\)

def restituir\_registros\(\):
    try:
        connection = pymysql.connect\(\*\*config\)
        with connection.cursor\(\) as cursor:
            registros = obtener\_registros\_productionlog\(cursor\)

            # Ajuste: invertir el orden de comparación debido al orden descendente de los registros
            for i in range\(len\(registros\) - 1, 0, -1\):
                registro\_actual = registros\[i\]
                registro\_siguiente = registros\[i - 1\]  # Ahora 'siguiente' es el registro anterior en tiempo
                diff\_hr\_counter1, diff\_hr\_counter2 = calcular\_diferenciales\(registro\_actual, registro\_siguiente\)
                
                cursor.execute\("SELECT COUNT\(\*\) AS count FROM intervalproduction WHERE unixtime = %s", \(registro\_actual\['unixtime'\],\)\)
                if cursor.fetchone\(\)\['count'\] == 0:
                    print\(f"Diferenciales calculados: HR\_COUNTER1 = {diff\_hr\_counter1}, HR\_COUNTER2 = {diff\_hr\_counter2}"\)
                    #respuesta = input\("¿Desea insertar este registro en la base de datos con los diferenciales calculados \(s\) o con valores cero \(0\)?: "\)
                    respuesta = '0'
                    if respuesta.lower\(\) == 's':
                        insertar\_registro\_intervalproduction\(cursor, registro\_actual\['unixtime'\], diff\_hr\_counter1, diff\_hr\_counter2\)
                    elif respuesta == '0':
                        insertar\_registro\_intervalproduction\(cursor, registro\_actual\['unixtime'\], diff\_hr\_counter1, diff\_hr\_counter2, guardar\_ceros=True\)
            
            connection.commit\(\)
            logging.info\("Proceso completado."\)
    except pymysql.MySQLError as e:
        logging.error\(f"Error de conexión a la base de datos: {e}"\)
    finally:
        if connection:
            connection.close\(\)
            logging.info\("Conexión a la base de datos cerrada."\)


restituir\_registros\(\)
input\("presione enter para salir"\)
```

### C:\AppServ\www\DigiRail\SCR\config.json
```plaintext
{
    "modbus": {
      "device\_address": 1,
      "descriptions": \["DigiRail Connect", "USB-SERIAL CH340"\],
      "D1": 70,
      "D2": 71,
      "HR\_COUNTER1\_LO": 22,
      "HR\_COUNTER1\_HI": 23,
      "HR\_COUNTER2\_LO": 24,
      "HR\_COUNTER2\_HI": 25
    }
  }
  
```

### C:\AppServ\www\DigiRail\SCR\controller.py
```plaintext
#SCR/controller.py
from logs.config\_logger import configurar\_logging
from db\_operations import update\_database
import serial.tools.list\_ports
import os
import platform

D1 = 70
D2 = 71
HR\_COUNTER1\_LO = 22
HR\_COUNTER1\_HI = 23
HR\_COUNTER2\_LO = 24
HR\_COUNTER2\_HI = 25

logger = configurar\_logging\(\)

def read\_digital\_input\(instrument, address\):
    """
    Lee el estado de una entrada digital de un dispositivo Modbus.

    Utiliza la función 'safe\_modbus\_read' para realizar una lectura segura de un bit del dispositivo
    Modbus especificado. Esta función se enfoca en leer estados de entradas digitales, como sensores on/off.

    Args:
        instrument \(minimalmodbus.Instrument\): El instrumento Modbus utilizado para la lectura.
        address \(int\): La dirección de la entrada digital a leer en el dispositivo Modbus.

    Returns:
        int/None: El estado de la entrada digital \(1 o 0\) si la lectura es exitosa, o None si ocurre un error.
    """
    return safe\_modbus\_read\(instrument.read\_bit, address, functioncode=2\)

def inicializar\_conexion\_modbus\(\):
    """
    Inicializa la conexión con el dispositivo Modbus, detectando el puerto serie adecuado.

    Esta función busca un puerto serie disponible que coincida con las descripciones de los dispositivos
    'DigiRail Connect' o 'USB-SERIAL CH340'. Si se encuentra un puerto correspondiente, se retorna su nombre
    junto con la dirección predefinida del dispositivo Modbus.

    Returns:
        tuple: Una tupla que contiene el nombre del puerto serie encontrado y la dirección del dispositivo Modbus.

    Raises:
        SystemExit: Si no se detecta ningún puerto COM para el dispositivo.

    Proceso:
        - Intenta detectar un puerto serie para 'DigiRail Connect'.
        - Si no se encuentra, intenta detectar 'USB-SERIAL CH340'.
        - Si se encuentra un puerto, retorna su nombre y la dirección del dispositivo Modbus.
        - Si no se detecta ningún puerto, muestra un mensaje de error y sale del programa.
    """
    device\_address = 1
    device\_description = "DigiRail Connect"  
    com\_port = detect\_serial\_ports\(device\_description\)
    if com\_port:
        logger.info\(f"Puerto {device\_description} detectado: {com\_port}"\)
    else:
        device\_description = "USB-SERIAL CH340"  
        com\_port = detect\_serial\_ports\(device\_description\)
        if com\_port:
            logger.info\(f"Puerto detectado: {com\_port}\n"\)
        else:
            logger.error\("No se detectaron puertos COM para tudispositivo."\)
            input\("Presiona una tecla para salir"\)
            exit\(\)
    return com\_port, device\_address

def process\_high\_resolution\_register\(instrument, connection\):
    """
    Procesa y actualiza los registros de alta resolución de un dispositivo Modbus.

    Lee los valores de los registros HR\_COUNTER1\_LO y HR\_COUNTER1\_HI del dispositivo Modbus
    y actualiza la base de datos con estos valores individualmente.

    Args:
        instrument \(minimalmodbus.Instrument\): El instrumento Modbus utilizado para la lectura.
        connection \(pymysql.connections.Connection\): Conexión a la base de datos para actualizar los valores.
    """
    value\_lo = safe\_modbus\_read\(instrument.read\_register, HR\_COUNTER1\_LO, functioncode=3\)
    if value\_lo is not None:
        update\_database\(connection, HR\_COUNTER1\_LO, value\_lo, "HR\_COUNTER1\_LO"\)

    value\_hi = safe\_modbus\_read\(instrument.read\_register, HR\_COUNTER1\_HI, functioncode=3\)
    if value\_hi is not None:
        update\_database\(connection, HR\_COUNTER1\_HI, value\_hi, "HR\_COUNTER1\_HI"\)

    value\_lo = safe\_modbus\_read\(instrument.read\_register, HR\_COUNTER2\_LO, functioncode=3\)
    if value\_lo is not None:
        update\_database\(connection, HR\_COUNTER2\_LO, value\_lo, "HR\_COUNTER2\_LO"\)

    value\_hi = safe\_modbus\_read\(instrument.read\_register, HR\_COUNTER2\_HI, functioncode=3\)
    if value\_hi is not None:
        update\_database\(connection, HR\_COUNTER2\_HI, value\_hi, "HR\_COUNTER2\_HI"\)        

def detect\_serial\_ports\(device\_description\):
    """
    Busca y retorna el nombre del puerto serie que coincide con la descripción del dispositivo dada.

    Esta función recorre todos los puertos serie disponibles en el sistema y compara la descripción
    de cada uno con la descripción del dispositivo proporcionada. Si encuentra una coincidencia,
    retorna el nombre del puerto serie correspondiente.

    Args:
        device\_description \(str\): La descripción del dispositivo Modbus a buscar entre los puertos serie.

    Returns:
        str/None: El nombre del puerto serie que coincide con la descripción del dispositivo, o None si no se encuentra.
    """
    available\_ports = list\(serial.tools.list\_ports.comports\(\)\)
    for port, desc, hwid in available\_ports:
        if device\_description in desc:
            return port
    return None

def safe\_modbus\_read\(method, \*args, \*\*kwargs\):
    """
    Realiza una lectura segura de un dispositivo Modbus.

    Envuelve la llamada a un método de lectura Modbus en un bloque try-except para manejar excepciones.
    Proporciona un mecanismo de recuperación y registro de errores en caso de fallas en la lectura.

    Args:
        method \(callable\): Método de lectura Modbus a ser invocado.
        \*args: Argumentos posicionales para el método de lectura.
        \*\*kwargs: Argumentos de palabra clave para el método de lectura.

    Returns:
        El resultado del método de lectura si es exitoso, o None si ocurre una excepción.
    """
    try:
        return method\(\*args, \*\*kwargs\)
    except Exception as e:
        logger.error\(f"Error al leer del dispositivo Modbus: {e}"\)
        return None

def limpiar\_pantalla\(\):
    """
    Limpia la consola de comandos según el sistema operativo.
    """
    if platform.system\(\) == "Windows":
        os.system\('cls'\)
    else:
        os.system\('clear'\)

class ModbusConnectionError\(Exception\):
    """Excepción para errores de conexión con el dispositivo Modbus."""
    pass

```

### C:\AppServ\www\DigiRail\SCR\DataTransfer.py
```plaintext
#SCR/DataTranfer.py
import time
from datetime import datetime
from logs.config\_logger import configurar\_logging
from db\_operations import check\_db\_connection  
import pymysql
import subprocess


logger = configurar\_logging\(\)

def MainTransfer\(\):
    """
    Función para verificar y ejecutar la transferencia de datos.
    """
    try:
        print\(""\)
        if es\_tiempo\_cercano\_multiplo\_cinco\(\):
            logger.info\("Iniciando la transferencia de datos."\)
            consulta1 = """
            SELECT 
                \(SELECT valor FROM registros\_modbus WHERE registro = 'HR\_COUNTER1\_LO'\) AS HR\_COUNTER1\_LO, 
                \(SELECT valor FROM registros\_modbus WHERE registro = 'HR\_COUNTER1\_HI'\) AS HR\_COUNTER1\_HI, 
                \(SELECT valor FROM registros\_modbus WHERE registro = 'HR\_COUNTER2\_LO'\) AS HR\_COUNTER2\_LO, 
                \(SELECT valor FROM registros\_modbus WHERE registro = 'HR\_COUNTER2\_HI'\) AS HR\_COUNTER2\_HI;
            """
            consulta2 = """
            INSERT INTO ProductionLog \(unixtime, HR\_COUNTER1\_LO, HR\_COUNTER1\_HI, HR\_COUNTER2\_LO, HR\_COUNTER2\_HI\)
            VALUES \(%s, %s, %s, %s, %s\)
            """
            num\_filas = 5
            transferir\_datos\(consulta1,consulta2,num\_filas\)
            consulta1 = """
            SELECT 
                \(\(SELECT HR\_COUNTER1\_LO FROM ProductionLog ORDER BY ID DESC LIMIT 1\) - 
                \(SELECT HR\_COUNTER1\_LO FROM ProductionLog WHERE ID = \(SELECT MAX\(ID\) - 1 FROM ProductionLog\)\)\) AS HR\_COUNTER1,
                \(\(SELECT HR\_COUNTER2\_LO FROM ProductionLog ORDER BY ID DESC LIMIT 1\) - 
                \(SELECT HR\_COUNTER2\_LO FROM ProductionLog WHERE ID = \(SELECT MAX\(ID\) - 1 FROM ProductionLog\)\)\) AS HR\_COUNTER2
            FROM ProductionLog
            LIMIT 1;
            """
            consulta2 = """
            INSERT INTO intervalproduction \(unixtime, HR\_COUNTER1, HR\_COUNTER2\)
            VALUES \(%s, %s, %s\)
            """
            num\_filas = 3
            transferir\_datos\(consulta1,consulta2,num\_filas\)
            SendDataPHP\(\)

            time.sleep\(1\)

        else:
            logger.info\("No es momento de transferir datos. Esperando para la próxima verificación."\)
    except Exception as e:
        logger.error\(f"Error en MainTransfer: {e}"\)

def SendDataPHP\(\):
    # Define la ruta al intérprete de PHP y al script PHP utilizando raw strings
    php\_interpreter = "C://AppServ//php7//php.exe"
    php\_script = "C://AppServ//www//DigiRail//includes//SendData\_python.php"

    # Ejecuta el script PHP usando subprocess.run
    result = subprocess.run\(\[php\_interpreter, php\_script\], capture\_output=True, text=True, shell=True\)

    # Log y manejo del resultado
    if result.returncode == 0:
        logger.info\("Script PHP ejecutado exitosamente. Salida:"\)
        logger.info\(result.stdout\)
    else:
        logger.error\(f"Error al ejecutar el script PHP. Código de salida: {result.returncode}"\)
        logger.error\(result.stderr\)


def transferir\_datos\(consulta1, consulta2, num\_filas\):
    """
    Función principal para transferir datos.
    """
    print\(""\)
    try:
        conn = check\_db\_connection\(\)
        if not conn:
            logger.error\("No se pudo establecer una conexión con la base de datos."\)
            return
        with conn.cursor\(\) as cursor:
            logger.info\("Iniciando la transferencia de datos."\)
            unixtime = int\(time.time\(\)\)
            unixtime = \(round\(unixtime/300\)\)\*300
            datos\_originales = obtener\_datos\(cursor, consulta1\)
            # Convertir los elementos de cada tupla de cadena a entero
            datos = \[\(unixtime,\) + tuple\(int\(x\) for x in fila\) for fila in datos\_originales\]
            if datos:
                # Verificar si ya existe un registro con el mismo unixtime
                cursor.execute\("SELECT COUNT\(\*\) FROM intervalproduction WHERE unixtime = %s", \(unixtime,\)\)
                if cursor.fetchone\(\)\[0\] == 0:
                    # Solo insertar si no hay registros existentes con el mismo unixtime
                    insertar\_datos\(conn, datos, consulta2, num\_filas\)
                    conn.commit\(\)
                    logger.info\("Transferencia de datos completada exitosamente."\)
                else:
                    logger.warning\("Se evitó la inserción de un registro duplicado para el unixtime %s.", unixtime\)
            else:
                logger.warning\("No se obtuvieron datos para transferir."\)
    except pymysql.MySQLError as e:
        logger.error\(f"Error de MySQL durante la transferencia de datos: {e}"\)
        conn.rollback\(\)
    except Exception as e:
        logger.error\(f"Error inesperado durante la transferencia de datos: {e}"\)
        conn.rollback\(\)
    finally:
        if conn:
            conn.close\(\)
            logger.info\("Conexión a la base de datos cerrada."\)


def obtener\_datos\(cursor, consulta\):
    """
    Ejecuta una consulta SQL y devuelve los resultados.

    Args:
        cursor: Cursor de la base de datos.
        consulta \(str\): Consulta SQL a ejecutar.

    Returns:
        list: Resultados de la consulta o None en caso de error.
    """
    try:
        cursor.execute\(consulta\)
        return cursor.fetchall\(\)
    except pymysql.MySQLError as e:
        logger.error\(f"Error de MySQL al ejecutar consulta: {e}"\)
    except Exception as e:
        logger.error\(f"Error inesperado al ejecutar consulta: {e}"\)
    return None

def insertar\_datos\(conn, datos, consulta2,num\_filas\):
    """
    Inserta los datos obtenidos.

    Args:
        conn: Conexión a la base de datos.
        datos: Datos a insertar.
        consulta2 \(str\): Consulta SQL para la inserción de datos.
    """
    try:
        with conn.cursor\(\) as cursor:
            for fila in datos:
                # Asegurarse de que 'fila' tiene exactamente tres elementos
                # Por ejemplo: fila = \(unixtime, HR\_COUNTER1, HR\_COUNTER2\)
                if len\(fila\) == num\_filas:
                    cursor.execute\(consulta2, fila\)
                else:
                    logger.warning\("Fila con número incorrecto de elementos: %s", fila\)
            conn.commit\(\)
            logger.info\("%s registros insertados con éxito.", len\(datos\)\)
    except pymysql.MySQLError as e:
        logger.error\("Error de MySQL al insertar datos: %s", e\)
        conn.rollback\(\)
    except Exception as e:
        logger.error\("Error inesperado al insertar datos: %s", e\)
        conn.rollback\(\)

def es\_tiempo\_cercano\_multiplo\_cinco\(tolerancia=5\):
    """
    Verifica si el tiempo actual está cerca de un múltiplo de 5 minutos.

    Args:
        tolerancia \(int\): Número de segundos de tolerancia para considerar 'cercano'.

    Returns:
        bool: True si el tiempo actual está dentro de la tolerancia de un múltiplo de 5 minutos, False de lo contrario.
    """
    ahora = datetime.now\(\)
    minuto\_actual = ahora.minute
    segundo\_actual = ahora.second

    cercano\_a\_multiplo = minuto\_actual % 5 <= tolerancia / 60 and segundo\_actual <= tolerancia
    logger.info\(f"Chequeando tiempo: {ahora}, cercano a múltiplo de 5: {'sí' if cercano\_a\_multiplo else 'no'}"\)
    return cercano\_a\_multiplo


def sincronizar\_intervalproduction\(\):
    """
    Sincroniza la tabla 'intervalproduction' entre las bases de datos local y remota.
    """
    try:
        logger.info\("Iniciando la sincronización de 'intervalproduction'."\)
        
        # Establecer conexión con la base de datos local
        conn\_local = check\_db\_connection\(remote=False\)
        logger.info\("Conexión establecida con la base de datos local."\)

        # Establecer conexión con la base de datos remota
        conn\_remota = check\_db\_connection\(remote=True\)
        logger.info\("Conexión establecida con la base de datos remota."\)

        with conn\_local.cursor\(\) as cursor\_local, conn\_remota.cursor\(\) as cursor\_remoto:
            logger.info\("Cursore para ambas bases de datos creados."\)

            # Obtener los últimos registros de ambas bases de datos
            logger.info\("Obteniendo el último registro de la base de datos local."\)
            ultimo\_registro\_local = obtener\_ultimo\_registro\(cursor\_local\)
            logger.info\(f"Último registro local: {ultimo\_registro\_local}"\)

            logger.info\("Obteniendo el último registro de la base de datos remota."\)
            ultimo\_registro\_remoto = obtener\_ultimo\_registro\(cursor\_remoto\)
            logger.info\(f"Último registro remoto: {ultimo\_registro\_remoto}"\)

            # Comparar y sincronizar
            if ultimo\_registro\_local \!= ultimo\_registro\_remoto:
                logger.info\("Las bases de datos no están sincronizadas. Iniciando sincronización."\)
                # Código para sincronizar los registros...
                pass
            else:
                logger.info\("Las bases de datos ya están sincronizadas."\)

    except Exception as e:
        logger.error\(f"Error en la sincronización de las bases de datos: {e}"\)

def obtener\_ultimo\_registro\(cursor\):
    """
    Obtiene el último registro de la tabla 'intervalproduction'.

    Args:
        cursor: Cursor de la base de datos.

    Returns:
        tuple: El último registro de la tabla.
    """
    try:
        consulta = "SELECT \* FROM intervalproduction ORDER BY ID DESC LIMIT 1"
        cursor.execute\(consulta\)
        registro = cursor.fetchone\(\)
        logger.info\(f"Consulta ejecutada exitosamente. Registro obtenido: {registro}"\)
        return registro
    except Exception as e:
        logger.error\(f"Error al obtener el último registro: {e}"\)
        raise

```

### C:\AppServ\www\DigiRail\SCR\db_initializer.py
```plaintext
# db\_initializer.py
import mysql.connector
from logs.config\_logger import configurar\_logging

logger = configurar\_logging\(\)


def create\_database\(\):
    logger.info\("creando la base de datos"\) 
    connection = mysql.connector.connect\(
        host="localhost",
        user="root",
        password="12345678"
    \)
    cursor = connection.cursor\(\)
    cursor.execute\("CREATE DATABASE IF NOT EXISTS novus"\)
    logger.info\("base de datos 'novus' creada con éxito"\)

def create\_tables\(cursor, tabla\):
    if tabla == 'registros\_modbus':
        with open\('database/registros\_modbus\_1.sql', 'r'\) as file:
            print\("creando tabla registros\_modbus"\)
            sql\_script1 = file.read\(\)
            print\(f"\sql\_script:\n  {sql\_script1} \n"\)
            cursor.execute\(sql\_script1\) 
            logger.info\("Tabla 'registros\_modbus' creada con éxito"\)
        with open\('database/registros\_modbus\_2.sql', 'r'\) as file:
            print\("Insertando registros en tabla registros\_modbus"\)
            sql\_script2 = file.read\(\)
            print\(f"\sql\_script:\n  {sql\_script2} \n"\)
            cursor.execute\(sql\_script2\) #fix
            logger.info\("registros insertados en 'registros\_modbus' con éxito"\)   
        with open\('database/registros\_modbus\_3.sql', 'r'\) as file:
            print\("Insertando registros en tabla registros\_modbus"\)
            sql\_script3 = file.read\(\)
            print\(f"\sql\_script:\n  {sql\_script3} \n"\)
            cursor.execute\(sql\_script3\) #fix
            logger.info\("registros insertados en 'registros\_modbus' con éxito"\)  
        with open\('database/registros\_modbus\_4.sql', 'r'\) as file:
            print\("Insertando registros en tabla registros\_modbus"\)
            sql\_script4 = file.read\(\)
            print\(f"\sql\_script:\n  {sql\_script4} \n"\)
            cursor.execute\(sql\_script4\) #fix
            logger.info\("registros insertados en 'registros\_modbus' con éxito"\)  



def initialize\_db\(\):
    connection = mysql.connector.connect\(
        host="localhost",
        user="root",
        password="12345678"
    \)

    cursor = connection.cursor\(\)

    try:
        create\_database\(cursor\)
        cursor.execute\("USE novus"\)
        create\_tables\(cursor\)
    except mysql.connector.Error as err:
        print\(f"Error al inicializar la base de datos: {err}"\)
    finally:
        cursor.close\(\)
        connection.close\(\)
```

### C:\AppServ\www\DigiRail\SCR\db_operations.py
```plaintext
#SCR/db\_operations.py
import pymysql
from logs.config\_logger import configurar\_logging
import functools
import os
from db\_initializer import create\_database,create\_tables

logger = configurar\_logging\(\)

def update\_database\(connection, address, value, descripcion\):
    """
    Actualiza un registro en la base de datos con un valor específico.

    Esta función construye y ejecuta una consulta SQL para actualizar un registro en la base de datos.
    Imprime un mensaje indicando si la actualización fue exitosa o no. En caso de errores en la ejecución
    de la consulta, lanza una excepción personalizada \`DatabaseUpdateError\`.

    Args:
        connection \(pymysql.connections.Connection\): La conexión activa a la base de datos.
        address \(int\): La dirección del registro en la base de datos a actualizar.
        value: El valor a asignar en el registro especificado.
        descripcion \(str\): Descripción del registro para mostrar en mensajes de log.

    Raises:
        DatabaseUpdateError: Si ocurre un error al actualizar la base de datos.

    Returns:
        None
    """
    try:
        query, params = build\_update\_query\(address, value\)
        if execute\_query\(connection, query, params\):
            logger.info\(f"Registro actualizado: dirección {address}, descripción: {descripcion} valor {value}"\)
        else:
            logger.error\(f"No se pudo actualizar el registro: dirección {address}, {descripcion}"\)
    except pymysql.MySQLError as e:
        raise DatabaseUpdateError\(f"Error al actualizar la base de datos en la dirección {address} con el valor {value}: {e}"\) from e

def build\_update\_query\(address, value\):
    """
    Construye una consulta SQL de actualización y sus parámetros.

    Esta función genera una consulta SQL para actualizar un registro en la tabla 'registros\_modbus',
    utilizando la dirección del registro y el nuevo valor a asignar. La consulta se construye de
    manera parametrizada para prevenir inyecciones SQL.

    Args:
        address \(int\): La dirección del registro en la base de datos a actualizar.
        value: El nuevo valor a asignar en el registro especificado.

    Returns:
        tuple: Una tupla conteniendo la consulta SQL como string y los parámetros como una tupla.
    """
    query = "UPDATE registros\_modbus SET valor = %s WHERE direccion\_modbus = %s"
    params = \(value, address\)
    return query, params

def execute\_query\(connection, query, params\):
    """
    Ejecuta una consulta SQL en la base de datos especificada.

    Esta función intenta ejecutar una consulta SQL utilizando la conexión y los parámetros proporcionados.
    En caso de éxito, confirma \(commit\) la transacción. Si ocurre un error durante la ejecución de la consulta,
    imprime un mensaje de error y retorna False.

    Args:
        connection \(pymysql.connections.Connection\): La conexión activa a la base de datos.
        query \(str\): La consulta SQL a ejecutar.
        params \(tuple\): Parámetros para la consulta SQL.

    Returns:
        bool: True si la consulta se ejecuta con éxito, False en caso de error.
    """
    if not connection:
        logger.error\("No hay una conexión activa a la base de datos."\)
        return False
    check\_table\_exists\(connection\)

    try:
        with connection.cursor\(\) as cursor:
            cursor.execute\(query, params\)
            connection.commit\(\)
        return True
    except Exception as e:
        logger.error\(f"Error al ejecutar la consulta en la base de datos: {e}"\)
        return False

def reconnect\_on\_failure\(func\):
    """
    Decorador que intenta reconectar a la base de datos en caso de un fallo en la conexión.

    Este decorador envuelve una función que realiza operaciones de base de datos. Si se detecta
    un error de conexión operacional o de MySQL durante la ejecución de la función, intenta
    establecer una nueva conexión y reintentar la operación.

    Args:
        func \(function\): La función que se va a decorar.

    Returns:
        function: La función envuelta con lógica de manejo de errores y reconexión.
    """
    @functools.wraps\(func\)
    def wrapper\_reconnect\(\*args, \*\*kwargs\):
        try:
            return func\(\*args, \*\*kwargs\)
        except \(pymysql.OperationalError, pymysql.MySQLError\) as e:
            logger.error\(f"Se detectó un error en la conexión a la base de datos: {e}. Intentando reconectar..."\)
            create\_database\(\)
            try:
                db\_config = get\_db\_config\(\)  # Obtener la configuración actualizada de la base de datos
                connection = pymysql.connect\(\*\*db\_config\)
                args = \(connection,\) + args\[1:\]
                return func\(\*args, \*\*kwargs\)
            except Exception as e:
                logger.error\(f"No se pudo reconectar a la base de datos: {e}"\)
                return None
    return wrapper\_reconnect

def check\_table\_exists\(connection\):
    """
    Verifica si la tabla 'registros\_modbus' existe en la base de datos 'novus'.

    Args:
        connection \(pymysql.connections.Connection\): La conexión activa a la base de datos.

    Returns:
        bool: True si la tabla existe, False en caso contrario.
    """
    with connection.cursor\(\) as cursor:
        cursor.execute\("""
            SELECT COUNT\(\*\)
            FROM information\_schema.tables
            WHERE table\_schema = 'novus' AND table\_name = 'registros\_modbus'
        """\)
        result = cursor.fetchone\(\)
        if result\[0\]:
            return True
        else:
            logger.error\("La tabla 'registros\_modbus' no existe en la base de datos."\)
            create\_tables\(cursor,tabla='registros\_modbus'\)
            return False


@reconnect\_on\_failure
def check\_db\_connection\(\):
    """
    Establece una conexión a la base de datos local o remota.

    Args:
        remote \(bool\): Determina si se debe conectar a la base de datos remota.

    Returns:
        pymysql.connections.Connection: Un objeto de conexión a la base de datos.
    """
    db\_config = get\_db\_config\(\)
    return pymysql.connect\(\*\*db\_config\)

class DatabaseUpdateError\(Exception\):
    """Excepción para errores en la actualización de la base de datos."""
    pass
def get\_db\_config\(\):
    """
    Obtiene la configuración de la base de datos desde variables de entorno o parámetros.

    Args:
        remote \(bool\): Determina si se debe obtener la configuración para la base de datos remota.

    Returns:
        dict: Un diccionario con la configuración de la base de datos.
    """

    return {
        'host': os.getenv\('DB\_HOST', 'localhost'\),
        'user': os.getenv\('DB\_USER', 'root'\),
        'password': os.getenv\('DB\_PASSWORD', '12345678'\),
        'db': 'novus',
        'port': 3306  
    }


```

### C:\AppServ\www\DigiRail\SCR\main.py
```plaintext
#SCR/main.py
from db\_operations import check\_db\_connection, update\_database
from controller import read\_digital\_input, inicializar\_conexion\_modbus, ModbusConnectionError, process\_high\_resolution\_register, limpiar\_pantalla
from logs.config\_logger import configurar\_logging
from DataTransfer import MainTransfer
import minimalmodbus
import time
import signal

# Configurar logging
logger = configurar\_logging\(\)

D1 = 70
D2 = 71
HR\_COUNTER1\_LO = 22
HR\_COUNTER1\_HI = 23
HR\_COUNTER2\_LO = 24
HR\_COUNTER2\_HI = 25


def main\_loop\(\):
    """
    Ejecuta el bucle principal del programa, procesando operaciones Modbus continuamente.

    Esta función define un bucle infinito que, en cada iteración, espera un segundo y luego
    ejecuta las operaciones relacionadas con Modbus. Está diseñada para mantener el programa
    en ejecución y procesando datos de manera continua.

    Proceso:
        - Entra en un bucle infinito.
        - En cada iteración, pausa la ejecución durante un segundo para evitar la sobrecarga.
        - Llama a la función \`process\_modbus\_operations\` para realizar las operaciones necesarias con el dispositivo Modbus.

    Nota:
        - Este bucle es infinito y el programa debe ser detenido manualmente o mediante señales del sistema.
        - La pausa de un segundo es importante para evitar el uso excesivo de recursos, especialmente en un contexto de comunicación con hardware.
    """
    global running
    running = True
    signal.signal\(signal.SIGINT, handle\_signal\)
    signal.signal\(signal.SIGTERM, handle\_signal\)

    while running:
        logger.info\("Ejecutando iteración del bucle principal."\)
        MainTransfer\(\)
        process\_modbus\_operations\(\)
        time.sleep\(1\)
        limpiar\_pantalla\(\)


def handle\_signal\(signum, frame\):
    global running
    running = False
    logger.info\("Señal de terminación recibida. Terminando el bucle principal..."\)

def process\_modbus\_operations\(\):
    """
    Gestiona las operaciones de comunicación Modbus y base de datos.

    Establece conexiones tanto con el dispositivo Modbus como con la base de datos.
    Si ambas conexiones son exitosas, procesa las entradas digitales y los registros
    de alta resolución del dispositivo Modbus y actualiza la base de datos en consecuencia.

    - Primero, intenta establecer una conexión con la base de datos.
    - Luego, intenta establecer una conexión con el dispositivo Modbus.
    - Si ambas conexiones son exitosas:
        \* Procesa las entradas digitales del dispositivo Modbus.
        \* Procesa los registros de alta resolución del dispositivo Modbus.
    - Si alguna conexión falla, el proceso se detiene y se manejan las excepciones correspondientes.
    """
    try:
        com\_port, device\_address = inicializar\_conexion\_modbus\(\)
    except ModbusConnectionError as e:
        logger.error\(f"Error de conexión Modbus: {e}"\)
        return

    try:
        connection = establish\_db\_connection\(\)
    except DatabaseConnectionError as e:
        logger.error\(f"Error de conexión a la base de datos: {e}"\)
        return

    instrument = establish\_modbus\_connection\(com\_port, device\_address\)
   
    process\_digital\_input\(instrument, connection\)
    process\_high\_resolution\_register\(instrument, connection\)

def establish\_db\_connection\(\):
    """
    Establece una conexión con la base de datos utilizando una función auxiliar.

    Esta función utiliza \`establish\_connection\`, una función de alto nivel, para intentar
    establecer una conexión con la base de datos. Si la conexión falla, se maneja 
    la excepción correspondiente.

    Returns:
        Una conexión activa a la base de datos si es exitosa; de lo contrario, levanta una excepción.

    Proceso:
        - Intenta establecer una conexión con la base de datos utilizando \`check\_db\_connection\`.
        - Si falla la conexión, se levanta \`DatabaseConnectionError\` con un mensaje de error.
    """
    return establish\_connection\(
        check\_db\_connection, 
        "Error de conexión a la base de datos", 
        DatabaseConnectionError
    \)

def establish\_modbus\_connection\(com\_port, device\_address\):
    """
    Establece una conexión con un dispositivo Modbus utilizando un puerto serie específico.

    Utiliza la función \`establish\_connection\` para crear y configurar una instancia de 
    \`minimalmodbus.Instrument\`. Esta instancia se utiliza para interactuar con un dispositivo 
    Modbus a través de un puerto serie. En caso de error al configurar la conexión, se levanta
    una excepción \`ModbusConnectionError\`.

    Returns:
        Una instancia de \`minimalmodbus.Instrument\` configurada para comunicarse con el 
        dispositivo Modbus si la conexión es exitosa; de lo contrario, levanta una excepción.

    Proceso:
        - Intenta crear y configurar una instancia de \`minimalmodbus.Instrument\` usando el puerto
          serie especificado en \`com\_port\` y la dirección del dispositivo en \`device\_address\`.
        - Si falla la configuración del puerto serie, se levanta \`ModbusConnectionError\` con un
          mensaje de error.
    """
    return establish\_connection\(
        lambda: minimalmodbus.Instrument\(com\_port, device\_address\), 
        "Error al configurar el puerto serie", 
        ModbusConnectionError
    \)

def establish\_connection\(connect\_func, error\_message, error\_exception\):
    """
    Intenta establecer una conexión o realizar una operación y maneja las excepciones.

    Esta función general se utiliza para intentar realizar cualquier operación que pueda lanzar
    una excepción. Captura excepciones genéricas y, en caso de error, imprime un mensaje de error
    personalizado y lanza una excepción específica.

    Args:
        connect\_func \(function\): Función sin argumentos que intenta establecer una conexión o realizar una operación.
        error\_message \(str\): Mensaje de error personalizado para mostrar si la operación falla.
        error\_exception \(Exception\): Tipo de excepción a lanzar si la operación falla.

    Returns:
        El resultado de la función \`connect\_func\` si la operación es exitosa.

    Raises:
        error\_exception: Una excepción específica con un mensaje detallado si \`connect\_func\` falla.

    Proceso:
        - Intenta ejecutar \`connect\_func\`.
        - Si se produce una excepción, imprime \`error\_message\` con detalles del error y lanza \`error\_exception\`.
    """
    try:
        return connect\_func\(\)
    except Exception as e:
        logger.error\(f"{error\_message}: {e}"\)
        raise error\_exception\(f"{error\_message}. Detalles: {e}"\) from e

def process\_digital\_input\(instrument, connection\):
    """
    Procesa las entradas digitales de un dispositivo Modbus y actualiza la base de datos.

    Lee el estado de las entradas digitales del dispositivo Modbus especificado y actualiza
    la base de datos con estos valores. Se realizan lecturas para múltiples entradas digitales
    y se actualizan sus estados correspondientes en la base de datos.

    Args:
        instrument \(minimalmodbus.Instrument\): El instrumento Modbus utilizado para la lectura.
        connection \(pymysql.connections.Connection\): La conexión a la base de datos para la actualización.

    Procedimiento:
        - Lee el estado de la entrada digital 1 \(D1\) y actualiza su estado en la base de datos con la etiqueta "HR\_INPUT1\_STATE".
        - Repite el proceso para la entrada digital 2 \(D2\) con la etiqueta "HR\_INPUT2\_STATE".
    """
    process\_input\_and\_update\(instrument, connection, read\_digital\_input, D1, "HR\_INPUT1\_STATE"\)
    process\_input\_and\_update\(instrument, connection, read\_digital\_input, D2, "HR\_INPUT2\_STATE"\)
    
def process\_input\_and\_update\(instrument, connection, read\_function, address, description\):
    """
    Lee un valor de un dispositivo Modbus y actualiza la base de datos.

    Utiliza una función de lectura específica para obtener el estado o valor de una dirección
    específica en un dispositivo Modbus. Si se obtiene un valor válido \(no None\), actualiza
    la base de datos con este valor.

    Args:
        instrument \(minimalmodbus.Instrument\): El instrumento Modbus utilizado para la lectura.
        connection \(pymysql.connections.Connection\): Conexión a la base de datos para actualizar el valor.
        read\_function \(function\): Función específica de lectura de Modbus que se utilizará.
        address \(int\): Dirección en el dispositivo Modbus desde la que leer.
        description \(str\): Descripción del valor leído, utilizada para la actualización en la base de datos.

    Proceso:
        - Utiliza la función de lectura para obtener el valor de la dirección específica del dispositivo Modbus.
        - Si se obtiene un valor \(distinto de None\), actualiza la base de datos con este valor y la descripción proporcionada.
    """
    try:
        state = read\_function\(instrument, address\)
        if state is not None:
            update\_database\(connection, address, state, descripcion=description\)
    except minimalmodbus.ModbusException as e:
        raise ModbusReadError\(f"Error al leer la dirección {address} del dispositivo Modbus: {e}"\) from e



class DatabaseConnectionError\(Exception\):
    """Excepción para errores de conexión con la base de datos."""
    pass

class ModbusReadError\(Exception\):
    """Excepción para errores de lectura del dispositivo Modbus."""
    pass

main\_loop\(\)

```

### C:\AppServ\www\DigiRail\SCR\utils.py
```plaintext
# utils.py
import functools
import pymysql
from config.db\_config import get\_db\_config  



def reconnect\_on\_failure\(func\):
    """
    Decorador que intenta reconectar a la base de datos en caso de un fallo en la conexión.

    Este decorador envuelve una función que realiza operaciones de base de datos. Si se detecta
    un error de conexión operacional o de MySQL durante la ejecución de la función, intenta
    establecer una nueva conexión y reintentar la operación.

    Args:
        func \(function\): La función que se va a decorar.

    Returns:
        function: La función envuelta con lógica de manejo de errores y reconexión.
    """
    @functools.wraps\(func\)
    def wrapper\_reconnect\(\*args, \*\*kwargs\):
        try:
            return func\(\*args, \*\*kwargs\)
        except \(pymysql.OperationalError, pymysql.MySQLError\) as e:
            print\(f"Se detectó un error en la conexión a la base de datos: {e}. Intentando reconectar..."\)
            try:
                db\_config = get\_db\_config\(\)  # Obtener la configuración actualizada de la base de datos
                connection = pymysql.connect\(\*\*db\_config\)
                args = \(connection,\) + args\[1:\]
                return func\(\*args, \*\*kwargs\)
            except Exception as e:
                print\(f"No se pudo reconectar a la base de datos: {e}"\)
                return None
    return wrapper\_reconnect

@reconnect\_on\_failure
def check\_db\_connection\(\):
    """
    Establece una conexión a la base de datos utilizando la configuración definida.

    Esta función intenta conectarse a la base de datos utilizando los parámetros especificados
    en la configuración de la base de datos. Está decorada con 'reconnect\_on\_failure', lo que
    asegura que intentará reconectar automáticamente en caso de fallar la conexión inicial.

    Returns:
        pymysql.connections.Connection: Un objeto de conexión a la base de datos.
    """
    db\_config = get\_db\_config\(\)  # Obtener la configuración de la base de datos
    connection = pymysql.connect\(\*\*db\_config\)
    return connection


```

### C:\AppServ\www\DigiRail\SCR\logs\config_logger.py
```plaintext
#SCR/logs/config\_logger.py
import logging
from logging.handlers import RotatingFileHandler


class DebugAndAboveFilter\(logging.Filter\):
    """
    Filtro de registro personalizado para excluir mensajes de nivel INFO.

    Este filtro se puede aplicar a un manejador de registros \(handler\) para excluir
    los registros de nivel INFO. Es útil cuando se desea registrar mensajes de nivel
    DEBUG y superiores, pero omitir los de nivel INFO.

    Métodos:
        filter\(record\): Determina si el registro dado debe ser registrado o no.
    """
    def filter\(self, record\):
        # Excluir los registros de nivel INFO del archivo de log
        return record.levelno \!= logging.INFO

def create\_handler\(handler\_class, level, format, \*\*kwargs\):
    """
    Crea y configura un manejador de registros \(handler\) para el sistema de logging.

    Esta función es una fábrica que crea y configura un manejador de registros.
    Configura el nivel de registro, el formato y cualquier otro parámetro relevante
    para el manejador.

    Args:
        handler\_class \(logging.Handler\): La clase del manejador de registros a crear.
        level \(int\): El nivel de registro para el manejador.
        format \(str\): El formato de los mensajes de registro.
        \*\*kwargs: Argumentos adicionales específicos del manejador.

    Returns:
        logging.Handler: Un manejador de registros configurado.
    """
    handler = handler\_class\(\*\*kwargs\)
    handler.setLevel\(level\)
    handler.setFormatter\(logging.Formatter\(format\)\)
    return handler

def configurar\_logging\(\):
    """
    Configura el sistema de logging global de la aplicación.

    Esta función configura el sistema de logging con dos manejadores: uno para
    escribir en un archivo con rotación y otro para la salida de consola.
    Se establece un formato específico para los mensajes y se filtran los mensajes
    de nivel INFO del archivo de registro.

    Returns:
        logging.Logger: El objeto logger configurado para la aplicación.
    """
    logger = logging.getLogger\(\)
    if logger.hasHandlers\(\):
        return logger

    log\_format = '%\(asctime\)s - %\(levelname\)s - %\(module\)s - %\(filename\)s:%\(lineno\)d: %\(message\)s'
    log\_file = 'SCR/logs/sistema.log'
    max\_bytes = 10485760  # 10MB
    backup\_count = 5

    file\_handler = create\_handler\(
        RotatingFileHandler, 
        logging.DEBUG, 
        log\_format, 
        filename=log\_file, 
        maxBytes=max\_bytes, 
        backupCount=backup\_count
    \)
    file\_handler.addFilter\(DebugAndAboveFilter\(\)\)  # Aplicar el filtro

    console\_handler = create\_handler\(
        logging.StreamHandler, 
        logging.INFO, 
        log\_format
    \)

    logger.setLevel\(logging.DEBUG\)  # Nivel más bajo para capturar todos los mensajes
    logger.addHandler\(file\_handler\)
    logger.addHandler\(console\_handler\)

    return logger

# Configurar el logger con un nivel específico
configurar\_logging\(\)

```
