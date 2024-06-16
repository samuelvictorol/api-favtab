const UsuarioManager = require("../managers/UsuarioManager");

const usuarioController = {
  registrar: async (req, res) => {
    try {
      const usuario = {
        nome: req.body.nome.toLowerCase(),
        login: req.body.login.toLowerCase(),
        senha: req.body.senha,
        private: false,
        email: req.body.email,
        role: 'basic_user',
        user_image: 'https://static.vecteezy.com/system/resources/previews/024/029/997/original/music-band-clipart-transparent-background-free-png.png',
        logado: true,
      };

      const response = await UsuarioManager.registrarUsuario(usuario);

      res.status(201).json({
        response,
        message: `Usuário ${req.body.login} Registrado com Sucesso`,
      });
    } catch (error) {
      res
        .status(500)
        .json({ error, message: "Login ou Email já cadastrado no FavTab" });
        console.log("Erro controller usuario\n" + error);
    }
  },
  validaUsuario: async (req, res) => {
    try {
      const usuario = await UsuarioManager.login({ login: req.body.login.toLowerCase(), senha: req.body.senha});
      if (usuario) {
        const responseUsuario = {
          nome: usuario.nome,
          login: usuario.login,
          senha: usuario.senha,
          private: usuario.private,
          role: usuario.role,
          user_image: usuario.user_image,
        };

        return res.status(201).json({
          message: "Login Efetuado com Sucesso!",
          response: responseUsuario,
        });
      } else {
        return res.status(401).json({
          message: "Credenciais inválidas",
        });
      }
    } catch (error) {
      res.status(500).json({ message: "Erro de conexão com o banco" });
      console.log(error);
    }
  },
  logout: async (req, res) => {
    try {
      await UsuarioManager.logout({ login: req.body.login, senha: req.body.senha});
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
