// localStorage.removeItem('activity')
let newList = document.getElementById('newList');
let modal = document.querySelector('.modal');
let modalBody = document.querySelector('.modal-body');
let close = document.querySelector('#close');

let bulan = document.querySelector('#bulan');

let time = document.querySelector('.time');
var date = new Date();
time.innerHTML = "<label class='fa fa-calendar' style='color:#383737'></label> "+date.toDateString();

// form
let nameActivity = document.getElementById('nameActivity');
let color = document.getElementById('color');
let tgl = document.getElementById('tgl');
let addList = document.getElementById('addList');


// card
let container = document.querySelector('.container');






let a = JSON.parse(localStorage.getItem('activity')) || [];

showCard()


newList.addEventListener('click', () => {
	modal.style.display = 'flex';

	setTimeout(()=>{
		modalBody.style.transition = '0.5s';
		modalBody.style.transform = 'translate(0%,10vh)';
	},100);
});


close.addEventListener('click', () => {
	modalBody.style.transition = '0.5s';
	modalBody.style.transform = 'translate(110vw,10vh)';
	modalBody.style.transition = '0.5s';
	setTimeout(() => {
		modal.style.display = 'none'
	},450);
}); 

addList.addEventListener('click', () => {
	let b = { 'name': nameActivity.value, 'date': tgl.value, 'color': color.value, 'activity': [] };


	
	if (!a.some((data) => data.name === b.name && data.tanggal === b.tanggal)) {
		a.push(b);
		localStorage.setItem('activity',JSON.stringify(a));

		showCard();
	} 
}); 

function showCard() {
	container.innerHTML = '';
	if (a.length >= 0) { 
		a.forEach((data,i) =>{ 

			let card = document.createElement("div");
			card.setAttribute('class','card');
			card.style.backgroundColor = data.color;


				/* head card */
			let heading = document.createElement("h4");

			let activityName = document.createElement("div");
			activityName.setAttribute('class','activityName');
			activityName.innerHTML = '';
			activityName.textContent = data.name;

			let removeCard = document.createElement("i");
			removeCard.setAttribute('class','fa fa-trash');
			removeCard.setAttribute('id','removeCard');
			activityName.appendChild(removeCard);

			let tanggal = document.createElement("span");
			tanggal.setAttribute('class','tgl');
			tanggal.textContent = data.date;

			heading.appendChild(activityName);
			heading.appendChild(tanggal);



			removeCard.addEventListener('click',()=>{
				card.style.transition = '0.5s';
				card.style.transform = 'translateX(110vw)';

				setTimeout(()=>{
					container.removeChild(card);
					a.splice(a[i].name.indexOf(activityName.textContent),1)
					localStorage.setItem('activity',JSON.stringify(a));
				},100);
			});


				/* list activity */
			let listActivity = document.createElement("div");
			listActivity.setAttribute('class','listActivity');

			data.activity.forEach((data2) =>{
				let activity = document.createElement("span");
				activity.setAttribute('class','activity');
				activity.textContent = data2;



				let btn = document.createElement("i");
				btn.setAttribute('class','fa fa-trash');
				btn.setAttribute('id','trash');

				activity.appendChild(btn);
				listActivity.appendChild(activity);
				btn.addEventListener('click',()=>{
					activity.classList.add('done');
					btn.style.cursor = 'unset';
					activity.style.transition = '0.5s';
					activity.style.opacity = '0.5';

					activity.style.transition = '0.3s';
					activity.style.opacity = '0.3';

					activity.style.opacity = '0';
					a[i].activity.splice(a[i].activity.indexOf(activity.textContent),1);

					setTimeout(()=>{
						listActivity.removeChild(activity);
						localStorage.setItem('activity',JSON.stringify(a));
					},200);
				})
			})


				/* footer card */
			let cardFooter = document.createElement("div");
			cardFooter.setAttribute('class','card-footer');


			let addActivity = document.createElement("div");
			addActivity.setAttribute('class','fa fa-plus');
			addActivity.setAttribute('id','addActivity');

			addActivity.addEventListener('click',()=>{
				let inputActivity = document.createElement('input');
				inputActivity.setAttribute('class','inputActivity');
				inputActivity.setAttribute('type','text');
				inputActivity.setAttribute('placeholder','new activity');
				if (document.querySelector('.inputActivity') == null) {
					listActivity.appendChild(inputActivity);
				}
				inputActivity.addEventListener('keyup',(event)=>{
					if (event.keyCode === 13) {
						a[i].activity.push(inputActivity.value);
						localStorage.setItem('activity',JSON.stringify(a));
						let activity = document.createElement("span");
						activity.setAttribute('class','activity');
						activity.textContent = inputActivity.value;


						let btn = document.createElement("i");
						btn.setAttribute('class','fa fa-trash');
						btn.setAttribute('id','trash');



						activity.appendChild(btn);
						listActivity.appendChild(activity);

						listActivity.removeChild(inputActivity);

						btn.addEventListener('click',()=>{
							activity.classList.add('done');
							btn.style.cursor = 'unset';
							activity.style.transition = '0.5s';
							activity.style.opacity = '0.5';

							activity.style.transition = '0.3s';
							activity.style.opacity = '0.3';

							activity.style.opacity = '0';
							setTimeout(()=>{
								a[i].activity.splice(a[i].activity.indexOf(activity.textContent),1);
								listActivity.removeChild(activity);
								localStorage.setItem('activity',JSON.stringify(a));
							},200)
						})
					}
				});
			});

			cardFooter.appendChild(addActivity);
			card.appendChild(heading);
			card.appendChild(listActivity);
			card.appendChild(cardFooter);
			container.appendChild(card);
		})
} 
}


bulan.addEventListener('click',()=>{


	if (bulan.classList.contains('fa-moon')) {
		bulan.classList.add('fa-sun');
		bulan.classList.remove('fa-moon');
		document.getElementById('meta').content = 'dark';
		modalBody.style.backgroundColor = '#2b2a33';
		newList.style.color = 'white';


		newList.addEventListener('mouseover',()=>{
			newList.style.color = 'black';
			newList.style.backgroundColor = 'white';
		});
		newList.addEventListener('mouseleave',()=>{
			newList.style.backgroundColor = 'unset';
			newList.style.color = 'white';
		});

		localStorage.setItem('theme','dark');

	}else if(bulan.classList.contains('fa-sun')){
		bulan.classList.add('fa-moon');
		bulan.classList.remove('fa-sun');
		document.getElementById('meta').content = "light";

		modalBody.style.backgroundColor = 'white';
		newList.style.color = 'unset';

		newList.addEventListener('mouseover',()=>{
			newList.style.color = 'white';
			newList.style.backgroundColor = '#2b2a33';
		});
		newList.addEventListener('mouseleave',()=>{
			newList.style.color = 'unset';
			newList.style.backgroundColor = 'white';
		});

		localStorage.setItem('theme','light');
	}
// console.log(localStorage.getItem('theme'))
});



if (localStorage.getItem('theme') == 'dark') {
	bulan.classList.add('fa-sun');
	bulan.classList.remove('fa-moon');
	document.getElementById('meta').content = 'dark';
	modalBody.style.backgroundColor = '#2b2a33';
	newList.style.color = 'white';


	newList.addEventListener('mouseover',()=>{
		newList.style.color = 'black';
		newList.style.backgroundColor = 'white';
	});
	newList.addEventListener('mouseleave',()=>{
		newList.style.backgroundColor = 'unset';
		newList.style.color = 'white';
	});

}else if (localStorage.getItem('theme') == 'light') {
	bulan.classList.add('fa-moon');
	bulan.classList.remove('fa-sun');
	document.getElementById('meta').content = "light";

	modalBody.style.backgroundColor = 'white';
	newList.style.color = 'unset';

	newList.addEventListener('mouseover',()=>{
		newList.style.color = 'white';
		newList.style.backgroundColor = '#2b2a33';
	});
	newList.addEventListener('mouseleave',()=>{
		newList.style.color = 'unset';
		newList.style.backgroundColor = 'white';
	});

}










let sequence = [];
let easterEggCode = [38, 40, 39, 37, 38, 40, 39, 37]; 

window.addEventListener('keyup', (event) => {
	let kode = event.keyCode;
	sequence.push(kode);

	if (sequence.length > 8) {
		sequence.shift();
	}

	if (sequence.toString() === easterEggCode.toString()) {
		console.log('easter egg unlock');
		document.getElementById('meta').content = 'dark';
		modalBody.style.backgroundColor = '#2b2a33';
		newList.style.color = 'white';
	}
});
