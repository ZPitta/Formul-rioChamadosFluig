function displayFields(form,customHTML){
    form.setVisibleById('panelUpload', false);
    form.setVisibleById('panelAprovador', false);
    form.setVisibleById("descricao", false);
    form.setVisibleById("descricaoAcompanhamento", false);
    form.setVisibleById("descricaoSolucao", false);
    form.setVisibleById("nota", false);
    form.setVisibleById("review", false);
    form.setVisibleById("panelTecnico", false);
    form.setVisibleById("panelProCham", false);
    form.setVisibleById("panelReview", false);
    form.setVisibleById("aprovChd", false);

    //Exibe tarefas de acordo com a atividade
    var state = parseInt(getValue("WKNumState"));

    if(state == 27){
        form.setVisibleById('panelTecnico', true);
    }else if(state == 32){
        form.setVisibleById('panelAprovador', true);
        form.setVisibleById("aprovChd", true);
    }else if(state == 17){
        form.setVisibleById('panelTecnico', true);
        form.setVisibleById('panelProCham', true);
    }else if(state == 35){
        form.setVisibleById("panelReview", true);
    }else if(state == 15){
        form.setVisibleById('panelTecnico', true);
        form.setVisibleById('panelAprovador', true);
        form.setVisibleById("aprovChd", true);
        form.setVisibleById('panelProCham', true);
        form.setVisibleById("panelReview", true);
    }
}