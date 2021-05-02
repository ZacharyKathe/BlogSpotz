document.querySelector('#newPostForm').addEventListener("submit", event=>{
    event.stopPropagation();
    event.preventDefault();
    const fetchObj = {
      name: document.querySelector('#newName').value,
      description: document.querySelector('#newDescription').value,
      needed_funding: document.querySelector("#newFunding").value,
    }
    console.log(fetchObj);
    fetch("/api/projects/post", {
        method: "POST",
        body:JSON.stringify(fetchObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        console.log(res);
        if(res.ok){
            console.log("POSTED !!")
            alert("New Post On Community Page 👍✌")
            location.replace("/profile");
        } else {
            alert("post failed :( ")
            location.reload();
        }
    })
})
