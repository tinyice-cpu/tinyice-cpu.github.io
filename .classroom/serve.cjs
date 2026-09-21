const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(process.env.CLASSROOM_ROOT||path.join(__dirname,'runtime/private-dist'));
const port=Number(process.env.CLASSROOM_PORT||8766);
if(!Number.isInteger(port)||port<1024||port>65535)throw Error('Invalid port');
const allowed=new Set(['127.0.0.1:'+port,'localhost:'+port]);
if(process.env.CODESPACES==='true'&&process.env.CODESPACE_NAME&&process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN)allowed.add(process.env.CODESPACE_NAME+'-'+port+'.'+process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN);
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.pdf':'application/pdf','.jpg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml','.woff':'font/woff','.woff2':'font/woff2','.md':'text/plain; charset=utf-8','.json':'application/json; charset=utf-8'};
http.createServer((req,res)=>{
 if(!allowed.has(req.headers.host)||!['GET','HEAD'].includes(req.method)){res.writeHead(403);return res.end('Access denied')}
 if(req.url==='/__classroom_version'){res.writeHead(200,{'Content-Type':'text/plain','Cache-Control':'no-store'});return res.end(process.env.CLASSROOM_VERSION||'development')}
 let file;try{const p=decodeURIComponent(new URL(req.url,'http://localhost').pathname);file=path.resolve(root,'.'+(p==='/'?'/index.html':p))}catch{res.writeHead(400);return res.end()}
 if(!file.startsWith(root+path.sep)){res.writeHead(403);return res.end()}
 fs.stat(file,(err,st)=>{if(err||!st.isFile()){res.writeHead(404);return res.end('Not found')}
  const h={'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Accept-Ranges':'bytes'};let start=0,end=st.size-1,status=200;
  if(req.headers.range){const m=/^bytes=(\d+)-(\d*)$/.exec(req.headers.range);if(!m){res.writeHead(416);return res.end()}start=Number(m[1]);end=m[2]?Math.min(Number(m[2]),end):end;if(start>end||start>=st.size){res.writeHead(416,{'Content-Range':`bytes */${st.size}`});return res.end()}status=206;h['Content-Range']=`bytes ${start}-${end}/${st.size}`}
  h['Content-Length']=end-start+1;res.writeHead(status,h);if(req.method==='HEAD')return res.end();const stream=fs.createReadStream(file,{start,end});stream.on('error',()=>res.destroy());stream.pipe(res);
 });
}).listen(port,'127.0.0.1',()=>console.log('Classroom port '+port+' ready. GitHub Codespaces port visibility must remain Private.'));
