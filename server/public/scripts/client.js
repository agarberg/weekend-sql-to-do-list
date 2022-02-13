console.log("js is good to go");

$(document).ready(function () {
    console.log("JQuery is  good to go ");
    setupClickListeners();
    getTaskList();
    // load existing list on page load
   
  }); // end doc ready

let colorSelector

function setupClickListeners() {
    $('#submitBtn').on( 'click', postTask);
    $('#taskList').on( 'click', '.btn-delete', deleteTask);
    $('#taskList').on( 'click', '.btn-complete', completeTask) 
    // $('#taskList').on( 'click', '.btn-complete', changeColor) 
}
    
    




  // Get TASK LIST FROM SERVER
  function getTaskList() {
    console.log("in get task list");
    $.ajax({
      type: "GET",
      url: "/todo",
    })
    .then(function (response) {
        console.log(response);
        $("#taskList").empty();
        for (let i = 0; i < response.length; i++) {
          if (response[i].completed) { 
          $("#taskList").append(`<tr class='cmpl'>
          <td>${response[i].task}</td>
          <td><button type="button" class="btn-delete" data-id=${response[i].id}>Delete</button>
          <div class='cmpl'><Button class="btn-complete" id="btn-complete" data-id=${response[i].id}>Completed!</button></div></td>
          </tr>`);
        } 
         else {
            $("#taskList").append(`<tr class='cmplred'>
            <td>${response[i].task}</td>
            <td><button class="btn-delete" data-id=${response[i].id}>Delete</button>
            <Button class="btn-complete" id="btn-complete" data-id=${response[i].id}>Click To Complete</button></div></td>
            </tr>`);
          }
      }
    })
      .catch(function (error) {
        console.log("error in GET", error);
      })
  }
//finish get task list

//COMPLETE TASK FUNCTION
  function completeTask(){
    console.log('In completeTask');
    console.log(this);
    let id = $(this).data('id')
    let compButton = $(this).data('completed');
    $.ajax({
      type: 'PUT',
      url: `/todo/${id}`,
    }).then(function(response){
      console.log('finished PUT', response);
      getTaskList();
    }).catch(function (err){
      console.log('error updating', err);
    })
  };

  // function changeColor(colorSelector) {
  //   $(colorSelector).toggleClass('blue'); 
  // }

    ///DELETE TASK FUNCTION
    function deleteTask() {
      console.log('in delete function')
      let toDoId = $(this).data().id;
      $.ajax({
          method: 'DELETE',
          url: `/toDo/${toDoId}`
      })
      .then(function(response) {
          console.log('Deleted it!');
          getTaskList();
      })
      .catch(function(error) {
          console.log('Error DELETEing', error);
      })
    }

// END DELETE FUNCTION


      function postTask() {
        if ($("#inputText").val() === '') 
        {
          alert('You must fill out the entire form.');
          return;
      }
        console.log('in submitTask')
        let taskToAdd = {
          task: $("#inputText").val(),
          priority: $("#priority").val(),
          completed: "FALSE"
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
            console.log('Error in POST postTask()', error)
            alert('Unable to add task at this time. Please try again later.');
          })
      }