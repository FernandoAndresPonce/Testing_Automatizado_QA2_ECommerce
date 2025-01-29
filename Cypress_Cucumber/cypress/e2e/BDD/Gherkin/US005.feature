Corregir =>

Background:
• Given: de que el admin se encuentra en la página de agregar categoría http://desarrollowebecommerce.somee.com/Admin/CategoryForm.aspx.
• And: completa el Text Input “Category Name”, con la Cadena de Texto Postre.

#ESCENARIO 1 (Happy Path)
• Scenario: Admin carga una imagen exitosamente.

o When: hace Click en el File Input Category Image,
o And: se le abre el Explorador de Archivo,
o And: busca la imagen a cargar,
o And: selecciona la imagen a cargar,
o And: hace Click en Abrir,
o And: se le cierra el Explorador de Archivo,
o And: hace Click en el botón Add del formulario
o Then: el File Input Category Image no le aparece Ninguna Advertencia
o And: el sistema se redirecciona a la página Category.

#ESCENARIO 2
• Scenario: Admin no carga una imagen.

o When: hace Click en el botón Add del formulario,
o But: sin cargar ninguna imagen,
o Then: el File Input Category Image no le aperece Ninguna Advertencia
o And: el sistema se redirecciona a la página Category.

#ESCENARIO 3
• Scenario: Admin abre el Explorador de Archivo, pero no carga una imagen.

o When: hace Click en el File Input Category Image,
o And: se le abre el Explorador de Archivo,
o But: No selecciona ninguna imagen,
o And: hace Click en Cancelar,
o And: se le cierra el Explorador de Archivo,
o And: hace Click en el botón Add del formulario
o Then: el File Input Category Image no le aperece Ninguna Advertencia
o And: el sistema se redirecciona a la página Category.
