const express = require('express');
const app     = express();
const port    = 3000;

let datos             = [];
const ids             = new Map();
const valor           = new Map();


app.use(express.urlencoded({extended: true}))
app.use(express.json())

// deprecated
// app.use(bodyParser.urlencoded({extended: true}))

//seting the view engine
app.set('view engine', 'ejs');

app.listen(port, ()=>{
    console.log(`Server on port ${port}`)


});


//main page
app.get('/',(req,res)=>{
    res.render('pages/main',{
        id: req.query.id || "",
        msg: ""
    });    
})

app.post('/calculate',(req,res)=>{
    const id = Number(req.body.id);
    const num = Number(req.body.num);
    const operation = req.body.operation;

    let hitorico = ""

    ids.set(id,new Date()); //fecha por id


    //-------USO DE VAR --------//
    var valorLocal= valor.get(id)  
    //-------          --------//

    if(isNaN(valorLocal)){
        //damos un valor inicial en el caso de no existir registro de id
        valorLocal = 0
    }
    if( isNaN(id) || isNaN(num)){
        res.render('pages/error',{
         error: 'La ID o el número, no parecen ser correctos.. revisa los datos'   
        })

    }
    if( num == 0 && operation == 'div'){
        res.render('pages/error',{
            error: 'No podemos dividir entre 0 ¿Tú sí?'   
           })
        return
    }

    datos.push(id,{operation: operation, num: num, fecha: new Date()});


    switch(operation){
        case '+':
            valorLocal+=num;
            break;
        case '-':
            valorLocal-=num;
            break;
        case '*':
            valorLocal*=num;
            break;
        case '/':
            valorLocal/=num;
            break;
        case 'Reset':
            clearById(id);
            res.render('pages/main',{
                id,
                msg: `reseteado los valores de ${id}`
            })
            return;
    }
    valor.set(id,valorLocal);
    let resultado = valorLocal;
    

    for ( registro in datos){
        let r = datos[registro]
        if(r.id==id){
            hitorico +=` ${r.operation} ${r.num} `
        }
    }

    
    res.render('pages/calculate',{
    calculo: {id, operation, num},  
    hitorico,
    resultado})
})

function clearById(id){
    //los new Map buscan por clave (id en este caso)
    ids.delete(id);
    valor.delete(id);
}







