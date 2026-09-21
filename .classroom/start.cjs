const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),http=require('node:http'),cp=require('node:child_process');
const repo='tinyice-cpu/tinyice-cpu.github.io',tag='private-classroom-2026-09-21',asset='classroom-private-20260921.zip';
const expected='24c2434acd9d2b882e061b07b30061a808001b6b661438ac1016c4ce44d03eca';
const runtime=path.resolve(__dirname,'runtime'),root=path.join(runtime,'private-dist');
function run(command,args){const r=cp.spawnSync(command,args,{stdio:'inherit'});if(r.error||r.status!==0)throw Error(command+' did not complete')}
function healthy(){return new Promise(resolve=>{const r=http.get('http://127.0.0.1:8766/__classroom_version',res=>{let b='';res.on('data',c=>b+=c);res.on('end',()=>resolve(res.statusCode===200&&b===expected))});r.setTimeout(1500,()=>{r.destroy();resolve(false)});r.on('error',()=>resolve(false))})}
async function main(){
 if(process.env.CODESPACES!=='true')throw Error('Use the existing local classroom launcher outside Codespaces.');
 const check=cp.spawnSync('gh',['api','repos/'+repo,'--jq','.private'],{encoding:'utf8'});
 if(check.status!==0||check.stdout.trim()!=='true')throw Error('Private repository access could not be verified; startup stopped.');
 if(await healthy()){console.log('Classroom is already running. Open port 8766 (Private).');return}
 fs.mkdirSync(runtime,{recursive:true});
 const marker=path.join(runtime,'verified-snapshot.txt');
 if(!fs.existsSync(marker)||fs.readFileSync(marker,'utf8')!==expected||!fs.existsSync(path.join(root,'physical/data.js'))){
  console.log('Downloading your private textbook snapshot. This may take a few minutes.');
  run('gh',['release','download',tag,'--repo',repo,'--pattern',asset,'--dir',runtime,'--clobber']);
  const archive=path.join(runtime,asset),hash=crypto.createHash('sha256');
  for await(const chunk of fs.createReadStream(archive))hash.update(chunk);
  if(hash.digest('hex')!==expected)throw Error('Snapshot checksum failed; files were not opened.');
  run('unzip',['-q','-o',archive,'-d',runtime]);
  fs.writeFileSync(marker,expected);
 }
 const htmlPath=path.join(root,'physical.html');
 fs.writeFileSync(htmlPath,fs.readFileSync(htmlPath,'utf8').replace('本机私密阅读','GitHub 私密预览'));
 const log=fs.openSync(path.join(runtime,'server.log'),'a');
 const child=cp.spawn(process.execPath,[path.join(__dirname,'serve.cjs')],{detached:true,stdio:['ignore',log,log],env:{...process.env,CLASSROOM_ROOT:root,CLASSROOM_VERSION:expected}});child.unref();fs.closeSync(log);
 let ok=false;for(let i=0;i<20;i++){await new Promise(r=>setTimeout(r,300));if(await healthy()){ok=true;break}}
 if(!ok)throw Error('Server did not start. Read .classroom/runtime/server.log.');
 console.log('Open the Ports panel and open port 8766. Keep its visibility Private.');
 if(process.env.CODESPACE_NAME&&process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN)console.log('https://'+process.env.CODESPACE_NAME+'-8766.'+process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN+'/');
}
main().catch(e=>{console.error(e.message);process.exitCode=1});
