'use strict';
function renderLesson(){
 const p=CURRICULUM.find(t=>t.id===$('#lesson-topic').value),advanced=$('#lesson-level').value==='advanced';
 $('#plan-title').textContent=p.title+' · 15 分钟';
 const src=`《${p.book==='phy'?'物理光学':'光电子学'}》 · ${p.ref}`;
 const paragraphs=(title,text)=>`<div class="script-paragraph"><b>${title}</b><p>${text}</p></div>`;
 const blocks=[
  ['导入与预测 · 2 分钟',paragraphs('教师可以这样说',p.hook)+paragraphs('学生任务','先独立写下预测及一句理由，再与同桌比较。记录不同观点，演示前暂不公布答案。')],
  ['机制与板书 · 4 分钟',`<div class="answer-formula">${p.formula}</div>`+p.steps.map((s,i)=>paragraphs('板书 '+(i+1),s)).join('')+paragraphs('讲解边界',p.detail)],
  ['演示与验证 · 4 分钟',paragraphs('操作顺序',p.demo)+paragraphs('课堂记录','按“改变的变量 → 保持不变的条件 → 预测 → 观察/计算 → 解释”记录一轮结果。先说理由，再点控件，避免只看动画。')+(p.lab?`<button class="answer-link" data-open-lab="${p.lab}">打开对应互动实验 →</button>`:'<div class="lesson-board-note">此主题使用板书推演或数值对照；当前没有对应的独立互动实验。</div>')],
  ['当堂练习与纠错 · 3 分钟',paragraphs('给学生的题目',p.check)+`<details class="solution"><summary>展开参考答案与教师诊断</summary>${paragraphs('参考答案',p.solution)}${paragraphs('重点观察的误区',p.misconception)}${paragraphs('发现错误后怎么教',p.repair)}</details>`],
  ['收束与迁移 · 2 分钟',paragraphs(advanced?'进阶讨论（本节必讲）':'进阶备用追问',p.advanced)+paragraphs('教师参考回应',p.advancedAnswer)+paragraphs('一句话回收目标',p.goal)+paragraphs('课后迁移',p.extension)]
 ];
 $('#plan-content').innerHTML=`<div class="lesson-overview"><span class="tag">${p.chapter}</span><span class="tag">${advanced?'进阶机制推导':'入门现象引导'}</span><p><b>学习目标：</b>${p.goal}</p><p><b>先修检查：</b>${p.prereq}</p><p><b>课前准备：</b>教材对应章节、投影页面、学生记录纸。${advanced?'先让学生口述相关模型的条件，再进入推导；进阶讨论要求说明结论为什么成立。':'使用图示和具体数值建立直觉；先不要求推导模型的全部数学细节。'}</p></div>`+blocks.map(([title,body],i)=>`<section class="lesson-section"><h3><span>0${i+1}</span>${title}</h3>${body}</section>`).join('')+`<div class="lesson-source"><b>教材定位与审核</b><p>${src}</p><p>原整理稿行：${p.ranges.map(r=>r.join('–')).join('、')}；属于 Markdown 行号，不是 PDF 页码。</p><a href="sources/${p.id}.txt" target="_blank" rel="noopener">查看随站保存的教材摘录 ↗</a><p>讲稿为依据教材整理的教学改写；课堂问题、数值例题与活动顺序由本演示设计。OCR 摘录未做本轮逐页 PDF 校对，教师使用前应核对原书。</p></div>`;
 const strip=html=>html.replace(/<\/p>|<\/div>|<\/summary>/g,'\n').replace(/<\/b>/g,'：').replace(/<[^>]*>/g,'').replace(/\n{3,}/g,'\n\n').trim();
 currentPlan=`光知 · 课堂活动讲稿\n${p.title}\n章节：${p.chapter}\n时长：15 分钟\n学生基础：${advanced?'进阶':'入门'}\n\n学习目标：${p.goal}\n先修知识：${p.prereq}\n课前准备：教材、投影页面和记录纸\n\n`+blocks.map(([title,body])=>title+'\n'+strip(body)).join('\n\n')+`\n\n来源：${src}\n原 Markdown 行号：${p.ranges.map(r=>r.join('–')).join('、')}\n\n说明：离线教学模板，非实时大模型生成；例题和活动为教学改写，正式引用请核对原 PDF。`;
 document.querySelectorAll('#plan-content [data-open-lab]').forEach(b=>b.onclick=()=>window.openExperiment(b.dataset.openLab));
}
const chapterGroups=[...new Set(CURRICULUM.map(t=>t.chapter))];
$('#lesson-topic').innerHTML=chapterGroups.map(ch=>`<optgroup label="${ch}">${CURRICULUM.filter(t=>t.chapter===ch).map(t=>`<option value="${t.id}">${t.title}</option>`).join('')}</optgroup>`).join('');
$('#lesson-topic').value='gaussian';$('#lesson-topic').onchange=generatePlan;$('#lesson-level').onchange=generatePlan;
$('#chapter-filter').innerHTML='<option value="all">全部章节 · 14 个主题</option>'+chapterGroups.map(ch=>`<option value="${ch}">${ch}</option>`).join('');
function renderTopicShelf(){const ch=$('#chapter-filter').value;$('#chapter-topics').innerHTML=CURRICULUM.filter(t=>ch==='all'||t.chapter===ch).map(t=>`<button class="topic-chip" data-topic-id="${t.id}"><span>${t.book==='phy'?'物光':t.chapter.split(' · ')[0]}</span>${t.title} ↗</button>`).join('');$('#chapter-topics').querySelectorAll('button').forEach(b=>b.onclick=()=>{const t=CURRICULUM.find(t=>t.id===b.dataset.topicId);ask(t.question,t.id)})}
$('#chapter-filter').onchange=renderTopicShelf;renderTopicShelf();generatePlan();
