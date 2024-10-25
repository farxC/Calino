export const cepMask = (value:string | undefined) => {
    if (!value) return ""
    return value.replace(/\D/g, "")
    .replace(/^(\d{5})(\d{3})+?$/, "$1-$2")
    .replace(/(-\d{3})(\d+?)/, '$1') 
}