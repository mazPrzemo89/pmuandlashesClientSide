exports.bookingValidationPrototype = (duration, data, callback , date, role) => {


    
    let currentTime = new Date()
    let currentTimeString = currentTime.toString().substr(16, 5)
    let currentTimeCompare = currentTime.toString().substr(0, 15)
    let bookedTimeCompare = date.toString().substr(0, 15)

    if(data.error) {
        return data.error
    } else {
        let bookingsChecked = []
        bookingsChecked = data.bookings
    

        if(role === 0 ){
            for(let i=2; i < bookingsChecked.length - 2; i++) {
        
                if(bookingsChecked[i][0].isNotBooked === true && bookingsChecked[i][0].time !== ""){
                    bookingsChecked[i][0].display = 'flex'
                    bookingsChecked[i][0].color = 'black'
                    let isClear = true;
                    for(let j=0;j<duration;j++){
                        if(i+j>=bookingsChecked.length){
                            break
                        }
                        if(bookingsChecked[i+j][0].isNotBooked === false){
                            isClear = false
                        }
                    }
                    if(isClear=== false){
                        bookingsChecked[i][0].display = 'none'
                        bookingsChecked[i][0].color = 'black'
                        isClear = true
                    }
    
                }
            
            }

            for(let i=2; i < bookingsChecked.length - 2; i++) {
         
                if(bookingsChecked[i][0].isNotBooked === false){
                    for(let j=0;j<bookingsChecked[i][0].duration;j++){
                        bookingsChecked[i+j][0].display = 'none'
                        bookingsChecked[i][0].color = 'black'
                    }
                }
            
            }

            for(let i=2; i < bookingsChecked.length - 2; i++) {
         
                if(bookingsChecked[i][0].isNotBooked === false){
                   
                        bookingsChecked[i][0].display = 'none'
                        bookingsChecked[i][0].color = 'black'
                }
            
            }

            for(let i=2; i < bookingsChecked.length - 2; i++) {
           
                if(i+duration>=bookingsChecked.length){
                    break
                }
    
                if(bookingsChecked[i][0].display === "flex" && bookingsChecked[i+duration][0].time === '--') {
                    bookingsChecked[i][0].display = 'none'
                    bookingsChecked[i][0].color = 'black'
                }
            
            }
    
            for(let i=2; i < bookingsChecked.length - 2; i++) {
             
                if(bookingsChecked[i][0].isNotBooked === false){
                        bookingsChecked[i][0].display = 'none'   
                        bookingsChecked[i][0].color = 'black'
                }
     
            }
    
            for(let i=duration+2;i>0;i--){
                 bookingsChecked[bookingsChecked.length-i][0].display = 'none'
            }
    
            if (currentTimeCompare === bookedTimeCompare) {
                for(let i=2; i < bookingsChecked.length - 2; i++) {
                    if(bookingsChecked[i][0].time < currentTimeString){
                        bookingsChecked[i][0].display = 'none'
                        bookingsChecked[i][0].color = 'black'
                    }
                }
            }
        }

        if(role === 1 ){

            for(let i=2; i < bookingsChecked.length - 2; i++) {
         
                if(bookingsChecked[i][0].isNotBooked === false){
                    for(let j=0;j<bookingsChecked[i][0].duration;j++){
                        bookingsChecked[i+j][0].color = 'red'
                        bookingsChecked[i][0].color = 'red'
                    }
                }  
                
                if(bookingsChecked[i][0].time !== ""){
                    bookingsChecked[i][0].display = 'flex'
                }

                if(bookingsChecked[i][0].break === true) {
                    bookingsChecked[i][0].color = 'green'
                }
               

            }
       
        }
    

        let isAllBooked = true
        for(let i=2; i < bookingsChecked.length - 2; i++) {
            if(bookingsChecked[i][0].display !== 'none'){
                isAllBooked = false
            }
        }

   

        callback(bookingsChecked)

        return {
            bookings: bookingsChecked,
            isBooked: isAllBooked
            }
    } 
}


exports.dbDateHandler = (m) => {
    let monthString='';
    switch (m) {
        case 1:
            monthString = "Jan";
          break;
        case 2:
            monthString = "Feb";
          break;
        case 3:
            monthString = "Mar";
          break;
        case 4:
            monthString = "Apr";
          break;
        case 5:
            monthString = "May";
          break;
        case 6:
            monthString = "Jun";
          break;
        case 7:
            monthString = "Jul";
          break;
        case 8:
            monthString = "Aug";
          break;
        case 9:
            monthString = "Sep";
          break;
        case 10:
            monthString = "Oct";
          break;
        case 11:
            monthString = "Nov";
          break;
        case 12:
            monthString = "Dec";
          break;
        default:
            monthString = 'Month'
      }
    return monthString
}

exports.updateMonth = (month, year, setDbMonthFunction, assignClassFunction, setCalDataFunctiuon,setErrorFunction) => {
    setDbMonthFunction({
        name: `${month<10 ? `0${month}` : month}_${year}`,
        month: `${month<10 ? `0${month}` : month}`,
        year: year
    })
    .then((data)=>{
        if(data.error){
            setErrorFunction(data.error)
        } else {
            let calendarMonth;
            calendarMonth = data.days.map((e)=>{
                return {
                    day: e[0].dayOfWeek,
                    value: e[0].value,
                    date: e[0].date,
                    disabled: e[0].disabled,
                    holiday: e[0].holiday
                    }
            })
            assignClassFunction(calendarMonth)
            setCalDataFunctiuon(calendarMonth)
        }
    })
    .catch()
}