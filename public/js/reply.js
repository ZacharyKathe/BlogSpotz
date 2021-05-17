var commentForms = document.querySelectorAll('.reply');
var projectForms = document.querySelectorAll('.description');
 

console.log(commentForms);




commentForms.forEach(commentForm =>{
    commentForm.addEventListener("submit", event=>{
        //event.stopPropagation();
        event.preventDefault();
        console.log("event target",event.target.childNodes[3].value)
        console.log("event target2",event.target.childNodes[1])
        const newReply = event.target.childNodes[3]
        const goesHere = event.target.childNodes[1]
        goesHere.textContent = newReply.value
        const projectId = goesHere.getAttribute("data-project")
        const fetchObj = {
            new_post: goesHere.value,
            // project_id:  // grab data-project object off off dom in handle-bars to load on page
        }
        console.log(fetchObj);
        fetch(`/api/projects/reply/${projectId}`, {
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
                location.reload();
            } else {
                alert("post failed this is my fault, not finished building the back-end :( ")
                location.reload();
            }
        })
    })
})
