/**
 * UsuarioController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  login: async function (req, res) {
    var usuario = req.param('correo');
    var contrasenia = req.param('contrasenia');

    console.log( usuario + ' ' + contrasenia);

    if (!(usuario && contrasenia)) {
      res.send('No ingreso usuario o contraseña');
      // TODO: mostrar view de login con error
    } else {

      var user = await Usuario.findOne({
        correo: usuario,
        contrasenia: contrasenia // TODO: hashear contrasenia
      });

      if (!user) {
        res.send('Usuario o contraseña invalida');
        // TODO: mostrar view de login con error
      }else{
        req.session.usuario = user;
        res.redirect('/inicio');
      }
    }
  },


  logout: async function (req, res) {

    req.session.usuario = null;
    res.redirect('/');
  },
///
  forget:async function(req, res)
  {
    //let usuario = req.param('correo');*/
  },


  signup:async function(req,res)
  {

   res.view('pages/usuario/signup');

  },
  create:async function(res,req)
  {
    var param  = req.allParams();
    var usuerNuevo={
     correo: param.correo,
     nombre: param.nombre,
     apellido: param.apellido,
     contrasenia: param.contrasenia,
    };


    datos = await Usuario.create(usuerNuevo);

    console.log(usuerNuevo.nombre+'//'+ usuerNuevo.apellido+'//'+usuerNuevo.contrasenia+'*****')

    res.view('pages/usuario/login');



  },
  dashboard: function(req, res){
    res.view('pages/inicio');
  },

};

