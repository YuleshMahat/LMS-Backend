export const getUserDetails = async (req, res) => {
  console.log("Call back funcion triggered after middleware", req.user);
  res.status(200).json({
    status: true,
    user: req.user,
    message: "User detail found",
  });
};
