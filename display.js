$(document).ready(function() {

    var library = {
        start: ['Front', 'Back'],
        front: ['HTML', 'CSS CDN'],
        back: ['Node', 'Database'],
        html: ['CSS', 'JavaScript', 'Vanilla'],
        csscdn: ['Bootstrap', 'Material Design Lite', 'Skeleton', 'Bulma'],
        css: ['Reset'],
        javascript: ['jQuery', 'Empty'],
        node: ['HTTP', 'Express'],
        database: ['MySql', 'MongoDB']
    }

    var inputCount = 0;
    var roadmap = {};
    var panelToggle = true;

    $('.tiers').hide();
    $('.post-container').hide();

    $(document).on('click', '.create', function() {
        $(this).hide();
        $('.tiers').show();
        start();
    })

    /*var panel = $('<div>').attr('class', 'panel panel-primary');
    var panelHead = $('<div>').attr('class', 'panel-heading');
    var panelBody = $('<div>').attr('class', 'panel-body');*/

    function start() {
        var newPanel = $('<div>').attr('class', 'tier panel panel-primary');
        var panelHead = $('<div>').attr('class', 'panel-heading').html('Begin');
        var panelBody = $('<div>').attr('class', 'panel-body');
        var nextButton = $('<button>').attr('class', 'next btn btn-default').html('Next');
        var form = $('<form>');
        for (var i = 0; i < library.start.length; i++) {
            var option = $('<input>').attr('type', 'checkbox').attr('id', inputCount).attr('class', 'checkbox').attr('name', i).attr('value', library.start[i]);
            var optionLabel = $('<label>').attr('class', 'option btn btn-info').attr('for', inputCount).html(library.start[i]);
            form.append(option).append(optionLabel);
            inputCount++;
        }
        form.append(nextButton);
        panelBody.append(form);
        newPanel.append(panelHead).append(panelBody);
        $('.tiers').append(newPanel);

    }

    $(document).on('click', '.next', function(event) {
        event.preventDefault();
        var toggle = false;

        $('.next').attr("disabled","disabled");
        var formResults = $(this).parent().serializeArray();

        console.log(formResults);

        var newPanel = $('<div>').attr('class', 'tier panel panel-primary');
        var panelHead = $('<div>').attr('class', 'panel-heading').html('Options');
        var panelBody = $('<div>').attr('class', 'panel-body');
        var nextButton = $('<button>').attr('class', 'next btn btn-default').html('Next');
        var form = $('<form>');

        for (var i = 0; i < formResults.length; i++) {
            var result = formResults[i].value.toLowerCase();
            result = result.replace(/\s/g, '');

            if (result != 'front' && result != 'back') {
                roadmap[result] = true;
            }

            if (library[result] != undefined) {
                form.append('<span>' + formResults[i].value + '</span>')
                for (var z = 0; z < library[result].length; z++) {
                    toggle = true;
                    var option = $('<input>').attr('type', 'checkbox').attr('id', inputCount).attr('class', 'checkbox').attr('name', inputCount).attr('value', library[result][z]);
                    var optionLabel = $('<label>').attr('class', 'option btn btn-info').attr('for', inputCount).html(library[result][z]);
                    form.append(option).append(optionLabel);
                    inputCount++;
                }
            }
        }
        if (roadmap['html'] != undefined || roadmap['csscdn'] != undefined || roadmap['node'] != undefined || roadmap['database'] != undefined) {
            $('.post-container').show();
        }
        console.log(roadmap);

        if (toggle === true) {
            form.append(nextButton);
            panelBody.append(form);
            newPanel.append(panelHead).append(panelBody);
            $('.tiers').append(newPanel);
        } else {
            $(this).parent().append('<img class="download submit" src="download.png">');
        }
    })

    $(document).on('click', '.submit', function() {
        $.post('/', roadmap).done(function() {
            console.log('Success');
        })
    })





})