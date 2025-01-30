Feature: 📑 US 005 - File Input Categoría Formulario - Completar los campos del formulario, para crear una Categoría.

    COMO Admin de la web FastFood,
    QUIERO agregar una imagen,
    PARA identificar la categoría con una representación visual.

    Background:
        Given que el Usuario ha iniciado sesión con credenciales con rol Administrador
        And se encuentra en la Interfaz Formulario Add Category de Administración como "/Admin/CategoryForm.aspx"

    Scenario Outline: 🧪 US 005 - TS 005 - TC 001: Validar, cargar previsualización de una imagen, al ingresar una imagen en el File-Input.
        When hace Click en el File Input Category Image
        And carga una Imagen como '<image>'
        Then deberia previsualizarse la imagen añadida.

        Examples:
            | image              |
            | Desserts.png       |
            | 12$34 Desserts.png |
            | 12$34.png          |

    Scenario: 🧪 US 005 - TS 005 - TC 002: Validar, No cargar previsualización de una imagen.
        Then deberia previsualizarse un Placeholder, como imagen pre establecida.

    Scenario: 🧪 US 005 - TS 005 - TC 003: Validar, Intentar cargar previsualización de una imagen,  al No ingresar una imagen en el File-Input.
        When hace Click en el File Input Category Image
        And NO carga ninguna Imagen
        Then deberia previsualizarse un Placeholder, como imagen pre establecida.

