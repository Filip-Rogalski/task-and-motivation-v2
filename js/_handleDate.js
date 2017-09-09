var myDate = new Date();
myDate.setHours(0,0,0,0);
var dayOfMonth = myDate.getDate();
myDate.setDate(dayOfMonth + 7);
var endDate = myDate;