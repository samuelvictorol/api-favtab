const { HibernateBreak: HibernateBreakModel } = require("../models/HibernateBreak");

const favtabSettingsController = {
    initializeApp: async (_req, res) => {
        try {
            const hbArray = await HibernateBreakModel.find({});
            let str = '';
            if (hbArray.length > 2) {
                await HibernateBreakModel.deleteMany({});
                str = "E Cache limpo com sucesso";
            }
            const hibernateBreak = {
                initializerOptions: new Date(),
            };
            await HibernateBreakModel.create(hibernateBreak);
            console.log("Hibernate Break Inicializado com Sucesso " + str);
            res.status(201).json({
                message: "Hibernate Break Inicializado com Sucesso " + str,
            });
        } catch (error) {
            res.status(500).json({ error, message: "Erro ao Inicializar o App" });
            console.log("Erro controller favtabSettings\n" + error);
        }
    }
};

module.exports = favtabSettingsController;
