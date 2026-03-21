
async function profile(req, res) {
    const user = req.user;
    res.status(200).json({ success: true, message: "Profile data fetched successfully", data: user });
}

export default profile;