const date = new Date()

const T_MOA =(customerNumber)=>{
    let invoiceIndex;

    const start = "M"+(customerNumber.toString()).padStart(3,'0');

    //months are indexed they start from 1
    const month = (date.getMonth()+1).toString().padStart(2,'0')
    const day = String((date.getDate())).padStart(2,'0')
    const middle = day+month
    
    //
    const end = (date.getFullYear()+"A").substring(2, 5)
    
    invoiceIndex = start+"-"+middle+"-"+end
    
    console.log(invoiceIndex)

    return invoiceIndex
}

const T_1 = (customerNumber, companyName)=>{
    companyName = companyName.toString()

    let invoiceIndex;

    const length = companyName.length

    //
    const start = companyName[0].toUppercase()+(String(customerNumber)).padStart(4,'0')

    //
    const month = (date.getMonth()+1).toString().padStart(2,'0')
    const middle = companyName[length/2].toUppercase()+month

    //
    const day = String((date.getDate())).padStart(2,'0')
    const year = String((data.getFullYear())).substring(2,4)

    const end = day+year+companyName[length-1]


    return invoiceIndex;
}

module.exports = {T_MOA, T_1}



