exports.color = (req, res) => {
  const elmColors = [
    '#5A6379',
    '#5CB5CD',
    '#F2AE00',
    '#7CD32B'
  ]
  const random = Math.floor(Math.random() * elmColors.length)
  return res.json(elmColors[random])
}
