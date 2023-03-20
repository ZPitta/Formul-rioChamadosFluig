function resolve(process,colleague){

	var userList = new java.util.ArrayList();

	var cpmatriculas = hAPI.getCardValue("matriculas").split(",");
	var matriculas = [];

	for(var i = 0; i < cpmatriculas.length; i++){
		matriculas.push(cpmatriculas[i]);
	}

	userList.add(matriculas);
/* 
	userList.add('matricula_1');
	userList.add('matricula_2');
	userList.add('matricula_3');
 */
	return userList;

}