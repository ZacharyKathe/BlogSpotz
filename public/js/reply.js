var commentForms = document.querySelectorAll('.reply');
console.log(commentForms);


commentForms.forEach(commentForm =>{
    commentForm.addEventListener("submit", event=>{
        //event.stopPropagation();
        console.log("event target",event.target.childNodes[3].value)
        const newReply = event.target.childNodes[3].value
        event.preventDefault();
        const fetchObj = {
            new_post: newReply,
        }
        console.log(fetchObj);
        fetch("/api/projects/reply", {
            method: "POST",
            body:JSON.stringify(fetchObj),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>{
            console.log(res);
            if(res.ok){
                console.log("Sent!!")
                alert("New Reply On Community Page 👍✌")
               // location.replace("/profile");
            } else {
                alert("post failed this is my fault, not finished building the back-end :( ")
                //location.reload();
            }
        })
    })
})
