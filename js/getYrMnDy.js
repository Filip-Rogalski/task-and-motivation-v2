function getYrMnDy(string) {
    let year = parseInt(string.slice(0, 4)),
        month = parseInt(string.slice(5, 7), 10) - 1,
        day = parseInt(string.slice(8), 10);
    
	return [year, month, day];
}

export default getYrMnDy;