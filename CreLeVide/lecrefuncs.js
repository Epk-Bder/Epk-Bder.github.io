const BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"

function rgbToLecreColor(red, green, blue) {
    let res = ""

    res += BASE64[Math.floor(red / 64)]
    res += BASE64[red % 64]
    res += BASE64[Math.floor(green / 64)]
    res += BASE64[green % 64]
    res += BASE64[Math.floor(blue / 64)]
    res += BASE64[blue % 64]

    return res
}

function toLecrePos(x, y, z) {
    let res = ""

    res += BASE64[Math.floor(x / 64)]
    res += BASE64[x % 64]
    res += BASE64[Math.floor(y / 64)]
    res += BASE64[y % 64]
    res += BASE64[Math.floor(z / 64)]
    res += BASE64[z % 64]

    return res
}

export { rgbToLecreColor, toLecrePos }
