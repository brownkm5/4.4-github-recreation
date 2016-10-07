
var $ = require('jquery');
var _ = require('underscore');
var Handlebars = require('handlebars');
var githubtoken = require('./gitapikey.js');

if(githubtoken !== undefined){
  $.ajaxSetup({
    headers: {
      'Authorization': 'token ' + githubtoken.token
    }
  });
}
$.ajax('https://api.github.com/users/brownkm5').then(displayUserInfo);

$.ajax('https://api.github.com/users/brownkm5/repos').then(displayUserRepo);

// $.ajax('https://api.github.com/users/brownkm5/orgs').then(displayUserCategories);

function displayUserInfo(data){
  console.log(data);
  var user = data;
  var $profileContainer = $('aside');

  var source = $('#aside-template').html();
  var template = Handlebars.compile(source);

  $profileContainer.append(template(user));
}

function displayUserRepo(data){
  console.log(data);
  var repos = data;
  var $repoContainer = $('#repo-list'); //ul that holds the list of repos

  var source = $('#repo-template').html();
  var template = Handlebars.compile(source);
  _.each(repos, function(repo){
    $repoContainer.append(template(repo));
  });
}
