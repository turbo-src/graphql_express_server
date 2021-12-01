import fetch from "node-fetch";
//fetch('http://localhost:4000/graphql', {
//  method: 'POST',
//  body: JSON.stringify({ query: 'query { hello }' })
//  headers: {'Content-Type': 'application/json'}
//})
//.then(response => response.json())
//.then(json => {
//  alert('Found ' + result.data.allPosts.length + ' posts');
//})

const response = await fetch('http://localhost:4000/graphql', {
	method: 'post',
  body: JSON.stringify({ query: '{ getVote(contributor_id: "a") {side} }' }),
  //body: JSON.stringify({ query: '{ setVote(contributor_id: "a", side: true ) {side} }' }),
	headers: {'Content-Type': 'application/json'}
});
const data = await response.json();

console.log(data);