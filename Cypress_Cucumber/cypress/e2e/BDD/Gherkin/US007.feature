Feature: 📑 US 007 - File Input Categoría Formulario - Previsualizacion de una imagen al una extension especifica en el File Input.

    COMO Admin de la web FastFood,
    QUIERO agregar una imagen,
    PARA identificar la categoría con una representación visual.

    Background:
        Given que el Usuario ha iniciado sesión con credenciales con rol Administrador
        And se encuentra en la Interfaz Formulario Add Category de Administración como "/Admin/CategoryForm.aspx"
        And en el apartado Category Image, puede visualizar un placeholder 

    Scenario Outline: 🧪 US 007 - TS 007 - TC 001: Intentar Validar - el File Input Category Image, al añadir extensiones Validas.
        When carga una imagen en el File Input Category Image, con una extension valida como '<valid_extension>'
        Then el File Input Category Image no deberia aparecer Ninguna Advertencia
        And el placeholder deberia ser reemplazado por la imagen precargada.

        Examples:
            | valid_extension |
            | .jpg            |
