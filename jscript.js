function onSearchClick(event){
	event.preventDefault();


const location=document.querySelector('#area');
const category=document.querySelector('#categories');
const description=document.querySelector('#description');


var highProtein=document.querySelector('#high_protein');
var lowCarbs=document.querySelector('#low_carbs');
var lowCalories=document.querySelector('#low_calories');
var keto=document.querySelector('#keto');
var glutenFree=document.querySelector('#gluten_free');
var soyFree=document.querySelector('#soy_free');
var dairyFree=document.querySelector('#dairy_free');
var vegetarian=document.querySelector('#vegetarian');
var vegan=document.querySelector('#vegan');
var organic=document.querySelector('#organic');
var lowFat=document.querySelector('#low_fat');


var array=[];
array.push(highProtein);
array.push(lowCarbs);
array.push(lowCalories);
array.push(keto);
array.push(glutenFree);
array.push(soyFree);
array.push(dairyFree);
array.push(vegetarian);
array.push(vegan);
array.push(organic);
array.push(lowFat);






let types = [];
for (let i=0;i<array.length;i++){
  //  console.log(array[i]);
	if(array[i].checked===true)types.push(array[i].id.replace("_"," "));
}

//console.log(types.length);

/*for(let i=0;i<types.length;++i)
console.log("i print" +types[i]);
*/
let jsonPayload={};
jsonPayload["description"]=description.value;
jsonPayload["location"]=location.value;
jsonPayload["category"]=category.value;
jsonPayload["types"]=types;
console.log(jsonPayload);



let flag1=false;
let flag2=false;
//let flag3=false;

//console.log("!!!!!!!!!!"+location.value);
	const   locationlbl=document.querySelector('#arealbl');
	const   categorieslbl=document.querySelector('#categorieslbl');

if(location.value==="Select Area"){
    locationlbl.classList.remove('nonDisplay');
}
    else{flag1=true;    locationlbl.classList.add('nonDisplay');
}

if(category.value==="Select Category"){
    categorieslbl.classList.remove('nonDisplay');
}
    else{flag2=true; categorieslbl.classList.add('nonDisplay');}

if(flag1&&flag2){
   
    
    queryDB(jsonPayload);}

}


function onServerClick(){
	var xhr= new XMLHttpRequest();
	xhr.onreadystatechange=function(){
	if(xhr.readyState!=4)return;
	if(xhr.status>=200&& xhr.status<300){
		

//console.log(JSON.parse(xhr.responseText));
//	console.log(xhr.statusText);
}	
	
	else {
	    console.log('error',xhr.statusText);}
};

xhr.open('GET','request.php');
xhr.setRequestHeader("content-Type","application/json");
xhr.send();
	
	
	
	
}


function queryDB(payload){
	
	let xhr =new XMLHttpRequest();
	xhr.onreadystatechange=function(){
	if(xhr.readyState!=4)return;
	if(xhr.status>=200&& xhr.status<300){
	
//	console.log(xhr.statusText);
//	console.log(xhr.responseText);
	printResults(JSON.parse(xhr.responseText));
	    
	}
	else{console.log('error Sending Posting',xhr.statusText);
	console.log(xhr.responseText);
	
	}
};
	xhr.open('POST','request.php');
	xhr.setRequestHeader("content-Type","application/json");
/*const message={};
message.region=region;
message.address=address;
message.city=city;
*/	

console.log(JSON.stringify(payload));
xhr.send(JSON.stringify(payload));	
	
	
}



function printResults(results){
    let div=document.querySelector('#results');

const tempelement=document.querySelector('#mainDiv');

if (typeof(tempelement) !== 'undefined' && tempelement !== null)
tempelement.remove();


	    let newdiv=document.createElement("div");
	newdiv.setAttribute("id",'mainDiv');




let resultsNumber=results.length;
console.log(resultsNumber);

if(resultsNumber===0){
    let noResults=document.querySelector('#entrieslbl');
    noResults.classList.remove('nonDisplay');
}

	
	for(let i=0;i<resultsNumber;++i){

let newspan=document.createElement("div");
	newspan.setAttribute("id",'Result'+i);
	    
	    
	      let heading=document.createElement("h2");
	    heading.textContent=results[i]['name'];
	    
	    
	    
	  
	    //INGREDIENTS
	    
	    let ingredientsDiv=document.createElement("div");
	      let ingredientsHeading=document.createElement("h4");
	    ingredientsHeading.textContent="Ingredients"
	  

let ingredients=document.createElement("p");
ingredients.textContent=results[i]['ingredients'];

ingredientsDiv.appendChild(ingredientsHeading);
ingredientsDiv.appendChild(ingredients);



//IMAGE
	    let image=document.createElement("img");
	    image.src="wp-content/uploads/2019/06/"+results[i]['name']+".png";
	    
	    
	    
	      ///NUTRITION
	    
	    
	    
	    let nutritionsDiv=document.createElement("div");
	//NutritionDiv.setAttribute("id",'Result'+i);
	    
	      let nutritionsHeading=document.createElement("h4");
	    nutritionsHeading.textContent="Nutritions"
	     let nutritions=document.createElement("p");
	    nutritions.textContent=results[i]['nutrition'];
	    
	    nutritionsDiv.appendChild(nutritionsHeading);
	    nutritionsDiv.appendChild(nutritions);
	    
	    
	    newspan.appendChild(heading);
	    newspan.appendChild(image);
	    newspan.appendChild(ingredientsDiv);
	    newspan.appendChild(nutritionsDiv);

newspan.classList.add("inlineDisplay");
newspan.classList.add("ResultDiv");
newdiv.appendChild(newspan);
	   


}
 div.appendChild(newdiv);

}




let searchbutton= document.querySelector('#searchbtn');
searchbutton.addEventListener('click',onSearchClick);



