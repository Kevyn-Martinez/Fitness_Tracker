
$('select').change(function () {
    $(this).children(':selected').attr('selected', true).dblclick().appendTo("#CompletedWorkouts")
});

$('select').change(function () {
    $(this).children(':selected').attr('selected', true).dblclick().appendTo("#Workouts")
})

$("#RemoveAll").click(function () {
    $("#CompletedWorkouts").children().appendTo("#Workouts")
})

$("#AddAll").click(function () {
    $("#Workouts").children().appendTo("#CompletedWorkouts")
});
