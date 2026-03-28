import activationAccountService from "../services/activation.service.js";
const activateAccountController = async (req, res) => {
    try {
        const { activationToken, activationCode } = req.body;
        const user = await activationAccountService(activationToken, activationCode);
        res.status(200).json({ success: true, message: "Account activated successfully", data: user });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}


export default activateAccountController;