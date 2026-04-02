const e=document.querySelector(".form"),t=document.querySelector(".form__field"),l=document.querySelector(".list"),i=[],s=()=>{localStorage.setItem("todoItems",JSON.stringify(i))},n=()=>{let e=localStorage.getItem("todoItems");return e?JSON.parse(e):[]},c=function(e){let t=i.filter(e=>{if(!e.isDone)return e}).length,n=`
    ${e.map((e,t)=>`
        <li class="list__item ${e.isDone?"list__item--completed":""}" draggable="true">
            <label for="check-id-${t}" class="checkbox">
                <input type="checkbox" id="check-id-${t}" ${e.isDone?"checked":""}>
                <span class="check"></span>
            </label>
            <span>${e.task}</span>
            <button class="btn btn--close"></button>
        </li>
        `).join("")}

    <li class="list__footer">
        <span id="item-left">${t} item${t>1?"s":""} left</span>
        <ul>
            <li onclick="showAll()">All</li>
            <li onclick="filterActive()">Active</li>
            <li onclick="filterCompleted()">Completed</li>
        </ul>
        <span onclick="clearCompleted()">Clear completed</span>
    </li>
    `;l.innerHTML="",0===e.length&&(n=""),l.insertAdjacentHTML("afterbegin",n),document.querySelectorAll("[id^=check-id]").forEach(l=>{l.addEventListener("change",()=>{!0===l.checked?(e[+l.id.slice(-1)].isDone=!0,l.closest(".list__item").classList.toggle("list__item--completed"),t-=1):(e[+l.id.slice(-1)].isDone=!1,l.closest(".list__item").classList.toggle("list__item--completed"),t+=1),document.querySelector("#item-left").innerHTML=`${t} item${t>1?"s":""} left`,s()})});let c=[...l.querySelectorAll(".list__item")],r=l.querySelector(".list__footer");c.forEach(e=>{e.setAttribute("draggable",!0),e.addEventListener("dragstart",()=>{setTimeout(()=>e.classList.add("dragging"),0)}),e.addEventListener("dragend",()=>e.classList.remove("dragging"))}),l.addEventListener("dragover",e=>{e.preventDefault();let t=document.querySelector(".dragging"),i=[...l.querySelectorAll(".list__item:not(.dragging)")].find(t=>e.clientY<t.getBoundingClientRect().top+t.offsetHeight/2);i&&i!==r&&l.insertBefore(t,i)}),l.addEventListener("dragenter",e=>e.preventDefault())};document.addEventListener("DOMContentLoaded",()=>{let e=n();i.push(...e),c(i)}),e.addEventListener("submit",e=>{if(e.preventDefault(),!t.value)return;let l={task:t.value,isDone:!1};i.push(l),t.value="",s(),c(i)}),l.addEventListener("click",e=>{if("btn btn--close"===e.target.className){let t=e.target.closest(".list__item").querySelector("[id^=check-id]");i.splice(+t.id.slice(-1),1),s(),c(i)}});
//# sourceMappingURL=index.4a4b0589.js.map
