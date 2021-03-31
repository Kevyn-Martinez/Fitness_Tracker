import * as $ from 'jquery';

export class routines {
    text: string
}

export class Uworkouts {

    workouts: routines[] = [];

    completedWorkouts: routines[] = [];

    init() {
        return $.when(
            $.getJSON("/tracker/workouts").done(data => {
                this.workouts = data;

            }),
            $.getJSON("/tracker/completed").done(data => {
                this.completedWorkouts = data;

            })
        );


    }

    getWorkouts() {
        $("#Workouts").html(this.workouts.map(x => `<option>${x.text} </option>`).join(""))

    }

    /*getCworkouts(){
        $("#CompletedWorkouts").html(this.completedWorkouts.map(x => `<option>${x.text} </option>`).join(""))
    } */



}

var user = new Uworkouts();
user.init().done(() => {
    user.getWorkouts();
    /*user.getCworkouts(); */



    $("#AddAll").click(function () {
        $("#Workouts").children().appendTo("#CompletedWorkouts")
    });

    $("#RemoveAll").click(function () {
        $("#CompletedWorkouts").children().appendTo("#Workouts")
    })
  
   
    $("select").change(function(){
        $(this).children(':selected').dblclick().appendTo("#CompletedWorkouts")
        })
    
    $("select").change(function(){
        $(this).children(':selected').dblclick().appendTo("#Workouts")
        })

    });

