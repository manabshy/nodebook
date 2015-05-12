// required modules
var express = require('express');
var mongoose = require('mongoose');
var engine = require('ejs-locals');
var http = require('http');
var   multer = require('multer'),
   	  img = require('easyimage');



// connect to MongoDB
var db = 'nodebook';
//mongoose.connect('mongodb://localhost/'+db);
mongoose.connect('mongodb://manoj:manoj@ds039231.mongolab.com:39231/chatdb');
// initialize our app
var app = express();

// app configuation
app.engine('ejs', engine);
app.set('views', __dirname+'/views');
app.use(express.static(__dirname+'/public'));
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({secret: 'coloft'}));

// port that server will listen on
var port = 3020;

// start listening...
//app.listen(port);
var server = http.createServer(app);
var io = require('socket.io').listen(server);
server.listen(port);
console.log('Express server listening on port '+port);


// create user model 
var User = mongoose.model('User', {
	username: String,
	password: String,
	image: String,
	bio: String,
});

// create status model
var Status = mongoose.model('Status', {
	_id: String,
	body: String,
	time: Number,
	username: String,
	image: String,
	comments: Array,
	likes: Array,
	dislikes: Array,
	type: String,
});

app.get('/', function (req, res) {

	if (req.session.user){

		Status.find({}).sort({time: -1}).execFind(function (err, statuses){
			res.render('homepage.ejs', {user: req.session.user, statuses: statuses});
		});

	} else {

		res.render('welcome.ejs');
	}

});

app.get('/logout', function (req, res) {

	if (req.session.user) {
		console.log(req.session.user.username+' has logged out');
		delete req.session.user;
	}

	res.redirect('/');

});

app.get('/login', function (req, res) {

	var error1 = null;
	var error2 = null;

	if (req.query.error1) {
		error1 = "Sorry please try againx";
	}

	if (req.query.error2) {
		console.log(req.query);
		error2 = "Sorry please try againy";
	}
	console.log('in login before login.ejs');
	res.render('login.ejs', {error1: error1, error2: error2});

});

app.get('/forget',function(req,res) {

	var error1 = null;

		res.render('forget.ejs', {error1: error1});

});




/*
app.post('/login', function (req, res) {
	var username = req.body.username;
	var password = req.body.password;

    console.log("username hola:%s",username );
	var query = {username: username, password: password};
	

	User.findOne(query, function (err, user) {

		if (err || !user || username == '') {
			res.redirect('/login?error2=1');
		} else {

			req.session.user = user;
			console.log(username+' is valid');
			res.redirect('/');
		}

	});
});
*/
app.post('/login', function (req, res) {
	var username = req.body.username;
	var password = req.body.password;

    console.log("username hola:%s",username );
    console.log("password hola:%s",username );
	var query = {username: username, password: password};
	
	var errorMsg = { 
						error: true,
						username: req.body.username,
						message: "invalid user"
					};
    

	User.findOne(query, function (err, user) {

		if (err || !user || username == '') {
			  res.send(errorMsg);
			  //res.redirect('/login?error2=1');
		} else {
			//console.log(user);

			req.session.user = user;
			console.log(username+' is valid');
			errorMsg.error = false;
			errorMsg.message = "valid user";
			res.send(errorMsg);
			//res.redirect('/');
		}

	});
});

app.post('/findpass',function(req,res) {
	var fusername = req.body.username.toLowerCase(),
	    fpass;

	    console.log("fusername:%s",fusername );
	    var query = {username:fusername};
	    User.findOne(query,function(err,user){

	    	if(err || !user || fusername == ''){
	    		res.redirect('/findpass?error2=1');
	    	} else{
	    		fpass=user.password;
	    		console.log("fpassword:%s",user.password);

	    		res.render('showpass.ejs',{fusername:user.username,fpass:user.password});

	    	}

	    });

});
app.post('/individualStatus',function(req,res) {

	//console.log('post:'  + req.body.statusname);
	//console.log('username:' + req.body.username);
	//console.log('statusTime:' + parseInt(req.body.statustime));
	
	var sname = req.body.statusname,
	    uname = req.body.username,
	    stime = req.body.statustime;
	var query = {username: uname, time: stime};
	
	Status.findOne(query, function (err, status) {
		console.log("status:" + status);
		
		if (err || !status) {
			res.redirect('/login?error2=1');
		} else {
			//console.log(status._id);
			Status.remove(query,function(err,status){
				if(err != null){
					console.log('error occurred');
				}
				else{
					console.log('status deleted');
					res.redirect('/users/'+uname);
				}
			});
		}
		
	});
	
});

app.post('/likes',function(req,res) {
	var sname = req.body.statusname,
	    uname = req.body.username,
	    stime = req.body.statustime;
	var query = {username: uname, time: stime};
	/*
		User.update(query, change, function (err, user) {

			Status.update(query, {image: newImage}, {multi: true}, function(err, statuses){
				
				console.log(username+' has updated their profile');
				req.session.user.bio = newBio;
				req.session.user.image = newImage;
			    res.redirect('/users/'+username);
			});

		});
	*/
	Status.findOne(query, function (err, status) {
		console.log(status);
		
		if (err || !status) {
			res.redirect('/login?error2=1');
		} else {
			//console.log(status._id);
			Status.update(query,{likes:1},function(err,status){
				if(err != null){
					console.log('error occurred');
				}
				else{
					console.log('one like');
					res.redirect('/users/'+uname);
				}
			});
		}
		
	});

});
/* old signup
app.post('/signup', function (req, res){

	var username = req.body.username.toLowerCase();
	var password = req.body.password;
	var confirm = req.body.confirm;

	if(password != confirm) {
		res.redirect('/login?error1=1');
	}

	else {

		var query = {username: username};

		User.findOne(query, function (err, user) {
			if (user) {
				res.redirect('/login?error1=1');
			} else {

				var userData = { 
					username: username,
					password: password,
					image: 'http://leadersinheels.com/wp-content/uploads/facebook-default.jpg', //default image
					bio: 'My Social Network using NodeJS!',
					hidden: false,
					wall: []
				};

				var newUser = new User(userData).save(function (err){

					req.session.user = userData;
					console.log('New user '+username+' has been created!');
					res.redirect('/users/'+username);

				});
			}
		});
	}
});
*/
app.post('/checkuser', function (req, res){

	var username = req.body.username.toLowerCase();
    console.log('username:' + username);

		var query = {username: username};

		User.findOne(query, function (err, user) {
			var userFlag,
				existFlag;
			if (user) {
				  existFlag = {userFlag:true};	
				  res.send(existFlag);
			} else {
					existFlag = {userFlag:false};
				   res.send(existFlag);					
				};

		});
});

/* new signup */
app.post('/signup', function (req, res){


	var username = req.body.username.toLowerCase();
	var password = req.body.password;
	var confirm = req.body.confirm;
    var email   = req.body.email;
    console.log('email:' + email);
    console.log('username:' + username);
    /*
	if(password != confirm) {
		res.redirect('/login?error1=1');
	}

	else {
	*/
		var query = {username: username};

		User.findOne(query, function (err, user) {
			var userFlag,
				existFlag;

			if (user) {
				  existFlag = {userFlag:true};	
				  res.send(existFlag);
			} else {

				var userData = { 
					username: username,
					password: password,
					image: 'http://leadersinheels.com/wp-content/uploads/facebook-default.jpg', //default image
					bio: 'My Social Network using NodeJS!',
					hidden: false,
					wall: []
				};

				var newUser = new User(userData).save(function (err){

					req.session.user = userData;
					console.log('New user '+username+' has been created!');
					existFlag = {userFlag:false};	
					res.send(existFlag);

				});
			}
		});
	//}
});


// user profile

app.post('/users/statuses', function (req, res) {

	console.log('statuses:%s' , req.body.stext );
					
					var status = req.body.stext;		
					var username = req.session.user.username;
					var pic = req.session.user.image;
					var myId = '';
					
					var statusData = { 
						body: status,
						time: new Date().getTime(),
						username: username,
						image: pic,
						comments: [],
						likes: [],
						type: myId
					};
					
				
					var newStatus = new Status(statusData).save(function (err) {
						console.log(username+' has posted a new status');
						
						//io.sockets.emit('newStatus', {statusData: statusData});
						//res.redirect('/users/'+username);
						res.send(statusData);
					});
	        	

});

var imgs = ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'JPG','JPEG']; // only make thumbnail for these

function getExtension(fn) {
    return fn.split('.').pop();
}

function fnAppend(fn, insert) {
    var arr = fn.split('.');
    var ext = arr.pop();
    insert = (insert !== undefined) ? insert : new Date().getTime();
    return arr + '.' + insert + '.' + ext;

}

app.post('/users/removestatus', function (req, res) {

	console.log('removeStatus');

	var sname = req.body.bodypost,
	    uname = req.body.uidpost,
	    stime = req.body.timepost;
	var query = {username: uname, time: stime};
	
	Status.findOne(query, function (err, status) {
		console.log("status to be removed:" + status);
		
		if (err || !status) {
			res.redirect('/login?error2=1');
		} else {
			//console.log(status._id);
			Status.remove(query,function(err,status){
				if(err != null){
					console.log('error occurred');
				}
				else{
					var status_delete = {rstatus: "removed"};
					console.log('status deleted');
						res.send(status_delete);

				}
			});
		}
		
	});


});
app.post('/users/removecomment',function(req,res){

	console.log('removing');

	var finduser   = req.body.uidpost,
		commentidx = req.body.cindex,
		findstatus = req.body.bodypost,
		statustime = req.body.timepost,
		commenttime = req.body.timecomment;
	
	var query = {username: finduser, time: statustime};	

		console.log(query);
		console.log(finduser);
		console.log(commentidx);
		console.log(findstatus);
		console.log(statustime);
		console.log(commenttime);

		Status.findOne(query, function (err, status) {
		
			console.log("comment to be removed from status:%s" + status);
		
			if (err || !status) {
				res.redirect('/login?error2=1');
			} else {

					console.log('Found Status - remove comment');
					Status.update(query,{$unset:{"comments.":commentidx}});
	  				Status.update(query,{$pull:{"comments":null}});

					var comment_delete = {comment: "removed",flag:true};	
					res.send(comment_delete);

				}
				
				
		
	});		
});
app.post('/users/statuscomment', function (req, res) {

			var ustatus = req.body.status;
			var commentText = req.body.comment;
			var username = req.body.uname;
			var stime    = req.body.stime;
			var ctime    = req.body.ctime;

			console.log('commentText:%s',commentText);
			console.log('status:%s',ustatus);
			console.log('stausTime:%d',stime);
			
			console.log('commentTime:%s',ctime);
			
			var pic = req.session.user.image;
			console.log("pic:%s",pic);
			var comment = {'username': username,'body':commentText,'comment_likes':0,'comment_dislikes':0,time:new Date().getTime()};

			var query = {time:stime,username: username};
			console.log('query in statuscomment:%s',query.body);


			Status.findOne(query, function (err, status) {
				console.log("status when posting a comment:" + status);
				
				if (err || !status) {
					res.redirect('/login?error2=1');
				} else {
					
					comment.image = status.image;

					Status.update(query, {$push:{comments: comment}}, {multi: false}, function(err, statuses){
						if(err != null){
							console.log('error occurred while posting a comment');
						}
						else {
						console.log(statuses);
						res.send(comment);
						}
					});
				}
				
			});

});

app.get('/users/:username', function (req, res) {

	if (req.session.user) {

		var username = req.params.username.toLowerCase();
		var query = {username: username};
		var currentUser = req.session.user;


		console.log('in users:%s' , username );		
		
		User.findOne(query, function (err, user) {

			if (err || !user) {
				res.send('No user is found by id '+username);
			} else {
				Status.find(query).sort({time: -1}).execFind(function(err, statuses){
					res.render('profile.ejs', {
						user: user, 
						statuses: statuses, 
						currentUser: currentUser
					});	
				});
			}
		});
	} else {

		res.redirect('/login');

	}
});
    app.use(multer({
        dest: './public/uploads/',
        rename: function (fieldname, filename) {
            return filename.replace(/\W+/g, '-').toLowerCase();
        },
        onFileUploadStart: function (file) {
  			console.log(file.fieldname + ' is starting ...')
		},
		onFileUploadComplete: function (file) {
  			console.log(file.fieldname + ' uploaded to  ' + file.path)
		}    
        
    }));

app.post('/profile', function (req, res) {

	if (req.session.user) {
	
		var username = req.session.user.username;
		var query = {username: username};

		var newBio = req.body.bio;
		var newImage = req.body.image;

		var change = {bio: newBio, image: newImage};

		User.update(query, change, function (err, user) {

			Status.update(query, {image: newImage}, {multi: true}, function(err, statuses){
				
				console.log(username+' has updated their profile');
				req.session.user.bio = newBio;
				req.session.user.image = newImage;
			    res.redirect('/users/'+username);
			});

		});

	} else {
		res.redirect('/login');
	}
});

app.post('/users/profiler',function(req,res){
	console.log('in profiler');
    console.log("Extension:%s",getExtension(req.files.userFile.name));
    console.log("index of Extension:%d",imgs.indexOf(getExtension(req.files.userFile.name)));

    if (imgs.indexOf(getExtension(req.files.userFile.name)) != -1){ 

        res.send({image: true, file: req.files.userFile.originalname, savedAs: req.files.userFile.name});
    }

});


app.post('/statuses', function (req, res) {
	if (req.session.user) {
			var status = req.body.status;		
			var username = req.session.user.username;
			var pic = req.session.user.image;
			var myId = getId(status);

			console.log("myId is:" + myId);
			var statusData = { 
				body: status,
				time: new Date().getTime(),
				username: username,
				image: pic,
				comments: [],
				likes: [],
				type: myId
			};
			var newStatus = new Status(statusData).save(function (err) {
				console.log(username+' has posted a new status');
				io.sockets.emit('newStatus', {statusData: statusData});
				res.redirect('/users/'+username);
			});
	} else {
		res.redirect('/login');
	}
});

function getId(url) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match && match[2].length == 11) {
        return match[2];
    } else {
        return 'nolink';
    }
}

app.post('/statuscomment', function (req, res) {
	
	if (req.session.user) {
			var status = req.body.status;
			var commentText = req.body.comment;
			console.log('comment:%s',commentText);
			console.log('status:%s',status);
			var username = req.session.user.username;
			var ctime = req.body.ctime;
			var pic = req.session.user.image;
			var comment = {'username': username,'body':commentText,'comment_likes':0,'comment_dislikes':0,time:new Date().getTime()};

			var query = {body: status,username: username};

			console.log('ct:' + req.body.deletecomment);
			
				Status.update(query, {$push:{comments: comment}}, {multi: false}, function(err, statuses){
					res.redirect('/users/'+username);

				});
			
	} else {
		res.redirect('/login');
	}
	
});
app.post('/postlikes', function (req, res) {

	if (req.session.user) {

	var num_likes_post = req.body.likepost_ordinal;
	console.log("num_likes_post:%s",num_likes_post);
	}
	else {
		console.log('es');
	}
});
app.post('/deletecomment',function(req,res){
	var sname = req.body.statusname,
	    uname = req.body.whoisuser,
	    stime = req.body.statustime,
	    cindex = req.body.cnumber;

	console.log("cindex:%d",parseInt(cindex));
	console.log("stime:%d",parseInt(stime));
	console.log("uname:%s",uname);
	var query = {username: uname, time: stime};
	Status.findOne(query, function (err, status) {
		console.log("status in deletecomment:" + status);
		
		if (err || !status) {
			res.redirect('/login?error2=1');
		} else {
			//console.log(status._id);
		}
		
	});
	


});
