const fs=require('fs'),path=require('path'),today=new Date().toISOString().slice(0,10),slug=today;
const feed=JSON.parse(fs.readFileSync(path.join(__dirname,'..','feed.json'),'utf8'));
if(feed.posts.find(p=>p.slug===slug)){console.log('Exists');process.exit(0)}
const pool=[
[{title:'新生儿护理的10个常见误区，新手爸妈必看',desc:'宝宝不用每天洗澡、不要睡枕头、不要一哭就喂奶、脐带护理用75%酒精而不是碘伏。',tag:'新生儿'},
{title:'宝宝发烧怎么办？不同温度的在家处理方法',desc:'38.5度以下物理降温（温水擦身、减少衣物）+多喝水。38.5以上用退烧药。精神好先观察。',tag:'常见疾病'},
{title:'母乳喂养的正确姿势和频率：新手妈妈指南',desc:'按需喂养不是按时喂养。正确的含乳姿势可以避免乳头皲裂。每次喂奶15-20分钟。',tag:'母乳喂养'}],
[{title:'宝宝的辅食添加顺序和时间表',desc:'6个月开始加辅食。从高铁米粉开始→蔬菜泥→水果泥→肉泥→蛋黄。每次只加一种观察过敏。',tag:'辅食添加'},
{title:'婴儿睡眠训练：如何让宝宝睡整觉',desc:'建立睡前仪式（洗澡→按摩→喂奶→讲故事）、区分白天黑夜、学会自我安抚入睡。',tag:'睡眠问题'},
{title:'宝宝湿疹反反复复怎么办？护理和治疗',desc:'保湿是第一步（厚涂保湿霜每天3-5次）、避免过热、洗澡水温37度。严重时用弱效激素。',tag:'皮肤问题'}],
[{title:'1-3岁宝宝的早教游戏：在家就能做',desc:'积木堆高练精细动作、绘本阅读练语言、躲猫猫建立物体恒存概念、音乐律动培养节奏感。',tag:'早教启蒙'},
{title:'宝宝便秘别急着用药：试试这几招',desc:'顺时针揉肚子、做蹬自行车运动、多喝水、加火龙果和西梅泥。超过3天不拉再考虑用开塞露。',tag:'常见疾病'},
{title:'宝宝多大可以开始刷牙？怎么刷？',desc:'第一颗牙出来就要刷。用指套牙刷或软毛牙刷，米粒大小的含氟牙膏。2岁前家长帮忙刷。',tag:'日常护理'}],
[{title:'宝宝腹泻的家庭护理：防止脱水最重要',desc:'口服补液盐是最重要的。继续喂母乳或配方奶。暂停果汁和油腻食物。注意观察尿量判断脱水。',tag:'常见疾病'},
{title:'职场妈妈背奶全攻略：吸奶器选择和储存',desc:'双边电动吸奶器效率最高。母乳常温4小时、冷藏3天、冷冻3个月。解冻用温水解冻不用微波。',tag:'母乳喂养'},
{title:'宝宝长牙的顺序和护理：出牙期怎么安抚',desc:'6个月左右出下门牙。牙胶冰箱冰一下给宝宝咬、冷毛巾敷牙龈。低热正常但高热要看医生。',tag:'生长发育'}],
[{title:'带宝宝出门的必备物品清单：别等出门了才发现',desc:'尿不湿6-8片、湿巾、隔尿垫、备用衣服、口水巾、奶瓶奶粉、保温杯、玩具、毯子、塑料袋。',tag:'出行攻略'},
{title:'宝宝红屁屁怎么护理？预防大于治疗',desc:'勤换尿不湿（2-3小时一次）、温水洗不用湿巾擦、彻底晾干再穿、涂护臀膏隔离。',tag:'皮肤问题'},
{title:'0-1岁宝宝的生长发育里程碑：什么月份该会什么',desc:'3个月抬头、6个月独坐、8个月爬、10个月扶站、12个月走路。每个宝宝有自己的节奏不用焦虑。',tag:'生长发育'}],
[{title:'宝宝不爱吃辅食怎么办？7个让宝宝开口的方法',desc:'不要在宝宝困或太饿的时候喂、换不同口味和口感、让宝宝自己抓着吃、和大人一起吃饭增加兴趣。',tag:'辅食添加'},
{title:'手足口病的识别和护理：幼儿园高发季',desc:'发热+口腔手脚疱疹。自限性疾病通常7天自愈。在家隔离、喝凉的水和奶、剪短指甲防抓破。',tag:'常见疾病'},
{title:'怎么给宝宝选纸尿裤？不同年龄阶段有讲究',desc:'新生儿选柔软透气的、学爬期选防漏设计的、学步期选拉拉裤方便活动。晚上用吸收量大的。',tag:'日常护理'}],
[{title:'宝宝辅食分月龄推荐：6到12个月怎么吃',desc:'6月米糊→7月菜泥肉泥→8月颗粒状烂粥→9月手指食物→10月软饭→11月小块食物→12月接近成人。',tag:'辅食添加'},
{title:'二胎家庭怎么让大宝不觉得被冷落',desc:'让大宝参与照顾二宝、保证每天有一段只属于大宝的时间、不当着大宝的面比较两个宝宝。',tag:'二胎育儿'},
{title:'宝宝说话晚要不要担心？语言发育指标',desc:'1岁会叫爸爸妈妈、1岁半用单词、2岁会说两个字短语。如果2岁还没有任何有意义的词建议评估。',tag:'生长发育'}],
[{title:'宝宝春季过敏怎么防？花粉和尘螨是元凶',desc:'花粉季少去公园、回家洗脸换衣服、用空气净化器、床品每周用60度热水洗。',tag:'常见疾病'},
{title:'宝宝1岁了还需要喝配方奶吗？',desc:'1岁以后可以喝全脂牛奶代替配方奶。但如果宝宝挑食营养不均衡，配方奶可以作为营养补充。',tag:'营养饮食'},
{title:'怎么判断宝宝吃饱了？哭不一定是饿了',desc:'看尿量（每天6-8片湿尿布）、看体重增长曲线、看精神状态。吃饱的宝宝会自己松开乳头或推开奶瓶。',tag:'日常护理'}],
];
const idx=(new Date().getDate()-1)%pool.length,items=pool[idx];
const postTitle=`育儿知识 | ${items[0].tag}`;
feed.posts.unshift({slug,date:today,title:postTitle,items});feed.updated=today;
fs.writeFileSync(path.join(__dirname,'..','feed.json'),JSON.stringify(feed,null,2));
const html=`<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>${postTitle}</title><meta name="description" content="${items.map(i=>i.title).join('、')}"><style>*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}:root{--bg:#fafafa;--card:#fff;--text:#1a1a2e;--t2:#666;--accent:#db2777;--border:#e5e7eb;--r:10px}body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans SC",sans-serif;background:var(--bg);color:var(--text);line-height:1.7}.container{max-width:800px;margin:0 auto;padding:0 20px}header{background:var(--card);border-bottom:1px solid var(--border);padding:20px 0;margin-bottom:32px}header a{color:var(--accent);text-decoration:none;font-size:.9rem}header h1{font-size:1.3rem;margin-top:8px}.post{background:var(--card);border:1px solid var(--border);border-radius:var(--r);padding:28px}.post .date{color:var(--t2);font-size:.8rem;margin-bottom:20px}.entry{margin-bottom:24px;padding-bottom:20px;border-bottom:1px solid var(--border)}.entry:last-child{border-bottom:none}.entry h3{font-size:1rem;margin-bottom:4px}.entry p{color:var(--t2);font-size:.9rem}.tag{display:inline-block;background:#fdf2f8;color:var(--accent);font-size:.72rem;padding:2px 8px;border-radius:10px;margin-left:6px}footer{text-align:center;padding:32px 20px;color:var(--t2);font-size:.8rem}@media(max-width:600px){.post{padding:18px}}</style></head><body><header><div class="container"><a href="../index.html">← 首页</a><h1>${postTitle}</h1></div></header><main class="container"><article class="post"><div class="date">📅 ${today}</div>${items.map(i=>`<div class="entry"><h3>${i.title} <span class="tag">${i.tag}</span></h3><p>${i.desc}</p></div>`).join('')}</article></main><footer><p>育儿知识 · 每日更新</p></footer></body></html>`;
fs.writeFileSync(path.join(__dirname,'..','posts',`${slug}.html`),html);
console.log('Generated:',postTitle);
