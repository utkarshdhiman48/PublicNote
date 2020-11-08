(function () {
let baseURL="/";
let modal = document.querySelector(".modal");
let put = {
  val: false,
  id: null,
};
//to clear put
function nullify() {
  this.val=false;
  this.id=null;
}


//hide/show element
function displayToggle(element) {
  element.classList.toggle("hide");
}

//open hidden menu
document.querySelectorAll(".edit-3dot-icon").forEach(element=>{
  element.addEventListener("click", function(){
    displayToggle(this.querySelector(".hidden-menu"));
  });
})

//inside hidden menu
document.querySelectorAll(".hidden-menu").forEach(menu=>{
  menu.addEventListener("click", (e)=>{
    let self = e.target;
    let array = [...self.parentElement.parentElement.parentElement.children];
    array.push(parseInt(self.parentElement.parentElement.parentElement.className.match(/\d/ig)[0]));
    console.log(array);
    if(self.innerHTML==="Edit"){//when edit is selected
      //edit logic
      modal.classList.remove("hide");
      modal.querySelector(".edit-heading").value=array[0].innerHTML.trim();
      modal.querySelector(".edit-text").innerHTML=array[2].innerHTML.trim();
      modal.querySelector(".edit-author").value=array[3].innerHTML.trim();
      modal.querySelectorAll(".edit-color").forEach((i)=>{
        if(i.value==array[5]) i.checked=true;
      });

      put={
        val: true,
        id: parseInt(array[0].parentElement.dataset["notenumber"])
      }
    }
    else if(e.target.innerHTML==="Delete"){//when delete is selected
//delete logic
      let temp = e.target.parentElement.parentElement.parentElement;
      let res = deleteRequest(parseInt(temp.dataset["notenumber"]));
      console.log(res);
      res.then(()=>{
        temp.remove();
      }).catch(err=>console.error(err));
    }
  })
})

//hide on cancel
modal.querySelector("#cancel").addEventListener("click", ()=>{
  modal.querySelector(".edit-heading").value="";
  modal.querySelector(".edit-text").innerHTML="";
  modal.querySelector(".edit-author").value="";
  modal.classList.add("hide");
  nullify.bind(put)();
});

//save button
document.querySelector("#save").addEventListener("click",()=>{
  let obj = {
    heading: modal.querySelector(".edit-heading").value,
    text: modal.querySelector(".edit-text").value,
    author: modal.querySelector(".edit-author").value,
    color: [...modal.querySelectorAll("input[name=color]")].find((c)=>{
      return c.checked===true;
    }).value || 0
  };

  let res;
  if(put.val){
    // put logic
    res = putRequest(put.id, obj);
  }
  else{
    // post logic
    res = postRequest(obj);
  }
  res.then(()=>{
    displayToggle(modal);
    location.reload();
  }).catch(err=>console.error(err));
})

//add note
document.querySelector("div.add").addEventListener("click", ()=>{
  nullify.bind(put)();
  modal.querySelector("input[name=color]").checked=true;
  displayToggle(modal);
})



//GET
async function getRequest(){
  let res = await fetch(baseURL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  });

  console.log(await res.text());
  // return await res.json();
};

//POST
async function postRequest(obj){

  let res = await fetch(baseURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(obj)
  });

  return await res.json();
};

//PUT
async function putRequest(id, obj){
  
  let res = await fetch(baseURL+id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(obj)
  });

  return await res.json();
};

//DELETE
async function deleteRequest(id){
  let res = await fetch(baseURL+id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  });
  
  return await res.json();
};
})();