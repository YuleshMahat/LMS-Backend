export const getUserDetails = async (req, res) => {
  res.status(200).json({
    status: true,
    user: req.user,
    message: "User detail found",
  });
};
