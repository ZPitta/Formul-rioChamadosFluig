$(function(){ //Altera a visibilidade dos campos
    //Altera a visibilidade do painel de upload de arquivos
    $('#simUpload').change(function(){
        $('#panelUpload').show();
    })
    $('#naoUpload').change(function(){
        $('#panelUpload').hide();
    })
    //Altera a visibilidade do painel de aprovador
    $('#simAprov').change(function(){
        $('#panelAprovador').show();
    })
    $('#naoAprov').change(function(){
        $('#panelAprovador').hide();
    });
    //Altera a visualização do campo de texto, para acompanhamento ou solução
    $('#acompanhamento').change(function(){
        $('#descricaoAcompanhamento').show();
        $('#descricaoSolucao').hide();
        $('#descricao').show();
    });
    $('#solucao').change(function(){
        $('#descricaoAcompanhamento').hide();
        $('#descricaoSolucao').show();
        $('#descricao').show();
    });
    //Altera a visulização de acorodo com o campo radio para finalização do chamado ou não
    $('#satisfeito').change(function(){
        $('#nota').show();
        $('#review').hide();
    });
    $('#naoSatisfeito').change(function(){
        $('#nota').hide();
        $('#review').show();
    });
});
function addChild(){ //Adiciona linhas na tabela pai x filho
	var row = wdkAddChild('responsaveisTable');
	
    document.querySelector("#responsavel___"+row).val = "";	
}
function validateTable(matricula){ //Verifica se já não existe duplicidade nos campos da tabela pai x filho.
    var campoMatriculas = $("#matriculas").val();
    var cont = 0;
    if(campoMatriculas == null || campoMatriculas == ""){
        $("#matriculas").val(matricula);
        return true;
    }else{
        var matriculasArray = campoMatriculas.split(",");
        for(var i = 0; i < matriculasArray.length; i++){
            if(matriculasArray[i] == matricula){
                cont++;
            }
        }
        if(cont >= 1){
            campoMatriculas = campoMatriculas + ", " + matricula;
            $("#matriculas").val(campoMatriculas);
            return false;
        }else{
            campoMatriculas = campoMatriculas + ", " + matricula;
            $("#matriculas").val(campoMatriculas);
            return true;
        }
    }
}
function removeCampoHidden(matricula){ //Remove a matricula do campo oculto abaixo da tabela para poder readicionar o usuario.
    var campoMatriculas = $("#matriculas").val();
    var cont = 0;
    var posicao = "";
    var matriculasArray = campoMatriculas.split(",");
    for(var i = 0; i < matriculasArray.length; i++){
        if(matriculasArray[i] == matricula){
            posicao = parseInt(i);
            cont++;
        }
    }
    if(cont >= 1){
        matriculasArray.splice(posicao, 1);
        campoMatriculas = matriculasArray.toString();
        $("#matriculas").val(campoMatriculas);
    }
}
function removeCampoHiddenBtn(selectedItem){ //Remove a matricula do campo hidden se o usuário apertar o botão para remover linha
    var index = selectedItem.id.split("___")[1];
    var matricula = $("#responsavelHidden___" + index).val();
    var campoMatriculas = $("#matriculas").val();
    var matriculasArray = campoMatriculas.split(",");
    var i = 0;
    while(i < matriculasArray.length){
        if(matricula == matriculasArray[i]){
            var posicao = i;
        }
        i++;
    }
    if(posicao == undefined){
        console.log("The deleted field was empty.");
    }else{
        console.log("The record, " + matriculasArray[posicao] + ", present in the field has been deleted.");
        matriculasArray.splice(parseInt(posicao), 1);
        campoMatriculas = matriculasArray.toString();
        $("#matriculas").val(campoMatriculas);
    }
    fnWdkRemoveChild(selectedItem); //Remove a linha selecionada
}
function setSelectedZoomItem(selectedItem) { //Recebe o valor do campo zoom para atribuir em um campo hidden
    try{
        var index = selectedItem.inputId.split("___");
        if (selectedItem.inputId == "responsavel___" + index[1]){
            $("#responsavelHidden___" + index[1]).val(selectedItem.colleagueId);
            var matricula = $("#responsavelHidden___" + index[1]).val();

            if(validateTable(matricula) == false){
                FLUIGC.toast({
                    title: 'Técnico já atribuido,',
                    message: 'favor selecionar um técnico diferente.',
                    type: 'warning',
                    timeout: 'slow'
                });
                removedZoomItem(selectedItem);
                $(`#responsavel___${index[1]}>option`).remove();
            }
        }
    }catch(e){
        console.error("ERROR: component 'custom' function 'setSelectedZoomItem'");
        console.error(e);
    }

    if (selectedItem.inputId == "aprovadorZoom") {
        $("#aprovadorZoomHidden").val(selectedItem["colleagueId"]);
    }
}
function removedZoomItem(removedItem) { //Ao remover um campo zoom, limpa o campo hidden
    try{
        var index = removedItem.inputId.split("___");
        if(removedItem.inputId == "responsavel___" + index[1]){
            var matricula = $("#responsavelHidden___" + index[1]).val();
            removeCampoHidden(matricula);
            $("#responsavelHidden___" + index[1]).val("");
        }
    }catch(e){
        console.error("ERROR: component 'custom' function 'removedZoomItem'");
        console.error(e);
    }

    if (removedItem.inputId == "aprovadorZoom") {
        $("#aprovadorZoomHidden").val("");
    }
}