const form=document.querySelector(".form"),input=document.querySelector(".form__field"),list=document.querySelector(".list"),items=[],saveToLocalStorage=()=>{localStorage.setItem("todoItems",JSON.stringify(items))},loadFromLocalStorage=()=>{let e=localStorage.getItem("todoItems");return e?JSON.parse(e):[]},count=function(){return items.filter(e=>{if(!e.isDone)return e}).length},render=function(e){let t=count(),l=`
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
    `;list.innerHTML="",0===e.length&&(l=""),list.insertAdjacentHTML("afterbegin",l),document.querySelectorAll("[id^=check-id]").forEach(l=>{l.addEventListener("change",()=>{!0===l.checked?(e[+l.id.slice(-1)].isDone=!0,l.closest(".list__item").classList.toggle("list__item--completed"),t-=1):(e[+l.id.slice(-1)].isDone=!1,l.closest(".list__item").classList.toggle("list__item--completed"),t+=1),document.querySelector("#item-left").innerHTML=`${t} item${t>1?"s":""} left`,saveToLocalStorage()})});let i=[...list.querySelectorAll(".list__item")],s=list.querySelector(".list__footer");i.forEach(e=>{e.setAttribute("draggable",!0),e.addEventListener("dragstart",()=>{setTimeout(()=>e.classList.add("dragging"),0)}),e.addEventListener("dragend",()=>e.classList.remove("dragging"))}),list.addEventListener("dragover",e=>{e.preventDefault();let t=document.querySelector(".dragging"),l=[...list.querySelectorAll(".list__item:not(.dragging)")].find(t=>e.clientY<t.getBoundingClientRect().top+t.offsetHeight/2);l&&l!==s&&list.insertBefore(t,l)}),list.addEventListener("dragenter",e=>e.preventDefault())};document.addEventListener("DOMContentLoaded",()=>{let e=loadFromLocalStorage();items.push(...e),render(items)}),form.addEventListener("submit",e=>{if(e.preventDefault(),!input.value)return;let t={task:input.value,isDone:!1};items.push(t),input.value="",saveToLocalStorage(),render(items)}),list.addEventListener("click",e=>{if("btn btn--close"===e.target.className){let t=e.target.closest(".list__item").querySelector("[id^=check-id]");items.splice(+t.id.slice(-1),1),saveToLocalStorage(),render(items)}});const filterCompleted=function(e){let t=items.filter(e=>{if(e.isDone)return e});0!==t.length&&render(t)},filterActive=function(e){let t=items.filter(e=>{if(!e.isDone)return e});0!==t.length&&render(t)},showAll=function(e){render(items)},clearCompleted=function(e){e=items;for(let t=e.length-1;t>=0;t--)e[t].isDone&&e.splice(t,1);saveToLocalStorage(),render(e)};
//# sourceMappingURL=todo-app-main.f2c63880.js.map
