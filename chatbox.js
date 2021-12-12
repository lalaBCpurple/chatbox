// Chat Box

function transliterate(oldText,newAlphabet){
  const oldAlphabet=
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let newText='';
  for(let i=0;i<oldText.length;++i){
    let char=oldText[i];
    let j=oldAlphabet.indexOf(char);
    if(j>=0)char=newAlphabet[j];
    newText=newText+char;}
  return newText;}

function substitute(text,regex,newAlphabet){
  const match=text.match(regex);
  if(match===null)return text;
  if(match.length!=4)return text;
  match[2]=transliterate(match[2],newAlphabet);
  return match[1]+match[2]+match[3];}

function inputChatKeyPress(){
  const circleWhite=[
    'ⓐ','ⓑ','ⓒ','ⓓ','ⓔ','ⓕ','ⓖ','ⓗ','ⓘ','ⓙ','ⓚ','ⓛ','ⓜ',
    'ⓝ','ⓞ','ⓟ','ⓠ','ⓡ','ⓢ','ⓣ','ⓤ','ⓥ','ⓦ','ⓧ','ⓨ','ⓩ',
    'Ⓐ','Ⓑ','Ⓒ','Ⓓ','Ⓔ','Ⓕ','Ⓖ','Ⓗ','Ⓘ','Ⓙ','Ⓚ','Ⓛ','Ⓜ',
    'Ⓝ','Ⓞ','Ⓟ','Ⓠ','Ⓡ','Ⓢ','Ⓣ','Ⓤ','Ⓥ','Ⓦ','Ⓧ','Ⓨ','Ⓩ'];
  const courier=[
    '𝚊','𝚋','𝚌','𝚍','𝚎','𝚏','𝚐','𝚑','𝚒','𝚓','𝚔','𝚕','𝚖',
    '𝚗','𝚘','𝚙','𝚚','𝚛','𝚜','𝚝','𝚞','𝚟','𝚠','𝚡','𝚢','𝚣',
    '𝙰','𝙱','𝙲','𝙳','𝙴','𝙵','𝙶','𝙷','𝙸','𝙹','𝙺','𝙻','𝙼',
    '𝙽','𝙾','𝙿','𝚀','𝚁','𝚂','𝚃','𝚄','𝚅','𝚆','𝚇','𝚈','𝚉'];
  // Some letters are missing
  const cursive=[
    '𝒶','𝒷','𝒸','𝒹','𝑒','𝒻','𝑔','𝒽','𝒾','𝒿','𝓀','𝓁','𝓂',
    '𝓃','𝑜','𝓅','𝓆','𝓇','𝓈','𝓉','𝓊','𝓋','𝓌','𝓍','𝓎','𝓏',
    '𝒜','𝐵','𝒞','𝒟','𝐸','𝐹','𝒢','𝐻','𝐼','𝒥','𝒦','𝐿','𝑀',
    '𝒩','𝒪','𝒫','𝒬','𝑅','𝒮','𝒯','𝒰','𝒱','𝒲','𝒳','𝒴','𝒵'];
  const cursiveBold=[
    '𝓪','𝓫','𝓬','𝓭','𝓮','𝓯','𝓰','𝓱','𝓲','𝓳','𝓴','𝓵','𝓶',
    '𝓷','𝓸','𝓹','𝓺','𝓻','𝓼','𝓽','𝓾','𝓿','𝔀','𝔁','𝔂','𝔃',
    '𝓐','𝓑','𝓒','𝓓','𝓔','𝓕','𝓖','𝓗','𝓘','𝓙','𝓚','𝓛','𝓜',
    '𝓝','𝓞','𝓟','𝓠','𝓡','𝓢','𝓣','𝓤','𝓥','𝓦','𝓧','𝓨','𝓩'];
  const fraktur=[
    '𝔞','𝔟','𝔠','𝔡','𝔢','𝔣','𝔤','𝔥','𝔦','𝔧','𝔨','𝔩','𝔪',
    '𝔫','𝔬','𝔭','𝔮','𝔯','𝔰','𝔱','𝔲','𝔳','𝔴','𝔵','𝔶','𝔷',
    '𝔄','𝔅','ℭ','𝔇','𝔈','𝔉','𝔊','ℌ','ℑ','𝔍','𝔎','𝔏','𝔐',
    '𝔑','𝔒','𝔓','𝔔','ℜ','𝔖','𝔗','𝔘','𝔙','𝔚','𝔛','𝔜','ℨ'];
  const frakturBold=[
    '𝖆','𝖇','𝖈','𝖉','𝖊','𝖋','𝖌','𝖍','𝖎','𝖏','𝖐','𝖑','𝖒',
    '𝖓','𝖔','𝖕','𝖖','𝖗','𝖘','𝖙','𝖚','𝖛','𝖜','𝖝','𝖞','𝖟',
    '𝕬','𝕭','𝕮','𝕯','𝕰','𝕱','𝕲','𝕳','𝕴','𝕵','𝕶','𝕷','𝕸',
    '𝕹','𝕺','𝕻','𝕼','𝕽','𝕾','𝕿','𝖀','𝖁','𝖂','𝖃','𝖄','𝖅'];
  const outline=[
    '𝕒','𝕓','𝕔','𝕕','𝕖','𝕗','𝕘','𝕙','𝕚','𝕛','𝕜','𝕝','𝕞',
    '𝕟','𝕠','𝕡','𝕢','𝕣','𝕤','𝕥','𝕦','𝕧','𝕨','𝕩','𝕪','𝕫',
    '𝔸','𝔹','ℂ','𝔻','𝔼','𝔽','𝔾','ℍ','𝕀','𝕁','𝕂','𝕃','𝕄',
    'ℕ','𝕆','ℙ','ℚ','ℝ','𝕊','𝕋','𝕌','𝕍','𝕎','𝕏','𝕐','ℤ'];
  const sansBold=[
    '𝗮','𝗯','𝗰','𝗱','𝗲','𝗳','𝗴','𝗵','𝗶','𝗷','𝗸','𝗹','𝗺',
    '𝗻','𝗼','𝗽','𝗾','𝗿','𝘀','𝘁','𝘂','𝘃','𝘄','𝘅','𝘆','𝘇',
    '𝗔','𝗕','𝗖','𝗗','𝗘','𝗙','𝗚','𝗛','𝗜','𝗝','𝗞','𝗟','𝗠',
    '𝗡','𝗢','𝗣','𝗤','𝗥','𝗦','𝗧','𝗨','𝗩','𝗪','𝗫','𝗬','𝗭'];
  const sansBoldItalic=[
    '𝙖','𝙗','𝙘','𝙙','𝙚','𝙛','𝙜','𝙝','𝙞','𝙟','𝙠','𝙡','𝙢',
    '𝙣','𝙤','𝙥','𝙦','𝙧','𝙨','𝙩','𝙪','𝙫','𝙬','𝙭','𝙮','𝙯',
    '𝘼','𝘽','𝘾','𝘿','𝙀','𝙁','𝙂','𝙃','𝙄','𝙅','𝙆','𝙇','𝙈',
    '𝙉','𝙊','𝙋','𝙌','𝙍','𝙎','𝙏','𝙐','𝙑','𝙒','𝙓','𝙔','𝙕'];
  const serifBold=[
    '𝐚','𝐛','𝐜','𝐝','𝐞','𝐟','𝐠','𝐡','𝐢','𝐣','𝐤','𝐥','𝐦',
    '𝐧','𝐨','𝐩','𝐪','𝐫','𝐬','𝐭','𝐮','𝐯','𝐰','𝐱','𝐲','𝐳',
    '𝐀','𝐁','𝐂','𝐃','𝐄','𝐅','𝐆','𝐇','𝐈','𝐉','𝐊','𝐋','𝐌',
    '𝐍','𝐎','𝐏','𝐐','𝐑','𝐒','𝐓','𝐔','𝐕','𝐖','𝐗','𝐘','𝐙'];
  const serifBoldItalic=[
    '𝒂','𝒃','𝒄','𝒅','𝒆','𝒇','𝒈','𝒉','𝒊','𝒋','𝒌','𝒍','𝒎',
    '𝒏','𝒐','𝒑','𝒒','𝒓','𝒔','𝒕','𝒖','𝒗','𝒘','𝒙','𝒚','𝒛',
    '𝑨','𝑩','𝑪','𝑫','𝑬','𝑭','𝑮','𝑯','𝑰','𝑱','𝑲','𝑳','𝑴',
    '𝑵','𝑶','𝑷','𝑸','𝑹','𝑺','𝑻','𝑼','𝑽','𝑾','𝑿','𝒀','𝒁'];
  const squareBlack=[
    '🅰','🅱','🅲','🅳','🅴','🅵','🅶','🅷','🅸','🅹','🅺','🅻','🅼',
    '🅽','🅾','🅿','🆀','🆁','🆂','🆃','🆄','🆅','🆆','🆇','🆈','🆉',
    '🅰','🅱','🅲','🅳','🅴','🅵','🅶','🅷','🅸','🅹','🅺','🅻','🅼',
    '🅽','🅾','🅿','🆀','🆁','🆂','🆃','🆄','🆅','🆆','🆇','🆈','🆉'];
  const squareWhite=[
    '🄰','🄱','🄲','🄳','🄴','🄵','🄶','🄷','🄸','🄹','🄺','🄻','🄼',
    '🄽','🄾','🄿','🅀','🅁','🅂','🅃','🅄','🅅','🅆','🅇','🅈','🅉',
    '🄰','🄱','🄲','🄳','🄴','🄵','🄶','🄷','🄸','🄹','🄺','🄻','🄼',
    '🄽','🄾','🄿','🅀','🅁','🅂','🅃','🅄','🅅','🅆','🅇','🅈','🅉'];
  const underline=[
    'a̲','b̲','c̲','d̲','e̲','f̲','g̲','h̲','i̲','j̲','k̲','l̲','m̲',
    'n̲','o̲','p̲','q̲','r̲','s̲','t̲','u̲','v̲','w̲','x̲','y̲','z̲',
    'A̲','B̲','C̲','D̲','E̲','F̲','G̲','H̲','I̲','J̲','K̲','L̲','M̲',
    'N̲','O̲','P̲','Q̲','R̲','S̲','T̲','U̲','V̲','W̲','X̲','Y̲','Z̲'];
  // This doesn't work as expected in all fonts
  const underlineTwice=[
    'a̳','b̳','c̳','d̳','e̳','f̳','g̳','h̳','i̳','j̳','k̳','l̳','m̳',
    'n̳','o̳','p̳','q̳','r̳','s̳','t̳','u̳','v̳','w̳','x̳','y̳','z̳',
    'A̳','B̳','C̳','D̳','E̳','F̳','G̳','H̳','I̳','J̳','K̳','L̳','M̳',
    'N̳','O̳','P̳','Q̳','R̳','S̳','T̳','U̳','V̳','W̳','X̳','Y̳','Z̳'];
  const inputChat=document.getElementById('InputChat');
  let text=inputChat.value;
  if(text.length>0&&text[0]==' ')return true;
  // Bold
  text=substitute(text,/^(.*)\*(.+)\*(.*)$/,sansBold);
  // Circle
  text=substitute(text,/^(.*)\(\((.+)\)\)(.*)$/,circleWhite);
  // Courier
  text=substitute(text,/^(.*)=(.+)=(.*)$/,courier);
  // Cursive
  text=substitute(text,/^(.*)~(.+)~(.*)$/,cursiveBold);
  // Fraktur
  if(text.match(/^(.*)##(.*)#(.*)$/)===null
     &&text.match(/^(.*)#(.*)##(.*)$/)===null)
    text=substitute(text,/^(.*)#(.+)#(.*)$/,fraktur);
  text=substitute(text,/^(.*)##(.+)##(.*)$/,frakturBold);
  // Italic
  text=substitute(text,/^(.*)\/(.+)\/(.*)$/,sansBoldItalic);
  // Outline
  text=substitute(text,/^(.*)\|(.+)\|(.*)$/,outline);
  // Square
  text=substitute(text,/^(.*)\[\[(.+)\]\](.*)$/,squareWhite);
  // Underline
  text=substitute(text,/^(.*)_(.+)_(.*)$/,underline);
  inputChat.value=text;
  return true;}

function chatHelp(){
  console.log('Entry must not start with a space');
  console.log('*bold*      𝗯𝗼𝗹𝗱');
  console.log('((circle))  ⓒⓘⓡⓒⓛⓔ');
  console.log('=courier=   𝚌𝚘𝚞𝚛𝚒𝚎𝚛');
  console.log('~cursive~   𝓬𝓾𝓻𝓼𝓲𝓿𝓮');
  console.log('#fraktur#   𝔣𝔯𝔞𝔨𝔱𝔲𝔯');
  console.log('##fr bold## 𝖋𝖗 𝖇𝖔𝖑𝖉');
  console.log('/italic/    𝙞𝙩𝙖𝙡𝙞𝙘');
  console.log('|outline|   𝕠𝕦𝕥𝕝𝕚𝕟𝕖');
  console.log('[[square]]  🅂🅀🅄🄰🅁🄴');
  console.log('_underline_ u̲n̲d̲e̲r̲l̲i̲n̲e̲');}

function chatInit(){
  let inputChat=document.getElementById('InputChat');
  if(inputChat===null){
    console.log('No chat box found');
    return;}
  inputChat.setAttribute('onkeyup','inputChatKeyPress()');
  chatHelp();}

chatInit();
