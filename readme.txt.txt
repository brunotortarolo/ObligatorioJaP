Cambios realizados para entregable 7 del obligatorio:	
	
	PAGINA DE PERFIL DE USUARIO:
		
		Datos:
			foto,
			nombre,
			ubicación,
			edad,
			email,
			contacto(teléfono)

		Sin datos agregados y guardados, los campos se muestran vacíos.

		Opción editar campos:
			Despliega form para completar datos.
			Campos obligatorios (nombre, primer apellido, email)
			Validación de ubicación (si se llena uno de los campos de ubicación, deberá llenarse el complementario)
		
		Actualización de datos:
			
			Datos se guardan como propiedades de un objeto en el local storage, bajo un key dinámico que se genera a partir
			del usuario ingresado en login.

				De esta manera podrán existir varios objetos en memoria y serán asociados a cada usuario conforme ingresen al sitio.

			Los valores existentes se mostrarán como placeholder en sus respectivos campos si volvemos a ingresar al formulario de edición


		Validaciones:

			Nombre, Primer Apellido e Email son obligatorios.

			Email debe incluir "@".

			Nombre, Primer apellido, Segundo Apellido, Ciudad y País admiten sólo caracteres alfabéticos.

			Edad y Contacto sólo admiten caracteres numéricos.

			Ciudad y País deben completarse conjuntamente. 
		
		
		
	GRID Y RESPONSIVNESS:

		Implementación de layout de PRODUCTS.HTML y CATEGORIES.HTML utilizando grid y estilos de bootstrap.
		Implementación de responsiveness.



	ALMACENAMIENTO DE IMG EN LOCAL STORAGE:

	Imagen placeholder guardada en .img de proyecto.
	Se puede seleccionar imagen localmente a través de un input tipo file.
	La misma será convertida a base64 y almacenada como una propiedad del objeto con información de usuario.



	
	

