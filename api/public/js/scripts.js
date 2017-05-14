	$(function () {

		if(localStorage.username)
			$('.login').fadeOut(() => {
				$('#writter').removeClass('disabled');
				$('.grettings').text(`Hi ${localStorage.username}.`);
				$('.login').remove();
				$('#messages').fadeIn();
			});

		$('#user-name').keyup(() => {
			if($('#user-name').val().length > 3)
				$('#user-name-button').removeClass('disabled');
			else
				$('#user-name-button').addClass('disabled');
		});

		$('#user-name-button').click(() => {
			localStorage.setItem('username', $('#user-name').val());
			$('.login').fadeOut(()=>{
				$('#writter').removeClass('disabled');
				$('.grettings').text(`Hi ${localStorage.username}.`);
				$('.login').remove();
				$('#messages').fadeIn();
			});
		});

		var socket = io();

		$('form').submit(() => {
			var json = {
				message: $('#message').val(),
				author: localStorage.username
			};

			socket.emit('incommingMessage', json);
			$('#message').val('');
			return false;
		});

	    socket.on('outcommingMessage', (res) => {
	    	var liClass = (res.author == localStorage.username) ? 'myself' : 'other';
			$('#messages')
				.append(`<li class='${liClass}'><div><p><span class='author'>${res.author}:</span><br><span class='content'>${res.message}</span></p></div></li>`);
	    });

	    socket.on('users', (users) => {
			$('.users-counter').text(`Users online: ${users}`);
	    });

	    socket.on('disconnect', (users) => {
			$('.users-counter').text(`Users online: ${users}`);
	    });
 	});