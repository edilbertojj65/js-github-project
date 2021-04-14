  //Define the elemnent DOM for invoke event listener
  const githubform = document.getElementById("github-form");

  //Invoke the event listner with element submit
  githubform.addEventListener('submit', function(e) {
    e.preventDefault()
    //Determine the value to search in the api api.github.com
    var search = document.getElementById("search").value
    var originalName = search.split(` `).join(``)
    document.getElementById("github-container").innerHTML = " "
    
    //Get the data user  from api.github.com
    fetch("https://api.github.com/users/" + originalName )
    .then((result) => result.json())
    .then((data) => {console.log(data)
      //Get the user avatar from api
      document.getElementById("github-container").innerHTML = `
       <a target= "_blank" href = "https://www.github.com/${originalName}"><img  src = "${data.avatar_url}"/></a>` 

      //Determine url for get the user  repositories
      const urlRepos = `https://api.github.com/users/${originalName}/` + "repos";
     
     fetch(urlRepos)
     .then((Response) => Response.json())
     .then((dataRepos) => {
        
       let ul = document.getElementById('github-container')
       
      for (const reposUser of dataRepos) {
     //Show the user repositories in DOM
          let li = document.createElement('li')
          li.innerText = reposUser.name
          li.style.cursor = 'pointer'
          ul.appendChild(li)
          li.addEventListener('click', updateColor);
          
    } 
     
    
    })
    })
  })

  function updateColor(event) {
    event.target.style.color = 'palevioletred';
  }

 