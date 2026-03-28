import jwt from "jsonwebtoken";
import UserRepository from "../repositories/user.repository.js";
const userRepository = new UserRepository();
/**
 * Activate a user's account using an activation token and activation code.
 * If the activation token is valid, and the activation code matches the one in the token,
 * the user's email is marked as verified in the database.
 * @param {string} activationToken - The activation token sent to the user.
 * @param {string} activationCode - The activation code sent to the user.
 * @returns {Promise<User>} - The user object after the email has been verified.
 * @throws {Error} - If the activation token is invalid, or the activation code does not match the one in the token.
 */
const activationAccountService = async (activationToken, activationCode) => {
    try {
        const decoded = jwt.verify(activationToken, process.env.ACTIVATION_TOKEN_SECRET);
        // Further activation logic here

        if (decoded.activationCode !== activationCode) {
            throw new Error("Invalid activation code");
        }

        // Mark the user's email as verified in the database
        //const exitUser = await userRepository.findByEmail(decoded.email);
        const exitUser = await userRepository.findByEmail(decoded.user.email);
        if (!exitUser) {
            throw new Error("User not found");
        }
        exitUser.isEmailVerified = true;
        await exitUser.save();
        return exitUser;
    } catch (error) {
        throw error
    }
}

export default activationAccountService;