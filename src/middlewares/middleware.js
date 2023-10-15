const validationCreate = (schemaYup) => async (req, res, next) => {
  try {
    await schemaYup.validateSync(req.body);
    next();
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
module.exports = validationCreate;
