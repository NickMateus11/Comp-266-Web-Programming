
import { Filter } from './bad-words.js';


function submitComment() {
    const comment = document.getElementById('comment_input').value;
    console.log(comment)
    if (comment == '' || !validateComment(comment)) return false;

    $.post("../../mysql.php", {
        "page": new RegExp('([a-zA-z]+)\.html.*').exec(window.location.href)[1], 
        "comment": comment,
        // "date": new Date().toDateString()
        "date": new Date().toLocaleString()
    } , function (data) {
        const response = JSON.parse(data);
        if(response['status'] === 200){
            console.log("Comment Submission Successful");
            location.reload();
        }else{
            console.log("Comment Submission FAILED");
            alert("Comment submission failed");
        }
    });
}

function validateComment(comment) {
    return (!new Filter().isProfane(comment));
}

function fetchComments(callback) {
    $.get("../../mysql.php", { 
        "page": new RegExp('([a-zA-z]+)\.html.*').exec(window.location.href)[1],
    }).done(function (data) {
        const response = JSON.parse(data);
        if(response['comments']){
            callback(response['comments']);
        }else{
            console.log("Comment Retrieval FAILED");
            callback({'comment':' *** COMMENTS FAILED TO LOAD ***'});
        }    
    });
}

function populatePageWithComments(comments) {
    const comment_section = document.getElementById('loaded_comments');
    comment_section.innerHTML = '';
    comments.reverse().forEach(commentData => {
        comment_section.innerHTML += `<p> ${commentData['comment']} <br> ${commentData['date']} </p>`;
    });
}


$(document).ready(function() {
    document.getElementById("comment_submit").onclick = submitComment;
    fetchComments(populatePageWithComments); // callback function must take an array as param
});
