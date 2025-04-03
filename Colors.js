function hex2rgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
}
class Colors {
    constructor(hex1Name, hex2Name) {
        this.colorDuo = []
        this.colorDuo[0] = hex2rgb(hex1Name)
        this.colorDuo[1] = hex2rgb(hex2Name)
    }

    
}