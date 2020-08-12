key = "xyz"


//getting elements
var btn = document.getElementById("clicked")
var results = document.getElementById("results")
var pag = document.getElementById("pagination")

//adding eventlistner
btn.addEventListener("click",function(){
    var val = document.getElementById("val")
    val = val.value

    // var debounce_set

    // return function(){

    //     if(debounce_set){
    //         clearTimeout(debounce_set)
    //     }

    //     debounce_set = setTimeout(()=>{
    pics(val)
    .then(data => append_data(data)); 
        // }, 2000)

        
    // }

    

    
})


//api call for pictures
async function pics(val_data){

    // console.log("hi")

    let response = await fetch(`https://api.pexels.com/v1/search?query=${val_data}&per_page=100`, {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": key
          }
    });
    let arr = await response.json()
    return arr;
}


//pagination operation
var curr_page = 1
var total_page = 10


//data mediator
function append_data(data){
    data=data["photos"]

    show_results(data, results, total_page, curr_page)
    buttons(data, pag, total_page)
}


//result showing
const show_results = (items, target_elem, t_result, c_page) => {
    
    target_elem.innerHTML = ""

    c_page -- 

    var start = t_result * c_page

    for(var k = start; k < start + t_result; k++){
        var container = document.createElement("span")
        var img = document.createElement("img")
        img.src = items[k]["src"]["small"]

        container.appendChild(img)
        target_elem.appendChild(container)
    }
}


//pagination buttons
const buttons = (data, tar, t_result) => {
    tar.innerHTML = ""

    var no = Math.ceil(data.length/t_result)
    
    var prev_button = document.createElement("button")
    prev_button.innerHTML = "Prev"

    prev_button.addEventListener("click", function(){
        if(1 != curr_page){
            curr_page -= 1
            show_results(data, results, total_page, curr_page)
        }
    })

    tar.appendChild(prev_button)

    for(var i = 1; i < no+1; i++){
        var p_btn = document.createElement("button")

        p_btn.innerHTML = i

        p_btn.addEventListener("click", function(e){
            curr_page = Number(e.target.textContent)
            show_results(data, results, total_page, curr_page)
        })
        
        tar.appendChild(p_btn)
        
    }

    var nxt_button = document.createElement("button")
    nxt_button.innerHTML = "Next"
    
    nxt_button.addEventListener("click", function(){
        if(no != curr_page){
            curr_page += 1
            show_results(data, results, total_page, curr_page)
        }
    })

    tar.appendChild(nxt_button)
}