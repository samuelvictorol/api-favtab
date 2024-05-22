const bcrypt = require("bcrypt");
const { Usuario: UsuarioModel } = require("../models/Usuario");

const usuarioController = {
  registrar: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.senha, salt);
      const usuario = {
        nome: req.body.nome.toLowerCase(),
        login: req.body.login.toLowerCase(),
        senha: hashedPassword,
        private: false,
        email: req.body.email,
        role: 'basic_user',
        user_image: 'https://images.vexels.com/media/users/3/265630/isolated/preview/1c7952bc7326df8d7f58a633405699aa-boy-listening-to-music.png',
        logado: true,
      };

      console.log(req.body);
      const response = await UsuarioModel.create(usuario);

      res.status(201).json({
        response,
        message: `Usuário ${req.body.login} Registrado com Sucesso`,
      });
    } catch (error) {
      res
        .status(500)
        .json({ error, message: "Este Login ou Email já está cadastrado" });
        console.log("Erro controller usuario\n" + error);
    }
  },
  validaUsuario: async (req, res) => {
    try {
      const usuario = await UsuarioModel.findOne({ login: req.body.login });
      // console.log(req.body);
      if (usuario && (await bcrypt.compare(req.body.senha, usuario.senha))) {
        const responseUsuario = {
          nome: usuario.nome,
          login: usuario.login,
          private: usuario.private,
          role: usuario.role,
          user_image: usuario.user_image,
        };
        usuario.logado = true;
        usuario.save();
        res.status(201).json({
          message: "Login Efetuado com Sucesso!",
          response: responseUsuario,
        });
      } else {
        res.status(200).json({
          message: "Credenciais Não Encontradas no Sistema",
        });
      }
    } catch (error) {
      res.status(500).json({ message: "Erro na requisição com o banco" });
      console.log(error);
    }
  },
  logout: async (req, res) => {
    try {
      const usuario = await UsuarioModel.findOne({ login: req.body.login });
      usuario.logado = false;
      usuario.save();
      res.status(201).json({
        message: "Logout Efetuado com Sucesso!",
      });
    } catch (error) {
      res.status(500).json({ message: "Erro na requisição com o banco" });
      console.log(error);
    }
  },
  resetPassword: async (req, res) => {
    // fazer reset de senha via email (ver twilio)
  },
};

module.exports = usuarioController;
