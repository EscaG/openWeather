let divApp = document.getElementById("app");
let divLocality = document.getElementById("locality");
// Ссылка на сервер
let apiKey = "d270f9520da26642075ff0d0c70ad4dc";
let url = "";
let ajaxBody;



function getCity(city) {
	url = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=metric&lang=ru&appid=" + apiKey;
	//Сам запрос
	fetch(url)
		.then(response => {
			let json = response.json();
			if (response.status >= 200 && response.status < 300) {
				return json;
			} else {
				return json.then(Promise.reject.bind(Promise));
			}
		})
		// fetch(url)
		// 	.then(response => response.json())
		.then(json => /* TODO вывод информации */ buildResponse(json))
		.catch((ex) => { // обрабатываем возможную ошибку
			console.log("Error: " + ex.message);
			console.log("Response: " + ex.response);
			// controller.abort();
			if (ex.response == undefined) {
				alert("Впервые вижу такой населенный пункт!!!")
			}
		});


}
getCity("Николаев");

function getCityInput() {
	let city = document.getElementById("inpCity").value;
	url = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=metric&lang=ru&appid=" + apiKey;
	//Сам запрос
	fetch(url)
		.then(response => {
			let json = response.json();
			if (response.status >= 200 && response.status < 300) {
				return json;
			} else {
				return json.then(Promise.reject.bind(Promise));
			}
		})
		.then(json => /* TODO вывод информации */ buildResponse(json))
		.catch((ex) => { // обрабатываем возможную ошибку
			console.log("Error: " + ex.message);
			console.log("Response: " + ex.response);
			if (ex.response == undefined) {
				alert("Впервые вижу такой населенный пункт!!!")
			}
		});
}


function buildResponse(json) {

	console.log("Start build");
	console.log(json);
	let today = document.getElementById("nav-today");
	let tomorrow = document.getElementById("nav-tomorrow");
	let afterTomorrow = document.getElementById("nav-aftertomorrow");
	let andMore = document.getElementById("nav-andMore");

	// ! Контейнеры
	let flex1 = document.getElementById("container_flex1");
	let flex2 = document.getElementById("container_flex2");
	let flex3 = document.getElementById("container_flex3");
	let flex4 = document.getElementById("container_flex4");
	// !Строка для строки с температурой xD
	let onlyStringTemp1 = document.getElementById("onlyStringTemp1");
	let onlyStringTemp2 = document.getElementById("onlyStringTemp2");
	let onlyStringTemp3 = document.getElementById("onlyStringTemp3");
	let onlyStringTemp4 = document.getElementById("onlyStringTemp4");
	// !Строка с температурой
	let temp1 = document.getElementById("temp1");
	let temp2 = document.getElementById("temp2");
	let temp3 = document.getElementById("temp3");
	let temp4 = document.getElementById("temp4");
	// ! Строка для строки с направлением ветра
	let onlyStringWind1 = document.getElementById("onlyStringWind1");
	let onlyStringWind2 = document.getElementById("onlyStringWind2");
	let onlyStringWind3 = document.getElementById("onlyStringWind3");
	let onlyStringWind4 = document.getElementById("onlyStringWind4");
	// ! Строка с направлением ветра
	let wind1 = document.getElementById("wind1");
	let wind2 = document.getElementById("wind2");
	let wind3 = document.getElementById("wind3");
	let wind4 = document.getElementById("wind4");


	let blocks = [flex1, flex2, flex3, flex4, wind1, wind2, wind3, wind4, temp1, temp2, temp3, temp4, onlyStringTemp1, onlyStringTemp2, onlyStringTemp3, onlyStringTemp4, onlyStringWind1, onlyStringWind2, onlyStringWind3, onlyStringWind4];
	for (const b of blocks) {
		b.innerHTML = "";
	}

	let count = 0;
	for (let i = 0; i < json.list.length; i++) {

		let ul = document.createElement("ul");
		let li = document.createElement("li");
		let li1 = document.createElement("li");
		let li2 = document.createElement("li");
		// let li3 = document.createElement("li");
		let li4 = document.createElement("li");
		let li5 = document.createElement("li");
		let li6 = document.createElement("li");
		let li7 = document.createElement("li");
		let li8 = document.createElement("li");

		// li.innerText = json.list[i].dt_txt;
		li.innerText = (json.list[i].dt_txt).split(" ")[0];
		let sup = document.createElement("sup");
		let spanTime = document.createElement("span");
		spanTime.innerText = (json.list[i].dt_txt).split(" ")[1].split(":")[0];
		sup.innerText = " " + (json.list[i].dt_txt).split(" ")[1].split(":")[1];

		li1.appendChild(spanTime);
		li1.appendChild(sup);
		let img = document.createElement("img");
		img.src = "http://openweathermap.org/img/w/" + json.list[i].weather[0].icon + ".png";
		img.title = json.list[i].weather[0].description;
		li2.appendChild(img);
		// li3.innerText = "";
		li4.innerText = "Ощущается как: ";
		li5.innerText = "+" + Math.floor(json.list[i].main.feels_like * 10) / 10;
		li6.innerText = "Давление: ";
		li7.innerText = json.list[i].main.pressure + " мм рт. ст.";
		li8.innerText = "Влажность: " + json.list[i].main.humidity + "%";

		ul.appendChild(li);
		ul.appendChild(li1);
		ul.appendChild(li2);
		// ul.appendChild(li3);
		ul.appendChild(li4);
		ul.appendChild(li5);
		ul.appendChild(li6);
		ul.appendChild(li7);
		ul.appendChild(li8);

		let pTemperaturaOnly1 = document.createElement("p");
		let pWind = document.createElement("p");
		let span = document.createElement("span");
		let spanTemperaruraOnly1 = document.createElement("span");
		spanTemperaruraOnly1.classList.add("spanTemperaruraOnly1");
		if (count < 8) {
			spanTemperaruraOnly1.innerText = "+" + Math.floor(json.list[i].main.temp * 10) / 10;
			pTemperaturaOnly1.appendChild(spanTemperaruraOnly1);
			span.innerText = (json.list[i].wind.speed).toFixed(0) + " - " + windDeg(json.list[i].wind.deg);
			pWind.appendChild(span);
			flex1.appendChild(ul);
			temp1.appendChild(pTemperaturaOnly1);
			wind1.appendChild(pWind);
		} else if (count >= 8 && count < 16) {
			spanTemperaruraOnly1.innerText = "+" + Math.floor(json.list[i].main.temp * 10) / 10;
			pTemperaturaOnly1.appendChild(spanTemperaruraOnly1);
			span.innerText = (json.list[i].wind.speed).toFixed(0) + " - " + windDeg(json.list[i].wind.deg);
			pWind.appendChild(span);
			flex2.appendChild(ul);
			temp2.appendChild(pTemperaturaOnly1);
			wind2.appendChild(pWind);
		} else if (count >= 16 && count < 24) {
			spanTemperaruraOnly1.innerText = "+" + Math.floor(json.list[i].main.temp * 10) / 10;
			pTemperaturaOnly1.appendChild(spanTemperaruraOnly1);
			span.innerText = (json.list[i].wind.speed).toFixed(0) + " - " + windDeg(json.list[i].wind.deg);
			pWind.appendChild(span);
			flex3.appendChild(ul);
			temp3.appendChild(pTemperaturaOnly1);
			wind3.appendChild(pWind);
		} else if (count >= 24 && count < 32) {
			spanTemperaruraOnly1.innerText = "+" + Math.floor(json.list[i].main.temp * 10) / 10;
			pTemperaturaOnly1.appendChild(spanTemperaruraOnly1);
			span.innerText = (json.list[i].wind.speed).toFixed(0) + " - " + windDeg(json.list[i].wind.deg);
			pWind.appendChild(span);
			flex4.appendChild(ul);
			temp4.appendChild(pTemperaturaOnly1);
			wind4.appendChild(pWind);
		}

		count++;
	}

	// !-----------------Первый ТАБ-----------------
	let tempetaruraLine1 = document.createElement("p");
	let pSpeed = document.createElement("p");

	tempetaruraLine1.innerText = "Температура, C" + String.fromCharCode(176);
	tempetaruraLine1.classList.add("temperaturaP");
	pSpeed.classList.add("winterSpeedP");
	pSpeed.innerText = "Скорость и направление ветра, м/с";
	today.appendChild(flex1);
	// today.appendChild(tempetaruraLine1);
	onlyStringTemp1.appendChild(tempetaruraLine1);
	today.appendChild(onlyStringTemp1);
	today.appendChild(temp1);
	onlyStringWind1.appendChild(pSpeed);
	// today.appendChild(pSpeed);
	today.appendChild(onlyStringWind1);
	today.appendChild(wind1);

	// !-----------------Второй ТАБ-----------------
	let tempetaruraLine2 = document.createElement("p");
	let pSpeed2 = document.createElement("p");

	tempetaruraLine2.innerText = "Температура, C" + String.fromCharCode(176);
	tempetaruraLine2.classList.add("temperaturaP");
	pSpeed2.classList.add("winterSpeedP");
	pSpeed2.innerText = "Скорость и направление ветра, м/с";

	tomorrow.appendChild(flex2);
	onlyStringTemp2.appendChild(tempetaruraLine2);
	tomorrow.appendChild(onlyStringTemp2);
	tomorrow.appendChild(temp2);
	onlyStringWind2.appendChild(pSpeed2);
	tomorrow.appendChild(onlyStringWind2);
	tomorrow.appendChild(wind2);

	// !-----------------Третий ТАБ-----------------
	let tempetaruraLine3 = document.createElement("p");
	let pSpeed3 = document.createElement("p");

	tempetaruraLine3.innerText = "Температура, C" + String.fromCharCode(176);
	tempetaruraLine3.classList.add("temperaturaP");
	pSpeed3.classList.add("winterSpeedP");
	pSpeed3.innerText = "Скорость и направление ветра, м/с";

	afterTomorrow.appendChild(flex3);
	onlyStringTemp3.appendChild(tempetaruraLine3);
	afterTomorrow.appendChild(onlyStringTemp3);
	afterTomorrow.appendChild(temp3);
	onlyStringWind3.appendChild(pSpeed3);
	afterTomorrow.appendChild(onlyStringWind3);
	afterTomorrow.appendChild(wind3);

	// !-----------------Четвертый ТАБ-----------------
	let tempetaruraLine4 = document.createElement("p");
	let pSpeed4 = document.createElement("p");

	tempetaruraLine4.innerText = "Температура, C" + String.fromCharCode(176);
	tempetaruraLine4.classList.add("temperaturaP");
	pSpeed4.classList.add("winterSpeedP");
	pSpeed4.innerText = "Скорость и направление ветра, м/с";

	andMore.appendChild(flex4);
	onlyStringTemp4.appendChild(tempetaruraLine4);
	andMore.appendChild(onlyStringTemp4);
	andMore.appendChild(temp4);
	onlyStringWind4.appendChild(pSpeed4);
	andMore.appendChild(onlyStringWind4);
	andMore.appendChild(wind4);
}


function windDeg(deg) {
	if (deg > 11.25 && deg < 78.75) {
		deg = " ЮЗ";
	}
	if (deg > 78.75 && deg < 101.25) {
		deg = " З";
	}
	if (deg > 101.25 && deg < 168.75) {
		deg = " СЗ";
	}
	if (deg > 168.75 && deg < 191.25) {
		deg = " С";
	}
	if (deg > 191.25 && deg < 258.75) {
		deg = " СВ";
	}
	if (deg > 258.75 && deg < 281.25) {
		deg = " В";
	}
	if (deg > 281.25 && deg < 348.75) {
		deg = " ЮВ";
	}
	if (deg > 348.78 && deg < 360 || deg > 0 && deg < 11.25) {
		deg = " Ю";
	}

	return deg;
}




function loadCity() {
	let select = document.querySelector("select");
	// getCity(select);
	// Подготовка данных для отправки на сервер, с помощью объекта
	let objQuery = {
		apiKey: "f5bf7ccf7d80614557218cf7043569b8",
		modelName: "Address",
		calledMethod: "getCities",
		methodProperties: {
			AreaRef: select.value // удобнее чем строка, если есть необходимость динамики
		}
	}

	let url = "https://api.novaposhta.ua/v2.0/json/";
	fetch(url,
		{
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			// mode: 'cors', // no-cors, *cors, same-origin
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'same-origin', // include, *same-origin, omit
			headers: {
				'Content-Type': 'application/json'
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			redirect: 'follow', // manual, *follow, error
			referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
			body: JSON.stringify(objQuery) // body data type must match "Content-Type" header
		}
	)
		.then(response => response.json())
		.then(json => /* TODO вывод информации */ buildResponseCity(json))
		.catch((ex) => { // обрабатываем возможную ошибку
			console.log("Error: " + ex.message);
			console.log("Response: " + ex.response);
		});

	function buildResponseCity(json) {
		console.log(json.data);
		divLocality.innerHTML = "";
		let select = document.createElement("select");
		select.id = "localCity";
		for (let i = 0; i < json.data.length; i++) {
			let option = document.createElement("option");
			option.value = json.data[i].Ref;
			option.innerText = json.data[i].DescriptionRu;
			select.appendChild(option);
		}
		select.onchange = function () {
			let inf = select.options.selectedIndex;
			// console.log(select.options[inf].text);
			getCity(select.options[inf].text)
		}

		divApp.appendChild(select);
	}

}






function loadAreas() {
	// Поготовленная JSON строка по правилам новой почты
	let strQuery = '{\n' +
		'"apiKey": "f5bf7ccf7d80614557218cf7043569b8",\n' +
		'"modelName": "Address",\n' +
		'"calledMethod": "getAreas",\n' +
		'"methodProperties": {}\n' +
		'}';

	// Объект, в котором собраны поля, по правилам новой почты
	let objQuery = {
		apiKey: "f5bf7ccf7d80614557218cf7043569b8",
		modelName: "Address",
		calledMethod: "getAreas",
		methodProperties: {}
	};

	let url = "https://api.novaposhta.ua/v2.0/json/";
	fetch(url,
		{
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			// mode: 'cors', // no-cors, *cors, same-origin
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'same-origin', // include, *same-origin, omit
			headers: {
				'Content-Type': 'application/json'
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			redirect: 'follow', // manual, *follow, error
			referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
			body: strQuery // body data type must match "Content-Type" header
		}
	)
		.then(response => response.json())
		.then(json => /* TODO вывод информации */ buildResponseAreas(json))
		.catch((ex) => { // обрабатываем возможную ошибку
			console.log("Error: " + ex.message);
			console.log("Response: " + ex.response);
		});

	function buildResponseAreas(json) {
		console.log(json.data);
		let select = document.createElement("select");
		for (let i = 0; i < json.data.length; i++) {
			let option = document.createElement("option");
			option.value = json.data[i].Ref;
			option.innerText = json.data[i].DescriptionRu;
			select.appendChild(option);
		}

		select.onchange = function () {
			loadCity();
		}

		divApp.appendChild(select);
	}


}
loadAreas()



