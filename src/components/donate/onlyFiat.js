import React, { useEffect } from 'react'
import { Flex, Button, Text } from 'theme-ui'
import { startTransakDonation } from '../../services/donation'

// import styled from '@emotion/styled'
// import theme from '../../utils/theme-ui'
// import Tooltip from '../../components/tooltip'
// import { loadStripe } from '@stripe/stripe-js'
// import { useApolloClient } from '@apollo/client'
// import { GET_DONATION_SESSION } from '../../apollo/gql/projects'

const OnlyFiat = (props) => {
  const { project, setTransakTx } = props
  // const [amountSelect, setAmountSelect] = useState(null)
  // const [amountTyped, setAmountTyped] = useState(null)
  // const [donateToGiveth, setDonateToGiveth] = useState(false)
  // const [anonymous, setAnonymous] = useState(false)
  // const client = useApolloClient()
  // const amounts = [500, 100, 50, 30]

  // const donation = parseFloat(amountTyped || amountSelect)
  // const donationPlusFee =
  //   donation + (donateToGiveth === true ? GIVETH_DONATION_AMOUNT : 0)
  // const subtotal = (donation + 0.25) / 0.971
  // const subtotal = donation

  // const goCheckout = async () => {
  //   try {
  //     if (!amountSelect && !amountTyped) {
  //       return alert('Please set an amount before donating')
  //     }
  //     const amount = amountTyped || amountSelect
  //     if (amount <= 0) return alert('Please set a valid amount')
  //
  //     // TRANSAK CALL
  //     await startTransakDonation({
  //       project,
  //       amount
  //     })
  //
  //     // await getDonationSession({ variables: { amount: amountSelect } })
  //     // const projId = project?.id
  //     // const slug = project?.slug
  //     // const { data } = await client.query({
  //     //   query: GET_DONATION_SESSION,
  //     //   variables: {
  //     //     projectId: parseFloat(projId),
  //     //     amount: parseFloat(subtotal),
  //     //     anonymous: anonymous,
  //     //     donateToGiveth: donateToGiveth,
  //     //     successUrl: `${window.location.origin}/donate/${slug}?success=true`,
  //     //     cancelUrl: `${window.location.origin}/donate/${slug}?success=false`
  //     //   }
  //     // })
  //     // goStripe(data)
  //   } catch (error) {
  //     alert(error?.message?.split('GraphQL error: ')[1])
  //     console.log({ error })
  //   }
  // }

  // const goStripe = async data => {
  //   // Get Stripe.js instance
  //   const stripe = await loadStripe(process.env.STRIPE_PUBLIC_KEY, {
  //     stripeAccount: data?.getStripeProjectDonationSession?.accountId
  //   })
  //   // When the customer clicks on the button, redirect them to Checkout.
  //   const result = await stripe.redirectToCheckout({
  //     sessionId: data?.getStripeProjectDonationSession?.sessionId
  //   })

  //   if (result.error) {
  //     // If `redirectToCheckout` fails due to a browser or network
  //     // error, display the localized error message to your customer
  //     // using `result.error.message`.
  //   }
  // }

  // if (called && !loading) {
  //   goStripe()
  // }
  //
  // const AmountSelection = () => {
  //   return (
  //     <AmountItems>
  //       {amounts.map((i, index) => {
  //         const isSelected = amountSelect === i
  //         return (
  //           <AmountItem
  //             key={index}
  //             onClick={() => {
  //               setAmountTyped('')
  //               setAmountSelect(i)
  //             }}
  //             style={{
  //               backgroundColor: isSelected ? theme.colors.background : 'transparent',
  //               color: isSelected ? theme.colors.secondary : theme.colors.background
  //             }}
  //           >
  //             <Text
  //               sx={{
  //                 variant: 'text.large',
  //                 color: isSelected ? theme.colors.secondary : theme.colors.background,
  //                 fontWeight: '700'
  //               }}
  //             >
  //               ${i}
  //             </Text>
  //           </AmountItem>
  //         )
  //       })}
  //     </AmountItems>
  //   )
  // }

  // const SummaryRow = ({ title, amount, notice, style }) => {
  //   return (
  //     <SmRow style={style}>
  //       <Text sx={{ variant: 'text.medium', color: 'background' }}>{title}</Text>
  //       <Text sx={{ variant: 'text.medium', color: 'background' }}>
  //         {notice ? notice : `$${amount}`}
  //       </Text>
  //     </SmRow>
  //   )
  // }

  useEffect(() => {
    // startTransakDonation({ project, setSuccess: setTransakTx })
  }, [])

  return (
    <Flex sx={{ flexDirection: 'column' }}>
      <Flex sx={{ width: '450px', flexDirection: 'column' }}>
        <Text
          sx={{
            variant: 'text.large',
            color: 'background',
            mt: 4,
          }}
        >
          {/* Transak is a fiat on-ramp that allows you to donate with a credit card
          just as easily as you would make a purchase online. */}
          Coming Soon
        </Text>
        {/* <Text
          sx={{
            variant: 'text.medium',
            color: 'background',
            mb: 2,
            mt: 1,
          }}
        >
          You'll be redirected to Transak's page where your "purchase" will be
          sent as crypto to the project's donation address.
        </Text> */}
      </Flex>

      {/* <Button
        sx={{
          variant: 'buttons.default',
          padding: '1.063rem 7.375rem',
          marginTop: '2rem',
        }}
        onClick={() =>
          startTransakDonation({ project, setSuccess: setTransakTx })
        }
      >
        Continue with Transak
      </Button> */}
      {/* <Flex>
        <img
          src={'/images/coming-soon-gear.png'}
          style={{ marginLeft: -6 }}
        />
        <img
          src={'/images/coming-soon.png'}
          style={{ float: "right"}}
        />
      </Flex> */}
    </Flex>
  )
}

// return (
//   <Content>
//     <AmountSection>
//       <AmountSelection />
//       <AmountContainer>
//         <Text sx={{ variant: 'text.medium', color: 'background' }}>Or enter your amount:</Text>
//         <OpenAmount>
//           <Text sx={{ variant: 'text.large', color: 'background' }}>$</Text>
//           <InputComponent
//             sx={{
//               variant: 'text.large',
//               '::placeholder': {
//                 color: 'anotherGrey'
//               }
//             }}
//             placeholder='Amount'
//             type='number'
//             value={amountTyped}
//             onChange={e => {
//               e.preventDefault()
//               setAmountSelect(null)
//               setAmountTyped(e.target.value)
//             }}
//           />
//         </OpenAmount>
//       </AmountContainer>
//       <div>
//         {/* <CheckboxLabel sx={{ mb: '12px', alignItems: 'center' }}>
//           <div style={{ display: 'flex', flexDirection: 'row' }}>
//             <Checkbox
//               defaultChecked={donateToGiveth}
//               onClick={() => setDonateToGiveth(!donateToGiveth)}
//             />
//             <Text
//               sx={{
//                 variant: 'text.medium',
//                 textAlign: 'left',
//                 color: 'white'
//               }}
//             >
//               Be a hero, add <strong> ${GIVETH_DONATION_AMOUNT}</strong> to
//               help sustain Giveth
//             </Text>
//           </div>
//           <Tooltip content='When you donate to Giveth you put a smile on our face because we can continue to provide support and further develop the platform.' />
//         </CheckboxLabel> */}
//         {/* <CheckboxLabel
//           sx={{ mb: '12px', alignItems: 'center', color: 'white' }}
//         >
//           <div style={{ display: 'flex', flexDirection: 'row' }}>
//             <Checkbox
//               defaultChecked={anonymous}
//               onClick={() => setAnonymous(!anonymous)}
//             />
//             <Text
//               sx={{
//                 variant: 'text.medium',
//                 color: 'white',
//                 textAlign: 'left'
//               }}
//             >
//               Donate anonymously
//             </Text>
//           </div>
//           <Tooltip content='When you donate anonymously, your name will never appear in public as a donor. But, your name will be recorded so that we can send a tax donation receipt.' />
//         </CheckboxLabel> */}
//         {/* <Label sx={{ mb: '10px', alignItems: 'center' }}>
//           <Checkbox defaultChecked={false} />
//           <Text sx={{ variant: 'text.medium' }}>Dedicate this donation</Text>
//         </Label> */}
//           {(amountSelect || amountTyped) && (
//             <Summary>
//               <SummaryRow
//                 title={`Support ${project?.title}`}
//                 amount={parseFloat(donation).toFixed(2)}
//               />
//               {/* {donateToGiveth && (
//                 <SummaryRow
//                   title='Support Giveth'
//                   amount={GIVETH_DONATION_AMOUNT}
//                 />
//               )} */}
//               <SummaryRow
//                 title='Fee'
//                 // amount={parseFloat(donation * 0.029 + 0.3).toFixed(2)}
//                 notice='To be calculated'
//                 style={{
//                   borderBottom: '1px solid #6B7087',
//                   padding: '0 0 18px 0'
//                 }}
//               />
//               <Text
//                 sx={{
//                   variant: 'text.medium',
//                   textAlign: 'right',
//                   color: 'background'
//                 }}
//               >
//                 ${parseFloat(subtotal).toFixed(2)} + Fees
//               </Text>
//             </Summary>
//           )}
//         </div>
//         <Button
//           onClick={goCheckout}
//           // onClick={() =>
//           //   alert(
//           //     `Stripe doesn't like us :( \nPlease wait until next integration`
//           //   )
//           // }
//           sx={{
//             variant: 'buttons.default',
//             padding: '1.063rem 7.375rem',
//             marginTop: '2rem'
//           }}
//         >
//           Donate
//         </Button>
//       </AmountSection>
//     </Content>
//   )
// }

// const AmountItems = styled.div`
//   display: flex;
//   flex-direction: row;
//   width: 100%;
//   justify-content: space-around;
//
//   @media (max-width: 800px) {
//     flex-direction: column;
//   }
// `
//
// const AmountItem = styled.div`
//   flex: 0.2;
//   padding: 1.5rem 0;
//   text-align: center;
//   cursor: pointer;
//   border: 1px white solid;
//   border-radius: 6px;
//   @media (max-width: 800px) {
//     margin: 0.5rem 0;
//   }
// `
//
// const SmRow = styled(Flex)`
//   flex: 1;
//   flex-direction: row;
//   justify-content: space-between;
//   margin: 0.75rem 0;
// `

// const InputComponent = styled(Input)`
//   background: transparent;
//   border: none;
//   padding: 1rem 0.4rem;
//   outline: none;
//   color: white;
// `
//
// const Summary = styled(Flex)`
//   flex-direction: column;
//   margin: 1rem 0;
// `
//
// const Content = styled.div`
//   max-width: 41.25rem;
//   word-wrap: break-word;
// `
//
// const AmountSection = styled.div`
//   margin: 1.3rem 0 0 0;
//   @media (max-width: 800px) {
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//     text-align: center;
//   }
// `
//
// const AmountContainer = styled.div`
//   margin: 2rem 0;
//   @media (max-width: 800px) {
//     display: flex;
//     flex-direction: column;
//     align-items: flex-start;
//   }
// `
//
// const OpenAmount = styled.div`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
// `

// const CheckboxLabel = styled(Label)`
//   @media (max-width: 800px) {
//     display: flex;
//     justify-content: space-between;
//     width: 100%;
//   }
//   cursor: pointer;
// `

export default OnlyFiat
