document.querySelector("#loginForm").addEventListener("submit",event=>{
    event.preventDefault();
    const fetchObj = {
        email:document.querySelector("#loginEmail").value,
        password:document.querySelector("#loginPassword").value,
    }
    console.log(fetchObj);
    fetch("api/users/login",{
        method:"POST",
        body:JSON.stringify(fetchObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        console.log(res);
        if(res.ok){
            console.log("logged in successfully!")
            location.replace("/profile")
        } else {
            alert("log in failed!")
            location.reload();
        }
    })
})



document.querySelector("#signupForm").addEventListener("submit",event=>{
    event.preventDefault();
    const fetchObj = {
        email:document.querySelector("#signupEmail").value,
        password:document.querySelector("#signupPassword").value,
        name:document.querySelector("#signupUsername").value,
    }
    console.log(fetchObj);
    fetch("/api/users/signup",{
        method:"POST",
        body:JSON.stringify(fetchObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        console.log(res);
        if(res.ok){
            console.log("signed up successfully!")
            location.replace("/profile")
        } else {
            alert("signup failed!")
            location.reload();
        }
    })
})


// async function formHandler(event){
//     event.preventDefault();
//     event.stopPropagation();
//     const description = document.querySelector('.userpost').value;
    
//     console.log(description)
//     const response = await fetch("api/projects/posts",{
//         method: "POST",
//         body:JSON.stringify(description),
//         headers:{
//             "Content-Type":"application/json"
//         }
//     });

//     if (response.ok){
//         document.location.replace('profile')
//     } else {
//         alert("failed to add")
//     }
// }

// document.querySelector('.userpost').addEventListener('submit', formHandler);
