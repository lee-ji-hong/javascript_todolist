//Select the Elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//Classess names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//Variables
let LIST , id; 

//get item from localstorage
let data = localStorage.getItem("ToDo");

//checkif data is not empty
if(data){
    LIST = JSON.parse(data);
    id = LIST.length; // set the id to the last one in the list
    loadList(LIST); //load the list to the user interface
}else{
    //if data isn't empty
    LIST = [];
    id = 0;
}

//load items to the user's interface
//list 내에서 삭제 생성이 새로고침해도 유지된다
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.done, item.trash);
    });
}

//clear the local storage
//reloadbtn을 누르면 초기화 된다.
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});

//show todays date
const options = {weekday : "long", month : "short", day : "numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("ko","en-US", options);

//add to do function
function addToDo(toDo, id, done, trash){

    if(trash){return; }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item =   `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                    </li>
                    `;
    const position = "beforeend";
    
    list.insertAdjacentHTML(position,item);
}


//enter key를 눌러서 목록에 추가하는 이벤트 만들기 
document.addEventListener("keyup",function(even){
    if(event.keyCode == 13){
        const toDo = input.value;

        //if the input isn't empty
        if(toDo){
            addToDo(toDo, id, false, false);

            LIST.push(
                {
                    name: toDo,
                    id: id,
                    done: false,
                    trash: false
                });

                //add item to localstorage (this code must be added where the LIST array is update)
                localStorage.setItem("ToDo", JSON.stringify(LIST));

             id++;

        }
        input.value = "";
    }
    
});

/**--complete to do -- 
 * 
 * circle-thin 버튼을 클릭할 때 마다 completeToDo function이 실행된다 
빈 동그라미를 체크하면 동그라미가 채워지고 반대도 실행되게끔 만든다
*/

function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHEK);
    element.parentNode.querySeletor(".text").classList.toggle(LINE_THROUGH);
    
    LIST[element.id].done = LIST[element.id].done ? false : true;
}

/*--remove a to-do--

trash버튼을 누르면  element.parentNode.parentNode의 
자식인 노드가 삭제되고 LIST로 삭제시킨것을 저장/업데이트 시킨다*/
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}


/*when the user click on a buttom, to delete or make done */
list.addEventListener("click", function(event){
    const element = event.target; //return the clicked element inside list
    const elementJob = event.attributes.job.value; //delete or complete
    
    if(elementJob == "complete") {

        completeToDo(element);

    }else if(elementJob == "delete"){

        removeToDo(element);
    }

    //add item to localstorage (this code must be added where the LIST array is update)
    localStorage.setItem("ToDo", JSON.stringify(LIST)); 
});











