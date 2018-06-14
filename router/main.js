const mysql = require('mysql')
const con = mysql.createConnection({
	host: 'localhost',
	user:'root',
	password:'',
	database:'mvc'
})

con.connect((err) => {
	if(err){
		console.log(err)
	} else {
		console.log('mysql connected')
	}
})

function fullDate(dateIn) {
	var year = dateIn.getFullYear();
	var month = dateIn.getMonth()+1;
	var date = dateIn.getDate();
	var fDate = yyyy +"/"+ mm +"/"+ dd;
	return fDate;
}

module.exports = (app, fs) => {
	app.get('/', (req,res) => {
		res.render('index', {
			title: "Mypage",
			length: 20
		})
	});

	app.get('/board', (req,res) => {
		const sql = "SELECT * FROM board";
		let renderData = {
			title:"게시판 리스트",
			list:null,
			err:null
		}
		con.query(sql, (err, results) => {
			if (err) {
				renderData['err'] = "에러 발생"
			} else {
				renderData['list'] = results
			}
			res.render('board/index', renderData)
		})
	});

	app.get('/board/view/:idx', (req,res) => {
		var idx = req.params.idx;
		const sql = 'SELECT * FROM board where idx = '+idx;
		let renderData = {
			title: "게시글 조회",
			list:null,
			err:null
		}
		con.query(sql, (err, results) => {
			if (err) {
				renderData['err'] = "에러 발생"
			} else {
				renderData['list'] = results[0]
			}
			res.render('board/view', renderData)
		})
	});

	app.get('/board/write', (req,res) => {
		res.render('board/write', {
			title: "게시글 작성"
		})
	});

	app.get('/board/write/:idx', (req,res) => {
		res.render('board/update', {
			title: "게시글 수정",
			idx: req.params.idx
		})
	});
}
