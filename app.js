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

var appComponent = Vue.extend({
	template: `
	<h1>{{ title }}</h1>
	<h2 :class="{'gray': status === false, 'green': status === 0, 'red': status > 0}">{{
		status | statusGeneral}}</h2>
	<nav>
		<ul>
			<li v-for="o in menus"><a href="#"
				@click.prevent="showView(o.id)">{{ o.name }}</a></li>
		</ul>
	</nav>
	<div v-if="activedView == 0">
			<table border="1" cellpadding="10">
				<thead>
					<tr>
						<th>#</th>
						<th>Vencimento</th>
						<th>Nome</th>
						<th>Valor</th>
						<th>Status</th>
						<th>Ação</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(index,o) in bills">
						<td>{{ index+1 }}</td>
						<td>{{ o.date_due }}</td>
						<td>{{ o.name }}</td>
						<td>{{ o.value | currency '¥ ' 3}}</td>
						<td class="background"
							:class="{'pago': o.done, 'nao-pago': !o.done}">{{ o.done |
							doneLabel }}</td>
						<td><a href="#" @click.prevent="loadBill(o)">Editar</a> | <a
							href="#" @click.prevent="deleteBill(o)">Destroy</a></td>
					</tr>
				</tbody>
			</table>
		</div>
		<div v-if="activedView == 1">
			<form name="form" @submit.prevent="submit">
				<label>Vencimento:</label> <input type="text" v-model="bill.date_due" /><br />
				<br /> <label>Nome:</label> <select v-model="bill.name">
					<option v-for="o in names" :value="o">{{o}}</option>
				</select><br />
				<br /> <label>Valor:</label> <input type="text" v-model="bill.value" /><br />
				<br /> <label>Status Pago?:</label> <input type="checkbox"
					v-model="bill.done" /><br />
				<br /> <input type="submit" value="Enviar" />
			</form>
	</div>
	`,
	data : function(){
		return {
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
		};
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

Vue.component('app-component', appComponent);

var app = new Vue({
	el : "#app"
});