function getYearMonthLengths(year){

    /* Works untill 2100 */

    let additionalDay = Number(!(year % 4));
        
    return [31, 28 + additionalDay, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]    

}

export default getYearMonthLengths;