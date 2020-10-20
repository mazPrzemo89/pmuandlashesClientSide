function hours(startTime, endTime) {
    const interval = 20

    let startHours = startTime.split(':')[0]

    let endHours = endTime.split(':')[0]

    let times = []

    let intervalsPerHour = 60 / interval;

    for (let i = 0; i < endHours - startHours; i++) {

        for (let j = 0; j < intervalsPerHour; j++) {

            times.push({
                "time": `${(parseInt(startHours) + i) < 10 ? '0' + (parseInt(startHours) + i) : (parseInt(startHours) + i)}:${j === 0 ? '00' : (interval * j < 10 ? '0' + (interval * j) : interval * j)
                    }`,
                "type": "",
                "isNotBooked": true,
                "break": false,
            })
        }

        if (interval < 60) {

            if (intervalsPerHour === 0) {
                intervalsPerHour = 60 / interval
            }
        };
    }
    times.push({
        "time": endTime,
        "type": "",
        "isNotBooked": true,
        "break": false,
    })
    return times
}

module.exports.hours = hours