document.querySelector('#new_post').addEventListener("submit", event=>{
    event.stopPropagation();
    event.preventDefault();
    const fetchObj = {
        new_post: document.querySelector('#new_post').Value,
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
            location.replace("/profile");
        } else {
            alert("post failed :( ")
            location.reload();
        }
    })
})