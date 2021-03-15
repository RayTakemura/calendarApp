//global vars
var tasks = {};
const START = 9; // const of the time to start in military hour
const END = 17;// const of the time to end in military hour

/**
 * Populates tasks on to the container.
 * Each task contains time in hour, schedule for the hour, and a save button
 */
function createTask(index, task) {
    // create row
    let $row = $('<div>')
        .addClass('row')
        .attr('id-',index);
    // create time for work hour
    let time = moment().set({
        'hour' : index,
        'minute' : 0,
        'second' : 0
    });
    //convert time into proper format and make a span element
    let timeText = time.format('h A');
    let $timePrint = $('<span>')
        .addClass('col-1 border-top')
        .text(timeText);

    //create p element that holds the text for schedule
    var $taskP = $('<p>')
        .addClass('col-10 border border-light m-0 pt-2')
        .attr('id-p-', index);
    if(task){
        $taskP.text(task);
    }

    // create the save button with the lock icon
    let $saveBtn = $('<button>')
        .addClass('col-1 rounded-right saveBtn')
        .attr('id-btn-', index); 
    let $span = $('<span>')
        .addClass('oi oi-lock-locked');
    $saveBtn.append($span);

    //append every column into the row
    $row.append($timePrint, $taskP, $saveBtn);

    //append row to container
    $('.container').append($row);
    console.log($row);
};


/**
 * Convert the p element to textarea element.
 */
$('.container').on('click', 'p', function() {
    //take the text content, the class, and the data attribute from p element
    let textP = $(this).text();
    let pClass = $(this).attr('class');
    let textID = $(this).attr('id-p-');
    //replace p element with textarea element. They have the same class, attribute, and text
    let $textInput = $('<textarea>')
        .addClass(pClass)
        .attr('id-text-', textID)
        .val(textP);
    $(this).replaceWith($textInput);
    $textInput.trigger('focus');
});


/**
 * Save the updated schedule to local storage.
 * Convert textarea element back to p.
 */
$('.container').on('click', 'button', function() {
//$('button').click( function() {    
    // check if the textarea exists
    let idNum = $(this).attr('id-btn-');
    console.log(idNum);
    let $textArea = $(this).prev();
    console.log($textArea.attr('id-text-'));
    
    // obtain data attr, class, and text from textarea
    let pClass = $textArea.attr('class');
    console.log($textArea.val())
    let text = $textArea
        .val()
        .trim();
    
    if(!text || text === ""){
        return;
    }
    // convert textarea to p element
    let $taskP = $('<p>')
        .attr('id-p-', idNum)
        .addClass(pClass)
        .text(text);
    
    $($textArea).replaceWith($taskP);

    // save the task and the id
    if(tasks.id.length > 0){
        for (var i = 0; i < tasks.id.length; i++){
            if(idNum === tasks.id[i]){
                tasks.task.splice(i, 1, text);
                break;
            } else if(i === tasks.id.length - 1 ){
                tasks.id.push(idNum);
                tasks.task.push(text);
                break;
            } 
        }
    } else{
        tasks.id.push(idNum);
        tasks.task.push(text);
    }
    
    
    // store the saved task to the local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));
});

// load the tasks
function loadTasks(){
    tasks = JSON.parse(localStorage.getItem('tasks'));
    if (!tasks) {
        tasks = {
          id: [],
          task: []
        };
    }
    console.log(tasks);
    var j = 0;
    for (var i = START; i < END + 1; i++) {
        for (j = 0; j < tasks.id.length; j++){
            console.log(parseInt(tasks.id[j]));
            console.log(tasks.task[j]);
            if(parseInt(tasks.id[j]) === i){
                createTask(i,tasks.task[j]);
                break; //breaks out of the inner for loop (the one with j variable)
            }else if (j === tasks.id.length - 1){
                createTask(i);
                break; 
            }
        }
        if (tasks.id.length === 0){
            createTask(i);
        }
    }
};


// compareTime function to set color of each schedule
    //check taskmaster-pro for details


loadTasks();

