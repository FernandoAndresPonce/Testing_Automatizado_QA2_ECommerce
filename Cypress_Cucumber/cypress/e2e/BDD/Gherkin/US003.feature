Feature:📑 - US 003 - Redirección - Acceso a la Pagina Add Category de Administración de FastFood.

    COMO admin de la plataforma FastFood,
    QUIERO acceder al “Formulario Categories”,
    PARA agregar una nueva categoría.

    Background:
        Given que el Usuario ha iniciado sesión con credenciales con rol Administrador
        And de que el admin se encuentra en la Interfaz Category de Administración como "/Admin/Category.aspx"

    Scenario:🧪 US 003 - TS 003 - TC 001 - Validar, redireccionar a la Interfaz “Formulario de Categories” de Administración, mediante el Botón Add.

    When hace Click en el Boton Add
    Then el sistema se redirecciona a la Interfaz Add Category de Administración como "/Admin/CategoryForm.aspx".

    Scenario:🧪 US 003 - TS 003 - TC 002 - Validar, redireccionar a la Interfaz “Formulario de una Categoria” de Administración, mediante la URL.

    When cuando introduce la Url "/Admin/CategoryForm.aspx" en la barra de direcciones del navegador
    Then el sistema se redirecciona a la Interfaz Add Category de Administración como "/Admin/CategoryForm.aspx".