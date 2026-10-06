// ==================== 1. Firebase 初始化設定 ====================
const firebaseConfig = {
  apiKey: "AIzaSyDAz6MBrAlfrCe9aj1XfPl2bbNLQgyOKcY",
  authDomain: "webgame-f2b8e.firebaseapp.com",
  projectId: "webgame-f2b8e",
  storageBucket: "webgame-f2b8e.firebasestorage.app",
  messagingSenderId: "301916491537",
  appId: "1:301916491537:web:ffb0de223d7db5b1f506b0",
  measurementId: "G-ZP22DLNQSD"
};

if (typeof firebase !== "undefined" && !firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function saveRecordToFirebase(recordData) {
  if (typeof firebase !== "undefined") {
    const db = firebase.firestore();
    let studentId = (recordData.userName || "未具名").trim();
    let qDocId = `Q${recordData.questionId}`;

    db.collection("students").doc(studentId)
      .collection("answers").doc(qDocId)
      .set(recordData)
      .then(() => console.log(`成功記錄：【${studentId}】的【${qDocId}】資料！`))
      .catch((error) => console.error("Firebase 記錄失敗: ", error));
  }
}

// ==================== 2. SEL 題庫 ====================
const questionDatabase = [
  // ---------------- 主軸一：自我覺察 ----------------
  {
    id: 1,
    axis: "主軸一：自我覺察",
    title: "黃金神劍的誘惑",
    source: "《消失的魔法金幣》第 1 頁",
    story: "《超能騎士》的黃金神劍特惠只剩最後一天，但撲滿裡只剩下幾個一元硬幣。\n看著倒數計時器，小宇有可能出現什麼反應？",
    optA: "呼吸變得急促，眼睛一直盯著神劍，腦海裡全是『好想要』的聲音。",
    optB: "肚子隱隱抽痛，看著空空的存錢筒，心裡充滿得不到的焦慮與失落。",
    cardImgAUrl: "https://i.postimg.cc/fRwZbTKd/10-removebg-preview.png",
    cardImgBUrl: "https://i.postimg.cc/PqTLxCJV/02-removebg-preview.png",
    badgeName: "誘惑防禦者",
    badgeImgUrl: "https://i.postimg.cc/Wp67vpc5/shield.png",
    calmMsg: "限時特惠讓人心慌！跟著小精靈深呼吸 2 次，分清楚這是『需要』還是『想要』。",
    choicePrompt: "覺察到自己強烈的物慾後，你可以怎麼做呢？",
    actGood: "深呼吸告訴自己：「這只是虛擬裝備，我的生活沒有它也不會怎麼樣。」",
    actBad: "整天坐立難安、吃不下飯，一直想著一定要得到它。",
    actImgGoodUrl: "https://i.postimg.cc/9fCx6LL8/ping-jing-(2).png", 
    actImgBadUrl: "https://i.postimg.cc/qRmMsCC1/chi-bu-xia-removebg-preview.png", 
    expGood: "大腦從衝動的購物狂熱中冷靜下來，你找回了理智！",
    expBad: "強烈的慾望蒙蔽了你的判斷，讓你一步步走向偷拿手機的危險邊緣。"
  },
  {
    id: 2,
    axis: "主軸一：自我覺察",
    title: "摔倒後的羞恥感",
    source: "《那張照片傳出去之後……》第 1 頁",
    story: "打樂樂棒球時，阿誠左腳絆右腳整個人大字型撲進沙坑，滿臉是沙。\n周圍同學爆發出大笑，如果你是阿誠，你的身體有什麼感覺？",
    optA: "臉頰滾燙像著火一樣，耳朵發紅，好想立刻挖地洞躲起來。",
    optB: "手心冒汗、喉嚨乾乾的，覺得委屈又很在乎自己的面子。",
    cardImgAUrl: "https://i.postimg.cc/fRwZbTKd/10-removebg-preview.png",
    cardImgBUrl: "https://i.postimg.cc/PqTLxCJV/02-removebg-preview.png",
    badgeName: "情緒觀察小雷達",
    badgeImgUrl: "https://i.postimg.cc/7ZbYqZX2/satellite-dish.png",
    calmMsg: "出糗時的心跳非常快！先做兩次慢速深呼吸，聽聽身體發出的羞愧訊號。",
    choicePrompt: "你吐掉嘴裡的沙子後，你會如何覺察並表達自己的感受？",
    actGood: "深呼吸拍掉身上的沙子，坦然對大家笑笑說：「哎呀摔得好狼狽，但這球我接到了喔！」",
    actBad: "覺得面子全沒了，氣得把棒球用力摔在地上，對著大笑的同學破口大罵。",
    actImgGoodUrl: "https://i.postimg.cc/9fCx6LL8/ping-jing-(2).png", 
    actImgBadUrl: "https://i.postimg.cc/qRmMsCC1/chi-bu-xia-removebg-preview.png",
    expGood: "你幽默地化解了尷尬，大家稱讚你接球很拚命，笑聲變成了敬佩的掌聲！",
    expBad: "摔球讓氣氛瞬間降到冰點，大家覺得你開不起玩笑，體育課不歡而散。"
  },
  {
    id: 3,
    axis: "主軸一：自我覺察",
    title: "偷偷儲值的罪惡感",
    source: "《消失的魔法金幣》第 5 頁",
    story: "小宇顫抖著手指在媽媽手機輸入密碼，儲值成功的瞬間，\n一隻『謊言怪獸』爬上了小宇的肩膀。如果是你，你的身體這時會有什麼信號？",
    optA: "心跳突然狂飆跳得超快，手心全是冰冷的汗水。",
    optB: "肩膀莫名變得好沉重，喉嚨緊縮發不出聲音，完全開心不起來。",
    cardImgAUrl: "https://i.postimg.cc/KY3Hr1p7/12-(1).png",
    cardImgBUrl: "https://i.postimg.cc/QxRNJTfr/chu-zhi-guai-wu.png",
    badgeName: "良心警報器",
    badgeImgUrl: "https://i.postimg.cc/XqJTy4hh/lights.png",
    calmMsg: "身體的緊繃正是良心在發出警訊。深呼吸 2 次，誠實面對心裡的害怕。",
    choicePrompt: "拿到神劍的你發現自己一點也不快樂，你怎麼發現這個訊號？",
    actGood: "停下腳步覺察：「原來用偷竊得到東西，身體會這麼難受，這不是真正的快樂。」",
    actBad: "忽略狂跳的心臟，安慰自己說：「反正才 300 元，媽媽那麼多錢一定不會發現！」",
    actImgGoodUrl: "https://i.postimg.cc/wv7TkQYH/21.png", 
    actImgBadUrl: "https://i.postimg.cc/DydFLM40/23.png", 
    expGood: "你即時覺察到了內疚感，替接下來勇敢坦白埋下了反省的種子！",
    expBad: "你試圖壓抑罪惡感，肩膀上的謊言怪獸因此吸收到更多養分，變得越來越大隻。"
  },
  {
    id: 4,
    axis: "主軸一：自我覺察",
    title: "收到讚數的驕傲",
    source: "《那張照片傳出去之後……》第 8 頁",
    story: "阿誠的照片被做成搞笑表情在全班瘋傳，阿誠用課本遮住臉發抖。\n小宇手機滿是同學按讚，但他看著自己的手指，身體出現了什麼感覺？",
    optA: "胸口像被大石頭壓住，胃部沉甸甸地下墜。",
    optB: "看著那些讚，心裡有點覺得不對勁卻還是開心居多",
    cardImgAUrl: "https://i.postimg.cc/fRwZbTKd/10-removebg-preview.png",
    cardImgBUrl: "https://i.postimg.cc/PqTLxCJV/02-removebg-preview.png",
    badgeName: "內在指南針",
    badgeImgUrl: "https://i.postimg.cc/WtRz9WMp/compass.png",
    calmMsg: "讚聲帶不來真正的快樂。跟著小精靈深呼吸，看清這項行為背後的真相。",
    choicePrompt: "小宇看著阿誠哭泣的背影，他覺察到了什麼？",
    actGood: "覺察到：「沒有經過對方同意的幽默不是好笑，而是傷人的尖刺。」",
    actBad: "心想：「大家都笑得很開心啊，是阿誠自己太敏感、開不起玩笑啦！」",
    actImgGoodUrl: "https://i.postimg.cc/9fCx6LL8/ping-jing-(2).png", 
    actImgBadUrl: "https://i.postimg.cc/qRmMsCC1/chi-bu-xia-removebg-preview.png",
    expGood: "小宇誠實面對內疚，明白了網路隱私與同儕界線的真正意義！",
    expBad: "小宇把責任推給同儕起鬨，失去了最珍貴的自省能力與死黨的信任。"
  },
  {
    id: 5,
    axis: "主軸一：自我覺察",
    title: "噓！不要被發現！",
    source: "《消失的魔法金幣》第 11 頁",
    story: "小宇對媽媽謊稱『卡片被盜刷』，躲進被窩蒙住頭，\n天花板全是媽媽疲憊的紅眼睛。這時小宇察覺到自己的心理狀態是？",
    optA: "發現自己像被大網子罩住，逃避雖然躲過被罵，有點慶幸之餘又害怕被發現。",
    optB: "腦袋像當機一樣，媽媽沙啞的聲音一直在耳邊揮之不去，不斷提醒著自己做錯事。",
    cardImgAUrl: "https://i.postimg.cc/s21zhPWC/13.png",
    cardImgBUrl: "https://i.postimg.cc/SRLbhDBx/14.png",
    badgeName: "真實勇氣種子",
    badgeImgUrl: "https://i.postimg.cc/zGGZsw0y/sprout.png",
    calmMsg: "說謊的代價是失去平靜。深呼吸 2 次，讓新鮮空氣帶給自己面對的勇氣。",
    choicePrompt: "蒙在被窩裡的小宇，領悟到了什麼？",
    actGood: "心裡清楚明白：「說謊完全沒辦法讓我快樂，反而讓我陷入更大的痛苦。」",
    actBad: "繼續催眠自己：「只要我打死不承認，過幾天媽媽就會忘記這件事了。」",
    actImgGoodUrl: "https://i.postimg.cc/9QnSs6D8/25.png", 
    actImgBadUrl: "https://i.postimg.cc/85BZk9z9/22.png",
    expGood: "這份覺察讓他決定刪除遊戲、走出房間向媽媽自首！",
    expBad: "謊言的巨石壓得小宇徹夜失眠，身心飽受折磨。"
  },

  // ---------------- 主軸二：自我管理 ----------------
  {
    id: 6,
    axis: "主軸二：自我管理",
    title: "同儕起鬨的瞬間",
    source: "《那張照片傳出去之後……》第 3 頁",
    story: "大家圍在書桌旁起鬨大喊：『小宇快傳！這張太經典了，快分享給大家！』\n小宇的手指正懸在螢幕的分享鍵上...\n如果是你，你會如何行動？",
    optA: "呼吸急促、腦袋發熱，有一種想成為全班焦點的興奮衝動。",
    optB: "手指向下按的瞬間感到一絲不安，猶豫要不要停下來。",
    cardImgAUrl: "https://i.postimg.cc/s21zhPWC/13.png",
    cardImgBUrl: "https://i.postimg.cc/SRLbhDBx/14.png",
    badgeName: "衝動剎車王",
    badgeImgUrl: "https://i.postimg.cc/fbbdSP5L/car.png",
    calmMsg: "面對起鬨，最需要冷靜！跟著氣球慢速深呼吸，按下心裡的暫停鍵。",
    choicePrompt: "手指懸在傳送鍵上的你，該怎麼選擇？",
    actGood: "收起平板對大家說：「先等一下，我先去問問阿誠同不同意。」",
    actBad: "被大家的熱烈掌聲沖昏頭，直接按下了『傳送至班群』。",
    actImgGoodUrl: "https://i.postimg.cc/9QnSs6D8/25.png", 
    actImgBadUrl: "https://i.postimg.cc/85BZk9z9/22.png",
    expGood: "你成功抵抗了盲從起鬨的衝動，守住了尊重朋友的第一道防線！",
    expBad: "衝動的一按，讓照片瞬間變成不可收拾的嘲笑風暴。"
  },
  {
    id: 7,
    axis: "主軸二：自我管理",
    title: "得到神劍大作戰",
    source: "《消失的魔法金幣》第 2~4 頁",
    story: "餐桌上媽媽的手機亮著，小宇很想按購買，但媽媽在廚房煮飯。\n如果是你，你會怎麼克制『現在立刻就要得到』的衝動？",
    optA: "手伸出去又縮回來，心裡像有兩隻小怪獸在拔河。",
    optB: "深吸一口廚房飄來的香氣，把視線從手機螢幕上移開。",
    cardImgAUrl: "https://i.postimg.cc/0yTcqDsY/16.png",
    cardImgBUrl: "https://i.postimg.cc/d3D6w1Zq/03.png",
    badgeName: "自律小達人",
    badgeImgUrl: "https://i.postimg.cc/wv656kb4/self-disciplined.png",
    calmMsg: "延遲滿足是強大的超能力。深呼吸 2 次，用意志力抵抗虛擬的誘惑。",
    choicePrompt: "你會如何管理自己的購物衝動？",
    actGood: "放下手機，走進廚房坦白問媽媽：「我可以做家事集點來換零用錢買神劍嗎？」",
    actBad: "趁媽媽炒菜抽油煙機很吵，快速按下一鍵購買並刪除簡訊通知。",
    actImgGoodUrl: "https://i.postimg.cc/XYfypC52/05.png", 
    actImgBadUrl: "https://i.postimg.cc/tJnsyZy4/04-background.png",
    expGood: "媽媽給了你一張家事集點卡，雖然沒立刻得到神劍，但內心無比踏實坦蕩！",
    expBad: "未經同意的花費成了家庭風暴的開端，信任一旦被打破就很難修復了..."
  },
  {
    id: 8,
    axis: "主軸二：自我管理",
    title: "面對媽媽的查帳",
    source: "《消失的魔法金幣》第 6 頁",
    story: "晚飯時媽媽看著 300 元消費通知問：『小宇，你拿我手機玩遊戲了嗎？』\n小宇害怕媽媽大發雷霆，他該如何是好呢？",
    optA: "心臟提到嗓子眼，頭低得快碰到碗裡，眼珠慌張亂轉。",
    optB: "手緊緊抓著筷子，喉嚨發緊想要編造藉口逃脫。",
    cardImgAUrl: "https://i.postimg.cc/PqBxyf1D/huang-zhangpng.png",
    cardImgBUrl: "https://i.postimg.cc/qRmMsCC1/chi-bu-xia-removebg-preview.png",
    badgeName: "誠實金盾牌",
    badgeImgUrl: "https://i.postimg.cc/W4JpdRCS/sheild.png",
    calmMsg: "害怕被罵是正常的。深呼吸把胸口的恐慌吐出去，深吸一口說實話的勇氣。",
    choicePrompt: "在飯桌上被詢問的小宇，最好的情緒管理行動是？",
    actGood: "深吸一口氣放下筷子：「媽媽對不起，是我剛剛忍不住偷買的，我做錯了。」",
    actBad: "眼神閃爍低下頭撒謊：「沒、沒有啊！一定是妳的手機被駭客盜刷了！」",
    actImgGoodUrl: "https://i.postimg.cc/9QnSs6D8/25.png", 
    actImgBadUrl: "https://i.postimg.cc/qRmMsCC1/chi-bu-xia-removebg-preview.png",
    expGood: "媽媽雖然嚴肅，但肯定小宇當下的誠實，事情在第一時間得到控制！",
    expBad: "一句『被盜刷』的謊言，引發了媽媽徹夜焦慮掛失卡片的大災難。"
  },
  {
    id: 9,
    axis: "主軸二：自我管理",
    title: "面對錯誤的勇氣",
    source: "《消失的魔法金幣》第 12 頁",
    story: "看著用謊言換來的黃金神劍，小宇覺得它一點價值也沒有。\n他決定管理好自己的沉迷，他可以採取什麼行動？",
    optA: "手指長按遊戲圖標時有些不捨，決定再考慮一下。",
    optB: "深吸一口氣，決定斬斷誘惑自己犯錯的源頭。",
    cardImgAUrl: "https://i.postimg.cc/j264KFRc/15.png",
    cardImgBUrl: "https://i.postimg.cc/0yTcqDsY/16.png",
    badgeName: "斷捨離大師",
    badgeImgUrl: "https://i.postimg.cc/J7ThYQNY/abandoned-cart.png",
    calmMsg: "對自己的錯誤負責任，需要堅定的魄力。深呼吸，做出你認為正確的選擇吧！",
    choicePrompt: "面對心愛的遊戲，小宇展現了什麼自我管理？",
    actGood: "毅然把遊戲拖進垃圾桶刪除，走出房門向媽媽深深鞠躬道歉！",
    actBad: "捨不得刪除神劍，把手機藏在枕頭下繼續玩，打算當作沒事發生。",
    actImgGoodUrl: "https://i.postimg.cc/CL7q0nvx/26-removebg-preview.png", 
    actImgBadUrl: "https://i.postimg.cc/DydFLM40/23.png",
    expGood: "刪除遊戲卸下了沉重枷鎖，小宇學會了為自己的行為劃下自律底線！",
    expBad: "留著神劍讓內疚感不斷蔓延，謊言遲早會以更難堪的方式被揭穿。"
  },
  {
    id: 10,
    axis: "主軸二：自我管理",
    title: "隱私被侵犯的憤怒",
    source: "《那張照片傳出去之後……》第 7 頁",
    story: "放學時小宇在校門口拉住阿誠的衣角想解釋，阿誠紅著眼睛甩開手。\n阿誠滿腔怒火，如果是你，你會如何管理這份受傷與憤怒？",
    optA: "眼淚在眼眶打轉，滿肚子委屈與被背叛的狂怒。",
    optB: "拳頭握得很緊，呼吸急促，很想大吼大叫甚至動手推人。",
    cardImgAUrl: "https://i.postimg.cc/j264KFRc/15.png",
    cardImgBUrl: "https://i.postimg.cc/0yTcqDsY/16.png",
    badgeName: "理性長袍",
    badgeImgUrl: "https://i.postimg.cc/yxW3ppk7/trench-coat.png",
    calmMsg: "受到背叛時很痛！做 2 次長長的吐氣，把怒氣轉化為清楚的界線表達。",
    choicePrompt: "你該如何有力又安全地表達自己的底線呢？",
    actGood: "深吸一口氣，看著小宇說：「你沒問過我真的很受傷，在你想清楚前我不想跟你說話。」",
    actBad: "衝上去把小宇推倒在地上，搶走小宇的手機摔爛在路上。",
    actImgGoodUrl: "https://i.postimg.cc/CL7q0nvx/26-removebg-preview.png", 
    actImgBadUrl: "https://i.postimg.cc/DydFLM40/23.png",
    expGood: "阿誠清楚表達了界線，既宣洩了受傷的情緒，又沒有讓自己淪為施暴者！",
    expBad: "動手摔手機讓原本有理的阿誠變成了打人的一方，引來家長與學務處介入。"
  },

  // ---------------- 主軸三：社會覺察 ----------------
  {
    id: 11,
    axis: "主軸三：社會覺察",
    title: "看見辛勞的汗水",
    source: "《消失的魔法金幣》第 8~9 頁",
    story: "小宇原本以為媽媽只是心疼 300 元。戴上同理心眼鏡後，\n他看見媽媽在烈日下站立工作 3 小時的汗水，賺到的僅僅是全家兩天的買菜錢。\n如果是你的話，你會有甚麼感受呢？",
    optA: "看著媽媽痠痛的雙腿，心裡一陣陣酸楚與心疼。",
    optB: "深刻體會到原來虛擬世界的金幣，是現實中媽媽用體力換來的。",
    cardImgAUrl: "https://i.postimg.cc/50qkmV0f/14-(1).png",
    cardImgBUrl: "https://i.postimg.cc/K8jSvRzx/17.png",
    badgeName: "共情之眼",
    badgeImgUrl: "https://i.postimg.cc/V61KvVRd/eye.png",
    calmMsg: "同理心讓我們看見真實代價。深呼吸，感謝父母默默為家庭的付出。",
    choicePrompt: "體會到金錢的勞動價值後，你心中有了什麼轉變？",
    actGood: "暗自下定決心：「我要拿出存錢筒所有的錢還給媽媽，分擔她的辛苦。」",
    actBad: "心想：「大人養我雖然很辛苦，但因為我還小沒辦法賺錢嘛。」",
    actImgGoodUrl: "https://i.postimg.cc/CL7q0nvx/26-removebg-preview.png", 
    actImgBadUrl: "https://i.postimg.cc/d1ynWKVB/18.png",
    expGood: "你懂得勞動的重量與珍惜金錢，從一個任性的孩子蛻變為體貼的家人！",
    expBad: "缺乏感恩的心態讓你對現實脫節，難以體會親人付出的不易。"
  },
  {
    id: 12,
    axis: "主軸三：社會覺察",
    title: "紅腫眼睛之下的愛",
    source: "《消失的魔法金幣》第 9 頁",
    story: "媽媽熬夜對帳、打電話凍結卡片，連早餐都沒吃。\n小宇發現媽媽焦慮是擔心個資被入侵，家人的安全有危險\n這時的你會感受到什麼嗎？。",
    optA: "看見媽媽疲憊揉著太陽穴的側影，體會到媽媽焦慮背後深沉的母愛。",
    optB: "意識到自己的謊言，狠狠戳中了媽媽最想保護家人的那份脆弱。",
    cardImgAUrl: "https://i.postimg.cc/dtZhft2H/20-1.png",
    cardImgBUrl: "https://i.postimg.cc/50qkmV0f/14-(1).png",
    badgeName: "守護同理心",
    badgeImgUrl: "https://i.postimg.cc/fTnWq7Bd/security.png",
    calmMsg: "愛的背後有時藏著深深的擔憂。深呼吸，用愛與誠實回報愛。",
    choicePrompt: "看著精疲力竭的媽媽，你會做什麼同理行動？",
    actGood: "倒一杯溫水遞給媽媽，紅著眼眶抱著媽媽說：「媽媽妳辛苦了，對不起...」",
    actBad: "假裝沒看見媽媽的黑眼圈，照常和媽媽相處。",
    actImgGoodUrl: "https://i.postimg.cc/5NCY6NRc/26.png", 
    actImgBadUrl: "https://i.postimg.cc/s21zhPWC/13.png",
    expGood: "你的擁抱給了媽媽最大的心理安慰，母子間的愛與同理重新流動！",
    expBad: "冷漠的反應讓疲憊的媽媽倍感寒心，家裡瀰漫著說不出的壓力。"
  },
  {
    id: 13,
    axis: "主軸三：社會覺察",
    title: "傳送前的猶豫",
    source: "《那張照片傳出去之後……》第 9~10 頁",
    story: "小宇拿著阿誠出糗的照片，拒絕了起鬨，親自走到阿誠身邊小聲詢問：\n『這張摔倒照片超搞笑，大家叫我傳群組。你可以嗎？不喜歡我就刪掉。』\n想一想，今天如果你是小宇，你會怎麼做呢？",
    optA: "換位思考：如果我是摔在沙坑的人，我也會覺得很難堪害羞。",
    optB: "體會到阿誠雖然臉上有笑容，但搖頭的背後是希望保護自己的形象。",
    cardImgAUrl: "https://i.postimg.cc/dtZhft2H/20-1.png",
    cardImgBUrl: "https://i.postimg.cc/50qkmV0f/14-(1).png",
    badgeName: "數位尊重大使",
    badgeImgUrl: "https://i.postimg.cc/3NS2FSQs/trust.png",
    calmMsg: "真正的幽默是大家都笑得出來！深呼吸，把尊重放在好玩之前。",
    choicePrompt: "阿誠害羞搖頭說太醜了，你會回答什麼呢？",
    actGood: "笑著說「沒問題！」並當著阿誠的面按下刪除鍵清空垃圾桶！",
    actBad: "跟阿誠盧說：「哎唷笑一下會怎樣，只傳給三個好朋友看而已啦！」",
    actImgGoodUrl: "https://i.postimg.cc/5NCY6NRc/26.png", 
    actImgBadUrl: "https://i.postimg.cc/s21zhPWC/13.png",
    expGood: "小宇保護了死黨的自尊！阿誠放學請他吃雙節冰棒，稱讚他是最夠義氣的兄弟！",
    expBad: "勉強對方的結果，是在彼此心裡留下一根拔不掉的刺，友情產生裂痕。"
  },
  {
    id: 14,
    axis: "主軸三：社會覺察",
    title: "空氣中的窒息感",
    source: "《那張照片傳出去之後……》第 6 頁",
    story: "照片傳出去後，阿誠整節課用厚課本遮住臉，獨自走向保健室，手微微發抖。\n身為同班同學的你，能察覺到阿誠此刻的處境嗎？",
    optA: "感受到全班的竊竊私語和偷笑，對阿誠來說就像無數根看不見的針在刺他。",
    optB: "對這件事毫無察覺，只覺得阿誠因為剛剛跌倒身體不舒服想去休息。",
    cardImgAUrl: "https://i.postimg.cc/dtZhft2H/20-1.png",
    cardImgBUrl: "https://i.postimg.cc/50qkmV0f/14-(1).png",
    badgeName: "敏銳暖心偵探",
    badgeImgUrl: "https://i.postimg.cc/KzQTmqjg/private-detective.png",
    calmMsg: "旁觀者的善意能拯救受傷的靈魂。深呼吸，察覺朋友無聲的求救信號。",
    choicePrompt: "看見阿誠孤單走向保健室，你可以展現什麼同理善意？",
    actGood: "默默跟去保健室，遞給阿誠一張小紙條：「阿誠，我陪你，剛才笑的人太過分了。」",
    actBad: "在教室座位上繼續和同學們討論剛剛的照片有多好笑。",
    actImgGoodUrl: "https://i.postimg.cc/5NCY6NRc/26.png", 
    actImgBadUrl: "https://i.postimg.cc/s21zhPWC/13.png",
    expGood: "你的及時陪伴像一束光，接住了差點被網路嘲笑擊垮的阿誠！",
    expBad: "冷漠的旁觀成了霸凌的推手，阿誠對校園環境徹底失去安全感。"
  },
  {
    id: 15,
    axis: "主軸三：社會覺察",
    title: "負責任三部曲",
    source: "《消失的魔法金幣》第 14~15 頁",
    story: "小宇哭著坦白後，媽媽抱住了他。媽媽說：『哭泣不能解決問題，我們要一起負責。』\n他們一起完成了實體賠償、客服退款與訂定家庭 3C 公約。",
    optA: "體會到認錯不是軟弱，而是深刻同理了對方的受傷後，願意承擔代價。",
    optB: "感受到媽媽的擁抱是接納，約定的簽名是信任的重新建立。",
    cardImgAUrl: "https://i.postimg.cc/tgnyqYg7/26.png",
    cardImgBUrl: "https://i.postimg.cc/5NCY6NRc/26.png",
    badgeName: "責任守護大宗師",
    badgeImgUrl: "https://i.postimg.cc/wT1Ndkpp/master.png",
    calmMsg: "真誠的信任比神劍更珍貴。深呼吸，體會負責任所帶來的平靜與解脫。",
    choicePrompt: "面對自己犯下的數位消費錯誤，最成熟的處理態度是？",
    actGood: "拿出存錢筒把錢還給媽媽，並與家人共同簽署『家庭 3C 密碼守則』嚴格遵守。",
    actBad: "被原諒後覺得沒事了，過了不久後又想買別的玩具。",
    actImgGoodUrl: "https://i.postimg.cc/QdsWWZ7X/27-1.png", 
    actImgBadUrl: "https://i.postimg.cc/fRwZbTKd/10-removebg-preview.png",
    expGood: "那隻壓在心頭如大象般沉重的怪獸徹底消散，客廳迎來了久違的溫暖！",
    expBad: "沒有付出行動的承諾是廉價的，一旦故技重施將粉碎親子間建立的信賴。"
  }
];

// ==================== 3. 遊戲狀態控制邏輯 ====================
const SCENE_START = 0;       // 主選單
const SCENE_AWARENESS = 1;   // 自我覺察
const SCENE_BREATH = 2;      // 自我調節 (深呼吸)
const SCENE_DECISION = 3;    // 抉擇行動
const SCENE_FEEDBACK = 4;    // 回饋與解鎖
const SCENE_ALREADY_DONE = 5;// 今日已完成打卡（備用）
const SCENE_BADGE_WALL = 6;  // 徽章圖鑑牆
const SCENE_CONGRATS = 7;    // 全通關大獎牌畫面

let currentScene = SCENE_START;
let currentQuestionIndex = 0; 
let totalScore = 0;           
let lastChoiceWasGood = false;

// 參加者資訊
let studentName = "";
let nameInput;
let showNameWarning = false;

// 答題紀錄暫存
let userAwareness = "";
let userDecision = "";

// 深呼吸互動控制
let breathTimer = 0;
let breathCount = 0;
const REQUIRED_BREATHS = 2;
let counted = false;

let breathImg = null;
let breathImgUrl = "https://i.postimg.cc/KjCnGHLw/04-1-1x1.png";

// 🌟 全通關大圖示
let congratsImg = null;
let congratsImgUrl = ""; 

// 慶祝紙花粒子系統
let confetti = [];

// 🌟 金牌中心插圖（請在此填入圖片網址）
let medalCenterImg = null;
let medalCenterImgUrl = "https://i.postimg.cc/hGfMJppk/24.png";

// 卡牌尺寸與排版座標
let cardW = 255;
let cardH = 265;
let cardA_X = 55;
let cardB_X = 330;
let cardY = 195;

function getTodayDateString() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function getUnlockedBadges() {
  let list = localStorage.getItem("sel_unlocked_badges");
  return list ? JSON.parse(list) : [];
}

function saveUnlockedBadge(badgeName) {
  let list = getUnlockedBadges();
  if (!list.includes(badgeName)) {
    list.push(badgeName);
    localStorage.setItem("sel_unlocked_badges", JSON.stringify(list));
  }
}

// 支援非同步圖片載入
async function setup() {
  // 💡 強制清除阻擋標記，確保隨時可測試
  localStorage.removeItem("sel_last_date");

  mainCanvas = createCanvas(640, 550);
  textAlign(CENTER, CENTER);
  rectMode(CORNER);

  // 💡 畫布圓角與精緻陰影
  mainCanvas.style("border-radius", "20px");
  mainCanvas.style("box-shadow", "0 10px 30px rgba(0, 0, 0, 0.12)");
  mainCanvas.style("overflow", "hidden");

  // 初始化紙花
  for (let i = 0; i < 60; i++) {
    confetti.push({
      x: random(width),
      y: random(-height, 0),
      size: random(6, 12),
      speedY: random(1.5, 4),
      speedX: random(-1.5, 1.5),
      color: color(random(255), random(200, 255), random(150, 255))
    });
  }

  // 建立輸入框
  nameInput = createInput("");
  nameInput.attribute("placeholder", "請輸入你的姓名或座號");
  nameInput.size(220, 36);
  nameInput.style("font-size", "16px");
  nameInput.style("text-align", "center");
  nameInput.style("border-radius", "8px");
  nameInput.style("border", "2px solid #d4c5a9");
  nameInput.style("outline", "none");
  nameInput.style("box-sizing", "border-box");
  nameInput.style("background-color", "#ffffff");

  // 載入深呼吸圖片
  if (breathImgUrl) {
    try { breathImg = await loadImage(breathImgUrl); } catch (err) { breathImg = null; }
  }

  // 載入金牌中間的圖片
  if (medalCenterImgUrl && medalCenterImgUrl !== "") {
    try {
      medalCenterImg = await loadImage(medalCenterImgUrl);
    } catch (err) {
      console.warn("金牌中心圖片載入失敗:", err);
      medalCenterImg = null;
    }
  }
  
  // 載入大結業圖案
  if (congratsImgUrl) {
    try { congratsImg = await loadImage(congratsImgUrl); } catch (err) { congratsImg = null; }
  }

  // 載入 15 題的徽章與 4 張專屬卡牌圖片
  for (let i = 0; i < questionDatabase.length; i++) {
    let q = questionDatabase[i];

    if (q.badgeImgUrl) {
      try { q.badgeImg = await loadImage(q.badgeImgUrl); } catch (e) { q.badgeImg = null; }
    } else { q.badgeImg = null; }

    if (q.cardImgAUrl) {
      try { q.cardImgA = await loadImage(q.cardImgAUrl); } catch (e) { q.cardImgA = null; }
    } else { q.cardImgA = null; }

    if (q.cardImgBUrl) {
      try { q.cardImgB = await loadImage(q.cardImgBUrl); } catch (e) { q.cardImgB = null; }
    } else { q.cardImgB = null; }

    if (q.actImgGoodUrl) {
      try { q.actImgGood = await loadImage(q.actImgGoodUrl); } catch (e) { q.actImgGood = null; }
    } else { q.actImgGood = null; }

    if (q.actImgBadUrl) {
      try { q.actImgBad = await loadImage(q.actImgBadUrl); } catch (e) { q.actImgBad = null; }
    } else { q.actImgBad = null; }
  }

  checkDailyProgress();
}

function checkDailyProgress() {
  let nextQId = parseInt(localStorage.getItem("sel_next_qid") || "1");
  currentQuestionIndex = (nextQId - 1) % questionDatabase.length;
  // 🔓 暫時關閉時間限制：重整直接進入主畫面
  currentScene = SCENE_START;
}

function draw() {
  background(235, 228, 206);

  // 輸入框位置
  if (nameInput) {
    if (currentScene === SCENE_START) {
      nameInput.show();
      let cvPos = mainCanvas.position();
      let inputW = 220;
      let targetX = cvPos.x + (width - inputW) / 2;
      let targetY = cvPos.y + 305;
      nameInput.position(targetX, targetY);
    } else {
      nameInput.hide();
    }
  }

  switch (currentScene) {
    case SCENE_START:
      drawStartScreen();
      break;
    case SCENE_AWARENESS:
      drawAwarenessScreen();
      break;
    case SCENE_BREATH:
      drawBreathScreen();
      break;
    case SCENE_DECISION:
      drawDecisionScreen();
      break;
    case SCENE_FEEDBACK:
      drawFeedbackScreen();
      break;
    case SCENE_ALREADY_DONE:
      drawAlreadyDoneScreen();
      break;
    case SCENE_BADGE_WALL:
      drawBadgeWallScreen();
      break;
    case SCENE_CONGRATS:
      drawCongratsScreen();
      break;
  }
}

// ---------------- 0. 主選單畫面 ----------------
function drawStartScreen() {
  fill(239, 177, 135, 100);
  rect(0, 0, width, 160,20);
  
  fill(0);
  textSize(28);
  textStyle(BOLD);
  text("歡迎來到情緒花園！", width / 2, 60);
  textSize(16);
  textStyle(NORMAL);
  text("【各位小小探險家們，準備好接受試煉了嗎？】", width / 2, 105);

  let q = questionDatabase[currentQuestionIndex];
  fill(60);
  textSize(15);
  text(`今日日期：${getTodayDateString()}`, width / 2, 195);
  text(`目前試煉目標：第 ${q.id} 題【${q.title}】`, width / 2, 225);
  text("傾聽身體信號、深呼吸調節情緒，並做出最溫柔的決定！", width / 2, 255);

  fill(50);
  textSize(15);
  textStyle(BOLD);
  text("探險家，請輸入你的姓名或代號：", width / 2, 285);

  if (showNameWarning) {
    fill(210, 60, 60);
    textSize(13);
    text("⚠️ 請先輸入姓名或座號再開始試煉喔！", width / 2, 355);
  }

  drawAutoButton(width / 2 - 130, 375, 260, 48, "開始試煉 ➜", color(244, 217, 126));
  drawAutoButton(width / 2 - 100, 435, 200, 38, "查看我的徽章圖鑑", color(193, 209, 196));
}

// ---------------- 1. 自我覺察畫面 ----------------
function drawAwarenessScreen() {
  let q = questionDatabase[currentQuestionIndex];
  drawProgressBar();

  fill(40);
  textSize(22);
  textStyle(BOLD);
  text(q.title, width / 2, 80);

  textSize(14.5);
  textStyle(NORMAL);
  text(q.story, width / 2, 130);

  fill(90);
  textSize(15);
  textStyle(BOLD);
  text("此刻你的身體出現了哪種信號？請翻閱你的感受卡牌：", width / 2, 175);

  drawOptionCard(cardA_X, cardY, cardW, cardH, "A", q.optA, color(239, 177, 135), q.cardImgA);
  drawOptionCard(cardB_X, cardY, cardW, cardH, "B", q.optB, color(146, 175, 155), q.cardImgB);
}

// ---------------- 2. 自我調節 (深呼吸動態圖片) ----------------
function drawBreathScreen() {
  let q = questionDatabase[currentQuestionIndex];
  drawProgressBar();

  fill(40);
  textSize(22);
  textStyle(BOLD);
  text("情緒暫停鍵：魔法深呼吸", width / 2, 65);

  fill(70);
  textSize(15);
  textStyle(NORMAL);
  text(q.calmMsg, width / 2, 105);

  breathTimer += 0.035;
  let wave = sin(breathTimer);
  let isInhaling = cos(breathTimer) > 0;

  if (wave < -0.98 && !counted) {
    breathCount++;
    counted = true;
  } else if (wave > 0) {
    counted = false;
  }

  let scaleFactor = map(wave, -1, 1, 0.8, 1.35);
  let baseSize = 130;
  let currentW = baseSize * scaleFactor;
  let currentH = baseSize * scaleFactor;

  push();
  translate(width / 2, 235);

  let tiltAngle = sin(breathTimer * 0.8) * 0.15;
  rotate(tiltAngle);

  if (breathImg) {
    noStroke();
    fill(244, 217, 126, isInhaling ? 70 : 35);
    circle(0, 0, currentW * 1.25);

    imageMode(CENTER);
    image(breathImg, 0, 0, currentW, currentH);
    imageMode(CORNER);
  } else {
    noStroke();
    fill(146, 168, 209, 100);
    circle(0, 0, currentW * 1.2);
    fill(247, 202, 201);
    circle(0, 0, currentW);
  }

  rotate(-tiltAngle);

  fill(60);
  textSize(18);
  textStyle(BOLD);
  text(isInhaling ? "吸~" : "吐~", 0, currentH / 2 + 25);
  pop();

  fill(80);
  textSize(15);
  textStyle(NORMAL);
  text(`已完成深呼吸：${min(breathCount, REQUIRED_BREATHS)} / ${REQUIRED_BREATHS} 次`, width / 2, 385);

  if (breathCount >= REQUIRED_BREATHS) {
    drawAutoButton(width / 2 - 120, 420, 240, 45, "內心平靜了，去做出決定 ➜", color(193, 209, 196));
  }
}

// ---------------- 3. 抉擇時刻 ----------------
function drawDecisionScreen() {
  let q = questionDatabase[currentQuestionIndex];
  drawProgressBar();

  fill(40);
  textSize(22);
  textStyle(BOLD);
  text("做出同理與智慧的抉擇", width / 2, 70);

  fill(70);
  textSize(15);
  textStyle(NORMAL);
  text(q.choicePrompt, width / 2, 115);

  fill(90);
  textSize(15);
  textStyle(BOLD);
  text("換作是你，你會抽取哪一張行動卡？", width / 2, 165);

  drawOptionCard(cardA_X, cardY, cardW, cardH, "行動 1", q.actGood, color(146, 175, 155), q.actImgGood);
  drawOptionCard(cardB_X, cardY, cardW, cardH, "行動 2", q.actBad, color(235, 150, 140), q.actImgBad);
}

// ---------------- 4. 即時回饋與故事結局 ----------------
function drawFeedbackScreen() {
  let q = questionDatabase[currentQuestionIndex];
  drawProgressBar();

  if (lastChoiceWasGood) {
    fill(40, 140, 70);
    textSize(22);
    textStyle(BOLD);
    text("太棒了！今日試煉成功！", width / 2, 60);

    fill(255, 250, 235);
    stroke(230, 190, 60);
    strokeWeight(2);
    rect(width / 2 - 160, 90, 320, 110, 16);
    noStroke();

    if (q.badgeImg) {
      imageMode(CENTER);
      image(q.badgeImg, width / 2, 125, 48, 48);
      imageMode(CORNER);
    }

    fill(180, 100, 0);
    textSize(17);
    textStyle(BOLD);
    text(`解鎖稱號：【${q.badgeName}】`, width / 2, q.badgeImg ? 175 : 145);

    fill(60);
    textSize(14.5);
    textStyle(NORMAL);
    text(q.expGood, width / 2, 235);

    fill(30, 120, 180);
    textSize(13);
    text(`探險家【${studentName || "同學"}】的紀錄已同步至雲端日記`, width / 2, 330);
  } else {
    fill(210, 70, 70);
    textSize(22);
    textStyle(BOLD);
    text("哎呀！這會是一場烏雲風暴...", width / 2, 85);

    fill(60);
    textSize(15);
    textStyle(NORMAL);
    text(q.expBad, width / 2, 220);
  }

  let unlocked = getUnlockedBadges();
  if (unlocked.length >= questionDatabase.length) {
    drawAutoButton(width / 2 - 130, 410, 260, 48, "領取情緒小達人獎牌 ➜", color(255, 215, 0));
  } else {
    drawAutoButton(width / 2 - 120, 410, 240, 48, "前往徽章圖鑑牆 ➜", color(225, 207, 174));
  }
}

// ---------------- 5. 今日已打卡畫面 ----------------
function drawAlreadyDoneScreen() {
  push();
  noStroke();
  fill(0, 0, 0, 15);
  rect(32, 28, width - 60, 120, 20);

  fill(225, 207, 174);
  rect(30, 25, width - 60, 120, 20);
  pop();

  fill(60);
  textSize(26);
  textStyle(BOLD);
  text("今日情緒試煉已完成！", width / 2, 85);

  fill(80);
  textSize(16);
  textStyle(NORMAL);
  text("你今天已經記錄過情緒日記並完成試煉囉！\n讓今天的平靜與同理心陪伴你，明天再來解鎖新徽章吧！", width / 2, 220);

  drawAutoButton(width / 2 - 120, 360, 240, 50, "查看我的徽章圖鑑牆", color(244, 217, 126));
}

// ---------------- 6. 徽章圖鑑牆 ----------------
function drawBadgeWallScreen() {
  fill(60);
  textSize(22);
  textStyle(BOLD);
  text("我的情緒花園徽章收藏冊", width / 2, 38);

  let unlocked = getUnlockedBadges();
  textSize(14);
  textStyle(NORMAL);
  text(`目前已蒐集：${unlocked.length} / ${questionDatabase.length} 個徽章`, width / 2, 66);

  let startX = 55;
  let startY = 88;
  let boxW = 96;
  let boxH = 96;
  let gapX = 12;
  let gapY = 14;

  for (let i = 0; i < questionDatabase.length; i++) {
    let row = Math.floor(i / 5);
    let col = i % 5;
    let x = startX + col * (boxW + gapX);
    let y = startY + row * (boxH + gapY);

    let q = questionDatabase[i];
    let isUnlocked = unlocked.includes(q.badgeName);

    push();
    if (isUnlocked) {
      fill(255, 250, 235);
      stroke(230, 180, 50);
      strokeWeight(2);
      rect(x, y, boxW, boxH, 10);
      noStroke();

      if (q.badgeImg) {
        imageMode(CENTER);
        image(q.badgeImg, x + boxW / 2, y + 36, 45, 45);
        imageMode(CORNER);
      } else {
        fill(244, 217, 126);
        circle(x + boxW / 2, y + 36, 36);
        fill(100);
        textSize(11);
        text("徽章", x + boxW / 2, y + 36);
      }

      fill(180, 100, 0);
      textSize(10);
      textStyle(BOLD);
      text(q.badgeName, x + boxW / 2, y + 74);
    } else {
      fill(235, 238, 242);
      stroke(210);
      strokeWeight(1);
      rect(x, y, boxW, boxH, 10);
      noStroke();

      fill(170);
      textSize(12);
      text("未解鎖", x + boxW / 2, y + 40);
      textSize(10);
      text(`第 ${i + 1} 題`, x + boxW / 2, y + 74);
    }
    pop();
  }

  // 💡 底部按鈕顯示邏輯
  if (unlocked.length >= questionDatabase.length) {
    drawAutoButton(width / 2 - 210, 445, 190, 42, "返回主畫面", color(193, 209, 196));
    drawAutoButton(width / 2 + 20, 445, 190, 42, "觀看結業大獎牌", color(255, 215, 0));
  } else {
    drawAutoButton(width / 2 - 210, 445, 190, 42, "返回主畫面", color(193, 209, 196));
    drawAutoButton(width / 2 + 20, 445, 190, 42, "繼續下一題 ➜", color(244, 217, 126));
  }
}

// ---------------- 7. 🌟 全通關「情緒小達人」大圖示與結業畫面 ----------------
function drawCongratsScreen() {
  for (let p of confetti) {
    noStroke();
    fill(p.color);
    circle(p.x, p.y, p.size);
    p.y += p.speedY;
    p.x += p.speedX;
    if (p.y > height) {
      p.y = random(-20, 0);
      p.x = random(width);
    }
  }

  fill(255, 252, 242, 240);
  stroke(220, 180, 70);
  strokeWeight(3);
  rect(width / 2 - 250, 40, 500, 430, 20);

  noStroke();
  fill(180, 100, 0);
  textSize(24);
  textStyle(BOLD);
  text("恭喜！你通過了情緒探險島的終極測驗！", width / 2, 85);

  fill(80);
  textSize(15);
  textStyle(NORMAL);
  text(`親愛的探險家 ${studentName || "同學"}：`, width / 2, 120);
  text("你已經成功完成全部 15 項試煉，學會傾聽身體、暫停呼吸與善意抉擇！", width / 2, 142);

  let medalCenterY = 250;
  if (congratsImg) {
    imageMode(CENTER);
    image(congratsImg, width / 2, medalCenterY, 150, 150);
    imageMode(CORNER);
  } else {
    push();
    translate(width / 2, medalCenterY);

    fill(210, 60, 60);
    noStroke();
    quad(-20, 20, -50, 95, -25, 85, 0, 30);
    quad(20, 20, 50, 95, 25, 85, 0, 30);

    fill(255, 215, 0, 60);
    circle(0, 0, 140);

    fill(255, 205, 50);
    stroke(215, 150, 20);
    strokeWeight(4);
    circle(0, 0, 110);

    // 金牌內圈
    fill(255, 225, 90);
    stroke(230, 175, 40);
    strokeWeight(2);
    circle(0, 0, 88);

    // 💡 獎章中心：改為自訂圖片
    if (medalCenterImg) {
      let maxImgBox = 70; // 圖片在金牌中央的最大尺寸
      let scaleVal = min(maxImgBox / medalCenterImg.width, maxImgBox / medalCenterImg.height);
      let drawW = medalCenterImg.width * scaleVal;
      let drawH = medalCenterImg.height * scaleVal;

      imageMode(CENTER);
      image(medalCenterImg, 0, -8, drawW, drawH);
      imageMode(CORNER);
    } else {
      // 沒放圖片時的預設皇冠
      noStroke();
      fill(175, 95, 0);
      textSize(34);
      text("👑", 0, -8);
    }

    // 底部文字標籤
    noStroke();
    fill(175, 95, 0);
    textSize(13);
    textStyle(BOLD);
    text("情緒大師", 0, 24);
    pop();
  }

  fill(60);
  textSize(14);
  textStyle(BOLD);
  text("願這份溫柔、自律與同理的力量，陪伴你在日常中閃閃發光！", width / 2, 355);

  drawAutoButton(width / 2 - 200, 400, 185, 42, "返回徽章圖鑑牆", color(193, 209, 196));
  drawAutoButton(width / 2 + 15, 400, 185, 42, "重新再玩一次 ↺", color(244, 217, 126));
}

// ---------------- 頂部進度條 ----------------
function drawProgressBar() {
  fill(230);
  noStroke();
  rect(0, 0, width, 12);

  let progress = (currentQuestionIndex + 1) / questionDatabase.length;
  fill(193, 209, 196);
  rect(0, 0, width * progress, 12);
}

// ---------------- 支援自動換行與高度自適應的按鈕 ----------------
function drawAutoButton(x, y, w, param4, param5, param6) {
  let label = "";
  let btnColor = color(200);
  let minH = 50;

  if (typeof param4 === "number") {
    minH = param4;
    label = String(param5 || "");
    btnColor = param6 || color(200);
  } else {
    label = String(param4 || "");
    btnColor = param5 || color(200);
    minH = (typeof param6 === "number") ? param6 : 50;
  }

  let fontSize = 14;
  textSize(fontSize);
  textLeading(20);
  textStyle(BOLD);

  let textW = max(20, w - 24);
  let textLines = label.split('\n');
  let totalLineCount = 0;
  
  for (let i = 0; i < textLines.length; i++) {
    let singleLine = textLines[i];
    let lineW = textWidth(singleLine);
    let estimated = Math.ceil(lineW / textW);
    totalLineCount += Math.max(1, isFinite(estimated) ? estimated : 1);
  }
  
  let dynamicH = Math.max(minH, totalLineCount * 22 + 20);

  let isHover = mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + dynamicH;

  push();
  stroke(100, 100, 100, 30);
  strokeWeight(1);
  fill(isHover ? lerpColor(btnColor, color(255), 0.3) : btnColor);
  rect(x, y, w, dynamicH, 12);

  noStroke();
  fill(40);
  textAlign(CENTER, CENTER);
  text(label, x + 12, y + 10, textW, dynamicH - 20);
  pop();

  return dynamicH;
}

// ---------------- 繪製繪本風格選項卡牌 ----------------
function drawOptionCard(x, y, w, h, badgeText, contentText, themeColor, cardImg = null) {
  let isHover = mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h;
  let offsetY = isHover ? -4 : 0;

  push();
  translate(0, offsetY);

  noStroke();
  fill(0, 0, 0, isHover ? 25 : 12);
  rect(x + 2, y + 6, w, h, 16);

  fill(255);
  stroke(isHover ? themeColor : color(220, 215, 200));
  strokeWeight(isHover ? 2.5 : 1.5);
  rect(x, y, w, h, 16);

  fill(themeColor);
  noStroke();
  arc(x + w / 2, y, 80, 45, 0, PI);

  let topMargin = 0;

  if (cardImg) {
    let maxImgBox = 135;
    let scaleVal = min(maxImgBox / cardImg.width, maxImgBox / cardImg.height);
    let drawW = cardImg.width * scaleVal;
    let drawH = cardImg.height * scaleVal;

    let imgCenterY = y + 90;
    
    imageMode(CENTER);
    image(cardImg, x + w / 2, imgCenterY, drawW, drawH);
    imageMode(CORNER);

    topMargin = 118; 
  } else {
    fill(255);
    stroke(themeColor);
    strokeWeight(2);
    circle(x + w / 2, y + 32, 40);

    noStroke();
    fill(themeColor);
    textSize(14);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text(badgeText, x + w / 2, y + 32);

    topMargin = 65;
  }

  let padX = 16;
  let bottomMargin = 28;
  let textAreaW = w - padX * 2;
  let textAreaH = h - bottomMargin - 60;

  fill(50);
  textSize(15);
  textLeading(21);
  textStyle(NORMAL);
  textAlign(CENTER, CENTER);

  if (typeof textWrap === "function") {
    textWrap(CHAR);
  }
  
  text(contentText, x + padX, y + topMargin, textAreaW, textAreaH);

  fill(isHover ? themeColor : color(160));
  textSize(12);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(isHover ? "點擊選擇 " : "選擇此項", x + w / 2, y + h - 16);

  pop();
}

// ---------------- 滑鼠點擊切換邏輯 ----------------
function mousePressed() {
  // 0. 主選單
  if (currentScene === SCENE_START) {
    if (mouseX >= width / 2 - 130 && mouseX <= width / 2 + 130 && mouseY >= 375 && mouseY <= 423) {
      let entered = nameInput ? nameInput.value().trim() : "";
      if (entered === "") {
        showNameWarning = true;
        return;
      }
      showNameWarning = false;
      studentName = entered;
      if (nameInput) nameInput.hide();
      currentScene = SCENE_AWARENESS;
    }
    if (mouseX >= width / 2 - 100 && mouseX <= width / 2 + 100 && mouseY >= 435 && mouseY <= 473) {
      if (nameInput) nameInput.hide();
      currentScene = SCENE_BADGE_WALL;
    }
  } 
  // 1. 自我覺察 (點選卡牌 A 或 B)
  else if (currentScene === SCENE_AWARENESS) {
    let q = questionDatabase[currentQuestionIndex];
    if (mouseX >= cardA_X && mouseX <= cardA_X + cardW && mouseY >= cardY && mouseY <= cardY + cardH) {
      userAwareness = q.optA;
      currentScene = SCENE_BREATH;
      breathCount = 0;
      breathTimer = 0;
    }
    if (mouseX >= cardB_X && mouseX <= cardB_X + cardW && mouseY >= cardY && mouseY <= cardY + cardH) {
      userAwareness = q.optB;
      currentScene = SCENE_BREATH;
      breathCount = 0;
      breathTimer = 0;
    }
  }
  // 2. 深呼吸調節
  else if (currentScene === SCENE_BREATH) {
    if (breathCount >= REQUIRED_BREATHS) {
      if (mouseX >= width / 2 - 120 && mouseX <= width / 2 + 120 && mouseY >= 420 && mouseY <= 465) {
        currentScene = SCENE_DECISION;
      }
    }
  } 
  // 3. 抉擇時刻
  else if (currentScene === SCENE_DECISION) {
    let q = questionDatabase[currentQuestionIndex];
    let answered = false;

    if (mouseX >= cardA_X && mouseX <= cardA_X + cardW && mouseY >= cardY && mouseY <= cardY + cardH) {
      userDecision = q.actGood;
      lastChoiceWasGood = true;
      totalScore++;
      saveUnlockedBadge(q.badgeName);
      answered = true;
    }
    if (mouseX >= cardB_X && mouseX <= cardB_X + cardW && mouseY >= cardY && mouseY <= cardY + cardH) {
      userDecision = q.actBad;
      lastChoiceWasGood = false;
      answered = true;
    }

    if (answered) {
      const todayStr = getTodayDateString();

      const logData = {
        userName: studentName || "匿名冒險家",
        questionId: q.id,
        axis: q.axis,
        title: q.title,
        date: todayStr,
        awareness: userAwareness,
        decision: userDecision,
        badgeEarned: lastChoiceWasGood ? q.badgeName : "未解鎖",
        timestamp: (typeof firebase !== "undefined") ? firebase.firestore.FieldValue.serverTimestamp() : new Date()
      };
      saveRecordToFirebase(logData);

      // 儲存下一題題號
      localStorage.setItem("sel_next_qid", String(q.id + 1));
      currentScene = SCENE_FEEDBACK;
    }
  } 
  // 4. 即時回饋（前往徽章圖鑑牆）
  else if (currentScene === SCENE_FEEDBACK) {
    let unlocked = getUnlockedBadges();
    if (mouseX >= width / 2 - 130 && mouseX <= width / 2 + 130 && mouseY >= 400 && mouseY <= 465) {
      if (unlocked.length >= questionDatabase.length) {
        currentScene = SCENE_CONGRATS;
      } else {
        currentScene = SCENE_BADGE_WALL;
      }
    }
  } 
  // 5. 今日已打卡
  else if (currentScene === SCENE_ALREADY_DONE) {
    if (mouseX >= width / 2 - 120 && mouseX <= width / 2 + 120 && mouseY >= 340 && mouseY <= 430) {
      currentScene = SCENE_BADGE_WALL;
    }
  } 
  // 6. 徽章圖鑑牆
  else if (currentScene === SCENE_BADGE_WALL) {
    let unlocked = getUnlockedBadges();

    // 點擊「返回主畫面」 (X: 110 ~ 300, Y: 435 ~ 515)
    if (mouseX >= width / 2 - 210 && mouseX <= width / 2 - 20 && mouseY >= 435 && mouseY <= 515) {
      currentScene = SCENE_START;
    }

    // 點擊右側按鈕 (X: 340 ~ 530, Y: 435 ~ 515)
    if (mouseX >= width / 2 + 20 && mouseX <= width / 2 + 210 && mouseY >= 435 && mouseY <= 515) {
      if (unlocked.length >= questionDatabase.length) {
        currentScene = SCENE_CONGRATS; // 滿 15 題看大獎牌
      } else {
        // 💡 直接讀取下一題題號進入自我覺察
        let nextQId = parseInt(localStorage.getItem("sel_next_qid") || "1");
        currentQuestionIndex = (nextQId - 1) % questionDatabase.length;
        currentScene = SCENE_AWARENESS;
      }
    }
  }
  // 7. 🌟 結業大獎牌畫面
  else if (currentScene === SCENE_CONGRATS) {
    // 點擊「返回徽章圖鑑牆」
    if (mouseX >= width / 2 - 200 && mouseX <= width / 2 - 15 && mouseY >= 390 && mouseY <= 455) {
      currentScene = SCENE_BADGE_WALL;
    }
    // 點擊「重新再玩一次」
    if (mouseX >= width / 2 + 15 && mouseX <= width / 2 + 200 && mouseY >= 390 && mouseY <= 455) {
      localStorage.removeItem("sel_next_qid");
      localStorage.removeItem("sel_unlocked_badges");
      localStorage.removeItem("sel_last_date");
      currentQuestionIndex = 0;
      currentScene = SCENE_START;
    }
  }
}