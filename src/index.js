//execute after DOMContentLoad - will this let me grab the nodes list?
document.addEventListener('DOMContentLoaded', () =>{
    loadImages();
    loadBreeds();
    console.log('hi')
    
})

console.log('%c HI', 'color: firebrick')
let breedNames;
//**** CHALLENGE 1 *****
//given code
function loadImages(){
const imgURL = "https://dog.ceo/api/breeds/image/random/4";

//on page load, fetch images from above URL
fetch(imgURL)

//parse to JSON
.then(res => res.json())
//add image elements to the DOM for each image in the array
.then(function (json){
    const imgArray = [];
    json.message.map(function (imgSrc){
        return iterateThroughImages(imgSrc)
    })
})

}
////.then(img => document.querySelector("body").append(img))
//.then(iterateThroughImages)
//.catch(function(error){
//    document.querySelector('body').append(error.message)
//})

//??forEach
//GO THROUGH FETCH VIDEOS AND FIGURE OUT HOW TO SEND json => to iterateThroughImages
    function iterateThroughImages(imgSrc){
    //find where to append 
    const imageDiv = document.querySelector("#dog-image-container");
    //Create img
    const createdImage = document.createElement('img');
    //set attributes of img!!! 
    createdImage.setAttribute('src', imgSrc)
    //append imgs to DOM
    imageDiv.append(createdImage); 
    }

     
//*****CHALLENGE 2 */
function loadBreeds(){
const breedUrl = 'https://dog.ceo/api/breeds/list/all'

//fetch dog breeds from above
fetch(breedUrl)
.then(res => res.json())
//.then(json => console.log(json.message))
.then(appendDogBreeds)
//can add new .then (implicitly returns last .then)

//add breeds to unordered list
function appendDogBreeds(json){
    breedNames = json.message;
    console.log(breedNames);

   for(const breed in breedNames) {
        const li = document.createElement('li');
        //get breed name on li
        li.innerText = `${breed}`;
       ///add li.onclick
       //li.className = "breed-class"
        //append li to ul -- element by id or query select - will it matter html coll/node?
        const ul = document.getElementById('dog-breeds');
        ul.appendChild(li)
    };
    changeListColor(); 
    selectALetterFromDropdown();
}
}

//Challenge 3
//add JavaScript so that, when the user clicks on any one of the <li>s, the font color of that <li> changes. This can be a color of your choosing.
function changeListColor(){
const list = document.querySelector("#dog-breeds");
console.log(list);
list.addEventListener('click', e => e.target.style.color = "blue");
}
//forEach and map do not work with the returned node list???
/* listElementsArray.forEach(x => x.addEventListener('click', 

for(i=0; i< list.length; i++){
    list.addEventListener('click', e=> e.target.style.backgroundColor = blue);
} */

//Challenge 4
function selectALetterFromDropdown(){
//add event listener to dropdown
const selectDropdown = document.querySelector("#breed-dropdown");
selectDropdown.addEventListener('change', handleDropdown)
}

function handleDropdown(event){
    //debugger;
    if(event.target.value !== " "){
    //filter breeds
    const justNames = Object.keys(breedNames);
    const filteredNames = justNames.filter(breed => breed.startsWith(event.target.value));
    //remove current list
    document.querySelector("#dog-breeds").textContent = ' ';
    //append new list
    filteredNames.forEach(name => {
        const newLi = document.createElement('li');
        newLi.innerText = `${name}`;
        console.log(newLi)
        //debugger;
        document.querySelector('#dog-breeds').append(newLi);
    })
}
else{
    loadBreeds();
}
}
