const GetTransakApiKey = (req, res) => {
  res.status(200).json({ apiKey: process.env.TRANSAK_API_KEY })
}

export default GetTransakApiKey
