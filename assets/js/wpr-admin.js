!function e(t,n,i){function o(s,c){if(!n[s]){if(!t[s]){var u="function"==typeof require&&require;if(!c&&u)return u(s,!0);if(r)return r(s,!0);var a=new Error("Cannot find module '"+s+"'");throw a.code="MODULE_NOT_FOUND",a}var l=n[s]={exports:{}};t[s][0].call(l.exports,function(e){var n=t[s][1][e];return o(n||e)},l,l.exports,e,t,n,i)}return n[s].exports}for(var r="function"==typeof require&&require,s=0;s<i.length;s++)o(i[s]);return o}({1:[function(e,t,n){"use strict";e("../global/main.js"),e("../global/pageManager.js")},{"../global/main.js":2,"../global/pageManager.js":3}],2:[function(e,t,n){"use strict";document.addEventListener("DOMContentLoaded",function(){for(var e=document.querySelectorAll(".wpr-warningContainer"),t=[],n=0;n<e.length;n++)t[n]=e[n].querySelector("input[type=checkbox]"),i(n);function i(n){t[n].onchange=function(){var i=e[n].querySelector(".wpr-fieldWarning");this.checked&&(i.classList.add("wpr-isOpen"),this.checked=!1,i.querySelector(".wpr-button").onclick=function(){return t[n].checked=!0,i.classList.remove("wpr-isOpen"),!1})}}var o=document.querySelectorAll(".wpr-isDisabled"),r=[];for(n=0;n<o.length;n++){for(var s=o[n].parentNode.previousSibling;s&&1!=s.nodeType;)s=s.previousSibling;r[n]=s.querySelector("input[type=checkbox]"),c(n)}function c(e){r[e].onchange=function(){this.checked?(o[e].classList.remove("wpr-isDisabled"),o[e].querySelector("input[type=checkbox]").disabled=!1):(o[e].classList.add("wpr-isDisabled"),o[e].querySelector("input[type=checkbox]").disabled=!0,o[e].querySelector("input[type=checkbox]").checked=!1)}}})},{}],3:[function(e,t,n){"use strict";function i(e){var t=this;this.$menuItems=document.querySelectorAll(".wpr-menuItem"),this.$submitButton=document.querySelector(".wpr-Content > form > input[type=submit]"),this.$pages=document.querySelectorAll(".wpr-Page"),this.$sidebar=document.querySelector(".wpr-Sidebar"),this.$menuItem=null,this.$page=null,this.pageId=null,window.onhashchange=function(){t.detectID()},window.location.hash?this.detectID():this.$menuItems[0].classList.add("isActive")}document.addEventListener("DOMContentLoaded",function(){var e=document.querySelector(".wpr-Content");e&&new i(e)}),i.prototype.detectID=function(){this.pageId=window.location.hash.split("#")[1],this.$page=document.querySelector(".wpr-Page#"+this.pageId),this.$menuItem=document.getElementById("wpr-nav-"+this.pageId),this.change()},i.prototype.change=function(){document.documentElement.scrollTop=0;for(var e=0;e<this.$pages.length;e++)this.$pages[e].style.display="none";for(e=0;e<this.$menuItems.length;e++)this.$menuItems[e].classList.remove("isActive");this.$page.style.display="block",this.$submitButton.style.display="block",this.$sidebar.style.display="block",this.$menuItem.classList.add("isActive"),"dashboard"==this.pageId&&(this.$sidebar.style.display="none"),"tools"==this.pageId&&(this.$submitButton.style.display="none")}},{}]},{},[1]);
//# sourceMappingURL=wpr-admin.js.map
