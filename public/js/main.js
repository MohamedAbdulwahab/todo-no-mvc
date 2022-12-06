const deleteBtn = document.querySelectorAll('.fa-trash');
const item = document.querySelectorAll('.item span.uncomplete');
const itemCompleted = document.querySelectorAll('.item span.completed');

Array.from(deleteBtn).forEach((element) => {
	element.addEventListener('click', deleteItem);
});

Array.from(item).forEach((element) => {
	element.addEventListener('click', markComplete);
});

Array.from(itemCompleted).forEach((element) => {
	element.addEventListener('click', markUnComplete);
});

async function deleteItem() {
	const itemText = this.parentNode.childNodes[1].innerText;
	try {
		const response = await fetch('deleteItem', {
			method: 'delete',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				'itemFromJS': itemText
			})
		});
		const itemDeleted = await response.json();
		console.log(itemDeleted);
		location.reload();

	} catch(error) {
		console.log(error);
	}
}

async function markComplete() {
	const itemText = this.parentNode.childNodes[1].innerText;
	try {
		const response = await fetch('/markComplete', {
			method: 'put',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				'itemFromJS': itemText
			})
		});
		const markedComplete = await response.json();
		console.log('Marked Complete from client /markComplete');
		location.reload();

	} catch(error) {
		console.log(error);
	}
}

async function markUnComplete() {
	const itemText = this.parentNode.childNodes[1].innerText;
	try {
		const response = await fetch('/markUncomplete', {
			method: 'put',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				'itemFromJS': itemText
			})
		});
		const markedunComplete = await response.json();
		console.log('Marked Uncomplete from client /markUncomplete');
		location.reload();
		
	} catch(error) {
		console.log(error);
	}
}