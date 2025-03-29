Feature: 📑 US 007 - File Input Categoría Formulario - Previsualizacion de una imagen al una extension especifica en el File Input.

    COMO Admin de la web FastFood,
    QUIERO agregar una imagen,
    PARA identificar la categoría con una representación visual.

    Background:
        Given que el Usuario ha iniciado sesión con credenciales con rol Administrador
        And se encuentra en la Interfaz Formulario Add Category de Administración como "/Admin/CategoryForm.aspx"

    Scenario: 🧪 US 007 - TS 007 - TC 001: Intentar Validar - el File Input Category Image, al añadir la extension bmp.