const form=document.getElementById("chatForm");
const input=document.getElementById("messageInput");
const messages=document.getElementById("messages");
const button=document.getElementById("sendButton");
function addMessage(text,type){
 const box=document.createElement("div");box.className="message "+type;
 const name=document.createElement("b");name.textContent=type==="user"?"أنت":"NORYN AI";
 const p=document.createElement("p");p.textContent=text;box.append(name,p);
 messages.appendChild(box);messages.scrollTop=messages.scrollHeight;
}
form.addEventListener("submit",async e=>{
 e.preventDefault();const message=input.value.trim();if(!message)return;
 addMessage(message,"user");input.value="";button.disabled=true;
 try{
  const response=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message})});
  const result=await response.json();if(!response.ok)throw new Error(result.error||"تعذر إرسال الرسالة");
  addMessage(result.reply||"لم يصل رد من الخادم","assistant");
 }catch(error){addMessage("حدث خطأ في الاتصال: "+error.message,"assistant");}
 finally{button.disabled=false;input.focus();}
});
