
import { Filter } from './bad-words.js';

function submitComment(event) {
    event.preventDefault();

    const comment = document.forms["comment_form"]["comment"].value;
    if (!validateComment(comment)) return false;

    $.post("../../mysql.php", {
        "page": new RegExp('([a-zA-z]+)\.html.*').exec(window.location.href)[1], 
        "comment": comment,
        "date": new Date().toDateString()
    } , function (data) {
        const response = JSON.parse(data);
        if(response['status'] === 200){
            console.log("Comment Submission Successful");
        }else{
            console.log("Comment Submission FAILED");
        }
    });
}

function validateComment(comment) {
    return (!new Filter().isProfane(comment));
}

function fetchComments() {
    $.get("../../mysql.php", { 
        "page": new RegExp('([a-zA-z]+)\.html.*').exec(window.location.href)[1],
    }).done(function (data) {
        const response = JSON.parse(data);
        if(response['comments']){
            return response['comments'];
        }else{
            console.log("Comment Retrieval FAILED");
        }    
    });
}

function populatePageWithComments(comments) {

}

$(document).ready(function() {
    const form = document.getElementsByName('comment_form')[0];
    form.addEventListener('submit', submitComment);

    console.log('comments script');
    const comments = fetchComments();
    populatePageWithComments(comments);
});

