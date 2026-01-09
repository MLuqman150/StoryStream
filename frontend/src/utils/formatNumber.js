
export function formatCount(number){
    if (number < 1000){
        return number
    }

    if (number < 1000000){
        let value = number / 1000
        return value.toFixed(2) + "k"
    }

    if (number < 1000000000){
        let value = number / 1000000
        return value.toFixed(2) + "M"
    }

    let value = number / 1000000000
    return value.toFixed(2) + "B"

}
