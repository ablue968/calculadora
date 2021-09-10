const express = require('express');
const app     = express();
const port    = 3000;

let tiempo            = 0;
const datos           = [];
const ids             = new Map();
const valor           = new Map();


app.use(express.urlencoded({extended: true}))
app.use(express.json())

// deprecated
// app.use(bodyParser.urlencoded({extended: true}))

//seting the view engine
app.set('view engine', 'ejs');

//main page
app.get('/',(req,res)=>{
    res.render('pages/main',{
        id: req.query.id || ""
    });
    
})

app.post('/calculate',(req,res)=>{
    const id = Number(req.body.id);
    const num = Number(req.body.num);
    const operation = req.body.operation;

    ids.set(id,new Date()); //fecha por id
    var valorLocal= valor.get(id)

    if(isNaN(valorLocal)){
        console.log('no existe esa id aún')
        valorLocal = 0
        // let localStorageValue = 0;
        // const data = valor.set(id, localStorageValue);
        // //localStorage.setItem('data',JSON.stringify(data));
    }
    if( isNaN(id) || isNaN(num)){
        console.log('no es un número')
        res.render('pages/error',{
         error: 'La ID o el número, no parecen ser correctos.. revisa los datos'   
        })

    }
    if( num == 0 && operation == 'div'){
        console.log('no puedes hacer esto')
        res.render('pages/error',{
            error: 'No podemos dividir entre 0 ¿Tú sí?'   
           })
        return
    }

    datos.push(id,{operation: operation, num: num, fecha: new Date()});

    switch(operation){
        case 'suma':
            valorLocal+=num;
            break;
        case 'resta':
            valorLocal-=num;
            break;
        case 'multi':
            valorLocal*=num;
            break;
        case 'div':
            valorLocal/=num;
            break;
    }
    valor.set(id,valorLocal);
    let resultado = valorLocal;
    let logstr= "";
    datos.forEach( v =>{
        this.logstr = this.logstr + v.operation+ " " + v.num;
    })
    log=logstr;
    console.log('log', log);
    console.log('resultado', resultado);
    console.log(datos);

    
    res.render('pages/calculate',{
    calculo: {id, operation, num}, 
    log, 
    resultado})
    console.log('calculo', calculo)
    

})


app.listen(port, ()=>{
    console.log(`Server on port ${port}`)
});





