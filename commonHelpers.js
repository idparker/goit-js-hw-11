import{S as m,i as d}from"./assets/vendor-8d97032d.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();function y(s){const i=fetch(`https://pixabay.com/api/?key=42796479-140a0b0d57e5aafe2bfea6b1d&q=${s}&image_type=photo&orientation=horizontal&safesearch=true`);if(!i.ok)throw new Error("Failed to fetch images");const a=i.json().hits;if(!Array.isArray(a)||a.length===0)throw new Error("No images found");return a}const f=document.querySelector(".gallery"),c=document.querySelector(".loader");let p=new m(".gallery a");function h(s){const r=s.map(({webformatURL:o,largeImageURL:n,tags:e,likes:t,downloads:i,comments:l,views:a})=>`<li class="gallery-item">
              <a href="${n}" class="gallery-link"><img class="gallery-img" src="${o}" alt="${e}" data-source="${n}" title="${e}" /></a>
              <div class="activity">
              <h3>Likes<p class="activity-item">${t}</p></h3>
              <h3>Views<p class="activity-item">${a}</p></h3>
              <h3>Comments<p class="activity-item">${l}</p></h3>
              <h3>Downloads<p class="activity-item">${i}</p></div></h3>
          </li>`).join("");f.innerHTML=r,p.refresh(),c.style.display="none"}function u(s){d.error({title:"Ошибка",message:s,position:"topRight"}),c.style.display="none"}function g(){f.innerHTML='<p class="empty-message">По вашему запросу не найдено ни одного изображения. Попробуйте еще раз!</p>',c.style.display="none"}const E=document.querySelector(".gallery"),$=document.querySelector("input"),A=document.querySelector("form"),S=document.querySelector(".loader");function L(s){s.preventDefault();const r=$.value.trim();if(r.length===0){u("Please enter a search term before searching for images.");return}E.innerHTML="",S.style.display="block",y(r).then(o=>h(o)).catch(o=>{console.error("Error fetching images:",o),o.message==="No images found"?g():u("Failed to fetch images. Please try again later.")})}A.addEventListener("submit",L);
//# sourceMappingURL=commonHelpers.js.map