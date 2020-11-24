jQuery(function ($) {
 
	var k = 'politicacookie',
		v = 'accepted',
		p = $('#cookies');
 
	// Ocultamos el aviso moviéndolo tantos PX como mida de alto con el
	// contenido actual.
	p.removeClass('c-hidden');
 
	// Si no existe la cookie o no se ha aceptado la política de cookies,
	// mostramos el mensajito.
	if ($.cookie(k) !== v) {
		$("#cookiesms a#aceptar").click(function (e) {
			// Evitamos que se propague el evento.
			e.preventDefault();
			// Ocultamos el mensaje.
			p.slideUp(500);
			// Creamos la cookie.
			$.cookie(k, v, {expires: 365, path: '/'});
		}).slideDown(500);
		//ocultamos el mensaje cuando hacemos scroll
		$(window).scroll(function(){
			p.slideUp(500);
			$.cookie(k, v, {expires: 365, path: '/'});
		});
	}else{
		p.addClass('c-hidden').slideUp(500);
	}
});