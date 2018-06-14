const moment = require('moment')
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
	return moment(dateIn).format('YYYY-MM-DD');
}
 
module.exports = (app, fs) => {
	app.get('/', (req,res) => {
		res.render('index', {
			title: "Mypage"
		})
	});

	app.get('/board', (req,res) => {
		const sql = "SELECT * FROM board";
		let renderData = {
			title:"게시판 리스트",
			list:null,
			err:null,
			fullDate:fullDate
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

	app.get('/board/list', (req,res) => {
		const sql = "SELECT * FROM board";
		con.query(sql, (err, results) => {
			res.json(results)
		})
	});

	app.get('/board/view/:idx', (req,res) => {
		var idx = req.params.idx;
		const sql = 'SELECT * FROM board where idx = '+idx;
		let renderData = {
			title: "게시글 조회",
			list:null,
			err:null,
			fullDate:fullDate
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
		var idx = req.params.idx;
		res.render('board/write', {
			title: "게시글 작성",
			idx: idx
		})
	});

	app.post('/board/write', (req,res) => {
		const subject = req.body.subject
		const writer = req.body.writer
		const content = req.body.content
		const sql = `insert into board set subject = '${subject}',writer = '${writer}',content = '${content}', date = now(), change_date = now()`
		con.query(sql, (err, results) => {
			res.send("<script>alert('완료되었습니다'); location.replace('/board')</script>");
		})
	});

	app.get('/board/write/:idx', (req,res) => {
		res.render('board/update', {
			title: "게시글 수정",
			idx: req.params.idx
		})
	});
}
