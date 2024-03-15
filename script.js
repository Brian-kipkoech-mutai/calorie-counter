 
const caloriesBudgetInput=document.querySelector('#caloriesBudgetInput');
const entryOptions=document.querySelector('#entryOptions');
const addEntryButton=document.querySelector('#addEntryButton');
const form=document.querySelector('#form');
const output=document.querySelector('.output');
const caloriesBudgetText=document.querySelector('#caloriesBudgetText');
const consumedCaloriesText=document.querySelector('#consumedCaloriesText');
const burnedcaloriesText=document.querySelector('#burnedcaloriesText');
const DeficitOrSurplusText=document.querySelector('#DeficitOrSurplusText');
const submitButton=document.querySelector('#submitButton');
const caloriesInput=document.querySelectorAll('#caloriesInput .inputSpan')
const resetButton=document.querySelector('#resertButton')
let isError =false;
 

const addEntry=()=>{
     const fieldId= `#${entryOptions.value}`;
     const targetField=document.querySelector(fieldId);
     const inputCount = document.querySelectorAll( `${fieldId} input[type='text']`).length+1
     const  inputTemplate=`
     <article>
     <div class="inputPair">
     <label for="${entryOptions.value}-${inputCount}-Name" class="labelClass">${entryOptions.value} ${inputCount} Name</label>
     <input type="text" id="${entryOptions.value}-${inputCount}-Name" class="inputClass">
 </div>
 <div class="inputPair">
     <label for="${entryOptions.value}-${inputCount}-Value" class="labelClass">${entryOptions.value} ${inputCount} Value</label>
     <input type="number" min="0" id="${entryOptions.value}-${inputCount}-Value" class="inputClass">
 </div>
 
 </article>
     `
     
    targetField.insertAdjacentHTML("beforeend",inputTemplate);
    
    targetField.scrollIntoView({behavior:'smooth', block:"start"})
       
}
 
 addEntryButton.onclick=addEntry;
 const cleanInput=(input)=>{
    console.log('input',input)
    console.log('inputType',typeof(input));
     const regex=/[+-\s]/
     return input.replace(regex,'')
     
 }
 const isValidInput=(input)=>{
    const regex=/\d+e\d+/i;
    return input.match(regex)
   
 }
 console.log('isinvalid',isValidInput('1e2'));
 
  const addCalories=(nodeList)=>{
    const nodeArray=Array.from(nodeList)
    console.log('nodeArray',nodeList.keys());
    let caloriesTotal=0;
     for (const element of nodeArray){
         
        console.log('element.values',element.value);
        const cleaned=cleanInput(element.value);
        const isInvalid= isValidInput(cleaned)
        if(isInvalid){
            isError=true;
            alert(`Invalid Input ${element.value}`)
            return;
        }
        else{
       caloriesTotal+=Number(cleaned);
        }

        


     }
     return caloriesTotal;
  }
  const calculateCalories=()=>{
  const breakfast=document.querySelectorAll('#breakfast input[type="number"]');
  const dinner=document.querySelectorAll('#dinner input[type="number"]');
  const snacks=document.querySelectorAll('#snacks input[type="number"]');
  const exercise=document.querySelectorAll('#exercise input[type="number"]');
  const lunch=document.querySelectorAll('#lunch input[type="number"]');

  const breakfastCalories=addCalories(breakfast);
  const lunchCalories=addCalories(lunch);
  const dinnerCalories=addCalories(dinner);
  const snacksCalories=addCalories(snacks);
  const exerciseCalories=addCalories(exercise);
  const burgetedCalories=addCalories([caloriesBudgetInput])
  const consumedCalories=breakfastCalories+lunchCalories+dinnerCalories+snacksCalories;
  const burnedCalories=exerciseCalories;
  const calories=burgetedCalories-consumedCalories+burnedCalories;
  const DeficitOrSurplus=burgetedCalories-consumedCalories+burnedCalories<0?'Surplus':'Deficit';
  console.log('consumedCalories',consumedCalories);
  console.log('burnedCalories',burnedCalories);
  console.log('burgetedCalories',burgetedCalories);
    
  caloriesBudgetText.innerHTML=`Burgeted Calories ${burgetedCalories}`;
  consumedCaloriesText.innerHTML=`Consumed Calories ${consumedCalories}`;
  burnedcaloriesText.innerHTML=`Burned Calories ${burnedCalories}`;
  DeficitOrSurplusText.innerHTML=`${DeficitOrSurplus} of ${Math.abs(calories)}`;
  output.classList.remove('hide')
  output.scrollIntoView({behavior:'smooth'})
 }
submitButton.onclick=(e)=>{
    if(!caloriesBudgetInput.value==''){
        e.preventDefault();
        calculateCalories();
        }
    }
 
 
const reset=()=>{
    for( const node of caloriesInput){
        node.innerHTML='';
    }
    caloriesBudgetInput.innerHTML='';
    output.classList.add('hide');
}

resetButton.onclick=reset;


 