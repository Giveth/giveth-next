const GetTransakApiKey = (req, res) => {
  // TODO: Blocking this as it's not safe
  // res.status(200).json({ apiKey: process.env.TRANSAK_API_KEY })
  res.status(200).json({ apiKey: null })
}

export default GetTransakApiKey
