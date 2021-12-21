import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import fetch from 'isomorphic-fetch'
import styled from '@emotion/styled'
import dynamic from 'next/dynamic'
import NextImage from 'next/image'
import { Button, Flex, Text, Label, Checkbox, Image } from 'theme-ui'
import { BsCaretDownFill } from 'react-icons/bs'
import { ethers } from 'ethers'
import { toast } from 'react-toastify'
import tokenAbi from 'human-standard-token-abi'
// import QRCode from 'qrcode.react'

import Modal from '../modal'
import { checkNetwork, getERC20List, pollEvery, getERC20Info } from '../../utils'
import useComponentVisible from '../../utils/useComponentVisible'
import CopyToClipboard from '../copyToClipboard'
import iconQuestionMark from '../../images/icon-question-mark.svg'
import theme from '../../utils/theme-ui'
import Tooltip from '../../components/tooltip'
import Toast from '../../components/toast'
import * as transaction from '../../services/transaction'
import { saveDonation, saveDonationTransaction } from '../../services/donation'
import InProgressModal from './inProgressModal'
import UnconfirmedModal from './unconfirmedModal'
import GeminiModal from './geminiModal'
import { Context as Web3Context } from '../../contextProvider/Web3Provider'
import { PopupContext } from '../../contextProvider/popupProvider'
import iconManifest from '../../../public/assets/cryptocurrency-icons/manifest.json'
import { isUserRegistered, sendTransaction } from '../../lib/helpers'
import { getAddressFromENS, isAddressENS } from '../../lib/wallet'
import { switchToXdai, switchNetwork } from '../../lib/util'
import config from '../../../config'
// import SVGLogo from '../../images/svg/donation/qr.svg'

const ETHIcon = '/assets/cryptocurrency-icons/32/color/eth.png'

const Select = dynamic(() => import('../selectWithAutocomplete'), {
  ssr: false
})

const xdaiChain = { id: 100, name: 'xdai', mainToken: 'XDAI' }
const ethereumChain = { id: 1, name: 'ethereum', mainToken: 'ETH' }
const xdaiExcluded = ['PAN', 'XNODE', 'USDT', 'CRV']
const stableCoins = [xdaiChain.mainToken, 'DAI', 'USDT']
const GIVETH_DONATION_AMOUNT = 5
const POLL_DELAY_TOKENS = 5000

const OnlyCrypto = props => {
  const {
    state: { balance, web3, account, isEnabled, networkId, provider, user },
    actions: { showWalletModal, connectWallet, signIn }
  } = useContext(Web3Context)
  const usePopup = useContext(PopupContext)
  const isSignedIn = user?.id
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false)

  const { triggerPopup } = usePopup

  const stopPolling = useRef()

  const { project } = props
  const [selectedToken, setSelectedToken] = useState({})
  const [selectedTokenBalance, setSelectedTokenBalance] = useState()
  const [customInput, setCustomInput] = useState()
  const [tokenPrice, setTokenPrice] = useState(1)
  const [mainTokenPrice, setMainTokenPrice] = useState(0)
  const [gasPrice, setGasPrice] = useState(null)
  const [gasETHPrice, setGasETHPrice] = useState(null)
  const [amountTyped, setAmountTyped] = useState('')
  const [inProgress, setInProgress] = useState(false)
  const [unconfirmed, setUnconfirmed] = useState(false)
  const [geminiModal, setGeminiModal] = useState(false)
  const [txHash, setTxHash] = useState(null)
  const [erc20List, setErc20List] = useState([])
  const [erc20OriginalList, setErc20OriginalList] = useState([])
  const [modalIsOpen, setIsOpen] = useState(false)
  const [icon, setIcon] = useState(null)
  const [anonymous, setAnonymous] = useState(false)
  const [selectLoading, setSelectLoading] = useState(false)
  const switchTraceable = false
  const donateToGiveth = false

  const tokenSymbol = selectedToken?.symbol
  const tokenAddress = selectedToken?.address
  const isXdai = networkId === xdaiChain.id
  const isGivingBlockProject = project?.givingBlocksId

  useEffect(() => {
    fetchEthPrice().then(setMainTokenPrice)
  }, [])

  useEffect(() => {
    if (networkId) {
      let netId = networkId
      if (isGivingBlockProject) netId = 'thegivingblock'
      if (isGivingBlockProject && networkId === 3) netId = 'ropsten_thegivingblock'
      let givIndex = null
      const tokens = getERC20List(netId).tokens.map((token, index) => {
        token.value = { symbol: token.symbol }
        token.label = token.symbol
        if (token.symbol === 'GIV' || token.symbol === 'TestGIV' || token.name === 'Giveth') {
          givIndex = index
        }
        return token
      })
      const givToken = tokens[givIndex]
      if (givToken) {
        tokens.splice(givIndex, 1)
      }
      tokens?.sort((a, b) => {
        var tokenA = a.name.toUpperCase()
        var tokenB = b.name.toUpperCase()
        return tokenA < tokenB ? -1 : tokenA > tokenB ? 1 : 0
      })
      if (givToken) {
        tokens.splice(0, 0, givToken)
      }
      setErc20List(tokens)
      setErc20OriginalList(tokens)
      setSelectedToken(tokens[0])
    }
  }, [networkId])

  useEffect(() => {
    if (isEnabled) pollToken()

    return () => clearPoll()
  }, [selectedToken, isEnabled, account, networkId, balance])

  useEffect(() => {
    if (stableCoins.includes(selectedToken.symbol)) {
      setTokenPrice(1)
    } else if (selectedToken.address) {
      let chain = xdaiChain.name
      let tokenAddress = selectedToken.address
      if (isXdai) {
        // coingecko doesn't have these tokens in xdai, so fetching price from ethereum
        if (xdaiExcluded.includes(selectedToken.symbol)) {
          tokenAddress = selectedToken.ethereumAddress
          chain = ethereumChain.name
        }
      } else {
        chain = ethereumChain.name
      }
      fetchPrices(chain, tokenAddress).then(setTokenPrice)
    } else if (selectedToken.symbol === ethereumChain.mainToken) {
      mainTokenPrice && setTokenPrice(mainTokenPrice)
    }
  }, [selectedToken, mainTokenPrice])

  useEffect(() => {
    web3?.eth.getGasPrice().then(wei => {
      const gwei = isXdai ? 1 : web3.utils.fromWei(wei, 'gwei')
      const ethFromGwei = web3.utils.fromWei(wei, 'ether')
      gwei && setGasPrice(Number(gwei))
      ethFromGwei && setGasETHPrice(Number(ethFromGwei) * 21000)
    })
  }, [networkId, selectedToken])

  useEffect(() => {
    let img = ''
    const found = iconManifest?.find(i => i.symbol === tokenSymbol?.toUpperCase())
    if (found) {
      img = `/assets/cryptocurrency-icons/32/color/${tokenSymbol?.toLowerCase() || 'eth'}.png`
      setIcon(img)
    } else {
      setIcon(`/assets/cryptocurrency-icons/32/color/eth.png`)
    }
  }, [tokenSymbol])

  const clearPoll = () => {
    if (stopPolling.current) {
      stopPolling.current()
      stopPolling.current = undefined
    }
  }

  const pollToken = useCallback(() => {
    clearPoll()

    // Native token balance is provided by the Web3Provider
    if (!selectedToken.address) {
      return setSelectedTokenBalance(balance)
    }

    stopPolling.current = pollEvery(
      () => ({
        request: async () => {
          try {
            const instance = new web3.eth.Contract(tokenAbi, selectedToken.address)
            return (await instance.methods.balanceOf(account).call()) / 10 ** selectedToken.decimals
          } catch (e) {
            return 0
          }
        },
        onResult: _balance => {
          if (
            _balance !== undefined &&
            (!selectedTokenBalance || selectedTokenBalance !== _balance)
          ) {
            setSelectedTokenBalance(_balance)
          }
        }
      }),
      POLL_DELAY_TOKENS
    )()
  }, [account, networkId, tokenSymbol, balance])

  const checkGIVTokenAvailability = () => {
    if (!isGivingBlockProject) return true
    if (selectedToken?.symbol === 'GIV') {
      setGeminiModal(true)
      return false
    } else {
      return true
    }
  }

  const fetchPrices = (chain, tokenAddress) => {
    return fetch(
      `https://api.coingecko.com/api/v3/simple/token_price/${chain}?contract_addresses=${tokenAddress}&vs_currencies=usd`
    )
      .then(response => response.json())
      .then(data => parseFloat(data[Object.keys(data)[0]]?.usd?.toFixed(2)))
      .catch(err => {
        console.log('Error fetching prices: ', err)
        setTokenPrice(0)
      })
  }

  const fetchEthPrice = () => {
    return fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')
      .then(response => response.json())
      .then(data => data.ethereum.usd)
      .catch(err => {
        console.log('Error fetching ETH price: ', err)
        setMainTokenPrice(0)
      })
  }

  const donation = parseFloat(amountTyped)
  const givethFee = Math.round((GIVETH_DONATION_AMOUNT * 100.0) / tokenPrice) / 100

  const subtotal = donation + (donateToGiveth === true ? givethFee : 0)

  const mainTokenToUSD = amountOfToken => {
    const USDValue = (amountOfToken * mainTokenPrice).toFixed(2)
    if (USDValue > 0) {
      return `$${USDValue}`
    }
    return 'less than $0.01'
  }

  const donationTokenToUSD = amountOfToken => {
    const USDValue = (amountOfToken * tokenPrice).toFixed(2)
    if (isXdai) return ''
    if (USDValue > 0) {
      return `$${USDValue}`
    }
    return 'less than $0.01'
  }

  const SummaryRow = ({ title, amount, logo, style, isLarge }) => {
    return (
      <SmRow style={style}>
        <Text
          sx={{
            variant: isLarge ? 'text.large' : 'text.default',
            textAlign: 'left',
            width: ['50%', '50%'],
            color: 'background',
            position: 'relative',
            display: 'flex'
          }}
        >
          {title}
          {logo && (
            <Tooltip
              placement='top'
              isArrow
              content={`The fee required to successfully conduct a transaction on the ${
                isXdai ? 'xDai' : 'Ethereum'
              } network.`}
              contentStyle={{
                backgroundColor: '#AF9BD3'
              }}
              textStyle={{
                color: 'white'
              }}
            />
          )}
        </Text>
        {amount?.length === 2 ? (
          <Flex sx={{ alignItems: 'baseline' }}>
            <Text
              sx={{
                variant: isLarge ? 'text.large' : 'text.small',
                color: 'anotherGrey',
                paddingRight: '5px'
              }}
            >
              {amount[0]}
            </Text>
            <Text
              sx={{
                variant: isLarge ? 'text.large' : 'text.overline',
                color: 'background',
                textAlign: 'end'
              }}
            >
              {' '}
              {amount[1]}
            </Text>
          </Flex>
        ) : (
          <Text
            sx={{
              variant: isLarge ? 'text.large' : 'text.small',
              textAlign: 'right',
              color: 'anotherGrey'
            }}
          >
            {amount}
          </Text>
        )}
      </SmRow>
    )
  }
  const confirmDonation = async () => {
    try {
      // Traceable by default if it comes from Trace only
      // Depends on the toggle if it's an IO to Trace project
      // let traceable = project?.fromTrace
      //   ? true
      //   : isTraceable
      //   ? isTraceable
      //   : switchTraceable
      let traceable = false

      // Sign message for registered users to get user info, no need to sign for anonymous
      if (isUserRegistered(user) && !user.token) {
        const isSigned = await signIn()
        if (!isSigned) return
      }

      if (!project?.walletAddress) {
        return Toast({
          content: 'There is no eth address assigned for this project',
          type: 'error'
        })
      }

      const isCorrectNetwork = checkNetwork(networkId)
      if (isGivingBlockProject && networkId !== config.PRIMARY_NETWORK.id)
        return triggerPopup('WrongNetwork', networkId)
      if (!isCorrectNetwork) return triggerPopup('WrongNetwork')

      if (!amountTyped || parseFloat(amountTyped) <= 0) {
        return Toast({ content: 'Please set an amount', type: 'warn' })
      }

      if (selectedTokenBalance < subtotal) {
        return triggerPopup('InsufficientFunds')
      }

      Toast({
        content: 'Donation in progress...',
        type: 'dark',
        customPosition: 'top-left',
        isLoading: true,
        noAutoClose: true
      })

      const toAddress = isAddressENS(project.walletAddress)
        ? await getAddressFromENS(project.walletAddress)
        : project.walletAddress

      const web3Provider = new ethers.providers.Web3Provider(provider)
      console.log({ anonymous })
      await transaction.send(
        web3,
        toAddress,
        selectedToken.address,
        subtotal,
        sendTransaction,
        web3Provider,
        {
          onTransactionHash: async transactionHash => {
            // Save initial txn details to db
            const { donationId, savedDonation, saveDonationErrors } = await saveDonation(
              account,
              toAddress,
              transactionHash,
              networkId,
              Number(subtotal),
              tokenSymbol,
              Number(project.id),
              tokenAddress,
              anonymous
            )
            console.log('DONATION RESPONSE: ', {
              donationId,
              savedDonation,
              saveDonationErrors
            })
            // onTransactionHash callback for event emitter
            transaction.confirmEtherTransaction(
              transactionHash,
              res => {
                try {
                  if (!res) return
                  toast.dismiss()
                  if (res?.tooSlow) {
                    // Tx is being too slow
                    toast.dismiss()
                    setTxHash(transactionHash)
                    setInProgress(true)
                  } else if (res?.status) {
                    // Tx was successful
                    toast.dismiss()
                    props.setHashSent({
                      transactionHash,
                      tokenSymbol,
                      subtotal
                    })
                    setUnconfirmed(false)
                  } else {
                    // EVM reverted the transaction, it failed
                    setTxHash(transactionHash)
                    setUnconfirmed(true)
                    if (res?.error) {
                      Toast({
                        content: res?.error?.message,
                        type: 'error'
                      })
                    } else {
                      Toast({
                        content: `Transaction couldn't be confirmed or it failed`,
                        type: 'error'
                      })
                    }
                  }
                } catch (error) {
                  console.log({ error })
                  toast.dismiss()
                }
              },
              0,
              isXdai
            )
            await saveDonationTransaction(transactionHash, donationId)
          },
          onReceiptGenerated: receipt => {
            props.setHashSent({
              transactionHash: receipt?.transactionHash,
              subtotal,
              tokenSymbol
            })
          },
          onError: () => {
            toast.dismiss()
            // the outside catch handles any error here
            // Toast({
            //   content: error?.error?.message || error?.message || error,
            //   type: 'error'
            // })
          }
        },
        traceable
      )

      // Commented notify and instead we are using our own service
      // transaction.notify(transactionHash)
    } catch (error) {
      toast.dismiss()
      if (
        error?.data?.code === 'INSUFFICIENT_FUNDS' ||
        error?.data?.code === 'UNPREDICTABLE_GAS_LIMIT'
      ) {
        // TODO: change this to custom alert
        return triggerPopup('InsufficientFunds')
      }
      return Toast({
        content:
          error?.data?.data?.message ||
          error?.data?.message ||
          error?.error?.message ||
          error?.message ||
          error,
        type: 'error'
      })
    }
  }

  // const traceableNetwork = networkId == process.env.NEXT_PUBLIC_NETWORK_ID
  // const canBeTraceable =
  //   (project?.traceCampaignId) &&
  //   traceableNetwork &&
  //   traceTokenList?.tokens?.find(i => i?.symbol === selectedToken.symbol)
  return (
    <>
      <Content ref={ref}>
        <InProgressModal
          showModal={inProgress}
          setShowModal={setInProgress}
          txHash={txHash}
          networkId={networkId}
        />
        <UnconfirmedModal
          showModal={unconfirmed}
          setShowModal={setUnconfirmed}
          txHash={txHash}
          networkId={networkId}
        />
        <GeminiModal showModal={geminiModal} setShowModal={setGeminiModal} />
        <Modal isOpen={modalIsOpen} onRequestClose={() => setIsOpen(false)} contentLabel='QR Modal'>
          <Flex
            sx={{
              flexDirection: 'column',
              alignItems: 'center',
              py: 5,
              px: 4,
              maxWidth: ['85vw', '60vw', '60vw'],
              textAlign: 'center'
            }}
          >
            <Text
              sx={{
                fontFamily: 'heading',
                fontSize: '15px',
                fontWeight: 'regular',
                lineHeight: 'tall',
                letterSpacing: '2px',
                overflowWrap: 'normal',
                color: 'secondary',
                mt: 2,
                mb: 4
              }}
            >
              DONATE TO
            </Text>
            <Text
              sx={{
                color: 'secondary',
                variant: 'headings.h4',
                mt: 2,
                mb: 4
              }}
            >
              {project?.title}
            </Text>
            {/* <QRCode value={project?.walletAddress} size={250} /> */}
            <Text sx={{ mt: 4, variant: 'text.default', color: 'secondary' }}>
              Please send ETH or ERC20 tokens using this address
            </Text>
            <Flex
              sx={{
                backgroundColor: 'lightGray',
                alignItems: 'center',
                px: 3,
                mt: 3
              }}
            >
              <Text
                sx={{
                  variant: 'text.default',
                  color: 'secondary',
                  py: 2
                }}
              >
                {project?.walletAddress}
              </Text>
              <CopyToClipboard size='18px' text={project?.walletAddress} />
            </Flex>
          </Flex>
          <Text
            onClick={() => setIsOpen(false)}
            sx={{
              cursor: 'pointer',
              color: 'secondary',
              position: 'absolute',
              top: '20px',
              right: '24px',
              variant: 'text.default'
            }}
          >
            Close
          </Text>
        </Modal>
        <AmountSection>
          <AmountContainer>
            {/* <Text sx={{ variant: 'text.large', mb: 3, color: 'background' }}>
            Enter your {tokenSymbol} amount
          </Text> */}
            <Flex
              sx={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 2
              }}
            >
              <Text
                sx={{
                  variant: 'text.large',
                  color: 'anotherGrey'
                }}
              >
                {!isNaN(tokenPrice) && !!tokenSymbol ? `1 ${tokenSymbol} ≈ ${tokenPrice} USD` : ''}
              </Text>

              {!isNaN(selectedTokenBalance) && (
                <Text
                  sx={{
                    variant: 'text.small',
                    color: 'anotherGrey'
                  }}
                >
                  Available:{' '}
                  {parseFloat(selectedTokenBalance).toLocaleString(
                    'en-US',
                    {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 6
                    } || ''
                  )}{' '}
                  {tokenSymbol}
                </Text>
              )}
            </Flex>

            <OpenAmount>
              {isComponentVisible && (
                <div
                  style={{
                    position: 'absolute',
                    backgroundColor: 'background',
                    top: '50px',
                    right: 0,
                    left: 0,
                    borderRadius: '10px',
                    zIndex: 10
                  }}
                >
                  <Select
                    width='100%'
                    content={erc20List}
                    isTokenList
                    menuIsOpen
                    inputValue={customInput}
                    isLoading={selectLoading}
                    onSelect={i => {
                      // setSelectedToken(i || selectedToken)
                      setSelectedToken(i)
                      setIsComponentVisible(false)
                      setCustomInput('')
                      setErc20List([...erc20OriginalList])
                    }}
                    onInputChange={i => {
                      // It's a contract
                      if (i?.length === 42) {
                        try {
                          setSelectLoading(true)
                          getERC20Info({
                            tokenAbi,
                            contractAddress: i,
                            web3
                          }).then(pastedToken => {
                            if (!pastedToken) return
                            const found = erc20List?.find(t => t?.symbol === pastedToken?.symbol)
                            !found && setErc20List([...erc20List, pastedToken])
                            setCustomInput(pastedToken?.symbol)
                            setSelectLoading(false)
                            // setSelectedToken(pastedToken)
                            // setIsComponentVisible(false)
                          })
                        } catch (error) {
                          setSelectLoading(false)
                        }
                      } else {
                        setCustomInput(i)
                        setErc20List([...erc20OriginalList])
                      }
                    }}
                    placeholder={
                      isGivingBlockProject
                        ? 'search for a token'
                        : 'search for a token or paste address'
                    }
                  />
                </div>
              )}
              <InputComponent
                sx={{
                  variant: 'text.large',
                  color: 'secondary',
                  '::placeholder': {
                    color: 'anotherGrey'
                  }
                }}
                placeholder='Amount'
                type='number'
                value={amountTyped}
                onChange={e => {
                  e.preventDefault()
                  if (parseFloat(e.target.value) !== 0 && parseFloat(e.target.value) < 0.001) {
                    return
                  }
                  const checkGIV = checkGIVTokenAvailability()
                  if (checkGIV) setAmountTyped(e.target.value)
                }}
              />
              <Flex
                onClick={() => setIsComponentVisible(!isComponentVisible)}
                sx={{
                  alignItems: 'center',
                  position: 'absolute',
                  cursor: 'pointer',
                  right: '20px',
                  ml: 3
                }}
              >
                <Image
                  src={icon || `/assets/tokens/${tokenSymbol?.toUpperCase()}.png`}
                  alt={tokenSymbol || ''}
                  onError={ev => {
                    ev.target.src = ETHIcon
                    ev.target.onerror = null
                  }}
                  width={'32px'}
                  height={'32px'}
                  style={{ width: '32px', height: '32px' }}
                />
                <Text sx={{ ml: 2, mr: 3 }}>{tokenSymbol}</Text>
                <BsCaretDownFill size='12px' color={theme.colors.secondary} />
              </Flex>
            </OpenAmount>
          </AmountContainer>
          <>
            {/* <CheckboxLabel sx={{ mb: '12px', alignItems: 'center' }}>
            <>
              <Checkbox
                defaultChecked={donateToGiveth}
                onClick={() => setDonateToGiveth(!donateToGiveth)}
              />
              <Text
                sx={{
                  variant: 'text.medium',
                  textAlign: 'left'
                }}
              >
                Be a hero, add <strong> ${GIVETH_DONATION_AMOUNT}</strong> to
                help sustain Giveth
              </Text>
            </>
            <Tooltip content='When you donate to Giveth you put a smile on our face because we can continue to provide support and further develop the platform.' />
          </CheckboxLabel> */}
            {/* <Label sx={{ mb: '10px', alignItems: 'center' }}>
            <Checkbox defaultChecked={false} />
            <Text sx={{ variant: 'text.medium' }}>Dedicate this donation</Text>
          </Label> */}
            {amountTyped && (
              <Summary>
                {donateToGiveth &&
                  SummaryRow({
                    title: 'Support Giveth',
                    amount: [
                      `$${GIVETH_DONATION_AMOUNT}`,
                      `≈ ${selectedToken.symbol} ${(GIVETH_DONATION_AMOUNT / tokenPrice).toFixed(
                        2
                      )}`
                    ]
                  })}

                {SummaryRow({
                  title: 'Donation amount',
                  isLarge: true,
                  amount: [
                    `${donationTokenToUSD(donation)}`,
                    `${parseFloat(donation)} ${selectedToken.symbol}`
                  ]
                })}

                {gasPrice &&
                  SummaryRow({
                    title: 'Network fee',
                    logo: { iconQuestionMark },
                    amount: [
                      `${mainTokenToUSD(gasETHPrice)} • ${parseFloat(gasPrice)} GWEI`,
                      `${parseFloat(gasETHPrice).toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 6
                      })} ${isXdai ? xdaiChain.mainToken : ethereumChain.mainToken}`
                    ]
                  })}
              </Summary>
            )}
            {
              // UNCOMMENT THIS TO BRING TRACEABLE DONATIONS
              // {canBeTraceable && !isXdai && project?.IOTraceable && (
              //   <Switch
              //     label='Make this a traceable donation'
              //     onChange={() =>
              //       setSwitchTraceable(switchTraceable === true ? false : true)
              //     }
              //     value={switchTraceable}
              //     defaultValue={switchTraceable}
              //   />
              // )}
              // {project?.fromTrace && <Text>This is a trace only donation</Text>}
              // {switchTraceable === true && (
              //   <SaveGasMessage
              //     sx={{ mt: project?.traceCampaignId ? 3 : 0 }}
              //   >
              //     <Text
              //       sx={{
              //         variant: 'text.medium',
              //         textAlign: 'left',
              //         color: 'background'
              //       }}
              //     >
              //       Traceable donations are supported on mainnet using ETH, DAI,
              //       PAN, USDC or WBTC
              //     </Text>
              //   </SaveGasMessage>
              // )}
            }

            {isGivingBlockProject && networkId !== config.PRIMARY_NETWORK.id && (
              <SaveGasMessage sx={{ mt: project?.traceCampaignId ? 3 : 0 }}>
                <Text
                  sx={{
                    variant: 'text.medium',
                    textAlign: 'left',
                    color: 'background',
                    marginLeft: '12px'
                  }}
                >
                  Projects from The Giving Block only accept donations on mainnet.
                </Text>
                <Text
                  onClick={() => switchNetwork()}
                  sx={{
                    cursor: 'pointer',
                    variant: 'text.medium',
                    textAlign: 'left',
                    color: 'yellow',
                    marginLeft: '12px'
                  }}
                >
                  Switch Network
                </Text>
              </SaveGasMessage>
            )}

            {!switchTraceable && !isXdai && !isGivingBlockProject && (
              <SaveGasMessage sx={{ mt: project?.traceCampaignId ? 3 : 0 }}>
                <NextImage
                  src='/images/icon-streamline-gas.svg'
                  height='18px'
                  width='18px'
                  alt='gas icon'
                />
                <Text
                  sx={{
                    variant: 'text.medium',
                    textAlign: 'left',
                    color: 'background',
                    marginLeft: '12px'
                  }}
                >
                  Save on gas fees, switch to xDAI network.
                </Text>
                <Text
                  onClick={switchToXdai}
                  sx={{
                    cursor: 'pointer',
                    variant: 'text.medium',
                    textAlign: 'left',
                    color: 'yellow',
                    marginLeft: '12px'
                  }}
                >
                  Switch network
                </Text>
              </SaveGasMessage>
            )}
          </>
          {!!isSignedIn && (
            <CheckboxLabel sx={{ mt: 3, mb: '12px', alignItems: 'center', color: 'background' }}>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Checkbox defaultChecked={anonymous} onClick={() => setAnonymous(!anonymous)} />
                <Text
                  sx={{ variant: 'text.medium', textAlign: 'left', color: theme.colors.background }}
                >
                  Donate anonymously
                </Text>
              </div>
            </CheckboxLabel>
          )}
          <Flex sx={{ flexDirection: 'column', width: '100%' }}>
            <Flex
              sx={{
                width: '100%',
                alignItems: 'center',
                textAlign: 'center',
                justifyContent: 'space-between',
                my: 3
              }}
            >
              {isEnabled && (
                <Button
                  onClick={confirmDonation}
                  sx={{
                    variant: 'buttons.default',
                    mt: 2,
                    mr: 2,
                    textTransform: 'uppercase',
                    width: '100%'
                  }}
                >
                  Donate
                </Button>
              )}

              {/*{false && (*/}
              {/*  <Flex*/}
              {/*    sx={{*/}
              {/*      cursor: 'pointer',*/}
              {/*      width: isEnabled ? '25px' : '100%',*/}
              {/*      justifyContent: 'center'*/}
              {/*    }}*/}
              {/*    onClick={() => setIsOpen(true)}*/}
              {/*  >*/}
              {/*    <SVGLogo />*/}
              {/*  </Flex>*/}
              {/*)}*/}
            </Flex>
            {/* {project?.listed === false && (
              <Text
                sx={{
                  variant: 'text.default',
                  color: 'red',
                  fontWeight: 'bold',
                  alignSelf: 'center'
                }}
              >
                {' '}
                This project is unlisted{' '}
              </Text>
            )} */}

            {!isEnabled && (
              <Button
                onClick={connectWallet}
                sx={{
                  variant: 'buttons.default',
                  my: 2,
                  textTransform: 'uppercase'
                }}
              >
                Connect Wallet
              </Button>
            )}

            {!!web3 && (
              <Text
                sx={{
                  mt: 2,
                  mx: 'auto',
                  cursor: 'pointer',
                  color: 'background',
                  '&:hover': {
                    color: 'accent'
                  }
                }}
                onClick={showWalletModal}
              >
                click here to use another wallet
              </Text>
            )}
          </Flex>
        </AmountSection>
      </Content>
    </>
  )
}

const Content = styled.div`
  max-width: 41.25rem;
  word-wrap: break-word;
`

const AmountSection = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1.3rem 0 0 0;
  @media (max-width: 800px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
`

const AmountContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: 2rem 0;
  @media (max-width: 800px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`

const OpenAmount = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  position: relative;

  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
  }
`

const InputComponent = styled.input`
  background: white;
  border: none;
  border-radius: 12px;
  padding: 1rem 0.4rem 1rem 1.4rem;
  outline: none;
  width: 100%;
`

const Summary = styled(Flex)`
  flex-direction: column;
  margin: 2rem 0;
`

const SmRow = styled(Flex)`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  margin: 0.75rem 0;
  align-items: center;
`

const SaveGasMessage = styled(Flex)`
  flex: 1;
  flex-direction: row;
  background: #3e50a7;
  border-radius: 4px;
  height: 40px;
  max-width: 460px;
  align-items: center;
  padding: 0.5rem 1rem;
  word-wrap: break-word;
  margin-bottom: 10px;
`

const CheckboxLabel = styled(Label)`
  @media (max-width: 800px) {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  cursor: pointer;
`

export default OnlyCrypto
