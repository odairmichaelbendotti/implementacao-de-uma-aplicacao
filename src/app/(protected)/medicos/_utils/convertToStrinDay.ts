export const converToStringDay = (day: string) => {
    switch (day) {
        case '1':
            return 'Segunda'
        case '2':
            return 'Terça'
        case '3':
            return 'Quarta'
        case '4':
            return 'Quinta'
        case '5':
            return 'Sexta'
        case '6':
            return 'Sábado'
        case '0':
            return 'Domingo'
        default: return '--'
    }
}