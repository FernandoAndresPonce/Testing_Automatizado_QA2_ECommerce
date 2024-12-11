Feature: Acceso a la Página Principal de Administración de FastFood

    Como: admin de la web FastFood,
    Quiero: acceder a la interfaz principal de administración,
    Para: gestionar todas las tareas relacionadas con la plataforma.

    Scenario: US 001 - TS 001 - TC 001 - Validar, redireccionar a la Interfaz Principal de Administración, cuando se introduce la URL correspondiente

        Given que el usuario se encuentra en la página principal de la plataforma
        And esta Logeado como Admin
        And se encuentra en la Pagina Default del Usuario
        When selecciona la barra de direcciones del navegador, introduce la Url para redireccionarse a la interfaz principal de Administracion
        Then lo redirecciona a la Interfaz Principal de administración "Dashboard.aspx"
