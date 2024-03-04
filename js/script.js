const loadData = async()=>{
    const res =  await fetch('https://openapi.programming-hero.com/api/course/curriculum');
    const data = await res.json()
    const dataArr = data.data;
    displayToUI(dataArr)
}
const displayToUI=(dataArr)=>{
    const milestones = document.querySelector('.milestones')
    milestones.innerHTML=`${ 
        dataArr.map((element)=>{
        return`
        <div class="milestone border-b "id="${element._id}">
        <div class="flex">
          <div class="checkbox"><input onclick ="MarkToSelected(this,${element._id})" type="checkbox" /></div>
          <div onclick="openMilestone(this,${element._id})">
            <p>
              ${element.name}
              <span "><i class="fas fa-chevron-down"></i></span>
            </p>
          </div>
        </div>
        <div class="hidden_panel ">
         <div class="module border-b">
          ${element.modules
            .map((module)=> {
              return `<div class="module border-b">
              <p>${module.name}</p>
            </div>`;
            })
            .join("")}
          </div>
        </div>
      </div>`
    }).join('')}`
}

const openMilestone=(milestoneElement,id)=>{
    const currentPanel = milestoneElement.parentNode.nextElementSibling;
    const active = document.querySelector('.active')
    
    const shownPanel = document.querySelector('.show')

    // bold clicked milestone
    // first remove previous selected milestone clear
    if(active ){
        active.classList.remove('active')
    }
    //toggle milestone
    milestoneElement.classList.toggle("active");
    // console.log(currentPanel)
    // console.log(shownPanel)
    // first remove previous open milestone aff
    // console.log(currentPanel.classList.contains('show'))
    if(shownPanel && !currentPanel.classList.contains('show')){
        shownPanel.classList.remove("show");
    }
    //  toggle modules
    currentPanel.classList.toggle("show");
    // console.log(currentPanel.classList.toggle("show"))
    showMilestone(id)

}

async function showMilestone(id) {
    const res =  await fetch('https://openapi.programming-hero.com/api/course/curriculum');
    const data = await res.json()
    const dataArr = data.data;
    const milestoneImage = document.querySelector(".milestoneImage");
  const name = document.querySelector(".title");
  const details = document.querySelector(".details");

  milestoneImage.style.opacity = "0";
  milestoneImage.src = dataArr[id].image;
  name.innerText =   dataArr[id].name;
  details.innerText =dataArr[id].description;
  }

  
  // listen for hero image load
  const milestoneImage = document.querySelector(".milestoneImage");
  milestoneImage.onload = function () {
    this.style.opacity = "1";
  };


const MarkToSelected=(checkbox,id)=>{
    const doneList = document.querySelector('.doneList');
    const milestones = document.querySelector('.milestones')
    const item = document.getElementById(id)
    if(checkbox.checked){
        milestones.removeChild(item)
        doneList.appendChild(item)
    }else{
        doneList.removeChild(item)
        milestones.appendChild(item)


    }

}
loadData()