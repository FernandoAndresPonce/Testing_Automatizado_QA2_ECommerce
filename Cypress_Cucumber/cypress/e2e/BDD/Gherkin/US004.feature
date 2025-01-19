
Feature: 📑 US 004 - Text Input Categoría Formulario - Completar los campos del formulario, para crear una Categoría.

    COMO Admin de la web FastFood,
    QUIERO crear una categoría,
    PARA agregarla a la tabla de la lista de categorías.

    Background:
        Given que el Usuario ha iniciado sesión con credenciales con rol Administrador
        And de que el admin se encuentra en la Interfaz del Formulario para crear una Categoria de Administración como "/Admin/CategoryForm.aspx"

    Scenario Outline: 🧪 US 004 - TS 004 - TC 001:  Validar, completar campo Category Name exitosamente, al ingresar datos Validos.
        When el usuario ingresa un dato valido como '<valid_data>' en el campo Category Name
        And presiona el botón Add
        Then el sistema lo redireccionara automaticament a la página Category como "/Admin/Category.aspx".

        Examples:
            | valid_data                                         |
            | P                                                  |
            | AbcdefghijklmnDopqrstuvwxyzAbcdefghijklmnDopqrstuv |
            | Pizza contemporanea                                |

    Scenario Outline: 🧪 US 004 - TS 004 - TC 002:  Validar, completar campo Category Name Incorrectamente, al ingresar datos Invalidos.
        When el usuario ingresa un dato invalido como '<invalid_data>' en el campo Category Name
        And presiona el botón Add
        Then debería el sistema redirigirlo automaticamente hacia el Text Input Category Name
        And debería aparecer una advertencia con un mensaje de color rojo, al lado derecho de la Label Category Name, con la Advertencia de Error como '<validationError>'.

        Examples:
            | invalid_data | validationError                  |
            | 1            | (Name must be in character only) |
            | $            | (Name must be in character only) |
            |              | (Required Category Name)         |
