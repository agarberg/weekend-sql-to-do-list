console.log("js is good to go");

$(document).ready(function () {
    console.log("JQ good to go ");
    setupClickListeners();
    getTaskList();
    // load existing list on page load
   
  }); // end doc ready



function setupClickListeners() {
    $( '#inputText' ).on( 'click', postTask);
      console.log( 'in addButton on click' );
    $( '.btn-delete').on( 'click', deleteTask )
    $( '.complete').on( 'click', completeTask)
  }

  // Get TASK LIST FROM SERVER

  function getTaskList() {
    console.log("in get tast list");
    $('#taskList').empty();
    $.ajax({
      type: "GET",
      url: "/todo",
    })
    .then(function (response) {
        console.log(response);
        for (let i = 0; i < response.length; i++) {
          $("#taskList").append(`<tr>
          <td>${response[i].task}</td>
          <td><button class="btn-delete" data-id=${response[i].id}>Delete</button>
          <button class="btn-complete" data-id=${response[i].id}>Completed!</button></td>
          </tr>
    `);
        }
      })
      .catch(function (error) {
        console.log("error in GET", error);
      });

    //start post to submit 
    //   function addBook(bookToAdd) {
    //     $.ajax({
    //       type: 'POST',
    //       url: '/books',
    //       data: bookToAdd,
    //       }).then(function(response) {
    //         console.log('Response from server.', response);
    //         refreshBooks();
    //       }).catch(function(error) {
    //         console.log('Error in POST', error)
    //         alert('Unable to add book at this time. Please try again later.');
    //       });
    //   }
      

    ///COMPLETE TASK FUNCTION

    ///DELETE TASK FUNCTION

    

      function postTask() {
        let taskToAdd = {
          task: $("#inputText").val(),
          priority: $("#priority").val(),
        };
        $.ajax({
          method: "POST",
          url: "/toDo",
          data: taskToAdd
        })
          .then(function (response) {
            console.log("Response from server.", response);
            //empty inputs
            $("#inputText").val(""),
            $("#priority").val(0)
      
            // append to DOM with a function here
            getTaskList();
      
      
          }).catch(function(error) {
            console.log('Error in POST postKoala()', error)
            alert('Unable to add koala at this time. Please try again later.');
          });