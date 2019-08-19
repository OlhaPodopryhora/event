$(document).ready(function(){
	'use strict';

	$('.slider').slick({
		arrows: false,
		dots : false,
		autoplay: true,
		fade : true
	});

	let toDate = new Date('2019-09-01 19:26:00');

	let countdown = setInterval(function(){
		let now  = new Date(),
		delta  	 = parseInt((toDate - now) / 1000);

		if (delta <= 0){
			clearInterval(countdown);
		} else{
	
	let days = Math.floor(delta / (24 * 60 * 60));
	$('#days').text(days.toString().length == 1 ? '0' + days : days);
	delta -= days * (24 * 60 * 60);
	
	let hours = Math.floor(delta / (60 * 60));
	$('#hours').text(hours.toString().length == 1 ? '0' + hours : hours);
	delta -= hours * (60 * 60);

	let minutes = Math.floor(delta / 60);
	$('#minutes').text(minutes.toString().length == 1 ? '0' + minutes : minutes);
	delta -= minutes * 60;

	let seconds = delta;
	$('#seconds').text(seconds.toString().length == 1 ? '0' + seconds : seconds);
	}

	}, 1000);
});
