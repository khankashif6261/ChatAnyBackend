let fallBack = false;
let currentModel = 0;
let memory = {};
export async function askAI(userMessage, chatId){ 
    if(!memory[chatId]){
memory[chatId] = [];
}

memory[chatId].push({
role:"user",
content:userMessage
});
    const Models = ["Meta-Llama-3.3-70B-Instruct","gpt-oss-120b","DeepSeek-V3-0324", "DeepSeek-V3.1", "Llama-4-Maverick-17B-128E-Instruct", "Meta-Llama-3.1-8B-Instruct","DeepSeek-R1-0528" , "MiniMax-M2.5", "gemma-3-12b-it", "gemma-3-27b-it", "DeepSeek-V3.2", "DeepSeek-V3.1-cb"];
const changeModel = () => {
    console.log("model Changed");
    fallBack = true;
    currentModel+=1;
}
memory[chatId] = memory[chatId].slice(-6);
const response = await fetch("https://api.sambanova.ai/v1/chat/completions",{

method:"POST",

headers:{
"Content-Type":"application/json",
"Authorization":`Bearer ${process.env.SAMBANOVA_API_KEY}`
},

body:JSON.stringify({

model: Models[currentModel],   // free model

messages:[

{
role:"system",
content:`
You are Riya, a 19 year old Indian college student.

Personality:
- Casual texter
- Short replies
- GenZ style
- Sometimes Hindi words


Rules:
- Max 20 words
- Sound human
- No long explanations
`
},

{
role:"user",
content:userMessage
},
...memory[chatId],
],

temperature:0.9,
top_p:0.95

})

});

const data = await response.json();

if(!data.choices || !data.choices[0]){
console.log("AI ERROR:", data);
changeModel();
console.log(Models[currentModel]);
return "wait a sec 😭";

}
memory[chatId].push({
role:"assistant",
content:data.choices[0].message.content
});
return data.choices[0].message.content;

}