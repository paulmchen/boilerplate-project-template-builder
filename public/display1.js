$(document).ready(function() {

    var library = {
        Front: {
            html: {
                default: ['empty']
            }
            css: {
                cdn: ['Bootstrap', 'Material Design Lite', 'Skeleton', 'Bulma'],
                reset : ['Meyerweb', 'HTML5Doctor', 'Normalize']
            }
            javascript: {
                jquery: ['Default']
            }
        },
        Back: {
            node: {
                server: ['HTTP', 'Express'],
                database: ['MySql', 'MongoDB']
        }
    }

    var testObj = {
        html: '<!DOCTYPE html>\n\n<html>\n\t<head>\n\t\t<title> test title biatch{--title--} </title>\n\n\t\t<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"><link href="http://mdl.com">{--style--}\n\n\t\t<script>http://www.test.com/js.js</script>{--script--}\n\n\t</head>\n\t\n\t<body>\n\n\n\t</body>\n</html>',
        node: '//test var express=require("express"){--require--}'
    }

    var inputCount = 0;
    var roadmap = {};
    var panelToggle = true;
    var allForms = [];

    $('.tiers').hide();
    $('.preview').hide();
    $('.post-container').hide();

    $(document).on('click', '.create', function() {
        $(this).hide();
        $('.tiers').show();
        start();
    })


    function start() {

        var tier = $('<div>').attr('class', 'tier');
        var newPanel = $('<div>').attr('class', 'panel panel-primary');
        var panelHead = $('<div>').attr('class', 'panel-heading').html('Begin');
        var panelBody = $('<div>').attr('class', 'panel-body');
        var form = $('<form>').attr('class', 'project-form');
        $.each(library, function(key, value) {
            var option = $('<input>').attr('type', 'checkbox').attr('id', inputCount).attr('class', 'checkbox').attr('name', key).attr('value', key);
            var optionLabel = $('<label>').attr('class', 'option btn btn-info').attr('for', inputCount).html(key);
            panelBody.append(option).append(optionLabel);
            inputCount++;
        })
        form.append(newPanel.append(panelHead).append(panelBody));
        tier.append(form);
        $('.tiers').append(tier);


    }

    $(document).on('change', 'form', function() {

        $('.download').remove();
        var toggle = false;

        categoryArray = [];
        roadmap = {};
        $(this).parent().nextAll().remove();


        var formResults = $(this).serializeArray();
        console.log(formResults);

        var allForms = $('.project-form').serializeArray();
        for (var i = 0; i < allForms.length; i++) {
            roadmap[allForms[i].value.toLowerCase().replace(/\s/g, '')] = true;
            if (categoryArray.indexOf(allForms[i].name) === -1) {
                categoryArray.push(allForms[i].name);
            }
        }

        var tier = $('<div>').attr('class', 'tier');
        var form = $('<form>').attr('class', 'project-form');

        for (var i = 0; i < categoryArray.length; i++) {
            var newPanel = $('<div>').attr('class', 'panel panel-primary');
            var panelHead = $('<div>').attr('class', 'panel-heading').html(categoryArray[i]);
            var panelBody = $('<div>').attr('class', 'panel-body');

            for (var z = 0; z < formResults.length; z++) {
                var category = formResults[z].name;
                var choice = formResults[z].value.toLowerCase().replace(/\s/g, "");;
                // console.log(category);
                // console.log(choice);

                if (category === categoryArray[i]) {
                    if (library[category][choice] != undefined) {
                        if (choice != 'front' && choice != 'back') {
                            panelBody.append('<span>' + formResults[z].value + '</span>');
                        }
                        for (var y = 0; y < library[category][choice].length; y++) {
                            toggle = true;
                            var option = $('<input>').attr('type', 'checkbox').attr('id', inputCount).attr('class', 'checkbox').attr('name', category).attr('value', library[category][choice][y]);
                            var optionLabel = $('<label>').attr('class', 'option btn btn-info').attr('for', inputCount).html(library[category][choice][y]);
                            panelBody.append(option).append(optionLabel);
                            inputCount++;
                        }
                    }
                }
            }

            if (panelBody.html() != '') {
                newPanel.append(panelHead).append(panelBody);
                form.append(newPanel);

            }
        }

        if (roadmap['html'] != undefined || roadmap['csscdn'] != undefined || roadmap['node'] != undefined || roadmap['database'] != undefined) {
            $('.post-container').show();
        }

        if (toggle === true) {
            tier.append(form);
            $('.tiers').append(tier);
        } else if (formResults.length === 0) {
            return;
        } else {
            $(this).append('<img class="download download-button" src="download.png">');
            toggle = true;
        }
        console.log(roadmap);
    })

    $(document).on('click', '.preview-button', function() {
        $('.tiers').toggle();
        $('.preview-pane').empty();
        $('.preview').toggle();

        $.post('/', roadmap).done(function(data) {
            console.log('Success');

            $.each(data, function(key, value) {
                var newPanel = $('<div>').attr('class', 'preview-box panel panel-primary');
                var panelHead = $('<div>').attr('class', 'panel-heading').html(key);
                var panelBody = $('<div>').attr('class', 'panel-body');
                var form = $('<form>').attr('class', 'preview-form');
                var editor = $('<textarea>').attr('name', key).text(value);

                panelBody.append(form.append(editor));
                newPanel.append(panelHead).append(panelBody);

                $('.preview-pane').append(newPanel);
            })
        })


    })

    $(document).on('click', '.confirm-button', function() {
        var updates = $('.preview-form').serializeArray();
        var newObj = {};
        for (var i = 0; i < updates.length; i++) {
            newObj[updates[i].name] = updates[i].value;
        };
        console.log(newObj);
    })



    $(document).on('click', '.download-button', function(event) {
        event.preventDefault();
        $.post('/', roadmap).done(function() {
            console.log('Success');
        })
    })

    //LOGINS

    $(document).on('click', '.login1', function() {
        var email = $('.email1').val();
        var pw = $('.password1').val();
        var login = [email, pw];
        $.post('/login', login).done(function() {
            console.log('Success');
        })
    })

    $(document).on('click', '.login2', function() {
        var email = $('.email2').val();
        var pw = $('.password2').val();
        var login = [email, pw];
        $.post('/login', login).done(function() {
            console.log('Success');
        })
    })



})