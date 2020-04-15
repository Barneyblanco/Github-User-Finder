$(document).ready(function(){
    $("#inputUsername").on('keyup', function(e){
      let username = e.target.value
      $.ajax({
          url:"https://api.github.com/users/"+username,
          data:{
              client_id:'f8ae4b7500bc5500ead4',
              client_secret:'82fa19f11eb9b9a37419c015ba9d0a352d08abbe',
              sort: 'created: asc',
              per_page: 5
          }
      }).done(function(user){
          $.ajax({
            url:"https://api.github.com/users/"+username+"/repos"
        }).done(function(repos){
            $.each(repos, function(index,repo){
                $("#repos").append(`
                <div class = "row">
                <div class = "col-md-7">
                <ul class = "list-group">
                <li class = "list-group-item my-2" id = "lil">
                <strong>${repo.name}</strong>: ${repo.description}
                </li>
                </ul>
                </div>
                <div class = "col-md-3" >
                <button class = "btn btn-secondary mr-2 my-2">Forks: ${repo.forks_count}</button>
                <button class = "btn btn-primary  mr-2 my-2">Watchers: ${repo.watchers_count}</button>
                <button class = "btn btn-success my-2">Stars: ${repo.stargazers_count}</button>
                </div>
                <div class = col-md-2>  
                <a id = "btnd" class = "btn btn-danger" href = ${repo.html_url} >repo page</a>
                </div>
                </div>
                `)
            })
        })
          $("#profile").html(`
          <div class = "container-fluid">
          <div class = "row">
          <div class = "col-md-3">
          <ul class = "list-group">
          <li class = "list-group-item" style = "margin-top:10%; font-size:1rem; text-align:center; "><strong>${user.name}</strong></li>
          </ul>
          </div>
          <div class = "col-md-9">
          </div>
          </div>
          <div class = "row">
          <div class = "col-md-3">
          <img class = "thumbnail avatar" src = ${user.avatar_url}>
          <a class = "btn btn-danger btn-block mt-2" href = ${user.html_url} >View profile</a>
          </div>
          <div class = "col-md-9">
          <button id ="btnfirst" class = "btn btn-secondary mr-2">public repos: ${user.public_repos}</button>
          <button id ="btnfirst" class = "btn btn-primary mr-2">public gists: ${user.public_gists}</button>
          <button id ="btnfirst" class = "btn btn-success mr-2">following: ${user.following}</button>
          <button id ="btnfirst" class = "btn btn-info mr-2">followers: ${user.followers}</button>
          <br>
          <br>
          <ul class = "list-group">
          <li class = "list-group-item"> Company: ${user.company}</li>
          <li class = "list-group-item"> Website/Blog: ${user.blog}</li>
          <li class = "list-group-item"> Location: ${user.location}</li>
          <li class = "list-group-item"> Member since: ${user.created_at}</li>
          <li class = "list-group-item"> Last updated: ${user.updated_at}</li>
          </ul>
          </div>
          </div>
          </div>
          <br>
          <br>
          <br>
          <h3 class = "repostitle">Repos</h3>
          <div id = "repos"></div>
          `)
      })
    })
})