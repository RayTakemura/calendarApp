//global vars
var tasks = {
    id: [],
    task: []
};// an array to store localStorage vars
const START = 9; // const of the time to start in military hour
const END = 17;// const of the time to end in military hour

/**
 * Populates tasks on to the container.
 * Each task contains time in hour, schedule for the hour, and a save button
 */
function populateTasks() {
    // for loop or "for each"
    for(var i = 0; i < (END - START + 1); i++){
        // create row
        let $row = $('<div>')
            .addClass('row')
            .attr('id-',START + i);
        // create time for work hour
        let time = moment().set({
            'hour' : i + START,
            'minute' : 0,
            'second' : 0
        });
        //convert time into proper format and make a span element
        let timeText = time.format('h A');
        let $timePrint = $('<span>')
            .addClass('col-1 border-top')
            .text(timeText);

        //create p element that holds the text for schedule
        let $taskP = $('<p>')
            .addClass('col-10 border border-light m-0 pt-2')
            .attr('id-p-', START + i);
            //.text("You can do anything here. So don't worry about it. Be so very light. Be a gentle whisper. Maybe, just to play a little, we'll put a little tree here. Let's do it again then, what the heck. I want everbody to be happy. That's what it's all about.");

        // create the save button with the lock icon
        let $saveBtn = $('<button>')
            .addClass('col-1 rounded-right saveBtn')
            .attr('id-btn-', START + i); 
        let $span = $('<span>')
            .addClass('oi oi-lock-locked');
        $saveBtn.append($span);

        //append every column into the row
        $row.append($timePrint, $taskP, $saveBtn);

        //append row to container
        $('.container').append($row);
    }
}


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
    // check if the textarea exists
    let idNum = $(this).attr('id-btn-');
    let $textArea = $('textarea').data('id-text-', idNum);
    if($textArea) return;
    // let $p = $('p').data('id-p-', idNum);
    // if($p) return;
    
    // obtain data attr, class, and text from textarea
    let pClass = $textArea.attr('class');
    let text = $textArea
        .val()
        .trim();
    
    // convert textarea to p element
    let $taskP = $('<p>')
        .attr('id-p-', idNum)
        .addClass(pClass)
        .text(text);
    $($textArea).replaceWith($taskP)

    // save the task and the id
    tasks.id.push(idNum);
    tasks.task.push(text);
    
    // store the saved task to the local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));

})

// load the tasks
function loadTasks(){

    populateTasks();

    tasks = JSON.parse(localStorage.getItem('tasks'));

    if (!tasks) {
        tasks = {
            id: [],
            task: []
        };
    }

    console.log(tasks.id.length);

    for (var i = 0; i < tasks.id.length; i++) {
        $taskP = $('p').data('id-text-', tasks.id[i]);
        //console.log($taskP.val());
        console.log(tasks.task[i]);
        $taskP.text(tasks.task[i]);
        //$taskP.addClass('col-12');
    }

}


// compareTime function to set color of each schedule
    //check taskmaster-pro for details



loadTasks();





    