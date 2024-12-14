Feature:📑 US 002 Redirección - Acceso a la Página Categories de Administración de FastFood.

    COMO Admin de la plataforma FastFood,
    QUIERO acceder a la interfaz “Categories” de administración,
    PARA visualizar la lista de categorías.

    Background:
        Given que el Usuario ha iniciado sesión con credenciales con rol Administrador
        And de que el admin se encuentra en la Interfaz Principal de Administración "Dashboard.aspx"

    Scenario:🧪 US 002 - TS 002 - TC 001 - Validar la correcta redirección a la Interfaz “Categories” de Administración, mediante la URL.

        When cuando introduce la Url "/Admin/Category.aspx" en la barra de direcciones del navegador
        Then el sistema se redirecciona a la Interfaz Categories de Administración.

    Scenario:🧪 US 002 - TS 002 - TC 002 - Validar, redireccionar a la Interfaz “Categories” de Administración, mediante el TabMenu, seleccionando la opción funcional Categories.

        When hace Click en Categories del Tab Menu visible en la parte izquierda de la pantalla
        Then el sistema se redirecciona a la Interfaz Categories de Administración.

    Scenario:🧪 US 002 - TS 002 - TC 003 - Intentar Validar, redireccionar a la Interfaz “Categories” de Administración, mediante el Icono de la Card Categories.

    When hace Click en el Icono de la Card Categories
    Then el sistema se redirecciona a la Interfaz Categories de Administración.

    Scenario:🧪 US 002 - TS 002 - TC 004 - Intentar Validar, redireccionar a la Interfaz “Categories” de Administración, mediante el View Details de la Card Categories.

    When hace Click en el View Details de la Card Categories
    Then el sistema se redirecciona a la Interfaz Categories de Administración.


