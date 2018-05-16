var users =["FreeCodeCamp","RPGLimitBreak","p4ntz","MajinPhil","deadmau5"];
var users_list = [];
var count=0;
var i;
var imgsrc=[];
$(document).ready(function(){
	count=0;
	$('#list_of_users').empty();
	for(i=0;i<users.length;i++){
	$.ajax({
		url: 'https://wind-bow.glitch.me/twitch-api/users/'+users[i]+'?callback',
		success: processData
	});
	}


});
$('#allUsers').click(function(e){
	e.preventDefault();
	count=0;
	$('#list_of_users').empty();
	for(i=0;i<users.length;i++){
	$.ajax({
		url: 'https://wind-bow.glitch.me/twitch-api/users/'+users[i]+'?callback',
		success: processData
	});
	}
$('#users_all').addClass('usersall');
$('#users_offline').removeClass('usersoffline');
$('#users_online').removeClass('usersonline');
	e.stopPropagation();


});
$('#users_all').click(function(e){
	e.preventDefault();
	count=0;
	$('#list_of_users').empty();
	for(i=0;i<users.length;i++){
	$.ajax({
		url: 'https://wind-bow.glitch.me/twitch-api/users/'+users[i]+'?callback',
		success: processData
	});
	}
	$('#users_all').addClass('usersall');
	$('#users_offline').removeClass('usersoffline');
	$('#users_online').removeClass('usersonline');


});
$('#onlineUsers').click(function(e){
	e.preventDefault();
	count=0;

	$('#list_of_users').empty();

	for(i=0;i<users.length;i++){
		$.ajax({
			url: 'https://wind-bow.glitch.me/twitch-api/streams/'+users[i]+'?callback',
			success: online_User
		});
	}
	$('#users_online').addClass('usersonline');
	$('#users_offline').removeClass('usersoffline');
	$('#users_all').removeClass('usersall');
	e.stopPropagation();
});
$('#users_online').click(function(e){
	e.preventDefault();
	count=0;

	$('#list_of_users').empty();

	for(i=0;i<users.length;i++){
		$.ajax({
			url: 'https://wind-bow.glitch.me/twitch-api/streams/'+users[i]+'?callback',
			success: online_User
		});
	}
	$('#users_online').addClass('usersonline');
	$('#users_offline').removeClass('usersoffline');
	$('#users_all').removeClass('usersall');
});


$('#offlineUsers').click(function(e){
	e.preventDefault();
	$('#list_of_users').empty();
	count=0;	
	for(i=0;i<users.length;i++){
		$.ajax({
			url: 'https://wind-bow.glitch.me/twitch-api/streams/'+users[i]+'?callback',
			success: offline_user
		});
	}
	$('#users_offline').addClass('usersoffline');
	$('#users_all').removeClass('usersall');
	$('#users_online').removeClass('usersonline');
		e.stopPropagation();



});

$('#users_offline').click(function(e){
	e.preventDefault();
	$('#list_of_users').empty();
	count=0;	
	for(i=0;i<users.length;i++){
		$.ajax({
			url: 'https://wind-bow.glitch.me/twitch-api/streams/'+users[i]+'?callback',
			success: offline_user
		});
	}
	$('#users_offline').addClass('usersoffline');
	$('#users_all').removeClass('usersall');
	$('#users_online').removeClass('usersonline');


});


function processData(apiResult){
	imgsrc[count]=apiResult.logo;
	count++;
	// users_list[i]=apiResult.display_name;
		$('#list_of_users').append('<div id="all_users"><p><figure><img id="logo" src="'+apiResult.logo +'"><figcaption>'+ apiResult.display_name +'</figcaption></figure></p></div>');

}

function online_User(apiResult){
	if(apiResult.stream!=null){
	$('#list_of_users').append('<div id="online_users"><p><figure><a href="'+apiResult.stream.channel.url+'" target="_blank"><img id="logo" src="'+apiResult.stream.channel.logo+'"></a><figcaption>'+ apiResult.stream.channel.display_name + '</figcaption></figure></p><p>'+apiResult.stream.game +': ' + apiResult.stream.channel.status+'</p></div>');
	// $('#list_of_users').append('<p>'+apiResult.stream.game +': ' + apiResult.stream.channel.status+'</p></div>');
	}
	else {
		console.log('No online Users');
	}
}

function offline_user(apiResult){
	var source_image=imgsrc[count];
	count++;
	if(apiResult.stream===null){
		var offline = apiResult._links.self;
		var offlineU = offline.replace("https://api.twitch.tv/kraken/streams/"," ");
		$('#list_of_users').append('<div id="offline_users"><p><figure><img id="logo" src="'+ source_image + '"><figcaption>' + offlineU + '</figcaption></figure></p></div>');
	}
	if(count==users.length){
		count=0;
	}

}

