// ==UserScript==
// @name         Chatbox (Loader)
// @namespace    Chatbox
// @version      0.1
// @description  Loader for lala's Chatbox
// @author       lalaBCpurple
// @include      /^https:\/\/(www\.)?bondageprojects\.elementfx\.com\/R\d+\/(BondageClub|\d+)(\/((index|\d+)\.html)?)?$/
// @include      /^https:\/\/(www\.)?bondage-europe\.com\/R\d+\/(BondageClub|\d+)(\/((index|\d+)\.html)?)?$/
// @homepage     https://lalabcpurple.github.io/chatbox/chatbox.html
// @source       https://github.com/lalaBCpurple/chatbox
// @downloadURL  https://lalabcpurple.github.io/chatbox/loader.user.js
// @run-at       document-end
// @grant        none
// ==/UserScript==

setTimeout(
	function () {
		if (window.BCX_Loaded === undefined) {
			let n = document.createElement("script");
			n.setAttribute("language", "JavaScript");
			n.setAttribute("crossorigin", "anonymous");
			n.setAttribute("src", "https://lalabcpurple.github.io/chatbox/chatbox.js?_=" + Date.now());
			n.onload = () => n.remove();
			document.head.appendChild(n);
		}
	},
	2000
);
