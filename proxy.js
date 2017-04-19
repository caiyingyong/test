
let proxy = require('http-proxy').createProxyServer({});

proxy.on((err, req, res) => {

	res.writeHead(500, { 'Content-Type': 'text/plain' })
});

let server = require('http').createServer((req, res) => {

	let host = req.headers.host;
	console.log(host);

	switch(host) {
		// case 'http://localhost': {
		// 	proxy.web(req, res, { target: 'http://localhost:1106' });
		// 	break;
		// },
		default : {
			proxy.web(req, res, { target: 'http://localhost:1106'}); // 默认官网页面
		}
	}
});

server.listen(8080);