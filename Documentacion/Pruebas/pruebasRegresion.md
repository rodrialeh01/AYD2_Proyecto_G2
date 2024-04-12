# Pruebas de Regresion

## Descripción

Las pruebas de regresión son pruebas que se realizan para verificar que los cambios realizados en el código no afecten el funcionamiento de las funcionalidades ya existentes. En este caso, se realizaron las pruebas sobre las nuevas funcionalidades agregadas:

- Carrito de Compras
- Compra
- Vista de ventas por vendedor
- Vista de Ingresos de un vendedor
- Reseña - Valoracion general de un producto
- Ingresar foto a reseñas
- Ingreso de foto de perfil en el registro de usuario
- Edición de un perfil
- Un administrador ahora puede agregar y editar usuarios tipo admin
- Verificación de un usuario
- Reporte del % de calidad de productos por medio de las reseñas
- Reporte del % de tipo de usuarios
- Historial de transacciones (compras y ventas)
- Reporte de las ventas realizadas en un rango de fechas
- Reporte de top 10 vendedores con más ventas

<table>
    <tr>
        <th>Caso de Prueba</th>
        <th>Descripción</th>
        <th>Estado</th>
    </tr>
    <tr>
        <td>Prueba 1</td>
        <td>Al crear un usuario, se subió la foto de perfil a S3 y se guardó con el usuario correspondiente</td>
        <td>Exitosa</td>
    </tr>
    <tr>
        <td>Prueba 2</td>
        <td>Al editar un usuario, se actualizaron los datos volátiles como el usuario y la foto de perfil, luego estos se vieron reflejados.</td>
        <td>Exitosa</td>
    </tr>
    <tr>
        <td>Prueba 3</td>
        <td>Se agregó la funcionalidad de agregar productos a el carrito de compra, se verificó que se agregaran correctamente y se mostraran en la vista de carrito de compra.</td>
        <td>Exitosa</td>
    </tr>
    <tr>
        <td>Prueba 4</td>
        <td>Se agregó la funcionalidad de realizar una compra, se verificó que se realizaran correctamente y se mostraran en la vista de historial de transacciones. Además se revisó que todo dato sensible se encriptara</td>
        <td>Exitosa</td>
    </tr>
    <tr>
        <td>Prueba 5</td>
        <td>Se agregó la funcionalidad de ver las ventas realizadas por un vendedor, se verificó que se mostraran correctamente y que estas si existieran realmente.</td>
        <td>Exitosa</td>
    </tr>
    <tr>
        <td>Prueba 6</td>
        <td>Se agregó la funcionalidad de ver los ingresos totales de el vendedor que se encontrara con sesión iniciada.</td>
        <td>Exitosa</td>
    </tr>
    <tr>
        <td>Prueba 7</td>
        <td>Se agregó la vista de las reviews generales de un producto específico, contando correctamente todas las reseñas y generando en base a estas la general.</td>
        <td>Exitosa</td>
    </tr>
    <tr>
        <td>Prueba 8</td>
        <td>Se agregó la funcionalidad de agregar una foto a una reseña, se verificó que se subiera correctamente y se mostrara en la vista de reseñas.</td>
        <td>Exitosa</td>
    </tr>
    <tr>
        <td>Prueba 9</td>
        <td>Se agregó la funcionalidad de agregar un usuario tipo admin, se verificó que se creara correctamente y se mostrara en la vista de usuarios.</td>
        <td>Exitosa</td>
    </tr>
    <tr>
        <td>Prueba 10</td>
        <td>Para un administrador, ahora es posible que este pueda agregar perfiles de administradores nuevos y editarlos si es necesario.</td>
        <td>Exitosa</td>
    </tr>
    <tr>
        <td>Prueba 11</td>
        <td>Se agregó la funcionalidad de verificar un usuario, para que así pueda existir en el sitio.</td>
        <td>Exitosa</td>
    </tr>
    <tr>
        <td>Prueba 12</td>
        <td>Se agregó la funcionalidad de generar un reporte del % de calidad de los productos, se verificó que se generara correctamente y este pudiera ser accedido por el adminsitrador.</td>
        <td>Exitosa</td>
    </tr>
    <tr>
        <td>Prueba 13</td>
        <td>Se agregó la funcionalidad de generar un reporte del % de tipo de usuarios en base a los que se registraron al sistema.</td>
        <td>Exitosa</td>
    </tr>
    <tr>
        <td>Prueba 14</td>
        <td>Se agregó la funcionalidad de generar un reporte en la vista del administrador, donde se pueden revisar las compras y ventas realizadas en MarketPlace.</td>
        <td>Exitosa</td>
    </tr>
    <tr>
        <td>Prueba 15</td>
        <td>Se agregó la funcionalidad de generar un reporte en la vista del administrador, donde se pueden revisar las ventas realizadas en un rango de fechas (inicio y fin).</td>
        <td>Exitosa</td>
    </tr>
    <tr>
        <td>Prueba 16</td>
        <td>Se agregó la funcionalidad de generar un reporte en la vista del administrador, donde se pueden revisar los top 10 vendedores con más ventas.</td>
        <td>Exitosa</td>
    </tr>
</table>

Cabe mencionar que, como parte de funcionalidades generales y más específicas para nosotros los desarrolladores, se implementaron Logs y Bitácoras, para poder revisar cada acción realizada ya sea en el backend o en la base de datos.

En este caso, como pruebas se tuvieron:
- Guardado de log en el archivo de logs .txt
- Guardado en la bitácora de la base de datos de cada acción realizada en el sistema

### Pruebas 
<table>
    <tr>
        <th>Caso de Prueba</th>
        <th>Descripción</th>
        <th>Estado</th>
    </tr>
    <tr>
        <td>Prueba LOG1</td>
        <td>Se crea el archivo de log con extensión .txt si no existe</td>
        <td>Exitosa</td>
    </tr>
    <tr>
        <td>Prueba LOG2</td>
        <td>Se guarda el timestamp, descripción con endpoint y demás detalles en el log</td>
        <td>Exitosa</td>
    </tr>
    <tr>
        <td>Prueba BITACORA1</td>
        <td>Se guarda la acción realizada sobre la base de datos con sus respectivos detalles</td>
        <td>Exitosa</td>
    </tr>
    <tr>
        <td>Prueba BITACORA2</td>
        <td>Es posible visualizar la bitácora desde el frontend</td>
        <td>Exitosa</td>
    </tr>
</table>


### Observaciones:
Todas las pruebas realizadas fueron exitosas, por lo que se puede concluir que las nuevas funcionalidades agregadas no afectaron el funcionamiento de las funcionalidades ya existentes.

### Posibles acciones correctivas:
En caso de que alguna de las pruebas hubiera fallado, se debería revisar el código de la funcionalidad correspondiente (primeramente revisar los servicios de la nube de AWS, ya que se utilizan para almacenar las fotos de perfil y las fotos de las reseñas) y corregir el error encontrado. Si no se encuentra el error por la parte de la nube, se deberá revisar el código de la funcionalidad en el backend y frontend, para corregir el error encontrado - Igualmente, ya que también se implementarion Logs y Bitácoras, se podría revisar estos para encontrar el error o bien, si algún usuario no permitido intentó realizar alguna acción en el sistema.