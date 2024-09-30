const date = new Date()

const MOA_format =(customerNumber)=>{

    const start = "M"+(customerNumber.toString()).padStart(3,'0');

    //months are indexed they start from 1
    const month = (date.getMonth()+1).toString().padStart(2,'0')
    const day = String((date.getDate())).padStart(2,'0')
    const middle = day+month
    
    
    //
    const end = (date.getFullYear()+"A").substring(2, 5)
    
    const invoiceIndex = start+"-"+middle+"-"+end
    
    console.log(invoiceIndex)
}

module.exports = {MOA_format}



