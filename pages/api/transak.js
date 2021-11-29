export default (req, res) => {
  res.status(200).json({ apiKey: process.env.TRANSAK_API_KEY })
}
