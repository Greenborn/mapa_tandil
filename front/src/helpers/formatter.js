
export function fechaStringToDate( fecha, separador, formato = "DD-MM-YYYY" ){
  let arr_fecha = fecha.split(separador)
  if (formato == "YYYY-MM-DD")
    fecha = new Date(arr_fecha[0], arr_fecha[1] - 1, arr_fecha[2])
  else
    fecha = new Date(arr_fecha[2], arr_fecha[1] - 1, arr_fecha[0])
  return fecha
}

export function defineCantDigitosInt( numero, cant){
  numero = String(numero)
  let ceros = ''
  for(let c=0; c < (cant - numero.length); c++){
    ceros += '0'
  }
  return ceros+numero
}

export function formatMoney(value, decimals=2) {
  let val = (value/1).toFixed(decimals).replace('.', ',')
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

export function fechaDateToString( fecha, separador, formato='dd-mm-YYYY H:M' ){
  if (fecha == null){
    return null
  }
  
  formato = formato.replace('dd', defineCantDigitosInt(fecha.getDate(),2))
  formato = formato.replace('mm', defineCantDigitosInt(fecha.getMonth() + 1, 2))
  formato = formato.replace('YYYY', fecha.getFullYear())
  formato = formato.replaceAll('-', separador)
  formato = formato.replace('H', defineCantDigitosInt(fecha.getHours(), 2))
  formato = formato.replace('M', defineCantDigitosInt(fecha.getMinutes(), 2))
  return formato
}