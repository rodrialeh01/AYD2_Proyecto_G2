# Pruebas de Aceptacion

## Descripción
En esta sección se describen las pruebas de aceptación realizadas para el sistema de MarketPlace desarrollado, se llevaron a cabo en base a las historias de usuario y funcionalidades que se debían implementar. A continuación, se presentan las pruebas realizadas y su estado.

<table>
    <tr>
        <th colspan="3">Caso de Prueba de Aceptación</th>
    </tr>
    <tr>
        <th >Código: 001</th>
        <th colspan="2">Historia de Usuario: 201901604 - Ana Belén Contreras Orozco</th>
    </tr>
    <tr>
        <th>Nombre </th>
        <td colspan="2">Endpoint para ingresar foto de perfil para los usuarios</td>
    </tr>
    <tr>
        <th>Descripción </th>
        <td colspan="2">Yo como usuario quiero poder ingresar una foto de perfil para que las personas me puedan identificar de una manera mas fácil.</td>
    </tr>
    <tr>
        <th>Entrada/Pasos de Ejecución </th>
        <td colspan="2">
        1. Inicializar el Backend. <br> 
        2. Ingresar al endpoint '/users/addImage'. <br>
        3. Ingresar la imagen como form-data, de Key se ingresa 'image' y de Value la imagen a subir. <br>
        4. Enviar la petición. <br>
        </td>
    </tr>
    <tr>
        <th>Resultado Esperado </th>
        <td colspan="2"> Se espera un Json de respuesta con mensaje "Imagen Subida Correctamente" y código 200. </td>
    </tr>
    <tr>
        <th>Evaluación de la prueba </th>
        <td colspan="2"> Exitosa, puede revisarse en bucket de S3 para comprobarse que la imagen se subió correctamente.</td>
    </tr>
</table>

<table>
    <tr>
        <th colspan="3">Caso de Prueba de Aceptación</th>
    </tr>
    <tr>
        <th >Código: 002</th>
        <th colspan="2">Historia de Usuario: 20204745 - Allen Giankarlo Román Vásquez</th>
    </tr>
    <tr>
        <th>Nombre </th>
        <td colspan="2">Agregar usuarios a Administrador</td>
    </tr>
    <tr>
        <th>Descripción </th>
        <td colspan="2">Yo como administrador, deseo agregar tipo Adminsitrador para un mejor control de MarketPlace.</td>
    </tr>
    <tr>
        <th>Entrada/Pasos de Ejecución </th>
        <td colspan="2">
        1. Inicializar el Backend. <br>
        2. Inicializar el Frontend. <br>
        3. Iniciar sesión con un usuario administrador. <br>
        4. Dirigirse a la sección de Crear Administrador. <br>
        5. Ingresar los datos del nuevo administrador. <br>
        6. Enviar la petición. <br>
        </td>
    </tr>
    <tr>
        <th>Resultado Esperado </th>
        <td colspan="2">Se espera un Json de respuesta con mensaje "User Created Successfully" y código 200.</td>
    </tr>
    <tr>
        <th>Evaluación de la prueba</th>
        <td colspan="2">Exitosa</td>
    </tr>
</table>

<table>
    <tr>
        <th colspan="3">Caso de Prueba de Aceptación</th>
    </tr>
    <tr>
        <th >Código: 003</th>
        <th colspan="2">Historia de Usuario: 201900042 - Rodrigo Alejandro Hernández De León</th>
    </tr>
    <tr>
        <th>Nombre </th>
        <td colspan="2">Carrito de Compras por lado del cliente</td>
    </tr>
    <tr>
        <th>Descripción </th>
        <td colspan="2">Yo como cliente quiero contar con la opción de un carrito de compras en donde pueda seleccionar de 1 a muchos productos para realizar la operación de compra en conjunto.</td>
    </tr>
    <tr>
        <th>Entrada/Pasos de Ejecución </th>
        <td colspan="2">
         1. Inicializar el Backend. <br>
         2. Inicializar el Frontend. <br>
            3. Ingresar al Frontend con un usuario cliente. <br>
            4. Seleccionar un producto. <br>
            5. Agregar el producto al carrito. <br>
            6. Seleccionar cero o más productos. <br>
            7. Click en Ir a pagar. <br>
            8. Ingresar los datos de la tarjeta. <br>
            9. Click en pagar por tarjeta o Paypal. <br>
            </td>
        </td>
    </tr>
    <tr>
        <th>Resultado Esperado </th>
        <td colspan="2">Por parte del back, se espera un Json de respuesta con mensaje "Purchase Created Successfully" y código 201. En el front, </td>
    </tr>
    <tr>
        <th>Evaluación de la prueba </th>
        <td colspan="2">Exitosa</td>
    </tr>
</table>

<table>
    <tr>
        <th colspan="3">Caso de Prueba de Aceptación</th>
    </tr>
    <tr>
        <th >Código: 004</th>
        <th colspan="2">Historia de Usuario: 201901772 - Daniel Reginaldo Dubón Rodríguez</th>
    </tr>
    <tr>
        <th>Nombre </th>
        <td colspan="2">Valoración general de un producto</td>
    </tr>
    <tr>
        <th>Descripción </th>
        <td colspan="2">Yo como cliente quiero ver la valoración general de todos los reviews realizados por otros clientes de un producto</td>
    </tr>
    <tr>
        <th>Entrada/Pasos de Ejecución </th>
        <td colspan="2">
            1. Inicializar el Backend. <br>
            2. Inicializar el Frontend. <br>
            3. Ingresar desdel el Frontend a la sección de productos. <br>
            4. Seleccionar un producto. <br>
            5. Ir a la sección de reviews, en la parter inferior se verá el promedio de las valoraciones realizadas por los clientes, ademas que se verá las reseñas realizadas por los usuarios. <br>
        </td>
    </tr>
    <tr>
        <th>Resultado Esperado </th>
        <td colspan="2">Por parte del backend se espera un json con el mensaje "Reviews found" y código 200, en el frontend se verá reflejado el promedio de las valoraciones realizadas por los clientes, ademas que se verán las reseñas realizadas por los usuarios.</td>
    </tr>
    <tr>
        <th>Evaluación de la prueba </th>
        <td colspan="2">Exitosa</td>
    </tr>
</table>

<table>
    <tr>
        <th colspan="3">Caso de Prueba de Aceptación</th>
    </tr>
    <tr>
        <th >Código: 004</th>
        <th colspan="2">Historia de Usuario: 201901772 - Daniel Reginaldo Dubón Rodríguez</th>
    </tr>
    <tr>
        <th>Nombre </th>
        <td colspan="2">Creación de una valoración de un producto</td>
    </tr>
    <tr>
        <th>Descripción </th>
        <td colspan="2">Yo como cliente quiero dejar una reseña sobre un producto seleccionado</td>
    </tr>
    <tr>
        <th>Entrada/Pasos de Ejecución </th>
        <td colspan="2">
            1. Inicializar el Backend. <br>
            2. Inicializar el Frontend. <br>
            3. Ingresar desdel el Frontend a la sección de productos. <br>
            4. Seleccionar un producto. <br>
            5. Valorar el producto, completando el formulario de valoración. <br>
        </td>
    </tr>
    <tr>
        <th>Resultado Esperado </th>
        <td colspan="2">Por parte del backend se espera un json con el mensaje "Review Created Successfully" y código 200, en el frontend se verá reflejado el promedio de las valoraciones realizadas por los clientes, ademas que se verá la review creada por el usuario.</td>
    </tr>
    <tr>
        <th>Evaluación de la prueba </th>
        <td colspan="2">Exitosa</td>
    </tr>
</table>

<table>
    <tr>
        <th colspan="3">Caso de Prueba de Aceptación</th>
    </tr>
    <tr>
        <th >Código: 004</th>
        <th colspan="2">Historia de Usuario: 201901772 - Daniel Reginaldo Dubón Rodríguez</th>
    </tr>
    <tr>
        <th>Nombre </th>
        <td colspan="2">Edición de una valoración de un producto</td>
    </tr>
    <tr>
        <th>Descripción </th>
        <td colspan="2">Yo como cliente quiero editar una reseña y valoración sobre un producto antes valorado</td>
    </tr>
    <tr>
        <th>Entrada/Pasos de Ejecución </th>
        <td colspan="2">
            1. Inicializar el Backend. <br>
            2. Inicializar el Frontend. <br>
            3. Ingresar desdel el Frontend a la sección de productos. <br>
            4. Seleccionar un producto. <br>
            5. Buscar la reseña realizada por el usuario. <br>
            6. Hacer click en el botón de editar. <br>
            7. Llenar el formulario de edición. <br>
            8. Enviar la petición. <br>
        </td>
    </tr>
    <tr>
        <th>Resultado Esperado </th>
        <td colspan="2">Por parte del backend se espera un json con el mensaje "Review Updated Successfully" y código 200, en el frontend se verá reflejado el nuevo calculo del promedio de las valoraciones realizadas por los clientes, ademas que se verá la review editada por el usuario.</td>
    </tr>
    <tr>
        <th>Evaluación de la prueba </th>
        <td colspan="2">Exitosa</td>
    </tr>
</table>

<table>
    <tr>
        <th colspan="3">Caso de Prueba de Aceptación</th>
    </tr>
    <tr>
        <th >Código: 004</th>
        <th colspan="2">Historia de Usuario: 201901772 - Daniel Reginaldo Dubón Rodríguez</th>
    </tr>
    <tr>
        <th>Nombre </th>
        <td colspan="2">Eliminación de una reseña y valoración de un producto</td>
    </tr>
    <tr>
        <th>Descripción </th>
        <td colspan="2">Yo como cliente quiero eliminar una reseña y valoración sobre un producto antes valorado</td>
    </tr>
    <tr>
        <th>Entrada/Pasos de Ejecución </th>
        <td colspan="2">
            1. Inicializar el Backend. <br>
            2. Inicializar el Frontend. <br>
            3. Ingresar desdel el Frontend a la sección de productos. <br>
            4. Seleccionar un producto. <br>
            5. Buscar la reseña realizada por el usuario. <br>
            6. Hacer click en el botón de eliminar. <br>
        </td>
    </tr>
    <tr>
        <th>Resultado Esperado </th>
        <td colspan="2">Por parte del backend se espera un json con el mensaje "Review Deleted Successfully" y código 200, en el frontend se verá reflejado el nuevo calculo del promedio de las valoraciones realizadas por los clientes, ademas que ya no se verá la review eliminada por el usuario.</td>
    </tr>
    <tr>
        <th>Evaluación de la prueba </th>
        <td colspan="2">Exitosa</td>
    </tr>
</table>

<table>
    <tr>
        <th colspan="3">Caso de Prueba de Aceptación</th>
    </tr>
    <tr>
        <th >Código: 004</th>
        <th colspan="2">Historia de Usuario: 201901772 - Daniel Reginaldo Dubón Rodríguez</th>
    </tr>
    <tr>
        <th>Nombre </th>
        <td colspan="2">Eliminación de una reseña y valoración de un producto</td>
    </tr>
    <tr>
        <th>Descripción </th>
        <td colspan="2">Yo como cliente quiero eliminar una reseña y valoración sobre un producto antes valorado</td>
    </tr>
    <tr>
        <th>Entrada/Pasos de Ejecución </th>
        <td colspan="2">
            1. Inicializar el Backend. <br>
            2. Inicializar el Frontend. <br>
            3. Ingresar desdel el Frontend a la sección de productos. <br>
            4. Seleccionar un producto. <br>
            5. Buscar la reseña realizada por el usuario. <br>
            6. Hacer click en el botón de eliminar. <br>
        </td>
    </tr>
    <tr>
        <th>Resultado Esperado </th>
        <td colspan="2">Por parte del backend se espera un json con el mensaje "Review Deleted Successfully" y código 200, en el frontend se verá reflejado el nuevo calculo del promedio de las valoraciones realizadas por los clientes, ademas que ya no se verá la review eliminada por el usuario.</td>
    </tr>
    <tr>
        <th>Evaluación de la prueba </th>
        <td colspan="2">Exitosa</td>
    </tr>
</table>

<table>
    <tr>
        <th colspan="3">Caso de Prueba de Aceptación</th>
    </tr>
    <tr>
        <th >Código: 005</th>
        <th colspan="2">Historia de Usuario: 202010918 - Andrea María Cabrera Rosito</th>
    </tr>
    <tr>
        <th>Nombre </th>
        <td colspan="2">Revisión de Ingresos de Vendedor</td>
    </tr>
    <tr>
        <th>Descripción </th>
        <td colspan="2">Yo como vendedor necesito una manera que en Marketplace pueda hacer revisión detallada de los ingresos que he generado al publicar mis productos en la plataforma.</td>
    </tr>
    <tr>
        <th>Entrada/Pasos de Ejecución </th>
        <td colspan="2">
        1. Inicializar el Backend. <br>
        2. Inicializar el Frontend. <br>
        3. Ingresar desde el front con un perfil de vendedor. <br>
        4. Dirigirse a la sección de Información. <br>
        5. Revisar la sección de Ingresos generados. <br>
        </td>
    </tr>
    <tr>
        <th>Resultado Esperado </th>
        <td colspan="2">Por parte del backend se espera un json con el mensaje "Ingresos found" y código 200, en el frontend se verá reflejado el total de dichos ingresos y podrá revisarse a detalle qué productos se han vendido.</td>
    </tr>
    <tr>
        <th>Evaluación de la prueba </th>
        <td colspan="2">Exitosa</td>
    </tr>
</table>

<table>
    <tr>
        <th colspan="3">Caso de Prueba de Aceptación</th>
    </tr>
    <tr>
        <th >Código: 006</th>
        <th colspan="2">Historia de Usuario: 201901772 - Daniel Reginaldo Dubón Rodríguez</th>
    </tr>
    <tr>
        <th>Nombre </th>
        <td colspan="2">Reporte de Calidad de Productos segun valoraciones de los clientes</td>
    </tr>
    <tr>
        <th>Descripción </th>
        <td colspan="2">Yo como administrador, necesito que en Marketplace pueda hacer revisión de un reporte detallado que muestre la calidad de los productos que se han publicado en la plataforma, obteniendo el porcentaje de las distintas categorías de valoraciones realizadas por los clientes.</td>
    </tr>
    <tr>
        <th>Entrada/Pasos de Ejecución </th>
        <td colspan="2">
        1. Inicializar el Backend. <br>
        2. Inicializar el Frontend. <br>
        3. Ingresar desde el front con un perfil de administrador.<br>
        4. Dirigirse a la sección de Reportes. <br>
        5. Seleccionar el reporte de calidad de productos. <br>
        </td>
    </tr>
    <tr>
        <th>Resultado Esperado </th>
        <td colspan="2">En parte de Backend, se espera un json con el mensaje "Quality Report Found" y código 200. Por parte del frontend, se podrá visualizar un gráfico de pastel con el porcentaje de las distintas categorías de valoraciones realizadas por los clientes.</td>
    </tr>
    <tr>
        <th>Evaluación de la prueba </th>
        <td colspan="2">Exitosa</td>
    </tr>
</table>

<table>
    <tr>
        <th colspan="3">Caso de Prueba de Aceptación</th>
    </tr>
    <tr>
        <th >Código: 006</th>
        <th colspan="2">Historia de Usuario: 202010918 - Andrea María Cabrera Rosito</th>
    </tr>
    <tr>
        <th>Nombre </th>
        <td colspan="2">Reporte de Ventas en un rango determinado</td>
    </tr>
    <tr>
        <th>Descripción </th>
        <td colspan="2">Yo como administrador, necesito que en Marketplace pueda hacer revisión de un reporte detallado que muestre según fecha inicial y final todas las transacciones que se han realizado en la plataforma.</td>
    </tr>
    <tr>
        <th>Entrada/Pasos de Ejecución </th>
        <td colspan="2">
        1. Inicializar el Backend. <br>
        2. Inicializar el Frontend. <br>
        3. Ingresar desde el front con un perfil de administrador.<br>
        4. Dirigirse a la sección de Reportes. <br>
        5. Seleccionar el reporte de fechas de ventas con rango de fechas a revisar. <br>
        6. Seleccionar la fecha inicial y final. <br>
        </td>
    </tr>
    <tr>
        <th>Resultado Esperado </th>
        <td colspan="2">En parte de Backend, se espera un json con el mensaje "Ventas Found" y código 200. Por parte del frontend, se podrá revisar en una tabla los detalles de las ventas solamente en el rango determinado. </td>
    </tr>
    <tr>
        <th>Evaluación de la prueba </th>
        <td colspan="2">Exitosa</td>
    </tr>
</table>

<table>
    <tr>
        <th colspan="3">Caso de Prueba de Aceptación</th>
    </tr>
    <tr>
        <th >Código: 007</th>
        <th colspan="2">Historia de Usuario: 202010918 - Andrea María Cabrera Rosito</th>
    </tr>
    <tr>
        <th>Nombre </th>
        <td colspan="2">Revisión de Ventas efectuadas de vendedor</td>
    </tr>
    <tr>
        <th>Descripción </th>
        <td colspan="2">Yo como vendedor necesito que el Marketplace me permita revisar las ventas que se han efectuado sobre los productos que tengo en vista.</td>
    </tr>
    <tr>
        <th>Entrada/Pasos de Ejecución </th>
        <td colspan="2">
        1. Inicializar el Backend. <br>
        2. Inicializar el Frontend. <br>
        3. Ingresar desde el front con un perfil de vendedor. <br>
        4. Dirigirse a la sección de Información. <br>
        5. Revisar la sección de Ventas realizadas. <br>
        </td>
    </tr>
    <tr>
        <th>Resultado Esperado </th>
        <td colspan="2">
        Por parte del backend se espera un json con el mensaje "Purchases Found" y código 200, en el frontend se verá reflejado el total de dichas ventas y podrá revisarse a detalle qué productos se han vendido.
        </td>
    </tr>
    <tr>
        <th>Evaluación de la prueba </th>
        <td colspan="2"> Exitosa </td>
    </tr>
</table>

<table>
    <tr>
        <th colspan="3">Caso de Prueba de Aceptación</th>
    </tr>
    <tr>
        <th >Código: 008</th>
        <th colspan="2">Historia de Usuario: 202004745 - Allen Giankarlo Román Vásquez</th>
    </tr>
    <tr>
        <th>Nombre </th>
        <td colspan="2">Eliminación de usuario como administrador</td>
    </tr>
    <tr>
        <th>Descripción </th>
        <td colspan="2">Yo como administrador necesito poder eliminar un usuario ya sea de tipo vendedor o cliente si considero que no cumple con las reglas de la plataforma</td>
    </tr>
    <tr>
        <th>Entrada/Pasos de Ejecución </th>
        <td colspan="2">
        1. Inicializar el Backend. <br>
        2. Inicializar el Frontend. <br>
        3. Ingresar desde el front con un perfil de administrador. <br>
        4. Dirigirse a la sección de Usuarios. <br>
        5. Buscar el usuario a eliminar. <br>
        6. Hacer click en el botón de eliminar. <br>
        </td>
    </tr>
    <tr>
        <th>Resultado Esperado </th>
        <td colspan="2"> Por parte del backend se espera un json con el mensaje "User Deleted Successfully" y código 200, en el frontend se verá reflejado que el usuario ya no se encuentra en la lista de usuarios.</td>
    </tr>
    <tr>
        <th>Evaluación de la prueba </th>
        <td colspan="2">Exitosa</td>
    </tr>
</table>