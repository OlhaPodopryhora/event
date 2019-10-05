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

	let options = [
		{
			endpoint	: 'https://reqres.in/api/users',
			count 		: 6,
			target		: 'competitorsUsers',
			class		: ''
		},
		{
			endpoint	: 'https://reqres.in/api/users?page=2',
			count 		: 3,
			target		: 'usersJury',
			class		: 'user__img-box--round'
		}
		];
	options.forEach(function(option){
		loadUsers(option);
	})

	function loadUsers(opt){
		let xhr = new XMLHttpRequest();
		xhr.open('GET', opt.endpoint);
		xhr.send();

		xhr.responseType = 'json';

		xhr.onerror = function() { 
		  alert(`Ошибка соединения`);
		};
		xhr.onload = function() {
		  if (xhr.status != 200) { // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
		    alert(`Ошибка ${xhr.status}: ${xhr.statusText}`); // Например, 404: Not Found
		  } else { // если всё прошло гладко, выводим результат
			
			let target = document.getElementById(opt.target),
			users = xhr.response.data.splice(0, opt.count);
		  	
		  	users.forEach(function(user){
		  		console.log(user.first_name, user.last_name);
		  		let html = `<div class="user">
						<div class="user__img-box ${opt.class}">
							<img src="${user.avatar}" alt="${user.first_name} ${user.last_name}" class="user__img">
						</div>
						<div class="user__name">${user.first_name} ${user.last_name}</div>
						<div class="user__pos">${user.email}</div>
					</div>`;
				
				target.innerHTML = target.innerHTML + html;
		  	});
		  }
		};

		console.log(xhr);
	};

	let sound = document.querySelector('audio');

	$('.toggler').on('click', function(e){
		e.preventDefault();

		$('body').toggleClass('menu-opened');
		sound.play();
	})


	
});
