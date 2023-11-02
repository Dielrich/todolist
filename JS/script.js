-// Attente de chargement du Document
$(function(){

    //tableau des taches
    let taskList = [];
    // Si la liste est sauvegardée..., 
    if (localStorage.getItem('taskList')) {
    // ...on la récupère    
        taskList = JSON.parse(localStorage.getItem('taskList')) 
    };
    // Affichage de la liste au lancement
    displayTasks();

    //fonction pour afficher la liste des tâches dans le tableau à l'écran
    function displayTasks() {
        // Vide le tableau d'affichage
        $('#task-list').empty();
        // Parcourir le tableau en affichant les lignes correspondantes
        $.each(taskList, function(index, task){
            $('#task-list').append('<tr class="edit-task" data-id="'+index+'"><td>'+(index+1)+'</td><td>'+task.name+'</td><td>'+task.date+'</td><td><button data-id="'+index+'" type="button" class="btn btn-outline-danger text-danger delete-task"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"></path><path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"></path></svg></button></td></tr>');
        });//displayTask
    };

    //fonction pour ajouter une tache à la liste
    function addTask(name, date) {
        taskList.push({
            name: name, 
            date: date
        });
        // Sauvegarder la liste de tâches dans le stockage du navigateur
        localStorage.setItem('taskList', JSON.stringify(taskList));

        // Afficher la liste de tâches à jour
        displayTasks();
    };//addTask
     
    //fontion pour modifier une tâche à la liste
    function editTask(index, name, date) {
        //Modifier la tâche de référence "index", avec un nouveau "name" et "date"
        taskList[index] = {name: name, date: date};
        // Sauvegarder la liste de tâches dans le stockage du navigateur
        localStorage.setItem('taskList', JSON.stringify(taskList));
        //Afficher la liste de tâches à jour
        displayTasks();
    };//editTask

    //fonction pour supprimer une tâche à la liste
    function deleteTask(index) {
        // Supprime la tâche "index" du tableau
        taskList.splice(index, 1);
        // Sauvegarder la liste de tâches dans le stockage du navigateur
        localStorage.setItem('taskList', JSON.stringify(taskList));
        //Afficher la liste de tâches à jour
        displayTasks();
    };//deleteTask

    //############EVENEMENT###########

    //Enregistrer une nouvelle tâche (avec le formulaire)
        $('#task-form').submit(function(event){
            event.preventDefault();
            //Ajout du contenu des champs du formulaire au tableau des tâches
            addTask($('#task-name').val(), $('#task-date').val());
            //Effacement des champs
            $('#task-name').val('');
            $('#task-date').val('');
            
        });//submit

    //modifier une tâche
    $(document).on('click', '.edit-task', function(){
        // Mémoriser l'index cliqué
        let index = $(this).data('id');
        let newName = prompt("Nouveau nom de cette tâche :", taskList[index].name);
        let newDate = prompt("Nouvelle date pour cette tâche :", taskList[index].date);
        editTask(index, newName, newDate);
    });//clickDOMedit
    
    //supprimer une tâche
    $(document).on('click', '.delete-task', function(event){
        // Stop la propagation de cet évènement à la row "edit-task"
        event.stopPropagation();
        // Mémorise l'index cliqué
        let index = $(this).data('id');
        // Supprime la tâche avec confirmation
        if (confirm("Voulez-vous vraiment supprimer la tâche "+taskList[index].name+" ?")) { deleteTask(index)};
    });//clickDOMdelete
  
    //Supprimer toute la liste de tâches
    $('#delete-all-tasks').click(function(){
        //effacer la liste en stockage
        localStorage.removeItem('taskList');
        //effacer la liste courante
        taskList = [];
        //effacer le tableau affiché
        $('#task-list').empty();

    });//delete-all

}); //rdy