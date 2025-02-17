Feature: 📑 US 006 - File Input Categoría Formulario - Completar los campos del formulario, para crear una Categoría.

    COMO Admin de la web FastFood,
    QUIERO agregar una imagen,
    PARA identificar la categoría con una representación visual.

    Background:
        Given que el Usuario ha iniciado sesión con credenciales con rol Administrador
        And se encuentra en la Interfaz Formulario Add Category de Administración como "/Admin/CategoryForm.aspx"
        And completa el Text Input “Category Name”, con una Cadena de Texto valida.

    Scenario: 🧪 US 006 - TS 006 - TC 001:  Validar - Crear una categoria existosamente, al ingresar un imagen en el file-input.

        When carga una imagen valida, en el File Input Category Image
        And hace click en el boton Add
        Then deberia redireccionarse a la Interfaz Category de Administracion como "/Admin/Category.aspx"

    Scenario: 🧪 US 006 - TS 006 - TC 002:  Intentar Validar - Crear una categoria existosamente, al no ingresar ninguna imagen en el file-input.

        When hace click en el boton Add
        Then deberia redireccionarse a la Interfaz Category de Administracion como "/Admin/Category.aspx"
