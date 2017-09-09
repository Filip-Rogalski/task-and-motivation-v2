function getCompletionArray(tasksArray, searchArray) {
	let newArray = tasksArray.filter((item) => {
    let element = item.id;
	return !Boolean(searchArray.reduce((prev, cur) => {
		return prev + (cur == element);}, 0))});
	return newArray;
}

export default getCompletionArray;