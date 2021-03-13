//global vars
let list = [];// an array to store localStorage vars
const START = 9; // const of the time to start in military hour
const END = 17;// const of the time to end in military hour

// Elements needed for each cell:
// span, input (textarea), and save button

// vars needed for each cell:
    //moment object for each hour 

// using above, create a function: populateSchedules
function populateTasks() {
    // for loop or "for each"
    for(var i = 0; i < (END - START + 1); i++){
        // create row
        let $row = $('<div>')
            .addClass('row')
            .attr('id-',START + i);
        // each row needs 3 columns: col-1, col-10, col-1 
        let time = moment().set({
            'hour' : i + START,
            'minute' : 0,
            'second' : 0
        });
        let timeText = time.format('h A');
        let $timePrint = $('<span>')
            .addClass('col-1 border-top')
            .text(timeText);

        let $taskP = $('<p>')
            .addClass('col-10 border border-light m-0 pt-2')
            .attr('id-text-', START + i)
            .text("You can do anything here. So don't worry about it. Be so very light. Be a gentle whisper. Maybe, just to play a little, we'll put a little tree here. Let's do it again then, what the heck. I want everbody to be happy. That's what it's all about.");

        let $saveBtn = $('<button>')
            .addClass('col-1 rounded-right saveBtn')
            .attr('id-btn-', START + i); 
        let $span = $('<span>')
            .addClass('oi oi-lock-locked');
        $saveBtn.append($span);

        $row.append($timePrint, $taskP, $saveBtn);
        $('.container').append($row);
    }
}


/**
 * Convert the p element to textarea element.
 */
$('.container').on('click', 'p', function() {
    let textP = $(this).text();
    let pClass = $(this).attr('class');
    let textID = $(this).attr('id-text-');
    let $textInput = $('<textarea>')
        .addClass(pClass)
        .attr('id-text-', textID)
        .val(textP);
    $(this).replaceWith($textInput);
    $textInput.trigger('focus');
});

// the 'on-click' function for saving tasks
$('.container').on('click', 'button', function() {
    let idNum = $(this).attr('id-btn-');
    console.log(idNum);
    let $textArea = $('textarea').data('id-text-', idNum);
    console.log($textArea.val());
    let text = $textArea
        .val()
        .trim();

    let pClass = $textArea.attr('class');
    
    let $taskP = $('<p>')
        .addClass(pClass)
        .text(text);

    $($textArea).replaceWith($taskP)
})

// // on blur, change the textarea to p
// $('.container').on('blur', 'textarea', function() {
//     let $text = $(this)
//         .val()
//         .trim();
    
//     let $taskP = $('<p>')
//         .addClass('')
//         .text($text);

//     $(this).replaceWith($taskP)
// })


// compareTime function to set color of each schedule
    //check taskmaster-pro for details



populateTasks();





    