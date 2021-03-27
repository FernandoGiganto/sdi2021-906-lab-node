module.exports = function (app,swig){

    let autores = [ {
        "nombre": "Dario",
        "grupo": "Oracle",
        "rol": "cantante"
    },{
        "nombre": "Manolin",
        "grupo": "Camela",
        "rol": "teclista"
    },{
        "nombre": "pepe",
        "grupo": "pepe y los pepitos",
        "rol": "teclista"
    }];

    app.get('/autores/agregar', function (req, res) {
        let roles = [ {
            "nombre": "cantante",
        }, {
            "nombre": "batería",
        },{
            "nombre": "guitarrista",
        },{
            "nombre": "bajista",
        },{
            "nombre": "teclista",
        }];
        let respuesta = swig.renderFile('views/autores-agregar.html', {
            roles:roles
        });
        res.send(respuesta);
    });

    app.post("/autores/agregar",function (req,res){
        let nombre_autor = req.body.nombre;
        let grupo = req.body.grupo;
        if(nombre_autor == "")
            res.send("Nombre de autor no enviado en la petición");

        else if(grupo == "")
            res.send("Grupo no enviado en la petición");
        else{
            res.send("Autor agregada: " + nombre_autor +"<br>"
                +" grupo: " + grupo +"<br>"
                +" rol: " + req.body.rol ) ;
        }

    });

    app.get("/autores",function (req,res){


        let respuesta = swig.renderFile('views/autores.html',{
            autores : autores
        });

        res.send(respuesta);
    });

    app.get('/autores/filtrar/:rol',function (req,res){
        let respuesta = swig.renderFile('views/autores.html', {
            autores : autores.filter(autor => autor.rol === req.params.rol)
        });
        res.send(respuesta);
    });

    app.get('/autores/*', function (req, res) {
        res.redirect('/autores');
    })

};