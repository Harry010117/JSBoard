const mysql = require('mysql')
const con = mysql.createConnection({
	host: 'localhost',
	user:'root',
	password:'',
	database:'mvc'
})

con.connect(function(arr){
	if(arr){
		console.log(arr)
	} else {
		console.log('mysql connected')
	}
})

module.exports = (app, fs) => {
	app.get('/',  (req,res) => {
		res.render('index', {
			title: "Mypage",
			length: 200
		})
	});

	app.get('/board',  (req,res) => {
		const sql = "SELECT * FROM board";
		let renderData = {
			title:"게시판 리스트",
			list:null,
			err:null
		}
		con.query(sql, function (err, results) {
			console.log(results)
			if (err) {
				renderData['err'] = "에러 발생"
			} else {
				renderData['list'] = results
			}
			res.render('board/index', renderData)
		})
	});

	app.get('/board/view/:idx',  (req,res) => {
		res.render('board/view', {
			title: "게시글 조회",
			idx: req.params.idx
		})
	});

	app.get('/board/write',  (req,res) => {
		res.render('board/write', {
			title: "게시글 작성"
		})
	});

	app.get('/board/write/:idx',  (req,res) => {
		res.render('board/update', {
			title: "게시글 수정",
			idx: req.params.idx
		})
	});
}