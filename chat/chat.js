

var Comment = function(name,restaurant, text) {
  this.name = name;
  this.restaurant = restaurant;
  this.text = text;
};

Comment.prototype.render = function() {
  var li = document.createElement('li');
  li.innerHTML = '<p>' + '<b>'+ this.name +'</b>'+':' +'<i>'+ this.restaurant + '</i>'+' ---'+ this.text + '</p>';
  return li;
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++
// Just setting up some variables for DOM access
var comments = document.getElementById('comments');
var chatForm = document.getElementById('chat-form');
var clearComments = document.getElementById('clear-comments');
var commentData = [];

// +++++++++++++++++++++++++++++++++++++++++++++++++++++
// This is a global function to render all of the new instances
var renderAllComments = function() {
  comments.innerHTML = '';
  commentData.forEach(function(comment) {
    comments.appendChild(comment.render());
  });
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++
// This function handles the submission of comments
var handleCommentSubmit = function(event) {
  event.preventDefault();

  if (!event.target.says.value || !event.target.where.value || !event.target.who.value) {
    return alert('Fields cannot be empty!');
  }

  var commenter = event.target.who.value;
  var location = event.target.where.value;
  var remark = event.target.says.value;

  console.log(commenter);
  console.log(location);
  console.log(remark);

  var newComment = new Comment(commenter, location, remark);

  console.log('Comment by ' + event.target.who.value + ' at ' + Date());
  event.target.who.value = null;
  event.target.where.value = null;
  event.target.says.value = null;

  commentData.push(newComment);
  renderAllComments();
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++
// Event listener for comment submission button
chatForm.addEventListener('submit', handleCommentSubmit);

// +++++++++++++++++++++++++++++++++++++++++++++++++++++
// Event listener for the 'Clear all comments' button
clearComments.addEventListener('click', function() {
  console.log('You just cleared the comments!');
  comments.innerHTML = '';
  commentData = [];
});
