// javascript:
(function(){
  const lala="https://lalabcpurple.github.io/chatbox/lala.js";
  let script=document.createElement("script");
  script.setAttribute("language","JavaScript");
  script.setAttribute("crossorigin","anonymous");
  script.setAttribute("src",lala);
  script.onload=()=>script.remove();
  document.head.appendChild(script);})();
