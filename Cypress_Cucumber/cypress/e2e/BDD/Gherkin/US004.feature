
Feature: 📑 US 004 - Text Input Categoría Formulario - Completar los campos del formulario, para crear una Categoría.

    COMO Admin de la web FastFood,
    QUIERO crear una categoría,
    PARA agregarla a la tabla de la lista de categorías.

    Background:
        Given que el Usuario ha iniciado sesión con credenciales con rol Administrador
        And de que el admin se encuentra en la Interfaz del Formulario para crear una Categoria de Administración como "/Admin/CategoryForm.aspx"

    Scenario Outline: Scenario Outline name:🧪 US 004 - TS 004 - TC 001 -  Validar, completar campo Category Name exitosamente, al ingresar datos Validos.
        When el usuario ingresa un dato como '<dato>' en el campo Category Name

        Examples:
            | dato |
            | f    |
            | k    |
