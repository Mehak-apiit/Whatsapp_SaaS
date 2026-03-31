import activationAccountService from "../services/activation.service.js";
const activateAccountController = async (req, res) => {
    try {
        const activationToken = req.body?.activationToken || req.query?.activationToken;
        const activationCode = req.body?.activationCode || req.query?.activationCode;

        if (!activationToken || !activationCode) {
            return res.status(400).json({ message: "Activation token and activation code are required" });
        }

        const user = await activationAccountService(activationToken, activationCode);
        res.status(200).json({ success: true, message: "Account activated successfully", data: user });
        

    } catch (error) {
        res.status(500).json({ message: error.message });
    
    }

}


export default activateAccountController;