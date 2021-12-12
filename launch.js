// javascript:
(function(){
  const j="https://lalabcpurple.github.io/chatbox/chatbox.js";
  let s=document.createElement("script");
  s.setAttribute("language","JavaScript");
  s.setAttribute("crossorigin","anonymous");
  s.setAttribute("src",j);
  s.onload=()=>s.remove();
  document.head.appendChild(s);})();
