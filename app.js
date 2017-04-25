Vue.filter('doneLabel', function(value){
	if(value == 0){
		return "Nao pago"
	}else{
		return "Pago"
	}
});

Vue.filter('statusGeneral', function(value){
	if(value === false){
		return "Nenhuma conta cadastrada";
	}

	if(!value){
		return "Nenhuma conta a pagar";
	}else{
		return "Exitem "+ value +" conta(s) a serem paga(s)";
	}
});


var app = new Vue({
	el : "#app",
	data : {
		title : "Contas a Pagar",
		menus : [ {
			id : 0,
			name : "Listar contas"
		}, {
			id : 1,
			name : "Criar contas"
		} ],
		activedView: 0,
		formType: 'insert',
		bill: {
			date_due: '',
			name: '',
			value: 0,
			done: false
		},
		names: [
		        'Aluguel',
		        'Agua',
		        'Luz',
		        'Gaz',
		        'Emprestimo',
		        'Cartão de credito',
		        'Softbank',
		        'Alimentacao',
		        'Igiene',
		        'Adicionais',
		        'Trem',
		        'Onibus',
		        'Escola'
		],
		bills : [ {
			date_due : '20/08/2017',
			name : 'Aluguel',
			value : 68.123,
			done : true
		}, {
			date_due : '21/08/2017',
			name : 'Agua',
			value : 10.111,
			done : false
		}, {
			date_due : '22/08/2017',
			name : 'Luz',
			value : 3.222,
			done : true
		}, {
			date_due : '23/08/2017',
			name : 'Gaz',
			value : 3.333,
			done : false
		}, {
			date_due : '24/08/2017',
			name : 'Cartão de credito',
			value : 90.444,
			done : false
		}, {
			date_due : '25/08/2017',
			name : 'Emprestimo',
			value : 300.555,
			done : false
		}, {
			date_due : '26/08/2017',
			name : 'Onibus',
			value : 20.785,
			done : false
		} ]
	},
	computed : {
		status : function() {
			if(this.bill.length){
				return false;
			}
			var count = 0;
			for ( var i in this.bills) {
				if (!this.bills[i].done) {
					count++;
				}
			}
			return count;
		}
	},
	methods : {
		showView : function(id) {
			this.activedView = id;
			if(id == 1){
				this.formType = 'insert';
			}
		},
		submit: function() {
			if(this.formType == 'insert'){
				this.bills.push(this.bill);
			}
			this.bill = {
					date_due: '',
					name: '',
					value: 0,
					done: false
			};
			this.activedView = 0;
		},
		loadBill: function(bill) {
			this.bill = bill;
			this.activedView = 1;
			this.formType = 'update';
		},
		deleteBill: function(bill){
			if(confirm('Deseja excluir esta conta?')){
				this.bills.$remove(bill);
			}
		}
	}
});