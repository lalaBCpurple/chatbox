// *** Chat Box ***

// This allows for the file to be reloaded
ChatBox=class{

  // Data

  static bold; // The bold font (sans or serif)
  static id; // The id of the chatbox element
  static italic; // The italic font (sans or serif)
  static plain; // The plain font (ascii, sans or serif)
  static undo=null;
  static version='1.37';

  // Constructor

  constructor(id){
    ChatBox.id=id;
    ChatBox.bold=ChatBox.sansBold;
    ChatBox.italic=ChatBox.sansItalic;
    ChatBox.plain=ChatBox.ascii;
    console.log('Chat Box '+ChatBox.version);
    document.body.setAttribute('onkeyup','ChatBox.transform()');
    ChatBox.transform();}

  // Functionality

  static reverse(string){
    let rev='';
    // This is probably O(n^2) but it can be done in O(n)
    for(const c of string)rev=c+rev;
    return rev;}

  static substituteAll(oldText,substitutions){
    let newText='';
    for(let c of oldText){
      for(const i in substitutions){
        const sub=substitutions[i];
        const oldAlpha=sub[0];
        const newAlpha=sub[1];
        const x=oldAlpha.indexOf(c);
        if(x>=0){
          c=newAlpha[x];
          // Use the first substitution that applies
          break;}}
      newText=newText+c;}
    return newText;}

  static substituteBetween(
    text,before,after,substitutions,reverse=false){
    for(let w=0;w<text.length;){
      const x1=text.indexOf(before,w);
      if(x1<0)break;
      const x2=x1+before.length;
      const y1=text.indexOf(after,x2);
      if(y1<0)break;
      const y2=y1+after.length;
      // Must be at least one character
      if(x2<y1){
        const a=text.substring(0,x1);
        let b=text.substring(x2,y1);
        const c=text.substring(y2);
        b=ChatBox.substituteAll(b,substitutions);
        if(reverse)b=ChatBox.reverse(b);
        text=a+b+c;}
      w=x1+1;}
    return text;}

  static transform(){
    const elt=document.getElementById(ChatBox.id);
    if(elt===null)return;
    let text=elt.value;
    if(text.length==0){
      ChatBox.undo=null;
      return;}
    if(text[0]==' '){
      // If we've done a change, space is undo
      if(ChatBox.undo===null)return;
      // Add a space otherwise it will revert
      elt.value=' '+ChatBox.undo;
      ChatBox.undo=null;
      return;}
    // Bold **...**
    text=ChatBox.substituteBetween(
      text,'**','**',
      [[ChatBox.ascii,ChatBox.bold],
       [ChatBox.sans,ChatBox.sansBold],
       [ChatBox.sansItalic,ChatBox.sansBoldItalic],
       [ChatBox.serifItalic,ChatBox.serifBoldItalic],
       [ChatBox.cursive,ChatBox.cursiveBold],
       [ChatBox.fraktur,ChatBox.frakturBold],
       [ChatBox.circleWhite,ChatBox.circleBlack],
       [ChatBox.squareWhite,ChatBox.squareBlack],
       // Double bold is color (easter egg)
       [ChatBox.squareBlack,ChatBox.squareColor]]);
    // Circle ((...))
    text=ChatBox.substituteBetween(
      text,'((','))',
      [[ChatBox.ascii,ChatBox.circleWhite],
       [ChatBox.sans,ChatBox.circleWhite],
       [ChatBox.sansBold,ChatBox.circleBlack],
       [ChatBox.serifBold,ChatBox.circleBlack]]);
    // Courier ==...==
    text=ChatBox.substituteBetween(
      text,'==','==',
      [[ChatBox.ascii,ChatBox.courier],
       [ChatBox.sans,ChatBox.courier]]);
    // Cursive ~~...~~
    text=ChatBox.substituteBetween(
      text,'~~','~~',
      [[ChatBox.ascii,ChatBox.cursive],
       [ChatBox.sans,ChatBox.cursive],
       [ChatBox.sansBold,ChatBox.cursiveBold],
       [ChatBox.serifBold,ChatBox.cursiveBold]]);
    // Fraktur ##...##
    text=ChatBox.substituteBetween(
      text,'##','##',
      [[ChatBox.ascii,ChatBox.fraktur],
       [ChatBox.sans,ChatBox.fraktur],
       [ChatBox.sansBold,ChatBox.frakturBold],
       [ChatBox.serifBold,ChatBox.frakturBold]]);
    // Italic //...//
    text=ChatBox.substituteBetween(
      text,'//','//',
      [[ChatBox.ascii,ChatBox.italic],
       [ChatBox.sans,ChatBox.sansItalic],
       [ChatBox.sansBold,ChatBox.sansBoldItalic],
       [ChatBox.serifBold,ChatBox.serifBoldItalic]]);
    // Outline ||...||
    text=ChatBox.substituteBetween(
      text,'||','||',
      [[ChatBox.ascii,ChatBox.outline],
       [ChatBox.sans,ChatBox.outline]]);
    // Square [[...]]
    text=ChatBox.substituteBetween(
      text,'[[',']]',
      [[ChatBox.ascii,ChatBox.squareWhite],
       [ChatBox.sans,ChatBox.squareWhite],
       [ChatBox.sansBold,ChatBox.squareBlack],
       [ChatBox.serifBold,ChatBox.squareBlack]]);
    // Underline __...__
    text=ChatBox.substituteBetween(
      text,'__','__',
      [[ChatBox.ascii,ChatBox.underline],
       [ChatBox.sans,ChatBox.underline],
       // Double underline is unreliably rendered
       [ChatBox.underline,ChatBox.underlineTwice]]);
    // Metal ::...::
    text=ChatBox.substituteBetween(
      text,'__','__',
      [[ChatBox.ascii,ChatBox.metal],
       [ChatBox.sans,ChatBox.metal],
       // Double underline is unreliably rendered
       [ChatBox.underline,ChatBox.underlineTwice]]);
    // This comes last to avoid moving special characters
    // Rotated ^^...^^
    text=ChatBox.substituteBetween(
      text,'^^','^^',
      [[ChatBox.ascii,ChatBox.rotated],
       [ChatBox.sans,ChatBox.rotated],
       [ChatBox.rotated,ChatBox.plain]],
      true);
    // Updating might cause the browser some work
    if(elt.value==text)return;
    // Undo goes back to the first change
    if(ChatBox.undo===null)
      ChatBox.undo=elt.value;
    elt.value=text;}

  // Fonts

  static ascii=[
    '0','1','2','3','4','5','6','7','8','9',
    'a','b','c','d','e','f','g','h','i','j','k','l','m',
    'n','o','p','q','r','s','t','u','v','w','x','y','z',
    'A','B','C','D','E','F','G','H','I','J','K','L','M',
    'N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  static circleBlack=[
    '⓿','➊','➋','➌','➍','➎','➏','➐','➑','➒',
    '🅐','🅑','🅒','🅓','🅔','🅕','🅖','🅗','🅘','🅙','🅚','🅛','🅜',
    '🅝','🅞','🅟','🅠','🅡','🅢','🅣','🅤','🅥','🅦','🅧','🅨','🅩',
    '🅐','🅑','🅒','🅓','🅔','🅕','🅖','🅗','🅘','🅙','🅚','🅛','🅜',
    '🅝','🅞','🅟','🅠','🅡','🅢','🅣','🅤','🅥','🅦','🅧','🅨','🅩'];
  static circleWhite=[
    '⓪','①','②','③','④','⑤','⑥','⑦','⑧','⑨',
    'ⓐ','ⓑ','ⓒ','ⓓ','ⓔ','ⓕ','ⓖ','ⓗ','ⓘ','ⓙ','ⓚ','ⓛ','ⓜ',
    'ⓝ','ⓞ','ⓟ','ⓠ','ⓡ','ⓢ','ⓣ','ⓤ','ⓥ','ⓦ','ⓧ','ⓨ','ⓩ',
    'Ⓐ','Ⓑ','Ⓒ','Ⓓ','Ⓔ','Ⓕ','Ⓖ','Ⓗ','Ⓘ','Ⓙ','Ⓚ','Ⓛ','Ⓜ',
    'Ⓝ','Ⓞ','Ⓟ','Ⓠ','Ⓡ','Ⓢ','Ⓣ','Ⓤ','Ⓥ','Ⓦ','Ⓧ','Ⓨ','Ⓩ'];
  static courier=[
    '𝟶','𝟷','𝟸','𝟹','𝟺','𝟻','𝟼','𝟽','𝟾','𝟿',
    '𝚊','𝚋','𝚌','𝚍','𝚎','𝚏','𝚐','𝚑','𝚒','𝚓','𝚔','𝚕','𝚖',
    '𝚗','𝚘','𝚙','𝚚','𝚛','𝚜','𝚝','𝚞','𝚟','𝚠','𝚡','𝚢','𝚣',
    '𝙰','𝙱','𝙲','𝙳','𝙴','𝙵','𝙶','𝙷','𝙸','𝙹','𝙺','𝙻','𝙼',
    '𝙽','𝙾','𝙿','𝚀','𝚁','𝚂','𝚃','𝚄','𝚅','𝚆','𝚇','𝚈','𝚉'];
  static cursive=[
    '0','1','2','3','4','5','6','7','8','9',
    '𝒶','𝒷','𝒸','𝒹','𝑒','𝒻','𝑔','𝒽','𝒾','𝒿','𝓀','𝓁','𝓂',
    '𝓃','𝑜','𝓅','𝓆','𝓇','𝓈','𝓉','𝓊','𝓋','𝓌','𝓍','𝓎','𝓏',
    '𝒜','ℬ','𝒞','𝒟','ℰ','ℱ','𝒢','ℋ','ℐ','𝒥','𝒦','ℒ','ℳ',
    '𝒩','𝒪','𝒫','𝒬','ℛ','𝒮','𝒯','𝒰','𝒱','𝒲','𝒳','𝒴','𝒵'];
  static cursiveBold=[
    '0','1','2','3','4','5','6','7','8','9',
    '𝓪','𝓫','𝓬','𝓭','𝓮','𝓯','𝓰','𝓱','𝓲','𝓳','𝓴','𝓵','𝓶',
    '𝓷','𝓸','𝓹','𝓺','𝓻','𝓼','𝓽','𝓾','𝓿','𝔀','𝔁','𝔂','𝔃',
    '𝓐','𝓑','𝓒','𝓓','𝓔','𝓕','𝓖','𝓗','𝓘','𝓙','𝓚','𝓛','𝓜',
    '𝓝','𝓞','𝓟','𝓠','𝓡','𝓢','𝓣','𝓤','𝓥','𝓦','𝓧','𝓨','𝓩'];
  static fraktur=[
    '0','1','2','3','4','5','6','7','8','9',
    '𝔞','𝔟','𝔠','𝔡','𝔢','𝔣','𝔤','𝔥','𝔦','𝔧','𝔨','𝔩','𝔪',
    '𝔫','𝔬','𝔭','𝔮','𝔯','𝔰','𝔱','𝔲','𝔳','𝔴','𝔵','𝔶','𝔷',
    '𝔄','𝔅','ℭ','𝔇','𝔈','𝔉','𝔊','ℌ','ℑ','𝔍','𝔎','𝔏','𝔐',
    '𝔑','𝔒','𝔓','𝔔','ℜ','𝔖','𝔗','𝔘','𝔙','𝔚','𝔛','𝔜','ℨ'];
  static frakturBold=[
    '0','1','2','3','4','5','6','7','8','9',
    '𝖆','𝖇','𝖈','𝖉','𝖊','𝖋','𝖌','𝖍','𝖎','𝖏','𝖐','𝖑','𝖒',
    '𝖓','𝖔','𝖕','𝖖','𝖗','𝖘','𝖙','𝖚','𝖛','𝖜','𝖝','𝖞','𝖟',
    '𝕬','𝕭','𝕮','𝕯','𝕰','𝕱','𝕲','𝕳','𝕴','𝕵','𝕶','𝕷','𝕸',
    '𝕹','𝕺','𝕻','𝕼','𝕽','𝕾','𝕿','𝖀','𝖁','𝖂','𝖃','𝖄','𝖅'];
  static outline=[
    '𝟘','𝟙','𝟚','𝟛','𝟜','𝟝','𝟞','𝟟','𝟠','𝟡',
    '𝕒','𝕓','𝕔','𝕕','𝕖','𝕗','𝕘','𝕙','𝕚','𝕛','𝕜','𝕝','𝕞',
    '𝕟','𝕠','𝕡','𝕢','𝕣','𝕤','𝕥','𝕦','𝕧','𝕨','𝕩','𝕪','𝕫',
    '𝔸','𝔹','ℂ','𝔻','𝔼','𝔽','𝔾','ℍ','𝕀','𝕁','𝕂','𝕃','𝕄',
    'ℕ','𝕆','ℙ','ℚ','ℝ','𝕊','𝕋','𝕌','𝕍','𝕎','𝕏','𝕐','ℤ'];
  static rotated=[
    '𝟢','𝟣','𝟤','𝟥','𝟦','𝟧','𝟨','𝟩','𝟪','𝟫',
    'ɐ','q','ɔ','p','ǝ','ɟ','ɓ','ɥ','ḷ','ɾ','ʞ','l','ɯ',
    'u','o','d','b','ɹ','s','ʇ','n','ʌ','ʍ','x','ʎ','z',
    '∀','ᙠ','Ɔ','ᗡ','Ǝ','Ⅎ','⅁','H','I','ɾ','ʞ','⅂','W',
    'N','O','Ԁ','Ό','ᴚ','S','⊥','⋂','Λ','M','X','⅄','Z'];
  static sans=[
    '𝟢','𝟣','𝟤','𝟥','𝟦','𝟧','𝟨','𝟩','𝟪','𝟫',
    '𝖺','𝖻','𝖼','𝖽','𝖾','𝖿','𝗀','𝗁','𝗂','𝗃','𝗄','𝗅','𝗆',
    '𝗇','𝗈','𝗉','𝗊','𝗋','𝗌','𝗍','𝗎','𝗏','𝗐','𝗑','𝗒','𝗓',
    '𝖠','𝖡','𝖢','𝖣','𝖤','𝖥','𝖦','𝖧','𝖨','𝖩','𝖪','𝖫','𝖬',
    '𝖭','𝖮','𝖯','𝖰','𝖱','𝖲','𝖳','𝖴','𝖵','𝖶','𝖷','𝖸','𝖹'];
  static sansBold=[
    '𝟬','𝟭','𝟮','𝟯','𝟰','𝟱','𝟲','𝟳','𝟴','𝟵',
    '𝗮','𝗯','𝗰','𝗱','𝗲','𝗳','𝗴','𝗵','𝗶','𝗷','𝗸','𝗹','𝗺',
    '𝗻','𝗼','𝗽','𝗾','𝗿','𝘀','𝘁','𝘂','𝘃','𝘄','𝘅','𝘆','𝘇',
    '𝗔','𝗕','𝗖','𝗗','𝗘','𝗙','𝗚','𝗛','𝗜','𝗝','𝗞','𝗟','𝗠',
    '𝗡','𝗢','𝗣','𝗤','𝗥','𝗦','𝗧','𝗨','𝗩','𝗪','𝗫','𝗬','𝗭'];
  static sansItalic=[
    '𝟢','𝟣','𝟤','𝟥','𝟦','𝟧','𝟨','𝟩','𝟪','𝟫',
    '𝘢','𝘣','𝘤','𝘥','𝘦','𝘧','𝘨','𝘩','𝘪','𝘫','𝘬','𝘭','𝘮',
    '𝘯','𝘰','𝘱','𝘲','𝘳','𝘴','𝘵','𝘶','𝘷','𝘸','𝘹','𝘺','𝘻',
    '𝘈','𝘉','𝘊','𝘋','𝘌','𝘍','𝘎','𝘏','𝘐','𝘑','𝘒','𝘓','𝘔',
    '𝘕','𝘖','𝘗','𝘘','𝘙','𝘚','𝘛','𝘜','𝘝','𝘞','𝘟','𝘠','𝘡'];
  static sansBoldItalic=[
    '𝟬','𝟭','𝟮','𝟯','𝟰','𝟱','𝟲','𝟳','𝟴','𝟵',
    '𝙖','𝙗','𝙘','𝙙','𝙚','𝙛','𝙜','𝙝','𝙞','𝙟','𝙠','𝙡','𝙢',
    '𝙣','𝙤','𝙥','𝙦','𝙧','𝙨','𝙩','𝙪','𝙫','𝙬','𝙭','𝙮','𝙯',
    '𝘼','𝘽','𝘾','𝘿','𝙀','𝙁','𝙂','𝙃','𝙄','𝙅','𝙆','𝙇','𝙈',
    '𝙉','𝙊','𝙋','𝙌','𝙍','𝙎','𝙏','𝙐','𝙑','𝙒','𝙓','𝙔','𝙕'];
  static serifBold=[
    '𝟎','𝟏','𝟐','𝟑','𝟒','𝟓','𝟔','𝟕','𝟖','𝟗',
    '𝐚','𝐛','𝐜','𝐝','𝐞','𝐟','𝐠','𝐡','𝐢','𝐣','𝐤','𝐥','𝐦',
    '𝐧','𝐨','𝐩','𝐪','𝐫','𝐬','𝐭','𝐮','𝐯','𝐰','𝐱','𝐲','𝐳',
    '𝐀','𝐁','𝐂','𝐃','𝐄','𝐅','𝐆','𝐇','𝐈','𝐉','𝐊','𝐋','𝐌',
    '𝐍','𝐎','𝐏','𝐐','𝐑','𝐒','𝐓','𝐔','𝐕','𝐖','𝐗','𝐘','𝐙'];
  static serifItalic=[
    '0','1','2','3','4','5','6','7','8','9',
    '𝑎','𝑏','𝑐','𝑑','𝑒','𝑓','𝑔','ℎ','𝑖','𝑗','𝑘','𝑙','𝑚',
    '𝑛','𝑜','𝑝','𝑞','𝑟','𝑠','𝑡','𝑢','𝑣','𝑤','𝑥','𝑦','𝑧',
    '𝑨','𝑩','𝑪','𝑫','𝑬','𝑭','𝑮','𝑯','𝑰','𝑱','𝑲','𝑳','𝑴',
    '𝑵','𝑶','𝑷','𝑸','𝑹','𝑺','𝑻','𝑼','𝑽','𝑾','𝑿','𝒀','𝒁'];
  static serifBoldItalic=[
    '𝟎','𝟏','𝟐','𝟑','𝟒','𝟓','𝟔','𝟕','𝟖','𝟗',
    '𝒂','𝒃','𝒄','𝒅','𝒆','𝒇','𝒈','𝒉','𝒊','𝒋','𝒌','𝒍','𝒎',
    '𝒏','𝒐','𝒑','𝒒','𝒓','𝒔','𝒕','𝒖','𝒗','𝒘','𝒙','𝒚','𝒛',
    '𝑨','𝑩','𝑪','𝑫','𝑬','𝑭','𝑮','𝑯','𝑰','𝑱','𝑲','𝑳','𝑴',
    '𝑵','𝑶','𝑷','𝑸','𝑹','𝑺','𝑻','𝑼','𝑽','𝑾','𝑿','𝒀','𝒁'];
  static squareBlack=[
    '0','1','2','3','4','5','6','7','8','9',
    '🅰','🅱','🅲','🅳','🅴','🅵','🅶','🅷','🅸','🅹','🅺','🅻','🅼',
    '🅽','🅾','🅿','🆀','🆁','🆂','🆃','🆄','🆅','🆆','🆇','🆈','🆉',
    '🅰','🅱','🅲','🅳','🅴','🅵','🅶','🅷','🅸','🅹','🅺','🅻','🅼',
    '🅽','🅾','🅿','🆀','🆁','🆂','🆃','🆄','🆅','🆆','🆇','🆈','🆉'];
  static squareWhite=[
    '0','1','2','3','4','5','6','7','8','9',
    '🄰','🄱','🄲','🄳','🄴','🄵','🄶','🄷','🄸','🄹','🄺','🄻','🄼',
    '🄽','🄾','🄿','🅀','🅁','🅂','🅃','🅄','🅅','🅆','🅇','🅈','🅉',
    '🄰','🄱','🄲','🄳','🄴','🄵','🄶','🄷','🄸','🄹','🄺','🄻','🄼',
    '🄽','🄾','🄿','🅀','🅁','🅂','🅃','🅄','🅅','🅆','🅇','🅈','🅉'];
  static squareColor=[
    '0\uFE0F\u20E3',
    '1\uFE0F\u20E3','2\uFE0F\u20E3','3\uFE0F\u20E3',
    '4\uFE0F\u20E3','5\uFE0F\u20E3','6\uFE0F\u20E3',
    '7\uFE0F\u20E3','8\uFE0F\u20E3','9\uFE0F\u20E3',
    '🅰\ufe0f','🅱\ufe0f','🅲','🅳','🅴','🅵','🅶','🅷','🅸','🅹',
    '🅺','🅻','🅼','🅽','🅾\ufe0f','🅿\ufe0f','🆀','🆁','🆂','🆃',
    '🆄','🆅','🆆','\u274E','🆈','🆉',
    '🅰\ufe0f','🅱\ufe0f','🅲','🅳','🅴','🅵','🅶','🅷','🅸','🅹',
    '🅺','🅻','🅼','🅽','🅾\ufe0f','🅿\ufe0f','🆀','🆁','🆂','🆃',
    '🆄','🆅','🆆','\u274E','🆈','🆉'];
  static underline=[
    '0','1','2','3','4','5','6','7','8','9',
    'a̲','b̲','c̲','d̲','e̲','f̲','g̲','h̲','i̲','j̲','k̲','l̲','m̲',
    'n̲','o̲','p̲','q̲','r̲','s̲','t̲','u̲','v̲','w̲','x̲','y̲','z̲',
    'A̲','B̲','C̲','D̲','E̲','F̲','G̲','H̲','I̲','J̲','K̲','L̲','M̲',
    'N̲','O̲','P̲','Q̲','R̲','S̲','T̲','U̲','V̲','W̲','X̲','Y̲','Z̲'];
  static metal=[
    '0','1','2','3','4','5','6','7','8','9',
    'ä','ḃ','ċ','ḋ','ë','f','ġ','ḣ','ï','j','ḳ','l','ṁ',
    'ṅ','ö','ṗ','q','ṙ','ṡ','ẗ','ü','ṿ','ẅ','x','ÿ','ż',
    'Ä','Ḃ','Ċ','Ḋ','Ë','Ḟ','Ġ','Ḧ','Ï','J','K','Ŀ','Ṁ',
    'Ṅ','Ö','Ṗ','Q','Ṙ','Ṡ','Ṫ','Ü','V','Ẅ','Ẍ','Ÿ','Ż'];
  // This doesn't work as expected in all fonts
  static underlineTwice=[
    '0','1','2','3','4','5','6','7','8','9',
    'a̳','b̳','c̳','d̳','e̳','f̳','g̳','h̳','i̳','j̳','k̳','l̳','m̳',
    'n̳','o̳','p̳','q̳','r̳','s̳','t̳','u̳','v̳','w̳','x̳','y̳','z̳',
    'A̳','B̳','C̳','D̳','E̳','F̳','G̳','H̳','I̳','J̳','K̳','L̳','M̳',
    'N̳','O̳','P̳','Q̳','R̳','S̳','T̳','U̳','V̳','W̳','X̳','Y̳','Z̳'];}

function chatBoxInit(){
  console.log('Please update your code');
  new ChatBox('InputChat');}

new ChatBox('InputChat');
