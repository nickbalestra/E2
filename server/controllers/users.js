exports.getUser = async (req, res) => {
  const user = {
    id: 23423,
  }
  if (user) {
    return res.json(user)
  }
  return res.status(404).send()
}

exports.authenticateUser = async (req, res) => {
  return res.status(200).send('authenticated')
}

exports.createUser = async (req, res) => {
  const user = req.body
  if (user) {
    return res.json(user)
  }
}
