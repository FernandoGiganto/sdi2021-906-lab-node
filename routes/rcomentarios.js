module.exports = function (app, swig, gestorBD) {
    app.post("/comentarios/:cancion_id", function (req,res) {
        let id = req.params.cancion_id;
        let comentario = {
            autor: req.session.usuario,
            texto: req.body.texto,
            cancion_id: gestorBD.mongo.ObjectID(id),
        }

        gestorBD.insertarComentario(comentario, function (id) {
            if (id == null){
                res.send("Error al añadir comentario");
            }
            else{
                res.send("Added id" + id);
            }
        })
    })
};